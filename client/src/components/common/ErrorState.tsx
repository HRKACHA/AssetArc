import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './Button';
import { cn } from './Button';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({ title = 'An error occurred', message, onRetry, className }: ErrorStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center w-full rounded-xl bg-status-critical/5 border border-status-critical/20", className)}>
      <AlertTriangle className="h-10 w-10 text-status-critical mb-4" strokeWidth={1.5} />
      <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
      <p className="text-sm text-text-secondary max-w-md mx-auto mb-6">{message}</p>
      
      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="gap-2 border-status-critical text-status-critical hover:bg-status-critical hover:text-white">
          <RefreshCw size={16} />
          Try Again
        </Button>
      )}
    </div>
  );
}
