import { HTMLAttributes, forwardRef } from 'react';
import { cn } from './Button';
import { ElementType } from 'react';

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'operational' | 'attention' | 'critical' | 'neutral' | 'info';
  icon?: ElementType;
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'neutral', icon: Icon, children, ...props }, ref) => {
    
    // Using subtle background tints and strong text colors for enterprise look
    const variants = {
      operational: 'bg-[#7564D8]/10 text-status-operational border-[#7564D8]/20',
      attention: 'bg-[#F59E66]/10 text-status-attention border-[#F59E66]/20',
      critical: 'bg-[#E05252]/10 text-status-critical border-[#E05252]/20',
      neutral: 'bg-bg-secondary text-text-secondary border-border-subtle',
      info: 'bg-[#7564D8]/10 text-status-info border-[#7564D8]/20', // Same as operational in light mode, visually distinct in context
    };

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md border px-2.5 py-0.5 text-xs font-medium transition-colors',
          variants[variant],
          className
        )}
        {...props}
      >
        {Icon && <Icon className="mr-1 h-3 w-3" />}
        {children}
      </div>
    );
  }
);
Badge.displayName = 'Badge';
