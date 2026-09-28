import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { 
  PageHeader, 
  Button, 
  Card, 
  Badge, 
  LoadingState,
  EmptyState
} from '../../components/common';
import { Package, Plus } from 'lucide-react';

export function AssetList() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { token } = useAuth();
  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const searchQuery = searchParams.get('search') || '';
        const res = await axios.get(`http://localhost:5000/api/assets${searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ''}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAssets(res.data.data);
      } catch (error) {
        console.error('Error fetching assets', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (token) fetchAssets();
  }, [token]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader 
        title={searchParams.get('search') ? `Search Results: "${searchParams.get('search')}"` : "Assets"}
        description="Manage and track your infrastructure assets."
      >
        <Button variant="primary" className="gap-2" onClick={() => navigate('/assets/new')}>
          <Plus size={16} />
          New Asset
        </Button>
      </PageHeader>

      <Card className="overflow-hidden">
        {isLoading ? (
          <LoadingState message="Loading assets..." />
        ) : assets.length === 0 ? (
          <EmptyState 
            icon={Package} 
            title="No assets found" 
            description="Get started by creating your first infrastructure asset."
            action={{ label: 'Add Asset', onClick: () => {} }}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-text-secondary">
              <thead className="bg-bg-secondary text-xs uppercase text-text-muted border-b border-border-primary">
                <tr>
                  <th className="px-6 py-4 font-medium">Asset Code</th>
                  <th className="px-6 py-4 font-medium">Name</th>
                  <th className="px-6 py-4 font-medium">Stage</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {assets.map((asset: any) => (
                  <tr key={asset._id} className="hover:bg-bg-hover transition-colors">
                    <td className="px-6 py-4 font-medium text-text-primary">{asset.assetCode}</td>
                    <td className="px-6 py-4">{asset.name}</td>
                    <td className="px-6 py-4 capitalize">{asset.lifecycleStage}</td>
                    <td className="px-6 py-4">
                      <Badge variant={asset.status as any}>{asset.status.toUpperCase()}</Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm" onClick={() => navigate(`/assets/${asset._id}`)}>View Passport</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
