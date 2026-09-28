import { PageHeader, Card, EmptyState, Button } from './index';
import { Construction } from 'lucide-react';

export function PlaceholderPage({ title, description }: { title: string, description: string }) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 h-full">
      <PageHeader 
        title={title} 
        description={description}
      />
      <Card className="h-[60vh] flex items-center justify-center">
        <EmptyState 
          icon={Construction}
          title="Module in Development"
          description={`The ${title} module is currently being finalized. This area will provide comprehensive management tools soon.`}
          action={{ label: 'Back to Dashboard', onClick: () => window.history.back() }}
        />
      </Card>
    </div>
  );
}
