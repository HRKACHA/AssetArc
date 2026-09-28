import { useAuth } from '../../contexts/AuthContext';
import { PageHeader, Card, Button } from '../../components/common';
import { User, Mail, Shield, Key, Camera } from 'lucide-react';

export function Profile() {
  const { user } = useAuth();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
      <PageHeader 
        title="User Profile" 
        description="Manage your personal information, security preferences, and roles."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 md:col-span-1 flex flex-col items-center text-center space-y-4">
          <div className="relative group cursor-pointer">
            <div className="h-24 w-24 rounded-full bg-primary-soft text-primary flex items-center justify-center border-4 border-white shadow-soft">
              <User size={48} />
            </div>
            <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <Camera className="text-white" />
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-text-primary">{user?.name}</h3>
            <p className="text-text-secondary">{user?.role?.replace('_', ' ') || 'Admin User'}</p>
          </div>
          
          <div className="w-full pt-4 border-t border-border-primary">
            <div className="flex justify-between items-center text-sm py-2">
              <span className="text-text-muted">Status</span>
              <span className="text-green-600 font-medium bg-green-100 px-2 py-1 rounded-full text-xs">Active</span>
            </div>
            <div className="flex justify-between items-center text-sm py-2">
              <span className="text-text-muted">Member Since</span>
              <span className="text-text-secondary font-medium">Sep 2026</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 md:col-span-2 space-y-6">
          <h3 className="text-lg font-bold border-b border-border-primary pb-3">Personal Information</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-text-secondary flex items-center gap-2">
                  <User size={16} className="text-text-muted"/> Full Name
                </label>
                <input 
                  type="text" 
                  defaultValue={user?.name} 
                  className="w-full border border-border-primary rounded-lg px-4 py-2 bg-bg-secondary focus:bg-bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-text-secondary flex items-center gap-2">
                  <Mail size={16} className="text-text-muted"/> Email Address
                </label>
                <input 
                  type="email" 
                  defaultValue={user?.email} 
                  className="w-full border border-border-primary rounded-lg px-4 py-2 bg-bg-secondary focus:bg-bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-text-secondary flex items-center gap-2">
                <Shield size={16} className="text-text-muted"/> Current Role
              </label>
              <input 
                type="text" 
                value={user?.role?.replace('_', ' ') || 'Admin User'} 
                disabled
                className="w-full border border-border-primary rounded-lg px-4 py-2 bg-bg-page text-text-muted cursor-not-allowed"
              />
              <p className="text-xs text-text-muted mt-1">Contact your system administrator to change your role permissions.</p>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-border-primary">
            <Button variant="outline">Cancel</Button>
            <Button variant="primary">Save Changes</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
