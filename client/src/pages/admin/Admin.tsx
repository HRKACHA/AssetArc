import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { PageHeader, Card, Badge, Button } from '../../components/common';
import { ShieldCheck, Users, Plus, Edit, Trash2, Search } from 'lucide-react';

const roleDescriptions: Record<string, string> = {
  ADMIN: 'Full system access including user management and configuration',
  ASSET_MANAGER: 'Dashboard, Assets, Map, Lifecycle, Analytics, Renewal',
  PROJECT_MANAGER: 'Dashboard, Projects, Project Assets, Handover',
  INSPECTOR: 'Assets, Map, Inspections',
  MAINTENANCE_OFFICER: 'Assets, Maintenance, Work Orders',
  CONTRACTOR: 'Assigned Projects, Assets, Work Orders',
  DECISION_MAKER: 'Dashboard, Assets, Map, Lifecycle, Analytics, Renewal',
};

export function Admin() {
  const { token } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch users from seed data via assets endpoint workaround (since we don't have a users endpoint yet)
    // In production this would be GET /api/admin/users
    const mockUsers = [
      { _id: '1', name: 'ADMIN User', email: 'admin@assetarc.gov', role: 'ADMIN', status: 'active' },
      { _id: '2', name: 'ASSET MANAGER User', email: 'asset_manager@assetarc.gov', role: 'ASSET_MANAGER', status: 'active' },
      { _id: '3', name: 'PROJECT MANAGER User', email: 'project_manager@assetarc.gov', role: 'PROJECT_MANAGER', status: 'active' },
      { _id: '4', name: 'INSPECTOR User', email: 'inspector@assetarc.gov', role: 'INSPECTOR', status: 'active' },
      { _id: '5', name: 'MAINTENANCE OFFICER User', email: 'maintenance_officer@assetarc.gov', role: 'MAINTENANCE_OFFICER', status: 'active' },
      { _id: '6', name: 'CONTRACTOR User', email: 'contractor@assetarc.gov', role: 'CONTRACTOR', status: 'active' },
      { _id: '7', name: 'DECISION MAKER User', email: 'decision_maker@assetarc.gov', role: 'DECISION_MAKER', status: 'active' },
    ];
    setUsers(mockUsers);
    setIsLoading(false);
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader title="Administration" description="Manage users, roles, departments, and system settings.">
        <Button variant="primary" className="gap-2" onClick={() => alert('Add User form will open here.')}><Plus size={16} /> Add User</Button>
      </PageHeader>

      {/* Role Permissions Reference */}
      <Card className="p-6">
        <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2"><ShieldCheck size={18} className="text-primary" /> Role-Based Access Control</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Object.entries(roleDescriptions).map(([role, desc]) => (
            <div key={role} className="p-4 rounded-lg border border-border-primary bg-bg-secondary hover:bg-bg-hover transition-colors">
              <h4 className="font-medium text-text-primary text-sm capitalize mb-1">{role.replace(/_/g, ' ')}</h4>
              <p className="text-xs text-text-muted">{desc}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Users Table */}
      <Card className="overflow-hidden">
        <div className="p-4 border-b border-border-primary flex items-center justify-between">
          <h3 className="font-semibold text-text-primary flex items-center gap-2"><Users size={18} /> System Users ({users.length})</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-text-secondary">
            <thead className="bg-bg-secondary text-xs uppercase text-text-muted border-b border-border-primary">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {users.map(u => (
                <tr key={u._id} className="hover:bg-bg-hover transition-colors">
                  <td className="px-6 py-4 font-medium text-text-primary">{u.name}</td>
                  <td className="px-6 py-4">{u.email}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium bg-primary-soft text-primary px-2.5 py-1 rounded-full capitalize">{u.role.replace(/_/g, ' ')}</span>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="operational">ACTIVE</Badge>
                  </td>
                  <td className="px-6 py-4 text-right space-x-1">
                    <Button variant="ghost" size="sm" onClick={() => alert('Edit User form will open here.')}><Edit size={14} /></Button>
                    <Button variant="ghost" size="sm" onClick={() => alert('User deletion confirmation.')}><Trash2 size={14} className="text-red-500" /></Button>
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
