import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common';
import { ShieldAlert, TrendingUp, Zap, Clock } from 'lucide-react';

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg-page flex flex-col font-sans">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 bg-bg-surface border-b border-border-primary shadow-sm z-10 relative">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="AssetArc" className="h-14 object-contain" />
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/login')}>Sign In</Button>
          <Button variant="primary" onClick={() => navigate('/login')}>Get Started</Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col lg:flex-row items-center w-full max-w-7xl mx-auto px-8 py-16 gap-12">
        {/* Left Content */}
        <div className="flex-1 space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary-soft text-primary font-medium text-sm">
            Government Infrastructure Management
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-text-primary leading-tight">
            The Future of <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">Smart Asset Lifecycle</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-xl">
            AssetArc provides AI-driven predictive maintenance, real-time health monitoring, and geospatial tracking for mission-critical civic infrastructure.
          </p>
          <div className="flex items-center gap-4 pt-4">
            <Button variant="primary" size="lg" className="px-8 text-lg" onClick={() => navigate('/login')}>
              Enter Dashboard
            </Button>
            <Button variant="outline" size="lg" className="px-8 text-lg" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
              Learn More
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-12 border-t border-border-primary">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><TrendingUp /></div>
              <div>
                <p className="font-bold text-xl text-text-primary">99.9%</p>
                <p className="text-sm text-text-muted">Uptime Assured</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-50 text-green-600 rounded-xl"><ShieldAlert /></div>
              <div>
                <p className="font-bold text-xl text-text-primary">AI Driven</p>
                <p className="text-sm text-text-muted">Risk Mitigation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 relative animate-in fade-in slide-in-from-right-8 duration-1000">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-purple-500/20 rounded-[2rem] blur-3xl transform -rotate-3 scale-105"></div>
          <img 
            src="/hero.jpg" 
            alt="Smart Infrastructure" 
            className="relative rounded-[2rem] shadow-2xl border border-border-primary object-cover w-full h-[600px] hover:scale-[1.02] transition-transform duration-500"
          />
          
          {/* Floating UI Elements */}
          <div className="absolute top-10 -left-10 bg-bg-surface/90 backdrop-blur p-4 rounded-xl shadow-xl border border-border-subtle animate-bounce" style={{animationDuration: '3s'}}>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 text-green-600 rounded-lg"><Zap size={20} /></div>
              <div>
                <p className="text-sm font-bold text-text-primary">Grid Optimal</p>
                <p className="text-xs text-text-muted">100% Efficiency</p>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-20 -right-8 bg-bg-surface/90 backdrop-blur p-4 rounded-xl shadow-xl border border-border-subtle animate-bounce" style={{animationDuration: '4s'}}>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 text-purple-600 rounded-lg"><Clock size={20} /></div>
              <div>
                <p className="text-sm font-bold text-text-primary">Maintenance</p>
                <p className="text-xs text-text-muted">Scheduled Today</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
