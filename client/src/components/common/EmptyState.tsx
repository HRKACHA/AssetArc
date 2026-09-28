import { ReactNode } from 'react';
import { ElementType } from 'react';
import { Button } from './Button';
import { cn } from './Button';

interface EmptyStateProps {
  icon: ElementType;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  children?: ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action, className, children }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-12 text-center w-full min-h-[300px] border border-dashed border-border-primary rounded-xl bg-bg-surface/50", className)}>
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-bg-secondary mb-6">
        <Icon className="h-8 w-8 text-text-muted" strokeWidth={1.5} />
      </div>
      <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
      <p className="text-sm text-text-secondary max-w-md mx-auto mb-6">{description}</p>
      
      {action && (
        <Button onClick={action.onClick} variant="primary">
          {action.label}
        </Button>
      )}
      
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}
