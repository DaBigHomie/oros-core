import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Card Component - DJ-Jaytek-Music Cyber Aesthetic
 * 
 * Features:
 * - Glassmorphism design with backdrop blur
 * - Neon border glows on hover
 * - Full accessibility (semantic HTML, ARIA attributes)
 * - Multiple variants for different use cases
 */

const cardVariants = cva(
  // Base styles with glassmorphism
  [
    'rounded-lg transition-all duration-300 ease-in-out',
    'backdrop-blur-md bg-opacity-10',
    'border border-opacity-20',
  ],
  {
    variants: {
      variant: {
        // Default: Subtle cyan glow on hover
        default: [
          'bg-gray-900/10 border-gray-700/20',
          'hover:bg-gray-900/20 hover:border-cyan-400/40',
          'hover:shadow-[0_0_25px_rgba(34,211,238,0.3)]',
        ],
        // Primary: Cyan themed card
        primary: [
          'bg-cyan-500/10 border-cyan-400/20',
          'hover:bg-cyan-500/15 hover:border-cyan-400/50',
          'hover:shadow-[0_0_25px_rgba(34,211,238,0.4)]',
        ],
        // Secondary: Purple themed card
        secondary: [
          'bg-purple-500/10 border-purple-400/20',
          'hover:bg-purple-500/15 hover:border-purple-400/50',
          'hover:shadow-[0_0_25px_rgba(168,85,247,0.4)]',
        ],
        // Success: Green themed card
        success: [
          'bg-green-500/10 border-green-400/20',
          'hover:bg-green-500/15 hover:border-green-400/50',
          'hover:shadow-[0_0_25px_rgba(34,197,94,0.4)]',
        ],
        // Danger: Red themed card
        danger: [
          'bg-red-500/10 border-red-400/20',
          'hover:bg-red-500/15 hover:border-red-400/50',
          'hover:shadow-[0_0_25px_rgba(239,68,68,0.4)]',
        ],
        // Glass: Maximum glassmorphism
        glass: [
          'bg-white/5 border-white/10',
          'hover:bg-white/10 hover:border-white/30',
          'hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]',
        ],
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
      },
      interactive: {
        true: 'cursor-pointer active:scale-[0.98]',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
      interactive: false,
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /**
   * Makes the card a clickable element with proper accessibility
   */
  onClick?: () => void;
  /**
   * ARIA label for accessibility when card is interactive
   */
  ariaLabel?: string;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant,
      padding,
      interactive,
      onClick,
      ariaLabel,
      children,
      ...props
    },
    ref
  ) => {
    const isInteractive = interactive || !!onClick;
    
    return (
      <div
        ref={ref}
        className={cardVariants({ variant, padding, interactive: isInteractive, className })}
        onClick={onClick}
        role={isInteractive ? 'button' : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        aria-label={ariaLabel}
        onKeyDown={
          isInteractive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClick?.();
                }
              }
            : undefined
        }
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

/**
 * Card Header - Semantic header section for cards
 */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`flex flex-col space-y-1.5 ${className || ''}`}
    {...props}
  />
));

CardHeader.displayName = 'CardHeader';

/**
 * Card Title - Semantic title for cards
 */
const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & { as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' }
>(({ className, as: Component = 'h3', ...props }, ref) => (
  <Component
    ref={ref}
    className={`text-2xl font-semibold leading-none tracking-tight text-gray-100 ${className || ''}`}
    {...props}
  />
));

CardTitle.displayName = 'CardTitle';

/**
 * Card Description - Semantic description for cards
 */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={`text-sm text-gray-400 ${className || ''}`}
    {...props}
  />
));

CardDescription.displayName = 'CardDescription';

/**
 * Card Content - Main content area for cards
 */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={`pt-0 ${className || ''}`} {...props} />
));

CardContent.displayName = 'CardContent';

/**
 * Card Footer - Footer section for cards (e.g., actions)
 */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`flex items-center pt-4 ${className || ''}`}
    {...props}
  />
));

CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants,
};
