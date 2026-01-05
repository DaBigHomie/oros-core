import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Button Component - DJ-Jaytek-Music Cyber Aesthetic
 * 
 * Features:
 * - Glassmorphism design with backdrop blur
 * - Neon border glows on hover
 * - Full accessibility (ARIA attributes, keyboard navigation)
 * - Multiple variants and sizes
 */

const buttonVariants = cva(
  // Base styles with glassmorphism
  [
    'inline-flex items-center justify-center rounded-lg font-medium',
    'transition-all duration-300 ease-in-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'backdrop-blur-md bg-opacity-20',
    'border border-opacity-30',
  ],
  {
    variants: {
      variant: {
        // Primary: Neon cyan/blue glow
        primary: [
          'bg-cyan-500/20 border-cyan-400/30 text-cyan-100',
          'hover:bg-cyan-500/30 hover:border-cyan-400/60',
          'hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]',
          'focus-visible:ring-cyan-400',
        ],
        // Secondary: Neon purple glow
        secondary: [
          'bg-purple-500/20 border-purple-400/30 text-purple-100',
          'hover:bg-purple-500/30 hover:border-purple-400/60',
          'hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]',
          'focus-visible:ring-purple-400',
        ],
        // Success: Neon green glow
        success: [
          'bg-green-500/20 border-green-400/30 text-green-100',
          'hover:bg-green-500/30 hover:border-green-400/60',
          'hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]',
          'focus-visible:ring-green-400',
        ],
        // Danger: Neon red glow
        danger: [
          'bg-red-500/20 border-red-400/30 text-red-100',
          'hover:bg-red-500/30 hover:border-red-400/60',
          'hover:shadow-[0_0_20px_rgba(239,68,68,0.5)]',
          'focus-visible:ring-red-400',
        ],
        // Ghost: Subtle hover effect
        ghost: [
          'bg-transparent border-transparent text-gray-300',
          'hover:bg-white/10 hover:border-white/20',
          'hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]',
          'focus-visible:ring-gray-400',
        ],
        // Outline: Emphasized border
        outline: [
          'bg-transparent border-cyan-400/50 text-cyan-300',
          'hover:bg-cyan-500/10 hover:border-cyan-400/80',
          'hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]',
          'focus-visible:ring-cyan-400',
        ],
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        xl: 'h-14 px-8 text-lg',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * Loading state - shows spinner and disables button
   */
  isLoading?: boolean;
  /**
   * Icon to display before the button text
   */
  leftIcon?: React.ReactNode;
  /**
   * Icon to display after the button text
   */
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      type = 'button',
      ...props
    },
    ref
  ) => {
    return (
      <button
        type={type}
        className={buttonVariants({ variant, size, fullWidth, className })}
        disabled={disabled || isLoading}
        ref={ref}
        aria-busy={isLoading}
        aria-disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!isLoading && leftIcon && (
          <span className="mr-2" aria-hidden="true">
            {leftIcon}
          </span>
        )}
        {children}
        {!isLoading && rightIcon && (
          <span className="ml-2" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
