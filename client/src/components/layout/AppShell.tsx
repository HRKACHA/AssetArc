import { ReactNode, useState } from 'react';
import { Navigation } from './Navigation';
import { Bell, Search, User, Moon, Sun } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/assets?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="flex h-screen w-full bg-bg-page text-text-primary overflow-hidden">
      <Navigation />
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b border-border-primary bg-bg-surface px-8 z-10 shadow-sm">
          <div className="flex items-center w-96 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search assets, locations, maintenance tasks..." 
              className="h-9 w-full rounded-full border border-border-primary bg-bg-secondary pl-10 pr-4 text-sm text-text-primary transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-text-muted"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="relative flex h-9 w-9 items-center justify-center rounded-full hover:bg-bg-hover text-text-secondary transition-colors cursor-pointer"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            
            <button className="relative flex h-9 w-9 items-center justify-center rounded-full hover:bg-bg-hover text-text-secondary transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-status-critical border border-bg-surface"></span>
            </button>
            
            <div className="h-8 w-px bg-border-primary mx-1"></div>
            
            <Link to="/profile" className="flex items-center gap-2 rounded-full hover:bg-bg-hover p-1 pr-3 transition-colors cursor-pointer">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-soft text-primary">
                <User size={18} />
              </div>
              <span className="text-sm font-medium">{user?.name || 'Admin User'}</span>
            </Link>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-8 relative">
          <div className="max-w-7xl mx-auto h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
