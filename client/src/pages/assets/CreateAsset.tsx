import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { PageHeader, Card, Button } from '../../components/common';
import { ArrowLeft, Save } from 'lucide-react';

export function CreateAsset() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    assetCode: '',
    name: '',
    lifecycleStage: 'active',
    status: 'operational',
    lat: '',
    lng: '',
    expectedServiceLife: '',
    riskLevel: 'low',
    criticality: 'medium',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const payload: any = {
        assetCode: form.assetCode,
        name: form.name,
        lifecycleStage: form.lifecycleStage,
        status: form.status,
        riskLevel: form.riskLevel,
        criticality: form.criticality,
        expectedServiceLife: form.expectedServiceLife ? parseInt(form.expectedServiceLife) : undefined,
      };

      if (form.lat && form.lng) {
        payload.location = {
          type: 'Point',
          coordinates: [parseFloat(form.lng), parseFloat(form.lat)],
        };
      }

      await axios.post('http://localhost:5000/api/assets', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      navigate('/assets');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create asset');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass = "w-full border border-border-primary rounded-lg px-4 py-2.5 bg-bg-secondary text-text-primary focus:bg-bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm";
  const labelClass = "text-sm font-medium text-text-secondary mb-1 block";

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-bg-hover text-text-secondary transition-colors cursor-pointer">
          <ArrowLeft size={20} />
        </button>
        <PageHeader title="Add New Asset" description="Register a new infrastructure asset in the system." />
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Asset Code *</label>
              <input name="assetCode" value={form.assetCode} onChange={handleChange} required placeholder="AST-2001" className={fieldClass} />
            </div>
            <div>
              <label className={labelClass}>Asset Name *</label>
              <input name="name" value={form.name} onChange={handleChange} required placeholder="Ahmedabad Solar Panel Array" className={fieldClass} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Lifecycle Stage</label>
              <select name="lifecycleStage" value={form.lifecycleStage} onChange={handleChange} className={fieldClass}>
                <option value="planning">Planning</option>
                <option value="procurement">Procurement</option>
                <option value="commissioning">Commissioning</option>
                <option value="active">Active</option>
                <option value="maintenance">Maintenance</option>
                <option value="retired">Retired</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select name="status" value={form.status} onChange={handleChange} className={fieldClass}>
                <option value="operational">Operational</option>
                <option value="attention">Needs Attention</option>
                <option value="critical">Critical</option>
                <option value="offline">Offline</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Latitude</label>
              <input name="lat" type="number" step="any" value={form.lat} onChange={handleChange} placeholder="23.0225" className={fieldClass} />
            </div>
            <div>
              <label className={labelClass}>Longitude</label>
              <input name="lng" type="number" step="any" value={form.lng} onChange={handleChange} placeholder="72.5714" className={fieldClass} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Expected Service Life (years)</label>
              <input name="expectedServiceLife" type="number" value={form.expectedServiceLife} onChange={handleChange} placeholder="25" className={fieldClass} />
            </div>
            <div>
              <label className={labelClass}>Risk Level</label>
              <select name="riskLevel" value={form.riskLevel} onChange={handleChange} className={fieldClass}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Criticality</label>
              <select name="criticality" value={form.criticality} onChange={handleChange} className={fieldClass}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="essential">Essential</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border-primary">
            <Button variant="outline" type="button" onClick={() => navigate(-1)}>Cancel</Button>
            <Button variant="primary" type="submit" isLoading={isSubmitting} className="gap-2"><Save size={16} /> Create Asset</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
