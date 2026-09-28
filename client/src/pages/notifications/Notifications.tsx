import { useState } from 'react';
import { PageHeader, Card, Badge, Button } from '../../components/common';
import { Bell, Check, AlertTriangle, Info, Settings, Trash2 } from 'lucide-react';

const mockNotifications = [
  { id: 1, type: 'critical', title: 'Critical Asset Alert', message: 'Vadodara Expressway Sensor Array 3 condition score dropped below 50. Immediate inspection recommended.', time: '2 hours ago', read: false },
  { id: 2, type: 'warning', title: 'Maintenance Overdue', message: 'Scheduled maintenance for Surat Water Pump Station 2 is 5 days overdue.', time: '5 hours ago', read: false },
  { id: 3, type: 'info', title: 'Inspection Completed', message: 'Bhavnagar Solar Panel Array 5 inspection completed by Vikram Desai. Condition improved to 92.', time: '1 day ago', read: false },
  { id: 4, type: 'info', title: 'Project Milestone', message: 'Ahmedabad Ring Road Expansion Phase II reached 72% completion.', time: '2 days ago', read: true },
  { id: 5, type: 'warning', title: 'Renewal Due Soon', message: '2 assets are due for renewal assessment in Q1 2027. Review the lifecycle forecast.', time: '3 days ago', read: true },
  { id: 6, type: 'info', title: 'New User Added', message: 'INSPECTOR user account created for field operations team.', time: '5 days ago', read: true },
  { id: 7, type: 'critical', title: 'Work Order Escalated', message: 'Work order WO-1003 for Jamnagar Bridge Structural Monitor has been escalated to critical priority.', time: '1 week ago', read: true },
];

export function Notifications() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? notifications : filter === 'unread' ? notifications.filter(n => !n.read) : notifications.filter(n => n.type === filter);

  const markAllRead = () => setNotifications(notifications.map(n => ({ ...n, read: true })));
  const unreadCount = notifications.filter(n => !n.read).length;

  const typeIcon: Record<string, any> = {
    critical: <AlertTriangle size={16} className="text-red-600" />,
    warning: <AlertTriangle size={16} className="text-yellow-600" />,
    info: <Info size={16} className="text-blue-600" />,
  };
  const typeBg: Record<string, string> = {
    critical: 'bg-red-50',
    warning: 'bg-yellow-50',
    info: 'bg-blue-50',
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader title="Notifications" description={`You have ${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}.`}>
        <Button variant="outline" onClick={markAllRead} className="gap-2"><Check size={16} /> Mark All Read</Button>
      </PageHeader>

      <div className="flex gap-2 flex-wrap">
        {['all', 'unread', 'critical', 'warning', 'info'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors cursor-pointer ${filter === f ? 'bg-primary text-white' : 'bg-bg-secondary text-text-secondary hover:bg-bg-hover'}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(n => (
          <Card
            key={n.id}
            className={`p-4 flex items-start gap-4 transition-all hover:shadow-md ${!n.read ? 'border-l-4 border-l-primary' : ''}`}
          >
            <div className={`p-2 rounded-lg ${typeBg[n.type]}`}>{typeIcon[n.type]}</div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className={`font-medium ${!n.read ? 'text-text-primary' : 'text-text-secondary'}`}>{n.title}</h4>
                  <p className="text-sm text-text-muted mt-1">{n.message}</p>
                </div>
                {!n.read && <span className="h-2.5 w-2.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />}
              </div>
              <p className="text-xs text-text-muted mt-2">{n.time}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
