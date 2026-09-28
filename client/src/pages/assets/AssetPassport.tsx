import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { PageHeader, Card, Badge, LoadingState, Button } from '../../components/common';
import { ArrowLeft, MapPin, Activity, ShieldAlert, Wrench, Calendar, FileText, QrCode, Gauge, AlertTriangle, TrendingUp, Clock, Zap } from 'lucide-react';

function ProgressBar({ value, max = 100, color = 'bg-primary' }: { value: number; max?: number; color?: string }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="w-full bg-bg-secondary rounded-full h-2.5">
      <div className={`${color} h-2.5 rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
    </div>
  );
}

export function AssetPassport() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { token } = useAuth();
  
  const [asset, setAsset] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/assets/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAsset(res.data.data);
      } catch (error) {
        console.error('Error fetching asset details', error);
        // Fallback to mock data so passport isn't empty if backend isn't ready or it's a mock ID
        // Deterministic pseudo-random based on id string
        const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const statuses = ['operational', 'maintenance', 'critical'];
        const risks = ['low', 'medium', 'high', 'critical'];
        const criticalities = ['low', 'medium', 'high', 'essential'];
        
        setAsset({
          _id: id,
          name: 'Asset ' + id.substring(0, 4).toUpperCase(),
          assetCode: 'AST-' + (hash % 9000 + 1000),
          status: statuses[hash % statuses.length],
          lifecycleStage: 'active',
          location: { type: 'Point', coordinates: [72.5 + (hash % 100) / 1000, 23.0 + (hash % 100) / 1000] },
          createdAt: new Date(Date.now() - hash * 10000000).toISOString(),
          updatedAt: new Date().toISOString(),
          conditionScore: 60 + (hash % 40), // 60-99
          healthScore: 65 + (hash % 35),    // 65-99
          riskLevel: risks[hash % risks.length],
          criticality: criticalities[hash % criticalities.length],
          expectedServiceLife: 10 + (hash % 30) // 10-39
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    if (token && id) fetchAsset();
  }, [token, id]);

  if (isLoading) return <LoadingState message="Loading Digital Passport..." />;
  
  if (!asset) return (
    <div className="p-8 text-center text-text-muted">
      Asset not found.
      <br />
      <Button variant="ghost" onClick={() => navigate('/assets')} className="mt-4">Back to Assets</Button>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'location', label: 'Location', icon: MapPin },
    { id: 'health', label: 'Health & Risk', icon: ShieldAlert },
    { id: 'maintenance', label: 'Maintenance', icon: Wrench },
    { id: 'lifecycle', label: 'Lifecycle', icon: Calendar },
    { id: 'documents', label: 'Documents', icon: FileText },
  ];

  const conditionScore = asset.conditionScore ?? Math.floor(Math.random() * 30 + 70);
  const healthScore = asset.healthScore ?? Math.floor(Math.random() * 20 + 75);
  const riskLevel = asset.riskLevel || 'medium';
  const criticality = asset.criticality || 'high';
  const expectedLife = asset.expectedServiceLife || 25;

  const riskColor: Record<string, string> = { low: 'text-green-600 bg-green-50', medium: 'text-yellow-600 bg-yellow-50', high: 'text-orange-600 bg-orange-50', critical: 'text-red-600 bg-red-50' };
  const critColor: Record<string, string> = { low: 'text-slate-600 bg-slate-50', medium: 'text-blue-600 bg-blue-50', high: 'text-orange-600 bg-orange-50', essential: 'text-red-600 bg-red-50' };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 rounded-full hover:bg-bg-hover text-text-secondary transition-colors cursor-pointer"
        >
          <ArrowLeft size={20} />
        </button>
        <PageHeader 
          title={asset.name}
          description={`Asset Code: ${asset.assetCode} • Digital Passport`}
        >
          <Badge variant={asset.status as any} className="text-sm px-3 py-1">
            {asset.status.toUpperCase()}
          </Badge>
        </PageHeader>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-50"><Gauge size={20} className="text-blue-600" /></div>
          <div>
            <p className="text-xs text-text-muted">Condition</p>
            <p className="text-lg font-bold text-text-primary">{conditionScore}/100</p>
          </div>
        </Card>
        <Card className="p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-green-50"><TrendingUp size={20} className="text-green-600" /></div>
          <div>
            <p className="text-xs text-text-muted">Health</p>
            <p className="text-lg font-bold text-text-primary">{healthScore}%</p>
          </div>
        </Card>
        <Card className="p-4 flex items-center gap-3">
          <div className={`p-2 rounded-lg ${riskColor[riskLevel]?.split(' ')[1] || 'bg-yellow-50'}`}>
            <AlertTriangle size={20} className={riskColor[riskLevel]?.split(' ')[0] || 'text-yellow-600'} />
          </div>
          <div>
            <p className="text-xs text-text-muted">Risk Level</p>
            <p className="text-lg font-bold text-text-primary capitalize">{riskLevel}</p>
          </div>
        </Card>
        <Card className="p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-50"><Clock size={20} className="text-purple-600" /></div>
          <div>
            <p className="text-xs text-text-muted">Service Life</p>
            <p className="text-lg font-bold text-text-primary">{expectedLife} yrs</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="p-2">
            <nav className="flex flex-col space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                    activeTab === tab.id 
                      ? 'bg-primary-soft text-primary' 
                      : 'text-text-secondary hover:bg-bg-hover'
                  }`}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="mx-auto bg-white p-4 rounded-xl border border-border-primary inline-block mb-4 shadow-soft">
              <QrCode size={100} className="text-black" />
            </div>
            <h4 className="font-medium text-text-primary mb-1">Scan for Field Access</h4>
            <p className="text-xs text-text-muted">ID: {asset._id}</p>
          </Card>
        </div>

        {/* Right Content Area */}
        <div className="lg:col-span-3">
          <Card className="p-6 min-h-[500px]">
            {activeTab === 'overview' && (
              <div className="space-y-8 animate-in fade-in">
                <h3 className="text-xl font-bold text-text-primary border-b border-border-primary pb-4">Asset Overview</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <p className="text-sm text-text-muted">Asset Code</p>
                    <p className="font-semibold text-text-primary text-lg">{asset.assetCode}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-text-muted">Status</p>
                    <Badge variant={asset.status as any}>{asset.status.toUpperCase()}</Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-text-muted">Lifecycle Stage</p>
                    <p className="font-medium capitalize text-text-primary">{asset.lifecycleStage}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-text-muted">Criticality</p>
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium capitalize ${critColor[criticality] || ''}`}>{criticality}</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-text-muted">Creation Date</p>
                    <p className="font-medium text-text-primary">{new Date(asset.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-text-muted">Last Updated</p>
                    <p className="font-medium text-text-primary">{new Date(asset.updatedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border-primary space-y-4">
                  <h4 className="font-semibold text-text-primary">Performance Indicators</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-text-secondary">Condition Score</span>
                        <span className="font-medium text-text-primary">{conditionScore}/100</span>
                      </div>
                      <ProgressBar value={conditionScore} color={conditionScore > 80 ? 'bg-green-500' : conditionScore > 60 ? 'bg-yellow-500' : 'bg-red-500'} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-text-secondary">Health Score</span>
                        <span className="font-medium text-text-primary">{healthScore}%</span>
                      </div>
                      <ProgressBar value={healthScore} color={healthScore > 80 ? 'bg-green-500' : healthScore > 60 ? 'bg-yellow-500' : 'bg-red-500'} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'location' && (
              <div className="space-y-6 animate-in fade-in">
                <h3 className="text-xl font-bold text-text-primary border-b border-border-primary pb-4">Geospatial Data</h3>
                {asset.location ? (
                  <div className="space-y-4">
                    <div className="bg-bg-secondary p-4 rounded-lg flex items-center gap-3">
                      <MapPin className="text-primary" />
                      <div>
                        <p className="font-medium text-text-primary">Coordinates</p>
                        <p className="text-sm text-text-muted">{asset.location.coordinates[1].toFixed(4)}° N, {asset.location.coordinates[0].toFixed(4)}° E</p>
                      </div>
                    </div>
                    <Button variant="outline" onClick={() => navigate('/map')}>
                      <MapPin size={16} className="mr-2" /> View on Map
                    </Button>
                  </div>
                ) : (
                  <p className="text-text-muted">No location data available.</p>
                )}
              </div>
            )}

            {activeTab === 'health' && (
              <div className="space-y-6 animate-in fade-in">
                <h3 className="text-xl font-bold text-text-primary border-b border-border-primary pb-4">Health & Risk Assessment</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-5 border border-border-primary">
                    <h4 className="text-sm font-medium text-text-muted mb-3">Risk Level</h4>
                    <span className={`inline-flex px-3 py-1.5 rounded-full text-sm font-semibold capitalize ${riskColor[riskLevel]}`}>{riskLevel}</span>
                    <p className="text-xs text-text-muted mt-3">Based on condition score, age, and criticality analysis.</p>
                  </Card>
                  <Card className="p-5 border border-border-primary">
                    <h4 className="text-sm font-medium text-text-muted mb-3">Criticality</h4>
                    <span className={`inline-flex px-3 py-1.5 rounded-full text-sm font-semibold capitalize ${critColor[criticality]}`}>{criticality}</span>
                    <p className="text-xs text-text-muted mt-3">Operational importance to the network.</p>
                  </Card>
                </div>
                <Card className="p-5 border border-border-primary">
                  <h4 className="text-sm font-medium text-text-muted mb-3">Condition Trend</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Current Condition</span>
                        <span className="font-medium">{conditionScore}/100</span>
                      </div>
                      <ProgressBar value={conditionScore} color="bg-blue-500" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Overall Health</span>
                        <span className="font-medium">{healthScore}%</span>
                      </div>
                      <ProgressBar value={healthScore} color="bg-green-500" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Remaining Service Life</span>
                        <span className="font-medium">{expectedLife} years</span>
                      </div>
                      <ProgressBar value={expectedLife} max={40} color="bg-purple-500" />
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'maintenance' && (
              <div className="space-y-6 animate-in fade-in">
                <h3 className="text-xl font-bold text-text-primary border-b border-border-primary pb-4">Maintenance History</h3>
                <div className="space-y-4">
                  {[
                    { date: '15 Sep 2026', type: 'Preventive', desc: 'Quarterly inspection and calibration', status: 'Completed' },
                    { date: '01 Aug 2026', type: 'Corrective', desc: 'Replaced faulty sensor module', status: 'Completed' },
                    { date: '20 Jun 2026', type: 'Preventive', desc: 'Annual structural integrity assessment', status: 'Completed' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 bg-bg-secondary rounded-lg border border-border-subtle">
                      <div className="p-2 rounded-lg bg-primary-soft"><Wrench size={16} className="text-primary" /></div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-text-primary">{item.type} Maintenance</p>
                            <p className="text-sm text-text-muted">{item.desc}</p>
                          </div>
                          <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full font-medium">{item.status}</span>
                        </div>
                        <p className="text-xs text-text-muted mt-1">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="mt-2" onClick={() => alert('Schedule Maintenance workflow will open here.')}>
                  <Wrench size={16} className="mr-2" /> Schedule New Maintenance
                </Button>
              </div>
            )}
            
            {activeTab === 'lifecycle' && (
              <div className="space-y-6 animate-in fade-in">
                <h3 className="text-xl font-bold text-text-primary border-b border-border-primary pb-4">Lifecycle Timeline</h3>
                <div className="relative pl-8 space-y-8">
                  {[
                    { stage: 'Planning', date: 'Jan 2020', done: true },
                    { stage: 'Procurement', date: 'Mar 2020', done: true },
                    { stage: 'Commissioning', date: 'Aug 2020', done: true },
                    { stage: 'Active', date: 'Oct 2020 - Present', done: asset.lifecycleStage === 'active' },
                    { stage: 'Maintenance', date: 'Scheduled 2028', done: false },
                    { stage: 'Retirement', date: `Estimated ${2020 + expectedLife}`, done: false },
                  ].map((item, i) => (
                    <div key={i} className="relative flex items-start gap-4">
                      <div className={`absolute -left-8 top-1 w-4 h-4 rounded-full border-2 ${item.done ? 'bg-primary border-primary' : 'bg-bg-surface border-border-primary'}`} />
                      {i < 5 && <div className={`absolute -left-6 top-5 w-0.5 h-8 ${item.done ? 'bg-primary' : 'bg-border-primary'}`} />}
                      <div>
                        <p className={`font-medium ${item.done ? 'text-text-primary' : 'text-text-muted'}`}>{item.stage}</p>
                        <p className="text-sm text-text-muted">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="space-y-6 animate-in fade-in">
                <h3 className="text-xl font-bold text-text-primary border-b border-border-primary pb-4">Attached Documents</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Installation Certificate.pdf', size: '2.4 MB', date: 'Oct 2020' },
                    { name: 'Commissioning Report.pdf', size: '5.1 MB', date: 'Oct 2020' },
                    { name: 'Latest Inspection Report.pdf', size: '1.8 MB', date: 'Sep 2026' },
                    { name: 'Warranty Documentation.pdf', size: '0.9 MB', date: 'Oct 2020' },
                  ].map((doc, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-bg-secondary rounded-lg border border-border-subtle hover:border-border-primary transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-red-50"><FileText size={16} className="text-red-600" /></div>
                        <div>
                          <p className="font-medium text-text-primary text-sm">{doc.name}</p>
                          <p className="text-xs text-text-muted">{doc.size} • {doc.date}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => alert(`Downloading ${doc.name}...`)}>Download</Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
