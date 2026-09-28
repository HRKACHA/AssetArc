import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from './Button';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-text-secondary mb-1">
            {label}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          className={cn(
            'flex h-10 w-full rounded-lg border border-border-primary bg-bg-surface px-3 py-2 text-sm text-text-primary transition-colors',
            'placeholder:text-text-muted',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:border-border-focus',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-bg-secondary',
            error && 'border-status-critical focus-visible:ring-status-critical focus-visible:border-status-critical',
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-status-critical">{error}</p>}
        {helperText && !error && <p className="mt-1 text-xs text-text-muted">{helperText}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';
