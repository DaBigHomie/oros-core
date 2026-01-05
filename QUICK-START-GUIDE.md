# Quick Start Guide: From Oros-Core to DJ-Jaytek-Music

**For Developers:** This guide provides quick copy-paste examples for implementing DJ-Jaytek-Music using oros-core patterns.

---

## Setup (5 minutes)

```bash
# 1. Create new Next.js project
npx create-next-app@latest dj-jaytek-music \
  --typescript \
  --tailwind \
  --app \
  --import-alias "@/*"

cd dj-jaytek-music

# 2. Install dependencies
npm install @supabase/supabase-js @supabase/ssr @supabase/auth-helpers-nextjs
npm install stripe @stripe/stripe-js
npm install @mux/mux-node @mux/mux-player-react
npm install zod react-hook-form @hookform/resolvers
npm install lucide-react
npm install recharts
npm install framer-motion
npm install date-fns

# 3. Dev dependencies
npm install -D @types/node @types/react @types/react-dom
npm install -D prettier prettier-plugin-tailwindcss
npm install -D eslint eslint-config-next

# 4. Initialize Supabase
npx supabase init
npx supabase start
```

---

## Environment Variables

Create `.env.local`:

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=DJ Jaytek Music

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Stripe
STRIPE_SECRET_KEY=sk_test_your-secret-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your-publishable-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret

# Mux
MUX_TOKEN_ID=your-mux-token-id
MUX_TOKEN_SECRET=your-mux-token-secret

# OAuth - Spotify
SPOTIFY_CLIENT_ID=your-spotify-client-id
SPOTIFY_CLIENT_SECRET=your-spotify-client-secret
NEXT_PUBLIC_SPOTIFY_REDIRECT_URI=http://localhost:3000/api/music-platforms/spotify/callback
```

---

## Database Schema (Copy-Paste Ready)

Create `supabase/migrations/001_initial_schema.sql`:

```sql
-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User roles (adapted from oros-core)
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

-- Wallets (from oros-core - UNCHANGED)
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

-- Ledger Entries (from oros-core - IMMUTABLE)
CREATE TABLE ledger_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_id UUID REFERENCES wallets(id) ON DELETE RESTRICT,
  source_type VARCHAR(30) NOT NULL CHECK (source_type IN (
    'course_purchase', 'instructor_payout', 'withdrawal', 'refund', 'subscription'
  )),
  source_id UUID,
  amount DECIMAL(12,2) NOT NULL,
  direction VARCHAR(10) NOT NULL CHECK (direction IN ('credit', 'debit')),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'settled', 'failed', 'reversed')),
  description TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Courses (adapted from campaigns)
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  instructor_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  short_description TEXT,
  cover_image_url TEXT,
  trailer_video_url TEXT,
  level VARCHAR(20) CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  categories TEXT[] DEFAULT '{}',
  price DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  enrollment_count INTEGER DEFAULT 0,
  average_rating DECIMAL(3,2) DEFAULT 0,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lessons
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL,
  video_url TEXT,
  video_duration INTEGER,
  is_preview BOOLEAN DEFAULT FALSE,
  resources JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(course_id, order_index)
);

-- Enrollments (adapted from campaign_creators)
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

-- Triggers (from oros-core)
CREATE OR REPLACE FUNCTION create_wallet_for_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO wallets (user_id) VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_user_created_create_wallet
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_wallet_for_user();

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_wallets_updated_at
  BEFORE UPDATE ON wallets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Indexes
CREATE INDEX idx_courses_instructor ON courses(instructor_id);
CREATE INDEX idx_courses_status ON courses(status);
CREATE INDEX idx_courses_categories ON courses USING GIN(categories);
CREATE INDEX idx_enrollments_student ON enrollments(student_id);
CREATE INDEX idx_enrollments_course ON enrollments(course_id);
CREATE INDEX idx_ledger_wallet ON ledger_entries(wallet_id);
CREATE INDEX idx_ledger_created ON ledger_entries(created_at DESC);

-- RLS Policies (from oros-core pattern)
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE ledger_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published courses" ON courses
  FOR SELECT USING (status = 'published');

CREATE POLICY "Instructors manage own courses" ON courses
  FOR ALL USING (auth.uid() = instructor_id);

CREATE POLICY "Students view own enrollments" ON enrollments
  FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Users view own wallet" ON wallets
  FOR SELECT USING (auth.uid() = user_id);
```

Run migration:
```bash
npx supabase db push
npx supabase gen types typescript --local > src/types/database.ts
```

---

## Core Files (Copy-Paste Ready)

### 1. Supabase Client (`src/lib/supabase/client.ts`)

```typescript
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

### 2. Supabase Server (`src/lib/supabase/server.ts`)

```typescript
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  );
}
```

### 3. Auth Middleware (`src/middleware.ts`)

```typescript
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({ request });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options });
          response = NextResponse.next({ request });
          response.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // Protect dashboard routes
  if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/dashboard/:path*', '/portfolio/:path*', '/learn/:path*', '/music/:path*'],
};
```

### 4. Utility Functions (`src/lib/utils/formatting.ts`)

```typescript
// From oros-core patterns
export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function formatDate(date: string | Date, format: 'short' | 'long' = 'long'): string {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: format,
  }).format(new Date(date));
}

export function abbreviateNumber(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toString();
}

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}
```

### 5. Payment Constants (`src/lib/constants.ts`)

```typescript
// From oros-core pattern (adapted fee)
export const PLATFORM_FEE = 0.30; // 30% for DJ-Jaytek (vs 20% in oros)
export const INSTRUCTOR_SHARE = 0.70; // 70% to instructor

export function calculatePayout(grossAmount: number) {
  const platformFee = grossAmount * PLATFORM_FEE;
  const instructorPayout = grossAmount * INSTRUCTOR_SHARE;
  
  return {
    gross: grossAmount,
    platformFee,
    instructorPayout,
  };
}
```

### 6. Validation Schemas (`src/lib/validators/course.ts`)

```typescript
import { z } from 'zod';

// Adapted from oros-core campaign schema
export const courseSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(200),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  short_description: z.string().max(200).optional(),
  level: z.enum(['beginner', 'intermediate', 'advanced']),
  categories: z.array(z.string()).min(1, 'Select at least one category').max(10),
  price: z.number().positive('Price must be positive').max(1000),
  cover_image_url: z.string().url().optional(),
  trailer_video_url: z.string().url().optional(),
});

export type CourseInput = z.infer<typeof courseSchema>;
```

### 7. Base Button Component (`src/components/ui/button.tsx`)

```typescript
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',
            'bg-gray-200 text-gray-900 hover:bg-gray-300': variant === 'secondary',
            'border border-gray-300 bg-transparent hover:bg-gray-50': variant === 'outline',
            'bg-transparent hover:bg-gray-100': variant === 'ghost',
            'h-9 px-3 text-sm': size === 'sm',
            'h-10 px-4': size === 'md',
            'h-12 px-6 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
export default Button;
```

### 8. Server Action Example (`src/app/learn/actions.ts`)

```typescript
'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

// Adapted from oros-core acceptCampaign pattern
export async function enrollInCourse(courseId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('Unauthorized');
  }
  
  const { error } = await supabase
    .from('enrollments')
    .insert({
      course_id: courseId,
      student_id: user.id,
    });
  
  if (error) {
    throw error;
  }
  
  revalidatePath('/learn/my-courses');
  return { success: true };
}

export async function updateCourseProgress(
  enrollmentId: string,
  lessonId: string,
  completed: boolean
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('Unauthorized');
  }
  
  const { error } = await supabase
    .from('lesson_progress')
    .upsert({
      enrollment_id: enrollmentId,
      lesson_id: lessonId,
      completed,
      completed_at: completed ? new Date().toISOString() : null,
    });
  
  if (error) {
    throw error;
  }
  
  revalidatePath('/learn/course/[id]');
  return { success: true };
}
```

---

## Tailwind Config (`tailwind.config.ts`)

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## Next Steps

1. **Run the setup commands** above
2. **Apply the database migration** 
3. **Copy the core files** into your project
4. **Start development server**: `npm run dev`
5. **Build your first feature** using the patterns above

---

## Common Commands

```bash
# Development
npm run dev

# Database
npx supabase db push
npx supabase gen types typescript --local > src/types/database.ts
npx supabase db reset  # Reset database (dev only)

# Build
npm run build
npm run start

# Lint
npm run lint
```

---

## Reference

For detailed architecture and component breakdown, see:
- `DJ-JAYTEK-MUSIC-README.md` - Full architecture documentation
- `ARCHITECTURE-ANALYSIS.md` - Oros-core to DJ-Jaytek mapping
- [Oros-Core Documentation](./01-executive-summary.md) - Original patterns
