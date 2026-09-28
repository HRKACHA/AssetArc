import { useState } from 'react';
import { PageHeader, Card, Badge, Button } from '../../components/common';
import { ClipboardCheck, Plus, Eye, Calendar } from 'lucide-react';

const mockInspections = [
  { id: 1, asset: 'Ahmedabad Transformer Substation 1', assetCode: 'AST-1001', date: '20 Sep 2026', inspector: 'Ravi Kumar', conditionBefore: 78, conditionAfter: 85, findings: 2, status: 'completed' },
  { id: 2, asset: 'Surat Water Pump Station 2', assetCode: 'AST-1002', date: '18 Sep 2026', inspector: 'Priya Shah', conditionBefore: 62, conditionAfter: 70, findings: 5, status: 'completed' },
  { id: 3, asset: 'Vadodara Expressway Sensor Array 3', assetCode: 'AST-1003', date: '25 Sep 2026', inspector: 'Amit Patel', conditionBefore: 45, conditionAfter: null, findings: 0, status: 'scheduled' },
  { id: 4, asset: 'Rajkot Backup Generator 4', assetCode: 'AST-1004', date: '28 Sep 2026', inspector: 'Sneha Joshi', conditionBefore: null, conditionAfter: null, findings: 0, status: 'scheduled' },
  { id: 5, asset: 'Bhavnagar Solar Panel Array 5', assetCode: 'AST-1005', date: '15 Sep 2026', inspector: 'Vikram Desai', conditionBefore: 88, conditionAfter: 92, findings: 1, status: 'completed' },
  { id: 6, asset: 'Jamnagar Bridge Structural Monitor 6', assetCode: 'AST-1006', date: '10 Sep 2026', inspector: 'Ravi Kumar', conditionBefore: 55, conditionAfter: 58, findings: 8, status: 'action_required' },
];

export function Inspections() {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? mockInspections : mockInspections.filter(i => i.status === filter);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader title="Inspections" description="Review findings, defects, and condition scores across your assets.">
        <Button variant="primary" className="gap-2" onClick={() => alert('New Inspection form will open here.')}><Plus size={16} /> New Inspection</Button>
      </PageHeader>

      <div className="flex gap-2 flex-wrap">
        {['all', 'completed', 'scheduled', 'action_required'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors cursor-pointer ${filter === f ? 'bg-primary text-white' : 'bg-bg-secondary text-text-secondary hover:bg-bg-hover'}`}
          >
            {f.replace('_', ' ')}
          </button>
        ))}
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-text-secondary">
            <thead className="bg-bg-secondary text-xs uppercase text-text-muted border-b border-border-primary">
              <tr>
                <th className="px-6 py-4 font-medium">Asset</th>
                <th className="px-6 py-4 font-medium">Inspector</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Condition</th>
                <th className="px-6 py-4 font-medium">Findings</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {filtered.map(insp => (
                <tr key={insp.id} className="hover:bg-bg-hover transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-text-primary">{insp.asset}</p>
                      <p className="text-xs text-text-muted">{insp.assetCode}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">{insp.inspector}</td>
                  <td className="px-6 py-4">{insp.date}</td>
                  <td className="px-6 py-4">
                    {insp.conditionBefore !== null ? (
                      <span className="text-text-primary">
                        {insp.conditionBefore} {insp.conditionAfter !== null && <span className="text-green-600">→ {insp.conditionAfter}</span>}
                      </span>
                    ) : (
                      <span className="text-text-muted">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {insp.findings > 0 ? (
                      <span className={`font-medium ${insp.findings > 5 ? 'text-red-600' : 'text-yellow-600'}`}>{insp.findings} issues</span>
                    ) : (
                      <span className="text-text-muted">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={(
                      insp.status === 'completed' ? 'operational' :
                      insp.status === 'action_required' ? 'critical' : 'attention'
                    ) as any}>
                      {insp.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm" onClick={() => alert(`Viewing inspection details for ${insp.asset}`)}><Eye size={14} className="mr-1" /> View</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
