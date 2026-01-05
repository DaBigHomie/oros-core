# DJ-Jaytek-Music Platform

**Project:** DJ Portfolio, LMS & Music Platform Aggregator  
**Version:** 1.0  
**Date:** January 5, 2026  
**Status:** Architecture & Planning Phase  
**Tech Stack:** Next.js 14 (App Router) + Vercel + Tailwind CSS

---

## Executive Summary

**DJ-Jaytek-Music** is a comprehensive platform for DJs combining a professional portfolio showcase, learning management system (LMS) for DJ courses, and a unified music platform aggregator integrating 10+ major music streaming services. Built on the architectural foundations of oros-core, this platform repurposes proven patterns for authentication, payments, and content delivery while introducing specialized features for the DJ and music education industry.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Core Feature Set](#core-feature-set)
3. [Technology Stack](#technology-stack)
4. [Folder Structure](#folder-structure)
5. [Reusable Components from Oros-Core](#reusable-components-from-oros-core)
6. [Data Models](#data-models)
7. [Music Platform Integrations](#music-platform-integrations)
8. [Development Roadmap](#development-roadmap)
9. [Deployment Strategy](#deployment-strategy)

---

## Architecture Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                                 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                 │
│  │   Mobile    │  │   Desktop   │  │   Tablet    │                 │
│  │    PWA      │  │    PWA      │  │    PWA      │                 │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘                 │
│         └────────────────┼────────────────┘                        │
│                          ▼                                          │
│              ┌───────────────────────┐                             │
│              │   Next.js 14 (SSR)    │                             │
│              │   App Router + RSC    │                             │
│              │   Tailwind CSS        │                             │
│              └───────────────────────┘                             │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                        DEPLOYMENT LAYER                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                      Vercel                                  │   │
│  │   Edge Functions  •  Serverless  •  ISR  •  Analytics       │   │
│  │   CDN  •  SSL/TLS  •  Auto-Scaling  •  Edge Middleware      │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                        DATA LAYER                                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                     Supabase                                 │   │
│  │   PostgreSQL  •  Auth  •  Realtime  •  Storage  •  RLS      │   │
│  │   Video Storage  •  Course Content  •  User Profiles        │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                    EXTERNAL INTEGRATIONS                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                 │
│  │   Stripe    │  │    Mux      │  │   Resend    │                 │
│  │  Payments   │  │   Video     │  │   Email     │                 │
│  │  (Courses)  │  │  Streaming  │  │   System    │                 │
│  └─────────────┘  └─────────────┘  └─────────────┘                 │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │            Music Platform APIs (10+ Services)                │  │
│  │  Spotify • Apple Music • SoundCloud • Beatport • Tidal      │  │
│  │  YouTube Music • Amazon Music • Deezer • Bandcamp • Mixcloud│  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Core Architectural Principles

1. **Modular Design** - Each feature (Portfolio, LMS, Music Aggregator) can function independently
2. **Progressive Enhancement** - Core features work without JavaScript, enhanced with interactive elements
3. **Mobile-First** - Responsive design optimized for DJs on-the-go
4. **Performance-Optimized** - Edge caching, ISR, and optimized asset delivery
5. **Secure by Default** - Row-level security, authentication middleware, and API rate limiting

---

## Core Feature Set

### 1. DJ Portfolio

**Purpose:** Professional showcase for DJ profiles, mixes, events, and bookings

**Features:**
- **Profile Management**
  - Custom DJ profiles with bio, photos, and branding
  - Genre specializations and music style tags
  - Social media integration
  - Contact/booking forms
  
- **Mix Showcase**
  - Upload and display DJ mixes and sets
  - Waveform visualizations
  - Track listings and timestamps
  - Download/streaming options
  
- **Event Calendar**
  - Upcoming and past events display
  - Venue information and locations
  - Ticket/RSVP integration
  - Event photo galleries
  
- **Press Kit**
  - Downloadable media kit
  - High-res photos
  - Biography and achievements
  - Testimonials and reviews

### 2. Learning Management System (LMS)

**Purpose:** Comprehensive course platform for DJ education and skill development

**Features:**
- **Course Catalog**
  - Browse courses by level (Beginner/Intermediate/Advanced)
  - Filter by topic (mixing, production, marketing, equipment)
  - Course previews and syllabi
  - Instructor profiles
  
- **Course Content Delivery**
  - Video lessons with Mux streaming
  - Downloadable resources (PDFs, samples, project files)
  - Interactive quizzes and assessments
  - Progress tracking and certificates
  
- **Student Dashboard**
  - Enrolled courses overview
  - Progress tracking
  - Assignment submissions
  - Discussion forums per course
  
- **Instructor Tools**
  - Course creation wizard
  - Content management
  - Student analytics
  - Revenue tracking (70/30 split model from Oros)

### 3. Music Platform Aggregator

**Purpose:** Unified dashboard for DJs to manage presence across 10+ music platforms

**Features:**
- **Unified Dashboard**
  - Single view of all connected platforms
  - Aggregate statistics (plays, followers, saves)
  - Cross-platform analytics
  - Performance trends
  
- **Platform Integrations**
  - OAuth integration for 10+ platforms
  - Sync release information
  - Track playlist additions
  - Monitor engagement metrics
  
- **Release Management**
  - Track new releases across platforms
  - Schedule cross-platform announcements
  - Centralized link sharing
  - Release performance comparison
  
- **Playlist Monitoring**
  - Track playlist placements
  - Curator contact information
  - Placement history and analytics

### 4. Admin Dashboard

**Purpose:** Platform management and analytics

**Features:**
- User management
- Course approval workflow
- Platform analytics
- Payment management
- Content moderation

---

## Technology Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 14.x | React framework with App Router |
| **React** | 18.x | UI library |
| **TypeScript** | 5.x | Type safety and developer experience |
| **Tailwind CSS** | 3.x | Utility-first styling |
| **Lucide React** | Latest | Icon system |
| **React Hook Form** | 7.x | Form handling and validation |
| **Zod** | 3.x | Schema validation |
| **Framer Motion** | 11.x | Animations and transitions |
| **Recharts** | 2.x | Analytics charts and graphs |

### Backend & Infrastructure

| Technology | Purpose |
|------------|---------|
| **Supabase** | Backend-as-a-Service (PostgreSQL + Auth + Storage) |
| **PostgreSQL** | Primary database |
| **Row Level Security** | Data access control |
| **Vercel** | Hosting, serverless functions, edge network |
| **Edge Functions** | Authentication middleware, API routes |

### Media & Content

| Technology | Purpose |
|------------|---------|
| **Mux** | Video streaming for course content |
| **Supabase Storage** | Audio file storage (mixes, samples) |
| **Cloudinary** | Image optimization and transformation |

### Payments & Email

| Technology | Purpose |
|------------|---------|
| **Stripe** | Course payments and subscriptions |
| **Stripe Connect** | Instructor payouts |
| **Resend** | Transactional emails |

### Music Platform APIs

| Platform | API Type | Purpose |
|----------|----------|---------|
| **Spotify** | REST + OAuth | Track/artist/playlist data |
| **Apple Music** | MusicKit JS | Catalog access and user library |
| **SoundCloud** | REST + OAuth | Track statistics and uploads |
| **Beatport** | REST | DJ-focused track data |
| **Tidal** | REST + OAuth | High-fidelity streaming data |
| **YouTube Music** | YouTube Data API | Video/music content |
| **Amazon Music** | REST | Catalog and user data |
| **Deezer** | REST + OAuth | Track and album data |
| **Bandcamp** | Custom scraping | Independent artist data |
| **Mixcloud** | REST + OAuth | DJ mix platform data |

---

## Folder Structure

### Complete Directory Tree

```
dj-jaytek-music/
├── src/
│   ├── app/                           # Next.js App Router
│   │   ├── (auth)/                    # Authentication routes
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── signup/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── dj/
│   │   │   │   │   └── page.tsx       # DJ signup flow
│   │   │   │   ├── student/
│   │   │   │   │   └── page.tsx       # Student signup flow
│   │   │   │   └── instructor/
│   │   │   │       └── page.tsx       # Instructor signup flow
│   │   │   └── auth/
│   │   │       └── callback/
│   │   │           └── route.ts
│   │   │
│   │   ├── (public)/                  # Public routes
│   │   │   ├── about/
│   │   │   ├── pricing/
│   │   │   ├── djs/
│   │   │   │   └── [username]/        # Public DJ profiles
│   │   │   │       └── page.tsx
│   │   │   └── courses/
│   │   │       ├── page.tsx           # Course catalog
│   │   │       └── [slug]/
│   │   │           └── page.tsx       # Course detail page
│   │   │
│   │   ├── (dashboard)/               # Protected routes
│   │   │   ├── dashboard/             # Main dashboard
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   ├── portfolio/             # DJ Portfolio Section
│   │   │   │   ├── profile/
│   │   │   │   │   └── page.tsx       # Edit profile
│   │   │   │   ├── mixes/
│   │   │   │   │   ├── page.tsx       # Mixes library
│   │   │   │   │   ├── upload/
│   │   │   │   │   │   └── page.tsx   # Upload new mix
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── page.tsx   # Edit mix
│   │   │   │   ├── events/
│   │   │   │   │   ├── page.tsx       # Events calendar
│   │   │   │   │   ├── new/
│   │   │   │   │   │   └── page.tsx   # Create event
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── page.tsx   # Edit event
│   │   │   │   └── press-kit/
│   │   │   │       └── page.tsx       # Press kit manager
│   │   │   │
│   │   │   ├── learn/                 # LMS Section
│   │   │   │   ├── my-courses/
│   │   │   │   │   └── page.tsx       # Student enrolled courses
│   │   │   │   ├── browse/
│   │   │   │   │   └── page.tsx       # Course catalog
│   │   │   │   ├── course/
│   │   │   │   │   └── [id]/
│   │   │   │   │       ├── page.tsx   # Course overview
│   │   │   │   │       ├── lesson/
│   │   │   │   │       │   └── [lessonId]/
│   │   │   │   │       │       └── page.tsx  # Lesson viewer
│   │   │   │   │       └── assignments/
│   │   │   │   │           └── page.tsx
│   │   │   │   └── certificates/
│   │   │   │       └── page.tsx       # Earned certificates
│   │   │   │
│   │   │   ├── teach/                 # Instructor Section
│   │   │   │   ├── courses/
│   │   │   │   │   ├── page.tsx       # Instructor courses
│   │   │   │   │   ├── new/
│   │   │   │   │   │   └── page.tsx   # Create course
│   │   │   │   │   └── [id]/
│   │   │   │   │       ├── page.tsx   # Edit course
│   │   │   │   │       ├── lessons/
│   │   │   │   │       │   └── page.tsx  # Manage lessons
│   │   │   │   │       ├── students/
│   │   │   │   │       │   └── page.tsx  # Student list
│   │   │   │   │       └── analytics/
│   │   │   │   │           └── page.tsx  # Course analytics
│   │   │   │   ├── earnings/
│   │   │   │   │   └── page.tsx       # Revenue tracking
│   │   │   │   └── payouts/
│   │   │   │       └── page.tsx       # Payout history
│   │   │   │
│   │   │   ├── music/                 # Music Aggregator Section
│   │   │   │   ├── overview/
│   │   │   │   │   └── page.tsx       # Unified dashboard
│   │   │   │   ├── platforms/
│   │   │   │   │   ├── page.tsx       # Connected platforms
│   │   │   │   │   └── connect/
│   │   │   │   │       └── [platform]/
│   │   │   │   │           └── page.tsx  # OAuth flow
│   │   │   │   ├── releases/
│   │   │   │   │   └── page.tsx       # Release tracker
│   │   │   │   ├── playlists/
│   │   │   │   │   └── page.tsx       # Playlist monitoring
│   │   │   │   └── analytics/
│   │   │   │       └── page.tsx       # Cross-platform analytics
│   │   │   │
│   │   │   ├── admin/                 # Admin Dashboard
│   │   │   │   ├── overview/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── users/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── courses/
│   │   │   │   │   └── page.tsx       # Course moderation
│   │   │   │   ├── payments/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── analytics/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   └── settings/              # User Settings
│   │   │       ├── profile/
│   │   │       ├── account/
│   │   │       ├── billing/
│   │   │       └── notifications/
│   │   │
│   │   ├── api/                       # API Routes
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/
│   │   │   │       └── route.ts
│   │   │   ├── courses/
│   │   │   │   ├── route.ts           # CRUD operations
│   │   │   │   └── [id]/
│   │   │   │       ├── route.ts
│   │   │   │       ├── enroll/
│   │   │   │       │   └── route.ts
│   │   │   │       └── progress/
│   │   │   │           └── route.ts
│   │   │   ├── mixes/
│   │   │   │   ├── upload/
│   │   │   │   │   └── route.ts       # Mix upload handler
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts
│   │   │   ├── music-platforms/
│   │   │   │   ├── spotify/
│   │   │   │   │   ├── auth/
│   │   │   │   │   │   └── route.ts   # OAuth callback
│   │   │   │   │   └── data/
│   │   │   │   │       └── route.ts   # Fetch Spotify data
│   │   │   │   ├── apple-music/
│   │   │   │   ├── soundcloud/
│   │   │   │   └── [...platform]/     # Dynamic platform routes
│   │   │   │       └── route.ts
│   │   │   ├── payments/
│   │   │   │   ├── checkout/
│   │   │   │   │   └── route.ts       # Stripe checkout
│   │   │   │   └── webhook/
│   │   │   │       └── route.ts       # Stripe webhooks
│   │   │   └── webhooks/
│   │   │       ├── stripe/
│   │   │       └── mux/
│   │   │
│   │   ├── layout.tsx                 # Root layout
│   │   ├── page.tsx                   # Landing page
│   │   ├── globals.css                # Global styles
│   │   └── error.tsx                  # Error boundary
│   │
│   ├── components/
│   │   ├── ui/                        # Base UI Components (Reusable)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── radio.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown.tsx
│   │   │   ├── modal.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── spinner.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── toast.tsx
│   │   │   └── tooltip.tsx
│   │   │
│   │   ├── forms/                     # Form Components
│   │   │   ├── course-form.tsx
│   │   │   ├── profile-form.tsx
│   │   │   ├── event-form.tsx
│   │   │   ├── mix-upload-form.tsx
│   │   │   └── lesson-form.tsx
│   │   │
│   │   ├── portfolio/                 # Portfolio-specific Components
│   │   │   ├── dj-profile-card.tsx
│   │   │   ├── mix-player.tsx
│   │   │   ├── waveform-visualizer.tsx
│   │   │   ├── event-card.tsx
│   │   │   ├── event-calendar.tsx
│   │   │   └── press-kit-generator.tsx
│   │   │
│   │   ├── lms/                       # LMS Components
│   │   │   ├── course-card.tsx
│   │   │   ├── lesson-player.tsx
│   │   │   ├── progress-tracker.tsx
│   │   │   ├── quiz-component.tsx
│   │   │   ├── certificate.tsx
│   │   │   ├── course-curriculum.tsx
│   │   │   └── discussion-forum.tsx
│   │   │
│   │   ├── music/                     # Music Aggregator Components
│   │   │   ├── platform-card.tsx
│   │   │   ├── stats-widget.tsx
│   │   │   ├── analytics-chart.tsx
│   │   │   ├── release-card.tsx
│   │   │   ├── playlist-tracker.tsx
│   │   │   └── unified-dashboard.tsx
│   │   │
│   │   ├── dashboard/                 # Dashboard Widgets
│   │   │   ├── stats-card.tsx
│   │   │   ├── recent-activity.tsx
│   │   │   ├── quick-actions.tsx
│   │   │   └── notifications.tsx
│   │   │
│   │   └── layout/                    # Layout Components
│   │       ├── header.tsx
│   │       ├── footer.tsx
│   │       ├── sidebar.tsx
│   │       ├── mobile-nav.tsx
│   │       └── breadcrumbs.tsx
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts              # Client-side Supabase
│   │   │   ├── server.ts              # Server-side Supabase
│   │   │   └── middleware.ts          # Auth middleware
│   │   │
│   │   ├── stripe/
│   │   │   ├── client.ts              # Stripe client setup
│   │   │   ├── actions.ts             # Payment actions
│   │   │   └── webhooks.ts            # Webhook handlers
│   │   │
│   │   ├── mux/
│   │   │   ├── client.ts              # Mux video client
│   │   │   └── upload.ts              # Video upload helpers
│   │   │
│   │   ├── music-platforms/           # Music Platform Integrations
│   │   │   ├── spotify.ts
│   │   │   ├── apple-music.ts
│   │   │   ├── soundcloud.ts
│   │   │   ├── beatport.ts
│   │   │   ├── tidal.ts
│   │   │   ├── youtube-music.ts
│   │   │   ├── amazon-music.ts
│   │   │   ├── deezer.ts
│   │   │   ├── bandcamp.ts
│   │   │   ├── mixcloud.ts
│   │   │   └── aggregator.ts          # Unified data aggregation
│   │   │
│   │   ├── auth/
│   │   │   ├── roles.ts               # Role-based access control
│   │   │   └── permissions.ts         # Permission checks
│   │   │
│   │   ├── courses/
│   │   │   ├── enrollment.ts          # Course enrollment logic
│   │   │   ├── progress.ts            # Progress tracking
│   │   │   └── certificates.ts        # Certificate generation
│   │   │
│   │   ├── storage/
│   │   │   ├── audio.ts               # Audio file operations
│   │   │   ├── video.ts               # Video file operations
│   │   │   └── images.ts              # Image optimization
│   │   │
│   │   ├── utils/
│   │   │   ├── validation.ts          # Common validators
│   │   │   ├── formatting.ts          # Date, currency formatting
│   │   │   ├── analytics.ts           # Analytics helpers
│   │   │   └── helpers.ts             # General utilities
│   │   │
│   │   └── validators/
│   │       ├── course.ts              # Course validation schemas
│   │       ├── profile.ts             # Profile validation schemas
│   │       ├── mix.ts                 # Mix upload validation
│   │       └── event.ts               # Event validation schemas
│   │
│   ├── hooks/
│   │   ├── use-user.ts                # Current user hook
│   │   ├── use-courses.ts             # Course data hooks
│   │   ├── use-music-platforms.ts     # Platform integration hooks
│   │   ├── use-enrollment.ts          # Enrollment management
│   │   ├── use-progress.ts            # Course progress tracking
│   │   ├── use-mixes.ts               # Mix management
│   │   └── use-analytics.ts           # Analytics data hooks
│   │
│   └── types/
│       ├── database.ts                # Generated Supabase types
│       ├── course.ts                  # Course-related types
│       ├── music.ts                   # Music platform types
│       ├── portfolio.ts               # Portfolio types
│       └── index.ts                   # Exported types
│
├── supabase/
│   ├── migrations/
│   │   ├── 001_initial_schema.sql
│   │   ├── 002_courses_tables.sql
│   │   ├── 003_portfolio_tables.sql
│   │   ├── 004_music_platforms.sql
│   │   └── 005_rls_policies.sql
│   ├── functions/                     # Edge Functions
│   │   ├── process-video/
│   │   ├── send-certificate/
│   │   └── sync-music-data/
│   └── config.toml
│
├── public/
│   ├── icons/
│   ├── images/
│   ├── samples/                       # Sample audio files
│   └── manifest.json                  # PWA manifest
│
├── .env.example
├── .env.local
├── .gitignore
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## Reusable Components from Oros-Core

### Authentication & User Management

**From Oros-Core:**
- Multi-role user system (adapted for DJ/Student/Instructor/Admin)
- OAuth integration patterns (Google, Facebook, Microsoft)
- Row-level security policies
- Profile management architecture
- Session management with middleware

**Adaptation for DJ-Jaytek:**
```typescript
// User roles adapted from oros-core
type UserRole = 'dj' | 'student' | 'instructor' | 'admin';

// Similar to creator_profiles and business_profiles
interface DJProfile {
  user_id: string;
  stage_name: string;
  genres: string[];
  bio: string;
  social_links: SocialLinks;
  verified: boolean;
}

interface InstructorProfile {
  user_id: string;
  credentials: string[];
  bio: string;
  teaching_experience: number;
  rating: number;
}
```

### Wallet & Payment System

**From Oros-Core:**
- Immutable ledger pattern for financial transactions
- Escrow-first payment flow
- Platform fee deduction logic (adapted from 20% to 30%)
- Stripe Connect integration for instructor payouts
- Balance tracking (pending/available)

**Adaptation for DJ-Jaytek:**
```typescript
// Course revenue sharing (30% platform, 70% instructor)
const PLATFORM_FEE = 0.30;

// Ledger entry types adapted
type TransactionSource = 
  | 'course_purchase'
  | 'instructor_payout'
  | 'withdrawal'
  | 'refund'
  | 'subscription';

// Wallet structure (from oros-core wallets table)
interface Wallet {
  id: string;
  user_id: string;
  available_balance: number;
  pending_balance: number;
  currency: string;
  created_at: string;
  updated_at: string;
}
```

### Content Management

**From Oros-Core:**
- Campaign creation wizard → Course creation wizard
- Content approval workflow
- Status management (draft/active/paused/completed)
- Hashtag-based discovery → Genre/tag-based course discovery
- Media upload and storage patterns

**Adaptation for DJ-Jaytek:**
```typescript
// Course structure (adapted from campaigns)
interface Course {
  id: string;
  instructor_id: string;
  title: string;
  description: string;
  tags: string[];           // Similar to hashtags
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  status: 'draft' | 'active' | 'archived';
  enrollment_count: number;
  created_at: string;
  updated_at: string;
}
```

### Analytics & Tracking

**From Oros-Core:**
- Event tracking system (clicks, conversions, sales) → course views, enrollments, completions
- Dashboard analytics widgets
- Performance metrics calculation
- Real-time updates with Supabase Realtime

### UI Components Library

**From Oros-Core Technical Stack:**
- Button variants and states
- Card components for content display
- Form components with validation (React Hook Form + Zod)
- Modal/Dialog patterns
- Dashboard layout structure
- Navigation components (header, sidebar, mobile nav)
- Progress indicators
- Badge/Status components

All base UI components follow the same Tailwind CSS + Lucide icons approach from oros-core.

---

## Data Models

### Core Database Schema

```sql
-- Users & Authentication (Supabase Auth)
-- Managed by Supabase, extended with profiles

-- User Roles (Multi-role system from oros-core)
CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL CHECK (role IN ('dj', 'student', 'instructor', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- DJ Profiles
CREATE TABLE dj_profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  stage_name VARCHAR(100),
  bio TEXT,
  genres TEXT[] DEFAULT '{}',
  location VARCHAR(100),
  website VARCHAR(500),
  social_links JSONB DEFAULT '{}',
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Instructor Profiles
CREATE TABLE instructor_profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  bio TEXT,
  credentials TEXT[],
  teaching_experience INTEGER,
  rating DECIMAL(3,2) DEFAULT 0,
  total_students INTEGER DEFAULT 0,
  stripe_account_id VARCHAR(100),
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Mixes (DJ Portfolio)
CREATE TABLE mixes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dj_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  duration INTEGER,                    -- Duration in seconds
  file_url TEXT NOT NULL,              -- Supabase Storage URL
  cover_image_url TEXT,
  genres TEXT[] DEFAULT '{}',
  tracklist JSONB DEFAULT '[]',        -- Array of track objects
  play_count INTEGER DEFAULT 0,
  download_count INTEGER DEFAULT 0,
  download_enabled BOOLEAN DEFAULT TRUE,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Events (DJ Portfolio)
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dj_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  venue_name VARCHAR(200),
  venue_address TEXT,
  venue_city VARCHAR(100),
  venue_country VARCHAR(100),
  event_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ,
  ticket_url TEXT,
  flyer_image_url TEXT,
  status VARCHAR(20) DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Courses (LMS)
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  instructor_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  short_description TEXT,
  cover_image_url TEXT,
  trailer_video_url TEXT,              -- Mux video URL
  level VARCHAR(20) CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  categories TEXT[] DEFAULT '{}',      -- e.g., ['mixing', 'production', 'marketing']
  price DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  enrollment_count INTEGER DEFAULT 0,
  average_rating DECIMAL(3,2) DEFAULT 0,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Course Lessons
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL,
  video_url TEXT,                      -- Mux video URL
  video_duration INTEGER,              -- Duration in seconds
  is_preview BOOLEAN DEFAULT FALSE,    -- Free preview lesson
  resources JSONB DEFAULT '[]',        -- Downloadable resources
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(course_id, order_index)
);

-- Course Enrollments
CREATE TABLE enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  progress_percentage DECIMAL(5,2) DEFAULT 0,
  last_accessed_lesson_id UUID REFERENCES lessons(id),
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(course_id, student_id)
);

-- Lesson Progress
CREATE TABLE lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id UUID REFERENCES enrollments(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT FALSE,
  watch_time INTEGER DEFAULT 0,        -- Seconds watched
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(enrollment_id, lesson_id)
);

-- Course Reviews
CREATE TABLE course_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(course_id, student_id)
);

-- Certificates
CREATE TABLE certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id UUID REFERENCES enrollments(id) ON DELETE CASCADE,
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  certificate_url TEXT,                -- Generated PDF URL
  issued_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(enrollment_id)
);

-- Music Platform Connections
CREATE TABLE music_platform_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  platform VARCHAR(50) NOT NULL CHECK (platform IN (
    'spotify', 'apple_music', 'soundcloud', 'beatport', 'tidal',
    'youtube_music', 'amazon_music', 'deezer', 'bandcamp', 'mixcloud'
  )),
  platform_user_id VARCHAR(200),
  access_token TEXT,
  refresh_token TEXT,
  token_expires_at TIMESTAMPTZ,
  connected_at TIMESTAMPTZ DEFAULT NOW(),
  last_synced_at TIMESTAMPTZ,
  UNIQUE(user_id, platform)
);

-- Music Platform Analytics (Aggregated)
CREATE TABLE music_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  platform VARCHAR(50) NOT NULL,
  metric_type VARCHAR(50) NOT NULL,    -- e.g., 'total_plays', 'followers', 'monthly_listeners'
  metric_value DECIMAL(12,2),
  recorded_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Wallets (Adapted from oros-core)
CREATE TABLE wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  currency VARCHAR(3) DEFAULT 'USD',
  available_balance DECIMAL(12,2) DEFAULT 0.00,
  pending_balance DECIMAL(12,2) DEFAULT 0.00,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT positive_available CHECK (available_balance >= 0),
  CONSTRAINT positive_pending CHECK (pending_balance >= 0)
);

-- Ledger Entries (Immutable, from oros-core)
CREATE TABLE ledger_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_id UUID REFERENCES wallets(id) ON DELETE RESTRICT,
  source_type VARCHAR(30) NOT NULL CHECK (source_type IN (
    'course_purchase',
    'instructor_payout',
    'withdrawal',
    'refund',
    'subscription',
    'adjustment'
  )),
  source_id UUID,
  amount DECIMAL(12,2) NOT NULL,
  direction VARCHAR(10) NOT NULL CHECK (direction IN ('credit', 'debit')),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'settled', 'failed', 'reversed')),
  description TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Withdrawals
CREATE TABLE withdrawals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_id UUID REFERENCES wallets(id) ON DELETE RESTRICT,
  amount DECIMAL(12,2) NOT NULL,
  method VARCHAR(20) NOT NULL CHECK (method IN ('stripe', 'paypal')),
  status VARCHAR(20) DEFAULT 'requested' CHECK (status IN ('requested', 'processing', 'completed', 'failed')),
  stripe_transfer_id VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  processed_at TIMESTAMPTZ,
  CONSTRAINT positive_withdrawal CHECK (amount > 0)
);
```

### Indexes for Performance

```sql
-- DJ Profiles
CREATE INDEX idx_dj_profiles_genres ON dj_profiles USING GIN(genres);
CREATE INDEX idx_dj_profiles_verified ON dj_profiles(verified);

-- Mixes
CREATE INDEX idx_mixes_dj ON mixes(dj_id);
CREATE INDEX idx_mixes_status ON mixes(status);
CREATE INDEX idx_mixes_genres ON mixes USING GIN(genres);
CREATE INDEX idx_mixes_published ON mixes(published_at DESC);

-- Events
CREATE INDEX idx_events_dj ON events(dj_id);
CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_events_status ON events(status);

-- Courses
CREATE INDEX idx_courses_instructor ON courses(instructor_id);
CREATE INDEX idx_courses_status ON courses(status);
CREATE INDEX idx_courses_categories ON courses USING GIN(categories);
CREATE INDEX idx_courses_published ON courses(published_at DESC);

-- Enrollments
CREATE INDEX idx_enrollments_course ON enrollments(course_id);
CREATE INDEX idx_enrollments_student ON enrollments(student_id);
CREATE INDEX idx_enrollments_completed ON enrollments(completed);

-- Lesson Progress
CREATE INDEX idx_lesson_progress_enrollment ON lesson_progress(enrollment_id);
CREATE INDEX idx_lesson_progress_lesson ON lesson_progress(lesson_id);

-- Music Platform Connections
CREATE INDEX idx_music_platforms_user ON music_platform_connections(user_id);
CREATE INDEX idx_music_platforms_platform ON music_platform_connections(platform);

-- Ledger (from oros-core)
CREATE INDEX idx_ledger_wallet ON ledger_entries(wallet_id);
CREATE INDEX idx_ledger_source ON ledger_entries(source_type, source_id);
CREATE INDEX idx_ledger_created ON ledger_entries(created_at DESC);
```

---

## Music Platform Integrations

### Integration Strategy

Each platform integration follows a consistent pattern:

1. **OAuth Authentication** - Secure user authorization
2. **Data Synchronization** - Periodic fetching of user data
3. **Caching** - Store aggregated data in our database
4. **Rate Limiting** - Respect API rate limits
5. **Error Handling** - Graceful degradation on API failures

### Platform-Specific Implementations

#### 1. Spotify

```typescript
// lib/music-platforms/spotify.ts

interface SpotifyConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

export class SpotifyIntegration {
  private config: SpotifyConfig;
  
  async authenticate(code: string): Promise<SpotifyTokens> {
    // OAuth flow implementation
  }
  
  async getUserProfile(accessToken: string): Promise<SpotifyProfile> {
    // Fetch user profile, follower count
  }
  
  async getArtistStats(accessToken: string): Promise<SpotifyArtistStats> {
    // Monthly listeners, top tracks, etc.
  }
  
  async getUserPlaylists(accessToken: string): Promise<SpotifyPlaylist[]> {
    // User's playlists
  }
  
  async getRecentTracks(accessToken: string): Promise<SpotifyTrack[]> {
    // Recently released tracks
  }
}
```

#### 2. Apple Music

```typescript
// lib/music-platforms/apple-music.ts

export class AppleMusicIntegration {
  private developerToken: string;
  
  async authenticate(userToken: string): Promise<void> {
    // MusicKit JS authentication
  }
  
  async getCatalogData(userToken: string): Promise<AppleMusicData> {
    // Catalog presence, plays, etc.
  }
}
```

#### 3. SoundCloud

```typescript
// lib/music-platforms/soundcloud.ts

export class SoundCloudIntegration {
  async authenticate(code: string): Promise<SoundCloudTokens> {
    // OAuth flow
  }
  
  async getUserTracks(accessToken: string): Promise<SoundCloudTrack[]> {
    // User's uploaded tracks with play counts
  }
  
  async getTrackStats(trackId: string, accessToken: string): Promise<SoundCloudStats> {
    // Detailed track statistics
  }
}
```

### Data Aggregation Service

```typescript
// lib/music-platforms/aggregator.ts

export class MusicDataAggregator {
  async syncAllPlatforms(userId: string): Promise<AggregatedData> {
    const connections = await this.getUserConnections(userId);
    
    const results = await Promise.allSettled(
      connections.map(conn => this.syncPlatform(conn))
    );
    
    return this.aggregateResults(results);
  }
  
  private async syncPlatform(connection: PlatformConnection): Promise<PlatformData> {
    switch(connection.platform) {
      case 'spotify':
        return await this.syncSpotify(connection);
      case 'apple_music':
        return await this.syncAppleMusic(connection);
      // ... other platforms
    }
  }
  
  private aggregateResults(results: PromiseSettledResult[]): AggregatedData {
    // Combine data from all platforms
    return {
      totalPlays: 0,
      totalFollowers: 0,
      platformBreakdown: {},
      topTracks: [],
      recentReleases: [],
    };
  }
}
```

### Supported Platforms

| Platform | Features | API Status |
|----------|----------|------------|
| **Spotify** | Artist stats, track plays, playlists, followers | ✅ Full OAuth |
| **Apple Music** | Catalog data, plays, library sync | ✅ MusicKit JS |
| **SoundCloud** | Track stats, plays, reposts, comments | ✅ Full OAuth |
| **Beatport** | Sales data, chart positions | ⚠️ Limited API |
| **Tidal** | Streaming stats, playlists | ✅ Full OAuth |
| **YouTube Music** | Video views, subscriber count | ✅ YouTube API |
| **Amazon Music** | Streaming data | ⚠️ Limited API |
| **Deezer** | Track stats, playlists | ✅ Full OAuth |
| **Bandcamp** | Sales, fan data | ⚠️ Custom scraping |
| **Mixcloud** | DJ mix stats, plays, favorites | ✅ Full OAuth |

---

## Development Roadmap

### Phase 1: Foundation (Weeks 1-4)

**Week 1-2: Setup & Authentication**
- [ ] Initialize Next.js 14 project with App Router
- [ ] Configure Tailwind CSS and design system
- [ ] Set up Supabase project and database
- [ ] Implement authentication (Email, Google OAuth)
- [ ] Create multi-role system (DJ, Student, Instructor, Admin)
- [ ] Build basic layout components (header, footer, nav)

**Week 3-4: DJ Portfolio MVP**
- [ ] DJ profile creation and editing
- [ ] Mix upload functionality (Supabase Storage)
- [ ] Mix player with waveform visualization
- [ ] Event management (CRUD operations)
- [ ] Public DJ profile pages
- [ ] Basic analytics dashboard

### Phase 2: LMS Core (Weeks 5-8)

**Week 5-6: Course Infrastructure**
- [ ] Course creation wizard for instructors
- [ ] Lesson management (CRUD)
- [ ] Mux video integration for course content
- [ ] Course catalog with filtering/search
- [ ] Course detail pages with curriculum
- [ ] Enrollment system

**Week 7-8: Learning Experience**
- [ ] Video lesson player with progress tracking
- [ ] Course progress tracking
- [ ] Quiz/assessment system
- [ ] Certificate generation
- [ ] Student dashboard
- [ ] Instructor analytics dashboard

### Phase 3: Payments (Weeks 9-10)

**Week 9: Stripe Integration**
- [ ] Stripe payment setup
- [ ] Course checkout flow
- [ ] Stripe Connect for instructor payouts
- [ ] Wallet system (from oros-core pattern)
- [ ] Ledger system for transaction tracking

**Week 10: Revenue Management**
- [ ] 30/70 revenue split automation
- [ ] Instructor earnings dashboard
- [ ] Withdrawal system
- [ ] Payment history and invoices
- [ ] Refund handling

### Phase 4: Music Aggregator (Weeks 11-14)

**Week 11-12: Platform Integrations (Tier 1)**
- [ ] Spotify OAuth and data sync
- [ ] Apple Music integration
- [ ] SoundCloud OAuth and data sync
- [ ] Unified dashboard design
- [ ] Basic analytics aggregation

**Week 13-14: Platform Integrations (Tier 2)**
- [ ] YouTube Music integration
- [ ] Tidal integration
- [ ] Deezer integration
- [ ] Mixcloud integration
- [ ] Advanced analytics and cross-platform comparison
- [ ] Release tracking system
- [ ] Playlist monitoring

### Phase 5: Polish & Launch (Weeks 15-16)

**Week 15: Admin & Moderation**
- [ ] Admin dashboard
- [ ] User management
- [ ] Course approval workflow
- [ ] Content moderation tools
- [ ] Platform analytics

**Week 16: Testing & Launch Prep**
- [ ] End-to-end testing
- [ ] Performance optimization
- [ ] SEO optimization
- [ ] Documentation
- [ ] Beta testing
- [ ] Production deployment

---

## Deployment Strategy

### Vercel Configuration

**vercel.json**
```json
{
  "framework": "nextjs",
  "regions": ["iad1"],
  "buildCommand": "npm run build",
  "env": {
    "NEXT_PUBLIC_SUPABASE_URL": "@supabase-url",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@supabase-anon-key",
    "SUPABASE_SERVICE_ROLE_KEY": "@supabase-service-key",
    "STRIPE_SECRET_KEY": "@stripe-secret-key",
    "STRIPE_WEBHOOK_SECRET": "@stripe-webhook-secret",
    "MUX_TOKEN_ID": "@mux-token-id",
    "MUX_TOKEN_SECRET": "@mux-token-secret"
  }
}
```

### Environment Variables

```env
# App
NEXT_PUBLIC_APP_URL=https://dj-jaytek-music.vercel.app
NEXT_PUBLIC_APP_NAME=DJ Jaytek Music

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx
SUPABASE_SERVICE_ROLE_KEY=eyJxxx

# Stripe
STRIPE_SECRET_KEY=sk_live_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Mux
MUX_TOKEN_ID=xxx
MUX_TOKEN_SECRET=xxx

# Music Platform APIs
SPOTIFY_CLIENT_ID=xxx
SPOTIFY_CLIENT_SECRET=xxx
APPLE_MUSIC_DEVELOPER_TOKEN=xxx
SOUNDCLOUD_CLIENT_ID=xxx
SOUNDCLOUD_CLIENT_SECRET=xxx
# ... other platform credentials
```

### Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | 90+ |
| First Contentful Paint | < 1.5s |
| Time to Interactive | < 3.5s |
| Largest Contentful Paint | < 2.5s |
| Cumulative Layout Shift | < 0.1 |

### Monitoring

- **Vercel Analytics** - Performance monitoring
- **Sentry** - Error tracking and logging
- **PostHog** - User analytics and behavior
- **Supabase Dashboard** - Database performance

---

## Success Metrics

### User Engagement
- Monthly Active Users (MAU)
- Course completion rate > 60%
- Average session duration > 10 minutes
- Platform connection rate (% of users connecting at least 3 platforms)

### Business Metrics
- Course enrollment rate
- Instructor revenue (total paid out)
- Platform revenue (30% commission)
- Average course price
- Student-to-instructor ratio

### Technical Metrics
- API uptime > 99.9%
- Average page load time < 2s
- Error rate < 0.5%
- Video streaming success rate > 99%

---

## Next Steps

1. **Initialize Project**
   ```bash
   npx create-next-app@latest dj-jaytek-music --typescript --tailwind --app
   cd dj-jaytek-music
   npm install @supabase/supabase-js @supabase/ssr stripe @mux/mux-node
   ```

2. **Set Up Supabase**
   - Create new Supabase project
   - Run database migrations
   - Configure authentication providers
   - Set up storage buckets

3. **Configure Stripe**
   - Create Stripe account
   - Enable Stripe Connect
   - Set up webhook endpoints
   - Configure products and pricing

4. **Design System**
   - Define color palette and typography
   - Create base UI components
   - Build component library in Storybook (optional)

5. **Begin Development**
   - Start with Phase 1 (Foundation & Authentication)
   - Follow incremental development approach
   - Regular testing and code reviews

---

**Document Status:** Architecture Complete ✅  
**Next Review:** After Phase 1 Completion  
**Contact:** [Your Contact Information]
