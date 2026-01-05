# DJ-Jaytek-Music Component Design Guide

## Visual Design System

### Color Palette

```
Cyber-Aesthetic Color System

Primary (Cyan)
┌─────────────────────────────────────┐
│ #22D3EE - Neon Cyan                 │  Used for: Primary actions, focus states
│ rgba(34, 211, 238, 0.5) - Glow     │  Glow intensity: 20px blur radius
└─────────────────────────────────────┘

Secondary (Purple)
┌─────────────────────────────────────┐
│ #A855F7 - Neon Purple               │  Used for: Secondary actions, alternatives
│ rgba(168, 85, 247, 0.5) - Glow     │  Glow intensity: 20px blur radius
└─────────────────────────────────────┘

Success (Green)
┌─────────────────────────────────────┐
│ #22C55E - Neon Green                │  Used for: Success states, confirmations
│ rgba(34, 197, 94, 0.5) - Glow      │  Glow intensity: 20px blur radius
└─────────────────────────────────────┘

Danger (Red)
┌─────────────────────────────────────┐
│ #EF4444 - Neon Red                  │  Used for: Errors, destructive actions
│ rgba(239, 68, 68, 0.5) - Glow      │  Glow intensity: 20px blur radius
└─────────────────────────────────────┘

Neutral (White/Gray)
┌─────────────────────────────────────┐
│ #FFFFFF - White                     │  Used for: Ghost variants, text
│ #374151 - Gray-700                  │  Used for: Borders, backgrounds
│ #1F2937 - Gray-900                  │  Used for: Base backgrounds
└─────────────────────────────────────┘
```

### Glassmorphism Formula

All components use this glassmorphism effect:

```css
/* Base Glassmorphism */
backdrop-blur-md              /* 12px blur */
background: {color}/10        /* 10% opacity background */
border: {color}/30            /* 30% opacity border */

/* On Hover */
background: {color}/20        /* 20% opacity background */
border: {color}/60            /* 60% opacity border */
box-shadow: 0 0 20px rgba(color, 0.5)  /* Neon glow */
```

### Component States

#### Button States

```
┌─────────────────────────────────────────────────────────┐
│                    BUTTON VARIANTS                       │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────┐  ← Primary (Cyan glow)                    │
│  │ Primary  │                                            │
│  └──────────┘                                            │
│                                                          │
│  ┌──────────┐  ← Secondary (Purple glow)                │
│  │Secondary │                                            │
│  └──────────┘                                            │
│                                                          │
│  ┌──────────┐  ← Success (Green glow)                   │
│  │ Success  │                                            │
│  └──────────┘                                            │
│                                                          │
│  ┌──────────┐  ← Danger (Red glow)                      │
│  │ Danger   │                                            │
│  └──────────┘                                            │
│                                                          │
│  ┌──────────┐  ← Ghost (Subtle white glow)              │
│  │  Ghost   │                                            │
│  └──────────┘                                            │
│                                                          │
│  ┌──────────┐  ← Outline (Border emphasis)              │
│  │ Outline  │                                            │
│  └──────────┘                                            │
│                                                          │
└─────────────────────────────────────────────────────────┘

Hover Animation: 300ms ease-in-out
Focus Ring: 2px offset, colored by variant
Loading State: Animated spinner + disabled
```

#### Card States

```
┌─────────────────────────────────────────────────────────┐
│                     CARD ANATOMY                         │
├─────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────┐ │
│ │ CardHeader                                          │ │
│ │ ┌─────────────────────────────────────────────────┐ │ │
│ │ │ CardTitle (h1-h6)                               │ │ │
│ │ │ "Component Title"                                │ │ │
│ │ └─────────────────────────────────────────────────┘ │ │
│ │ ┌─────────────────────────────────────────────────┐ │ │
│ │ │ CardDescription                                 │ │ │
│ │ │ "Subtitle or description text"                  │ │ │
│ │ └─────────────────────────────────────────────────┘ │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                          │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ CardContent                                         │ │
│ │                                                     │ │
│ │ Main content area with glassmorphism background   │ │
│ │ and neon border glow on hover                     │ │
│ │                                                     │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                          │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ CardFooter                                          │ │
│ │ [Button] [Button]                                   │ │
│ └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘

Interactive Cards:
- role="button"
- tabIndex={0}
- Keyboard: Enter/Space to activate
- Active state: scale(0.98)
```

#### Input States

```
┌─────────────────────────────────────────────────────────┐
│                    INPUT ANATOMY                         │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Label Text *                    ← Label + required      │
│  ┌────────────────────────────────────────────────────┐ │
│  │ [icon]  Placeholder text...                  [icon]│ │ ← Icons (left/right)
│  └────────────────────────────────────────────────────┘ │
│  Helper text or error message    ← Helper/Error         │
│                                                          │
├─────────────────────────────────────────────────────────┤
│ STATES:                                                  │
│                                                          │
│ Default:   Border: gray-700/30                          │
│ Focus:     Border: cyan-400/60 + neon glow             │
│ Error:     Border: red-400/50 + red glow               │
│ Success:   Border: green-400/30 + green glow           │
│ Disabled:  Opacity: 50%, cursor: not-allowed           │
│                                                          │
└─────────────────────────────────────────────────────────┘

Focus Animation: 300ms ease-in-out
Ring: 2px offset, variant-colored
ARIA: Linked to error/helper via aria-describedby
```

### Spacing System

```
Component Padding Sizes:
┌──────────┬──────────┬──────────────┐
│ Size     │ Padding  │ Usage        │
├──────────┼──────────┼──────────────┤
│ none     │ 0        │ Custom       │
│ sm       │ 1rem     │ Compact      │
│ md       │ 1.5rem   │ Default      │
│ lg       │ 2rem     │ Spacious     │
│ xl       │ 2.5rem   │ Hero         │
└──────────┴──────────┴──────────────┘

Component Height Sizes (Buttons/Inputs):
┌──────────┬──────────┬──────────────┐
│ Size     │ Height   │ Text Size    │
├──────────┼──────────┼──────────────┤
│ sm       │ 2rem     │ 0.75rem (xs) │
│ md       │ 2.5rem   │ 0.875rem (sm)│
│ lg       │ 3rem     │ 1rem (base)  │
│ xl       │ 3.5rem   │ 1.125rem (lg)│
└──────────┴──────────┴──────────────┘
```

### Animation Timings

```
All components use consistent animation timings:

Transitions:
- Duration: 300ms
- Easing: ease-in-out
- Properties: all (background, border, shadow)

Hover Effects:
- Box Shadow: 0 → 20px blur
- Opacity: 10% → 20% (background)
- Border Opacity: 30% → 60%

Loading Spinner:
- Animation: spin
- Duration: 1s linear infinite
```

### Accessibility Checklist

```
Every component implements:

✓ Semantic HTML
  - <button> for buttons
  - <label> for inputs
  - Proper heading hierarchy (h1-h6)

✓ ARIA Attributes
  - aria-label for icon-only elements
  - aria-describedby for errors/helpers
  - aria-invalid for validation states
  - aria-busy for loading states
  - role="alert" for error messages

✓ Keyboard Navigation
  - Tab to focus
  - Enter/Space to activate
  - Escape to dismiss (modals)
  - Arrow keys (where applicable)

✓ Focus Management
  - Visible focus indicators
  - focus-visible for keyboard-only
  - 2px ring offset for clarity

✓ Color Contrast
  - Text: 4.5:1 minimum (WCAG AA)
  - Large text: 3:1 minimum
  - Interactive elements: Clear states

✓ Screen Reader Support
  - Descriptive labels
  - Status announcements
  - Error messages linked
  - Loading states announced
```

### Responsive Design

```
Breakpoints (Tailwind defaults):
┌────────┬──────────┬────────────────────┐
│ Prefix │ Min Width│ Usage              │
├────────┼──────────┼────────────────────┤
│ sm     │ 640px    │ Mobile landscape   │
│ md     │ 768px    │ Tablet             │
│ lg     │ 1024px   │ Desktop            │
│ xl     │ 1280px   │ Large desktop      │
│ 2xl    │ 1536px   │ Extra large        │
└────────┴──────────┴────────────────────┘

Components are mobile-first:
- Base styles for mobile
- Progressive enhancement for larger screens
- Flexible layouts with flexbox/grid
```

### Usage Patterns

#### Form Pattern

```tsx
<Card variant="primary" padding="lg">
  <CardHeader>
    <CardTitle>Sign Up</CardTitle>
    <CardDescription>Create your DJ account</CardDescription>
  </CardHeader>
  <CardContent>
    <Input 
      label="Email" 
      type="email"
      required 
      error={errors.email}
    />
    <Input 
      label="Password" 
      type="password"
      required
    />
  </CardContent>
  <CardFooter>
    <Button fullWidth variant="primary" isLoading={loading}>
      Create Account
    </Button>
  </CardFooter>
</Card>
```

#### Dashboard Card Pattern

```tsx
<Card variant="glass" interactive onClick={handleClick}>
  <CardHeader>
    <CardTitle as="h3">Total Plays</CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-4xl font-bold">1.2M</p>
  </CardContent>
</Card>
```

#### Search Pattern

```tsx
<Input
  variant="default"
  inputSize="lg"
  placeholder="Search tracks..."
  leftIcon={<SearchIcon />}
  onChange={handleSearch}
/>
```

---

## Component Combinations

The components are designed to work together seamlessly:

1. **Button in Card**: Natural pairing for actions
2. **Input with Button**: Form submissions
3. **Card as container**: Houses other components
4. **Multiple variants**: Visual hierarchy and user guidance

## Browser Compatibility

Tested and working in:
- ✓ Chrome 90+ (including backdrop-filter)
- ✓ Firefox 88+ (including backdrop-filter)
- ✓ Safari 14+ (including backdrop-filter)
- ✓ Edge 90+ (Chromium-based)

Fallback for older browsers:
- Graceful degradation without backdrop-filter
- Solid backgrounds as fallback
- All functionality remains intact
