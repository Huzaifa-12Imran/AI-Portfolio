import { HTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'blue';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  asChild?: boolean;
}

const variants = {
  primary: 'btn-newgen btn-newgen-primary',
  secondary: 'btn-newgen btn-newgen-secondary',
  outline: 'btn-newgen btn-newgen-secondary',
  ghost: 'btn-newgen text-zinc-400 hover:text-white bg-transparent',
  blue: 'btn-newgen bg-blue-600 text-white hover:bg-blue-500',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, disabled, children, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled}
      className={clsx(
        variants[variant],
        sizes[size],
        'disabled:opacity-50 disabled:cursor-not-allowed grow-0',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
);
Button.displayName = 'Button';

// Badge component
interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {}

export function Badge({ className, children, ...props }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900 px-2.5 py-0.5 text-xs font-semibold text-zinc-100 transition-colors',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

// Card component
export function Card({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx('bento-card', className)}
      {...props}
    >
      {children}
    </div>
  );
}
