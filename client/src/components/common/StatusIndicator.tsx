import { HTMLAttributes } from 'react';
import { cn } from './Button';

type StatusType = 'operational' | 'attention' | 'critical' | 'neutral' | 'info';

interface StatusIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  status: StatusType;
  label?: string;
  pulse?: boolean;
}

export function StatusIndicator({ status, label, pulse = false, className, ...props }: StatusIndicatorProps) {
  const colors = {
    operational: 'bg-status-operational',
    attention: 'bg-status-attention',
    critical: 'bg-status-critical',
    neutral: 'bg-status-neutral',
    info: 'bg-status-info',
  };

  return (
    <div className={cn('flex items-center gap-2', className)} {...props}>
      <span className="relative flex h-2.5 w-2.5">
        {pulse && (
          <span className={cn('absolute inline-flex h-full w-full animate-ping rounded-full opacity-75', colors[status])}></span>
        )}
        <span className={cn('relative inline-flex h-2.5 w-2.5 rounded-full', colors[status])}></span>
      </span>
      {label && <span className="text-sm font-medium text-text-primary">{label}</span>}
    </div>
  );
}
