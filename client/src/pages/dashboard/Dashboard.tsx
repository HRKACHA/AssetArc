import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Button, 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  PageHeader,
  StatusIndicator,
  Badge,
  Input
} from '../../components/common';
import { Package, Activity, AlertTriangle, ArrowUpRight } from 'lucide-react';
import axios from 'axios';

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

export function Dashboard() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ total: 0, critical: 0 });
  const [recentAssets, setRecentAssets] = useState([]);
  const [mapAssets, setMapAssets] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/assets', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const assets = res.data.data;
        
        setStats({
          total: assets.length,
          critical: assets.filter((a: any) => a.status === 'critical').length
        });
        
        setRecentAssets(assets.slice(0, 5));
        setMapAssets(assets.filter((a: any) => a.location?.coordinates?.length === 2));
      } catch (error) {
        console.error('Error fetching dashboard data', error);
      }
    };
    
    if (token) fetchDashboardData();
  }, [token]);
  
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader 
        title={`Welcome back, ${user?.name || 'User'}`} 
        description="Monitor your infrastructure assets and network status across all regions."
      >
        <Button variant="primary" onClick={() => navigate('/assets/new')}>Add Asset</Button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:-translate-y-1 transition-transform duration-300">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center justify-between">
              Total Assets
              <Package size={16} className="text-primary" />
            </CardDescription>
            <CardTitle className="text-3xl text-primary">{stats.total || 0}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm">
              <span className="text-status-operational font-medium">Tracking active</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:-translate-y-1 transition-transform duration-300">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center justify-between">
              Critical Status
              <AlertTriangle size={16} className="text-status-critical" />
            </CardDescription>
            <CardTitle className="text-3xl text-status-critical">{stats.critical || 0}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm">
              <span className="text-status-critical font-medium">Requires attention</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:-translate-y-1 transition-transform duration-300">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center justify-between">
              Network Health
              <Activity size={16} className="text-green-500" />
            </CardDescription>
            <CardTitle className="text-3xl text-green-500">{stats.critical > 0 ? '98.5%' : '100%'}</CardTitle>
          </CardHeader>
          <CardContent>
            <StatusIndicator status={stats.critical > 0 ? 'attention' : 'operational'} label={stats.critical > 0 ? 'Issues detected' : 'All systems nominal'} pulse={stats.critical > 0} />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Assets</CardTitle>
            <CardDescription>Latest assets added to the system.</CardDescription>
          </CardHeader>
          <CardContent>
            {recentAssets.length === 0 ? (
              <p className="text-sm text-text-secondary">No assets found. Add some to get started.</p>
            ) : (
              <div className="space-y-4">
                {recentAssets.map((asset: any) => (
                  <div key={asset._id} className="flex items-center justify-between p-4 rounded-lg bg-bg-secondary border border-border-subtle hover:border-primary transition-colors cursor-pointer" onClick={() => navigate(`/assets/${asset._id}`)}>
                    <div className="flex items-center gap-4">
                      <Badge variant={asset.status as any}>{asset.status.toUpperCase()}</Badge>
                      <div>
                        <div className="font-medium text-text-primary">{asset.assetCode} - {asset.name}</div>
                        <div className="text-sm text-text-secondary">{asset.lifecycleStage}</div>
                      </div>
                    </div>
                    <ArrowUpRight size={18} className="text-text-muted" />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-1 flex flex-col">
          <CardHeader>
            <CardTitle>Asset Map</CardTitle>
            <CardDescription>Geospatial Overview</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 p-0 rounded-b-lg overflow-hidden min-h-[300px]">
            <MapContainer 
              center={[23.0225, 72.5714]} 
              zoom={6} 
              style={{ height: '100%', width: '100%', minHeight: '300px' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {mapAssets.map((asset: any) => (
                <Marker 
                  key={asset._id} 
                  position={[asset.location.coordinates[1], asset.location.coordinates[0]]}
                >
                  <Popup>
                    <div className="font-semibold">{asset.name}</div>
                    <div className="text-xs">{asset.assetCode}</div>
                    <div className="mt-2 text-xs">Status: {asset.status}</div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
