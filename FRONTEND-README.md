# Frontend Components Documentation

## Overview

This document provides comprehensive documentation for the custom frontend components built for the DJ Jaytek Music platform. All components are designed with accessibility, performance, and user experience as top priorities.

## Components Library

### Widgets

#### 1. AudioWaveform
An interactive audio player with real-time waveform visualization.

**Location:** `src/components/widgets/AudioWaveform.tsx`

**Features:**
- Real-time waveform rendering using WaveSurfer.js
- Play/pause controls
- Mute/unmute functionality
- Time display (current/total)
- Responsive design
- Keyboard accessible
- ARIA labels for screen readers

**Props:**
```typescript
interface AudioWaveformProps {
  audioUrl: string;          // URL to the audio file
  title?: string;            // Track title
  artist?: string;           // Artist name
  height?: number;           // Waveform height (default: 128)
  waveColor?: string;        // Waveform color (default: #4F46E5)
  progressColor?: string;    // Progress color (default: #818CF8)
  className?: string;        // Additional CSS classes
}
```

**Usage:**
```tsx
import AudioWaveform from '@/components/widgets/AudioWaveform';

<AudioWaveform
  audioUrl="https://example.com/audio.mp3"
  title="Sunset Sessions Vol. 3"
  artist="DJ Phoenix"
  height={128}
/>
```

#### 2. CourseProgressTracker
A comprehensive course progress tracking component with modules and lessons.

**Location:** `src/components/widgets/CourseProgressTracker.tsx`

**Features:**
- Module-based organization
- Lesson status indicators (completed, current, locked)
- Progress bars at module and course levels
- Animated transitions
- Keyboard navigation
- Accessible lesson states

**Props:**
```typescript
interface CourseProgressTrackerProps {
  modules: Module[];
  overallProgress: number;
  courseName: string;
  onLessonClick?: (lessonId: string) => void;
  className?: string;
}
```

**Usage:**
```tsx
import CourseProgressTracker from '@/components/widgets/CourseProgressTracker';

<CourseProgressTracker
  modules={courseModules}
  overallProgress={65}
  courseName="Complete DJ Masterclass"
  onLessonClick={(id) => router.push(`/lessons/${id}`)}
/>
```

#### 3. FeaturedEvent
A visually striking event showcase component with gradient backgrounds and animations.

**Location:** `src/components/widgets/FeaturedEvent.tsx`

**Features:**
- Eye-catching gradient design
- Event details (date, time, location, price)
- DJ information and genre
- Call-to-action button
- Animated entrance
- Responsive layout

**Props:**
```typescript
interface FeaturedEventProps {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  venue: string;
  imageUrl: string;
  ticketUrl?: string;
  price?: string;
  djName: string;
  genre?: string;
  className?: string;
}
```

**Usage:**
```tsx
import FeaturedEvent from '@/components/widgets/FeaturedEvent';

<FeaturedEvent
  title="Summer Beats Festival 2026"
  date="July 15, 2026"
  time="8:00 PM - 4:00 AM"
  location="Los Angeles, CA"
  venue="The Palladium"
  imageUrl="/images/event.jpg"
  djName="DJ Phoenix"
  genre="Progressive House"
  price="$45 - $125"
  ticketUrl="https://tickets.example.com"
/>
```

#### 4. DJPortfolioPreview
A card component showcasing DJ profiles with live mix previews.

**Location:** `src/components/widgets/DJPortfolioPreview.tsx`

**Features:**
- Hover effects and animations
- Top mix quick preview
- Statistics display (followers, plays)
- Genre badges
- Profile image with gradient overlay
- Rank indicator
- Play/pause controls

**Props:**
```typescript
interface DJPortfolioPreviewProps {
  djId: string;
  name: string;
  bio: string;
  avatarUrl: string;
  genre: string;
  followers: number;
  totalPlays: number;
  topMix: Mix;
  profileUrl: string;
  rank?: number;
  className?: string;
}
```

**Usage:**
```tsx
import DJPortfolioPreview from '@/components/widgets/DJPortfolioPreview';

<DJPortfolioPreview
  djId="1"
  name="DJ Phoenix"
  bio="Award-winning progressive house DJ..."
  avatarUrl="/images/dj-phoenix.jpg"
  genre="Progressive House"
  followers={125000}
  totalPlays={3500000}
  topMix={mixData}
  profileUrl="/djs/phoenix"
  rank={1}
/>
```

### Dashboard Components

#### 5. MusicAggregatorDashboard
A comprehensive analytics dashboard aggregating data from multiple music platforms.

**Location:** `src/components/dashboard/MusicAggregatorDashboard.tsx`

**Features:**
- Multi-platform integration cards
- Real-time statistics
- Interactive charts (line charts, pie charts)
- Platform connection management
- Growth metrics
- Responsive grid layout

**Props:**
```typescript
interface MusicAggregatorDashboardProps {
  platforms: PlatformData[];
  analyticsData: AnalyticsData[];
  totalFollowers: number;
  totalPlays: number;
  monthlyGrowth: number;
  className?: string;
}
```

**Usage:**
```tsx
import MusicAggregatorDashboard from '@/components/dashboard/MusicAggregatorDashboard';

<MusicAggregatorDashboard
  platforms={connectedPlatforms}
  analyticsData={weeklyData}
  totalFollowers={310000}
  totalPlays={8500000}
  monthlyGrowth={18.5}
/>
```

## Pages

### LMS Landing Page
**Location:** `src/app/lms/page.tsx`

A comprehensive landing page featuring:
- Hero section with animated elements
- Platform statistics
- Featured event widget
- Top 3 DJ portfolios with live previews
- Call-to-action sections
- Responsive design

### Music Dashboard Page
**Location:** `src/app/music-dashboard/page.tsx`

A full dashboard page featuring:
- Header with page description
- Music aggregator dashboard
- Platform connection prompt
- Analytics visualizations

### Widgets Showcase Page
**Location:** `src/app/(public)/widgets/page.tsx`

A demonstration page showcasing:
- Audio waveform visualization
- Course progress tracker
- Feature highlights grid
- Interactive examples

## Styling & Theming

### Tailwind Configuration
The application uses a custom Tailwind configuration with:
- Extended color palette
- Custom animations
- Gradient utilities
- Focus states for accessibility
- Dark mode support

### CSS Variables
Custom CSS variables for theming:
- `--background`
- `--foreground`
- `--primary`
- `--secondary`
- `--accent`
- And more...

## Animation Library

All animations use **Framer Motion** for:
- Page transitions
- Component entrance animations
- Interactive hover effects
- Staggered animations
- Gesture support

### Common Animation Patterns

**Fade In Up:**
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

**Stagger Children:**
```tsx
<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  {items.map(item => (
    <motion.div key={item.id} variants={itemVariants}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

## Accessibility Features

All components implement:
- ✅ WCAG 2.1 AA compliance
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ Focus management
- ✅ ARIA attributes
- ✅ Color contrast requirements
- ✅ Reduced motion support

See [ACCESSIBILITY.md](./ACCESSIBILITY.md) for detailed documentation.

## Responsive Design

### Breakpoints
- **Mobile:** 320px - 768px
- **Tablet:** 768px - 1024px
- **Desktop:** 1024px+

### Testing Checklist
- [x] iPhone SE (375px)
- [x] iPhone 12/13/14 (390px)
- [x] iPad (768px)
- [x] iPad Pro (1024px)
- [x] Desktop (1280px+)
- [x] Large Desktop (1920px+)

## Performance Optimization

### Implemented Optimizations
1. **Code Splitting:** Dynamic imports for heavy components
2. **Image Optimization:** Next.js Image component
3. **Lazy Loading:** Components loaded on demand
4. **Memoization:** React.memo for expensive components
5. **Efficient Re-renders:** Proper dependency arrays

### Performance Targets
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3.5s
- **Lighthouse Score:** 90+

## Browser Support

- ✅ Chrome (latest 2 versions)
- ✅ Firefox (latest 2 versions)
- ✅ Safari (latest 2 versions)
- ✅ Edge (latest 2 versions)
- ✅ Mobile Safari (iOS 13+)
- ✅ Chrome Mobile (Android 8+)

## Dependencies

### Core Dependencies
- **React:** 18.2.0
- **Next.js:** 14.1.0
- **TypeScript:** 5.3.3
- **Tailwind CSS:** 3.4.0

### UI & Animation
- **Framer Motion:** Latest
- **Lucide React:** Latest (icon library)
- **@headlessui/react:** Latest (accessible components)

### Audio & Visualization
- **WaveSurfer.js:** Latest

### Charts & Analytics
- **Recharts:** Latest

## Development Workflow

### Running the Development Server
```bash
npm run dev
```

### Type Checking
```bash
npm run type-check
```

### Building for Production
```bash
npm run build
```

### Linting
```bash
npm run lint
```

## Future Enhancements

### Planned Features
- [ ] Advanced audio effects visualization
- [ ] Real-time collaboration features
- [ ] Video lesson player component
- [ ] Live streaming integration
- [ ] Mobile app components
- [ ] AI-powered recommendations UI

### Component Library Expansion
- [ ] Modal/Dialog components
- [ ] Toast notification system
- [ ] Form components library
- [ ] Table components with sorting/filtering
- [ ] Calendar/scheduler components

## Contributing

When adding new components:

1. Follow existing patterns and structure
2. Ensure accessibility compliance
3. Add TypeScript types
4. Include props documentation
5. Test responsiveness
6. Add to this documentation

## Support

For questions or issues:
- Create an issue in the repository
- Contact: dev@djjaytek.com
- Documentation: https://docs.djjaytek.com

---

Last Updated: January 5, 2026
Version: 1.0.0
