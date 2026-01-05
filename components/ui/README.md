# DJ-Jaytek-Music UI Components

This directory contains the foundational UI components for the DJ-Jaytek-Music project, featuring a cyber-aesthetic design language with glassmorphism and neon glow effects.

## Design Principles

All components follow these core design principles:

1. **Glassmorphism**: Semi-transparent backgrounds with backdrop blur effects
2. **Neon Glows**: Animated border glows on hover/focus with cyber-aesthetic colors
3. **Full Accessibility**: ARIA attributes, keyboard navigation, semantic HTML
4. **Type Safety**: Full TypeScript support with exported types
5. **Responsive**: Mobile-first design approach

## Components

### Button (`button.tsx`)

A versatile button component with multiple variants and states.

#### Features
- 6 variants: primary, secondary, success, danger, ghost, outline
- 4 sizes: sm, md, lg, xl
- Loading state with spinner
- Left/right icon support
- Full keyboard navigation
- Neon glow effects on hover

#### Usage

```tsx
import { Button } from '@/components/ui/button';

// Basic usage
<Button>Click me</Button>

// With variant and size
<Button variant="primary" size="lg">
  Large Primary Button
</Button>

// With loading state
<Button isLoading>Loading...</Button>

// With icons
<Button leftIcon={<Icon />} rightIcon={<ArrowRight />}>
  Continue
</Button>

// Full width
<Button fullWidth>Submit</Button>
```

#### Props

- `variant`: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost' | 'outline'
- `size`: 'sm' | 'md' | 'lg' | 'xl'
- `fullWidth`: boolean
- `isLoading`: boolean
- `leftIcon`: ReactNode
- `rightIcon`: ReactNode
- All standard HTML button attributes

---

### Card (`card.tsx`)

A container component with glassmorphism effects, perfect for content display.

#### Features
- 6 variants: default, primary, secondary, success, danger, glass
- 5 padding sizes: none, sm, md, lg, xl
- Interactive mode for clickable cards
- Semantic sub-components (Header, Title, Description, Content, Footer)
- Neon glow effects on hover
- Keyboard navigation for interactive cards

#### Usage

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

// Basic card
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Main content area</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// Interactive card
<Card
  variant="primary"
  interactive
  onClick={() => console.log('clicked')}
  ariaLabel="Click to view details"
>
  <CardContent>Click me!</CardContent>
</Card>

// Glass variant
<Card variant="glass" padding="lg">
  <CardContent>Maximum glassmorphism effect</CardContent>
</Card>
```

#### Props

**Card:**
- `variant`: 'default' | 'primary' | 'secondary' | 'success' | 'danger' | 'glass'
- `padding`: 'none' | 'sm' | 'md' | 'lg' | 'xl'
- `interactive`: boolean
- `onClick`: () => void
- `ariaLabel`: string (required for interactive cards)

**Sub-components:**
- `CardHeader`: Container for title and description
- `CardTitle`: Heading element (default h3, customizable)
- `CardDescription`: Paragraph element for descriptions
- `CardContent`: Main content area
- `CardFooter`: Footer area for actions

---

### Input (`input.tsx`)

A flexible input component with full form support and accessibility features.

#### Features
- 5 variants: default, primary, secondary, success, error
- 3 sizes: sm, md, lg
- Label and helper text support
- Error state with validation messages
- Left/right icon support
- Neon glow effects on focus
- Full ARIA support

#### Usage

```tsx
import { Input, Textarea } from '@/components/ui/input';

// Basic input
<Input placeholder="Enter text..." />

// With label and helper text
<Input
  label="Email"
  type="email"
  helperText="We'll never share your email"
  placeholder="you@example.com"
/>

// With error state
<Input
  label="Username"
  error="Username is required"
  required
/>

// With icons
<Input
  label="Search"
  leftIcon={<SearchIcon />}
  placeholder="Search..."
/>

// Textarea
<Textarea
  label="Message"
  rows={6}
  helperText="Enter your message here"
/>

// Controlled input
const [value, setValue] = useState('');
<Input
  value={value}
  onChange={(e) => setValue(e.target.value)}
  label="Controlled Input"
/>
```

#### Props

**Input:**
- `variant`: 'default' | 'primary' | 'secondary' | 'success' | 'error'
- `inputSize`: 'sm' | 'md' | 'lg'
- `label`: string
- `error`: string
- `helperText`: string
- `leftIcon`: ReactNode
- `rightIcon`: ReactNode
- All standard HTML input attributes

**Textarea:**
- `variant`: 'default' | 'primary' | 'secondary' | 'error'
- `label`: string
- `error`: string
- `helperText`: string
- All standard HTML textarea attributes

---

## Color Palette

The components use the following cyber-aesthetic color scheme:

- **Cyan/Blue**: Primary actions and focus states (`#22D3EE`)
- **Purple**: Secondary actions and alternatives (`#A855F7`)
- **Green**: Success states and confirmations (`#22C55E`)
- **Red**: Error states and destructive actions (`#EF4444`)
- **White**: Ghost variants and subtle effects (`#FFFFFF`)
- **Gray**: Backgrounds and text (`#1F2937`, `#374151`)

## Dependencies

These components require the following dependencies:

```json
{
  "dependencies": {
    "react": "^18.0.0",
    "class-variance-authority": "^0.7.0",
    "tailwindcss": "^3.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "typescript": "^5.0.0"
  }
}
```

## Tailwind Configuration

Ensure your `tailwind.config.js` includes the necessary configurations:

```js
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backdropBlur: {
        md: '12px',
      },
    },
  },
  plugins: [],
}
```

## Accessibility Features

All components include:

- ✅ Semantic HTML elements
- ✅ ARIA attributes (labels, descriptions, states)
- ✅ Keyboard navigation support
- ✅ Focus visible indicators
- ✅ Screen reader friendly
- ✅ Color contrast compliance
- ✅ Disabled state handling
- ✅ Error state announcements

## Best Practices

1. **Always provide labels**: Use the `label` prop for inputs to ensure accessibility
2. **Use semantic variants**: Choose variants that match the action's intent (success, danger, etc.)
3. **Provide ARIA labels**: For interactive elements without visible text, use `ariaLabel`
4. **Handle loading states**: Use `isLoading` prop to prevent duplicate submissions
5. **Validate inputs**: Use the `error` prop to show validation feedback
6. **Test keyboard navigation**: Ensure all interactive elements are keyboard accessible

## Examples

See the documentation website for interactive examples and live demos.

## License

These components are part of the DJ-Jaytek-Music project.
