import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Map as MapIcon, 
  Package, 
  Wrench, 
  BarChart3, 
  Settings, 
  LogOut,
  Moon,
  Sun,
  FolderKanban,
  ClipboardCheck,
  RotateCcw,
  Bell,
  Bot,
  User,
  ShieldCheck
} from 'lucide-react';
import { cn } from '../common/Button';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';

const roleAccess: Record<string, string[]> = {
  ADMIN: ['/dashboard', '/assets', '/map', '/projects', '/inspections', '/maintenance', '/lifecycle', '/analytics', '/notifications', '/infra-ai'],
  ASSET_MANAGER: ['/dashboard', '/assets', '/map', '/lifecycle', '/analytics'],
  PROJECT_MANAGER: ['/dashboard', '/projects', '/assets'],
  INSPECTOR: ['/assets', '/map', '/inspections'],
  MAINTENANCE_OFFICER: ['/assets', '/maintenance'],
  CONTRACTOR: ['/projects', '/assets', '/maintenance'],
  DECISION_MAKER: ['/dashboard', '/assets', '/map', '/lifecycle', '/analytics']
};

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Assets', icon: Package, path: '/assets' },
    { label: 'Map View', icon: MapIcon, path: '/map' },
    { label: 'Projects', icon: FolderKanban, path: '/projects' },
    { label: 'Inspections', icon: ClipboardCheck, path: '/inspections' },
    { label: 'Maintenance', icon: Wrench, path: '/maintenance' },
    { label: 'Lifecycle', icon: RotateCcw, path: '/lifecycle' },
    { label: 'Analytics', icon: BarChart3, path: '/analytics' },
    { label: 'Notifications', icon: Bell, path: '/notifications' },
  ];

  return (
    <nav className="flex h-full w-64 flex-col border-r border-border-primary bg-bg-surface transition-colors">
      <div className="flex h-16 items-center px-6 border-b border-border-primary">
        <Link to="/dashboard" className="flex items-center">
          <img src="/logo.png" alt="AssetArc Logo" className="h-10 object-contain w-auto" />
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4">
        <ul className="space-y-1">
          {navItems
            .filter(item => {
              const allowed = roleAccess[user?.role || 'ADMIN'] || [];
              return allowed.includes(item.path);
            })
            .map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-bg-selected text-primary" 
                      : "text-text-secondary hover:bg-bg-hover hover:text-text-primary"
                  )}
                >
                  <item.icon size={18} className={isActive ? "text-primary" : "text-text-muted"} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="border-t border-border-primary p-4 space-y-1">
        {(!user?.role || user.role === 'ADMIN') && (
          <Link
            to="/admin"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-bg-hover hover:text-text-primary"
          >
            <ShieldCheck size={18} className="text-text-muted" />
            Administration
          </Link>
        )}
        <Link
          to="/settings"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-bg-hover hover:text-text-primary"
        >
          <Settings size={18} className="text-text-muted" />
          Settings
        </Link>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-status-critical transition-colors hover:bg-status-critical/10 cursor-pointer"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </nav>
  );
}
