import { useState } from 'react';
import { PageHeader, Card, Badge, Button } from '../../components/common';
import { FolderKanban, Plus, Calendar, Users, ArrowRight } from 'lucide-react';

const mockProjects = [
  { id: 1, name: 'Ahmedabad Ring Road Expansion Phase II', status: 'active', progress: 72, manager: 'Rajesh Patel', budget: '₹45.2 Cr', deadline: '15 Mar 2027', assets: 8 },
  { id: 2, name: 'Surat Water Treatment Plant Upgrade', status: 'active', progress: 45, manager: 'Priya Sharma', budget: '₹28.7 Cr', deadline: '01 Jun 2027', assets: 5 },
  { id: 3, name: 'Vadodara Smart Grid Installation', status: 'planning', progress: 10, manager: 'Amit Desai', budget: '₹18.9 Cr', deadline: '30 Sep 2027', assets: 12 },
  { id: 4, name: 'Rajkot Solar Microgrid Deployment', status: 'completed', progress: 100, manager: 'Sneha Joshi', budget: '₹12.1 Cr', deadline: '01 Sep 2026', assets: 6 },
  { id: 5, name: 'Gandhinagar Metro Sensor Network', status: 'active', progress: 58, manager: 'Vikram Mehta', budget: '₹35.5 Cr', deadline: '15 Dec 2027', assets: 15 },
];

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full bg-bg-secondary rounded-full h-2">
      <div
        className={`h-2 rounded-full transition-all duration-700 ${value === 100 ? 'bg-green-500' : value > 60 ? 'bg-blue-500' : 'bg-yellow-500'}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export function Projects() {
  const [filter, setFilter] = useState('all');
  
  const filtered = filter === 'all' ? mockProjects : mockProjects.filter(p => p.status === filter);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader title="Project Portfolio" description="Manage capital projects and contractor handovers.">
        <Button variant="primary" className="gap-2" onClick={() => alert('New Project form will open here.')}><Plus size={16} /> New Project</Button>
      </PageHeader>

      <div className="flex gap-2">
        {['all', 'active', 'planning', 'completed'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors cursor-pointer ${filter === f ? 'bg-primary text-white' : 'bg-bg-secondary text-text-secondary hover:bg-bg-hover'}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map(project => (
          <Card key={project.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary-soft"><FolderKanban size={20} className="text-primary" /></div>
                <div>
                  <h3 className="font-semibold text-text-primary">{project.name}</h3>
                  <p className="text-xs text-text-muted flex items-center gap-1"><Users size={12} /> {project.manager}</p>
                </div>
              </div>
              <Badge variant={project.status === 'completed' ? 'operational' : project.status === 'active' ? 'attention' : 'offline' as any}>
                {project.status.toUpperCase()}
              </Badge>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Progress</span>
                <span className="font-medium text-text-primary">{project.progress}%</span>
              </div>
              <ProgressBar value={project.progress} />
            </div>

            <div className="grid grid-cols-3 gap-3 text-sm border-t border-border-subtle pt-4">
              <div>
                <p className="text-text-muted text-xs">Budget</p>
                <p className="font-medium text-text-primary">{project.budget}</p>
              </div>
              <div>
                <p className="text-text-muted text-xs">Deadline</p>
                <p className="font-medium text-text-primary">{project.deadline}</p>
              </div>
              <div>
                <p className="text-text-muted text-xs">Assets</p>
                <p className="font-medium text-text-primary">{project.assets} linked</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
