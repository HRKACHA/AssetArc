import { useState } from 'react';
import { PageHeader, Card, Badge, Button } from '../../components/common';
import { RotateCcw, TrendingUp, AlertTriangle, Clock, ArrowRight } from 'lucide-react';

function ProgressBar({ value, max = 100, color = 'bg-primary' }: { value: number; max?: number; color?: string }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="w-full bg-bg-secondary rounded-full h-2">
      <div className={`${color} h-2 rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
    </div>
  );
}

const lifecycleStages = [
  { stage: 'Planning', count: 3, color: 'bg-slate-500' },
  { stage: 'Procurement', count: 2, color: 'bg-blue-500' },
  { stage: 'Commissioning', count: 4, color: 'bg-indigo-500' },
  { stage: 'Active', count: 8, color: 'bg-green-500' },
  { stage: 'Maintenance', count: 2, color: 'bg-yellow-500' },
  { stage: 'Retired', count: 1, color: 'bg-red-500' },
];

const renewalForecast = [
  { year: 2027, count: 2, cost: '₹8.4 Cr' },
  { year: 2028, count: 3, cost: '₹14.2 Cr' },
  { year: 2029, count: 1, cost: '₹5.7 Cr' },
  { year: 2030, count: 4, cost: '₹22.1 Cr' },
  { year: 2031, count: 2, cost: '₹11.3 Cr' },
];

export function Lifecycle() {
  const [activeView, setActiveView] = useState<'distribution' | 'renewal' | 'cost'>('distribution');

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader title="Lifecycle Management" description="Track asset progression from procurement to retirement." />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-50"><TrendingUp size={20} className="text-green-600" /></div>
            <div>
              <p className="text-xs text-text-muted">Avg. Remaining Life</p>
              <p className="text-xl font-bold text-text-primary">18.5 yrs</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-yellow-50"><Clock size={20} className="text-yellow-600" /></div>
            <div>
              <p className="text-xs text-text-muted">Due for Renewal</p>
              <p className="text-xl font-bold text-text-primary">5 assets</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-50"><AlertTriangle size={20} className="text-red-600" /></div>
            <div>
              <p className="text-xs text-text-muted">End of Life (EOL)</p>
              <p className="text-xl font-bold text-text-primary">1 asset</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-50"><RotateCcw size={20} className="text-blue-600" /></div>
            <div>
              <p className="text-xs text-text-muted">Total Lifecycle Cost</p>
              <p className="text-xl font-bold text-text-primary">₹61.7 Cr</p>
            </div>
          </div>
        </Card>
      </div>

      {/* View Toggle */}
      <div className="flex gap-2">
        {[
          { id: 'distribution', label: 'Stage Distribution' },
          { id: 'renewal', label: 'Renewal Forecast' },
          { id: 'cost', label: 'Lifecycle Cost' },
        ].map(v => (
          <button
            key={v.id}
            onClick={() => setActiveView(v.id as any)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${activeView === v.id ? 'bg-primary text-white' : 'bg-bg-secondary text-text-secondary hover:bg-bg-hover'}`}
          >
            {v.label}
          </button>
        ))}
      </div>

      {/* Distribution View */}
      {activeView === 'distribution' && (
        <Card className="p-6">
          <h3 className="font-semibold text-text-primary mb-6">Asset Lifecycle Distribution</h3>
          <div className="space-y-4">
            {lifecycleStages.map(s => (
              <div key={s.stage} className="flex items-center gap-4">
                <span className="w-28 text-sm text-text-secondary">{s.stage}</span>
                <div className="flex-1">
                  <ProgressBar value={s.count} max={10} color={s.color} />
                </div>
                <span className="w-16 text-right text-sm font-medium text-text-primary">{s.count} assets</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Renewal Forecast View */}
      {activeView === 'renewal' && (
        <Card className="p-6">
          <h3 className="font-semibold text-text-primary mb-6">Renewal Forecast (Next 5 Years)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border-primary">
                <tr>
                  <th className="py-3 text-text-muted font-medium">Year</th>
                  <th className="py-3 text-text-muted font-medium">Assets Due</th>
                  <th className="py-3 text-text-muted font-medium">Estimated Cost</th>
                  <th className="py-3 text-text-muted font-medium">Priority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {renewalForecast.map(r => (
                  <tr key={r.year} className="hover:bg-bg-hover transition-colors">
                    <td className="py-4 font-medium text-text-primary">{r.year}</td>
                    <td className="py-4 text-text-secondary">{r.count} assets</td>
                    <td className="py-4 font-medium text-text-primary">{r.cost}</td>
                    <td className="py-4">
                      <Badge variant={r.count >= 4 ? 'critical' : r.count >= 2 ? 'attention' : 'operational' as any}>
                        {r.count >= 4 ? 'HIGH' : r.count >= 2 ? 'MEDIUM' : 'LOW'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Cost View */}
      {activeView === 'cost' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="font-semibold text-text-primary mb-4">Cost Breakdown by Category</h3>
            <div className="space-y-4">
              {[
                { cat: 'Acquisition', cost: '₹28.4 Cr', pct: 46 },
                { cat: 'Maintenance', cost: '₹15.2 Cr', pct: 25 },
                { cat: 'Operations', cost: '₹12.8 Cr', pct: 21 },
                { cat: 'Disposal', cost: '₹5.3 Cr', pct: 8 },
              ].map(c => (
                <div key={c.cat}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-text-secondary">{c.cat}</span>
                    <span className="font-medium text-text-primary">{c.cost} ({c.pct}%)</span>
                  </div>
                  <ProgressBar value={c.pct} color="bg-blue-500" />
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold text-text-primary mb-4">Total Cost of Ownership</h3>
            <div className="text-center py-8">
              <p className="text-4xl font-bold text-primary mb-2">₹61.7 Cr</p>
              <p className="text-text-muted">Total lifecycle cost across 20 assets</p>
              <p className="text-sm text-text-secondary mt-4">Average ₹3.08 Cr per asset</p>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
