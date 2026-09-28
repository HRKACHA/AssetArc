import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { PageHeader, Card } from '../../components/common';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export function MapView() {
  const { token } = useAuth();
  const [assets, setAssets] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/assets', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAssets(res.data.data.filter((a: any) => a.location?.coordinates?.length === 2));
      } catch (error) {
        console.error('Error fetching assets for map', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (token) fetchAssets();
  }, [token]);

  if (isLoading) {
    return <div className="p-8 text-center text-text-muted">Loading map data...</div>;
  }

  // Default to Gujarat center
  const center: [number, number] = assets.length > 0 
    ? [assets[0].location.coordinates[1], assets[0].location.coordinates[0]] 
    : [22.2587, 71.1924]; 

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">
      <PageHeader 
        title="Geographic Overview" 
        description="Visualize asset distribution and real-time status across regions."
      />

      <Card className="flex-1 overflow-hidden min-h-[500px] relative z-0">
        <MapContainer center={center} zoom={7} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {assets.map((asset: any) => (
            <Marker 
              key={asset._id} 
              position={[asset.location.coordinates[1], asset.location.coordinates[0]]}
            >
              <Popup>
                <div className="p-1">
                  <h3 className="font-bold text-gray-900">{asset.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{asset.assetCode}</p>
                  <p className="text-sm capitalize text-gray-700 mb-2">Status: {asset.status}</p>
                  <Link to={`/assets/${asset._id}`} className="text-sm text-blue-600 hover:underline">
                    View Passport &rarr;
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </Card>
    </div>
  );
}
