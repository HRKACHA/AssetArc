import { useState } from 'react';
import { PageHeader, Card, Button, Badge } from '../../components/common';
import { Wrench, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

export function Maintenance() {
  const [tasks] = useState([
    { id: 'WO-2023', asset: 'SG Highway Transformer Substation A', priority: 'high', status: 'open', date: 'Today, 14:00' },
    { id: 'WO-2024', asset: 'Surat Main Water Pump Station 4', priority: 'medium', status: 'in_progress', date: 'Tomorrow, 09:00' },
    { id: 'WO-2025', asset: 'Vadodara Expressway Sensor Array', priority: 'critical', status: 'open', date: 'Overdue' },
    { id: 'WO-2019', asset: 'Rajkot Backup Generator Sector 7G', priority: 'low', status: 'completed', date: 'Yesterday' }
  ]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader 
        title="Maintenance Schedule" 
        description="Track and manage preventative and corrective maintenance tasks."
      >
        <Button variant="primary" className="gap-2" onClick={() => alert('Create Work Order form will open here.')}>
          <Wrench size={16} />
          Create Work Order
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-3">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-text-secondary">
              <thead className="bg-bg-secondary text-xs uppercase text-text-muted border-b border-border-primary">
                <tr>
                  <th className="px-6 py-4 font-medium">Work Order</th>
                  <th className="px-6 py-4 font-medium">Asset</th>
                  <th className="px-6 py-4 font-medium">Priority</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Due Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {tasks.map((task) => (
                  <tr key={task.id} className="hover:bg-bg-hover transition-colors">
                    <td className="px-6 py-4 font-medium text-text-primary">{task.id}</td>
                    <td className="px-6 py-4">{task.asset}</td>
                    <td className="px-6 py-4">
                      <Badge variant={task.priority === 'critical' ? 'critical' : task.priority === 'high' ? 'attention' : 'neutral'}>
                        {task.priority.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 capitalize">{task.status.replace('_', ' ')}</td>
                    <td className="px-6 py-4 text-text-muted">{task.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-4 text-text-primary">Summary</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-text-secondary">
                  <AlertTriangle size={16} className="text-status-critical" />
                  <span>Open Issues</span>
                </div>
                <span className="font-bold">12</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-text-secondary">
                  <Clock size={16} className="text-status-attention" />
                  <span>In Progress</span>
                </div>
                <span className="font-bold">5</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-text-secondary">
                  <CheckCircle size={16} className="text-status-operational" />
                  <span>Completed (7d)</span>
                </div>
                <span className="font-bold">28</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
