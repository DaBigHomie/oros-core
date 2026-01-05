import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Input Component - DJ-Jaytek-Music Cyber Aesthetic
 * 
 * Features:
 * - Glassmorphism design with backdrop blur
 * - Neon border glows on focus
 * - Full accessibility (ARIA attributes, labels, error states)
 * - Support for different input types and states
 */

const inputVariants = cva(
  // Base styles with glassmorphism
  [
    'flex w-full rounded-lg px-3 py-2 text-sm',
    'transition-all duration-300 ease-in-out',
    'backdrop-blur-md bg-opacity-10',
    'border border-opacity-30',
    'placeholder:text-gray-500',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        // Default: Cyan focus glow
        default: [
          'bg-gray-900/10 border-gray-700/30 text-gray-100',
          'focus:bg-gray-900/20 focus:border-cyan-400/60',
          'focus:shadow-[0_0_20px_rgba(34,211,238,0.4)]',
          'focus:ring-cyan-400/50',
        ],
        // Primary: Cyan themed
        primary: [
          'bg-cyan-500/10 border-cyan-400/30 text-cyan-100',
          'focus:bg-cyan-500/15 focus:border-cyan-400/60',
          'focus:shadow-[0_0_20px_rgba(34,211,238,0.5)]',
          'focus:ring-cyan-400/50',
        ],
        // Secondary: Purple themed
        secondary: [
          'bg-purple-500/10 border-purple-400/30 text-purple-100',
          'focus:bg-purple-500/15 focus:border-purple-400/60',
          'focus:shadow-[0_0_20px_rgba(168,85,247,0.5)]',
          'focus:ring-purple-400/50',
        ],
        // Success: Green themed (for valid inputs)
        success: [
          'bg-green-500/10 border-green-400/30 text-green-100',
          'focus:bg-green-500/15 focus:border-green-400/60',
          'focus:shadow-[0_0_20px_rgba(34,197,94,0.5)]',
          'focus:ring-green-400/50',
        ],
        // Error: Red themed (for invalid inputs)
        error: [
          'bg-red-500/10 border-red-400/50 text-red-100',
          'focus:bg-red-500/15 focus:border-red-400/70',
          'focus:shadow-[0_0_20px_rgba(239,68,68,0.5)]',
          'focus:ring-red-400/50',
        ],
      },
      inputSize: {
        sm: 'h-8 text-xs',
        md: 'h-10 text-sm',
        lg: 'h-12 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'md',
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /**
   * Label for the input (recommended for accessibility)
   */
  label?: string;
  /**
   * Error message to display below the input
   */
  error?: string;
  /**
   * Helper text to display below the input
   */
  helperText?: string;
  /**
   * Icon to display on the left side of the input
   */
  leftIcon?: React.ReactNode;
  /**
   * Icon to display on the right side of the input
   */
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      inputSize,
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      id,
      disabled,
      required,
      type = 'text',
      ...props
    },
    ref
  ) => {
    // Generate unique ID if not provided
    const inputId = id || `input-${React.useId()}`;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;
    
    // Determine variant based on error state
    const effectiveVariant = error ? 'error' : variant;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-2 block text-sm font-medium text-gray-200"
          >
            {label}
            {required && (
              <span className="ml-1 text-red-400" aria-label="required">
                *
              </span>
            )}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            id={inputId}
            type={type}
            disabled={disabled}
            required={required}
            className={inputVariants({
              variant: effectiveVariant,
              inputSize,
              className: `${leftIcon ? 'pl-10' : ''} ${rightIcon ? 'pr-10' : ''} ${className || ''}`,
            })}
            aria-invalid={!!error}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p
            id={errorId}
            className="mt-1.5 text-sm text-red-400"
            role="alert"
          >
            {error}
          </p>
        )}
        
        {!error && helperText && (
          <p id={helperId} className="mt-1.5 text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

/**
 * Textarea Component - Extended version of Input for multi-line text
 */
const textareaVariants = cva(
  // Base styles with glassmorphism (same as input)
  [
    'flex w-full rounded-lg px-3 py-2 text-sm',
    'transition-all duration-300 ease-in-out',
    'backdrop-blur-md bg-opacity-10',
    'border border-opacity-30',
    'placeholder:text-gray-500',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'resize-none', // Prevent default resize handle
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-gray-900/10 border-gray-700/30 text-gray-100',
          'focus:bg-gray-900/20 focus:border-cyan-400/60',
          'focus:shadow-[0_0_20px_rgba(34,211,238,0.4)]',
          'focus:ring-cyan-400/50',
        ],
        primary: [
          'bg-cyan-500/10 border-cyan-400/30 text-cyan-100',
          'focus:bg-cyan-500/15 focus:border-cyan-400/60',
          'focus:shadow-[0_0_20px_rgba(34,211,238,0.5)]',
          'focus:ring-cyan-400/50',
        ],
        secondary: [
          'bg-purple-500/10 border-purple-400/30 text-purple-100',
          'focus:bg-purple-500/15 focus:border-purple-400/60',
          'focus:shadow-[0_0_20px_rgba(168,85,247,0.5)]',
          'focus:ring-purple-400/50',
        ],
        error: [
          'bg-red-500/10 border-red-400/50 text-red-100',
          'focus:bg-red-500/15 focus:border-red-400/70',
          'focus:shadow-[0_0_20px_rgba(239,68,68,0.5)]',
          'focus:ring-red-400/50',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      variant,
      label,
      error,
      helperText,
      id,
      disabled,
      required,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const textareaId = id || `textarea-${React.useId()}`;
    const errorId = `${textareaId}-error`;
    const helperId = `${textareaId}-helper`;
    const effectiveVariant = error ? 'error' : variant;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="mb-2 block text-sm font-medium text-gray-200"
          >
            {label}
            {required && (
              <span className="ml-1 text-red-400" aria-label="required">
                *
              </span>
            )}
          </label>
        )}
        
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          disabled={disabled}
          required={required}
          className={textareaVariants({
            variant: effectiveVariant,
            className,
          })}
          aria-invalid={!!error}
          aria-describedby={
            error ? errorId : helperText ? helperId : undefined
          }
          {...props}
        />

        {error && (
          <p
            id={errorId}
            className="mt-1.5 text-sm text-red-400"
            role="alert"
          >
            {error}
          </p>
        )}
        
        {!error && helperText && (
          <p id={helperId} className="mt-1.5 text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Input, Textarea, inputVariants, textareaVariants };
