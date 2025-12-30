# Oros Platform: Technical Stack & Architecture

**Document:** Technical Architecture & Implementation Guide  
**Date:** December 30, 2025  
**Version:** 1.1  
**Author:** Dame Luthas  
**Status:** Confidential

---

## 1. Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                                 │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                 │
│  │   Mobile    │  │   Desktop   │  │   Tablet    │                 │
│  │    PWA      │  │    PWA      │  │    PWA      │                 │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘                 │
│         └────────────────┼────────────────┘                        │
│                          ▼                                          │
│              ┌───────────────────────┐                             │
│              │   Next.js 14 (SSR)    │                             │
│              │   App Router + RSC    │                             │
│              └───────────┬───────────┘                             │
│                          │                                          │
├──────────────────────────┼──────────────────────────────────────────┤
│                   EDGE LAYER                                        │
├──────────────────────────┼──────────────────────────────────────────┤
│                          ▼                                          │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    Cloudflare                                │   │
│  │   • WAF  • DDoS Protection  • CDN  • SSL Termination        │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                          │                                          │
│                          ▼                                          │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                      Vercel                                  │   │
│  │   • Edge Functions  • Serverless  • ISR  • Analytics        │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                          │                                          │
├──────────────────────────┼──────────────────────────────────────────┤
│                   API LAYER                                         │
├──────────────────────────┼──────────────────────────────────────────┤
│                          ▼                                          │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐          │
│  │  Auth API     │  │  Core API     │  │  Webhooks     │          │
│  │  /api/auth    │  │  /api/*       │  │  /api/webhooks│          │
│  └───────┬───────┘  └───────┬───────┘  └───────┬───────┘          │
│          │                  │                  │                    │
├──────────┼──────────────────┼──────────────────┼────────────────────┤
│                   DATA LAYER                                        │
├──────────┼──────────────────┼──────────────────┼────────────────────┤
│          ▼                  ▼                  ▼                    │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                     Supabase                                 │   │
│  │   • PostgreSQL  • Auth  • Realtime  • Storage  • Edge Funcs │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                          │                                          │
├──────────────────────────┼──────────────────────────────────────────┤
│                EXTERNAL SERVICES                                    │
├──────────────────────────┼──────────────────────────────────────────┤
│          ┌───────────────┼───────────────┐                         │
│          ▼               ▼               ▼                         │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐                  │
│  │   Stripe    │ │    Mux      │ │   Resend    │                  │
│  │  Payments   │ │   Video     │ │   Email     │                  │
│  └─────────────┘ └─────────────┘ └─────────────┘                  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 2. Technology Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 14.x | React framework with App Router |
| **React** | 18.x | UI component library |
| **TypeScript** | 5.x | Type safety |
| **Tailwind CSS** | 3.x | Utility-first styling |
| **shadcn/ui** | Latest | Pre-built accessible components |
| **Lucide React** | Latest | Icon library |
| **React Hook Form** | 7.x | Form handling |
| **Zod** | 3.x | Schema validation |
| **TanStack Query** | 5.x | Server state management |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Supabase** | Latest | Database + Auth + Realtime |
| **PostgreSQL** | 15.x | Primary database |
| **Supabase Auth** | Latest | Authentication + OAuth |
| **Supabase Realtime** | Latest | WebSocket subscriptions |
| **Supabase Storage** | Latest | File uploads |
| **Edge Functions** | Deno | Serverless compute |

### Infrastructure

| Technology | Purpose |
|------------|---------|
| **Vercel** | Hosting + Edge deployment |
| **Cloudflare** | CDN + Security + DNS |
| **GitHub** | Version control + CI/CD |

### External Services

| Service | Purpose | Pricing Model |
|---------|---------|---------------|
| **Stripe Connect** | Marketplace payments | % per transaction |
| **Mux** | Video hosting + streaming | Per minute |
| **Resend** | Transactional email | Per email |
| **PostHog** | Product analytics | Event-based |

---

## 3. Project Structure

```
oros-core/
├── .github/
│   └── workflows/
│       ├── ci.yml              # Lint + test on PR
│       └── deploy.yml          # Production deploy
│
├── docs/                       # Documentation
│   ├── 01-executive-summary.md
│   ├── 02-product-requirements.md
│   ├── 03-launch-roadmap.md
│   ├── 04-sitemap.md
│   ├── 05-implementation-steps.md
│   ├── 06-cost-validation.md
│   └── 07-technical-stack.md
│
├── public/
│   ├── icons/                  # PWA icons
│   ├── manifest.json           # PWA manifest
│   └── sw.js                   # Service worker
│
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/             # Auth routes (login, signup)
│   │   │   ├── login/
│   │   │   ├── signup/
│   │   │   └── auth/
│   │   │       └── callback/
│   │   ├── (protected)/        # Authenticated routes
│   │   │   ├── creator/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── discover/
│   │   │   │   ├── profile/
│   │   │   │   └── wallet/
│   │   │   ├── business/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── campaigns/
│   │   │   │   └── talent/
│   │   │   └── layout.tsx
│   │   ├── api/                # API routes
│   │   │   ├── auth/
│   │   │   ├── campaigns/
│   │   │   ├── matches/
│   │   │   ├── webhooks/
│   │   │   │   └── stripe/
│   │   │   └── [...]/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Landing page
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   └── [...]/
│   │   ├── forms/              # Form components
│   │   │   ├── lead-capture-form.tsx
│   │   │   ├── login-form.tsx
│   │   │   └── campaign-form.tsx
│   │   ├── dashboard/          # Dashboard components
│   │   │   ├── stats-card.tsx
│   │   │   ├── match-feed.tsx
│   │   │   └── earnings-chart.tsx
│   │   └── layout/             # Layout components
│   │       ├── header.tsx
│   │       ├── sidebar.tsx
│   │       └── mobile-nav.tsx
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts       # Browser client
│   │   │   ├── server.ts       # Server client
│   │   │   └── middleware.ts   # Auth middleware
│   │   ├── stripe/
│   │   │   ├── client.ts       # Stripe instance
│   │   │   └── actions.ts      # Server actions
│   │   ├── utils/
│   │   │   ├── cn.ts           # Class name helper
│   │   │   └── format.ts       # Formatters
│   │   └── validators/
│   │       ├── campaign.ts     # Zod schemas
│   │       └── profile.ts
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── use-user.ts
│   │   ├── use-matches.ts
│   │   └── use-transactions.ts
│   │
│   └── types/                  # TypeScript types
│       ├── database.ts         # Generated Supabase types
│       ├── api.ts
│       └── index.ts
│
├── supabase/
│   ├── migrations/             # Database migrations
│   │   └── 001_initial_schema.sql
│   ├── functions/              # Edge functions
│   │   └── send-notification/
│   └── config.toml
│
├── .env.example
├── .env.local                  # Local environment (gitignored)
├── .eslintrc.json
├── .gitignore
├── components.json             # shadcn/ui config
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 4. Key Implementation Patterns

### 4.1 Authentication Flow

```typescript
// src/lib/supabase/middleware.ts
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // Redirect unauthenticated users from protected routes
  if (!user && request.nextUrl.pathname.startsWith('/creator')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (!user && request.nextUrl.pathname.startsWith('/business')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return supabaseResponse;
}
```

### 4.2 Database Queries with RLS

```typescript
// src/lib/supabase/queries.ts
import { createClient } from './server';
import type { Campaign, Match, Profile } from '@/types/database';

export async function getCreatorMatches(creatorId: string): Promise<Match[]> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('matches')
    .select(`
      *,
      campaign:campaigns(
        *,
        business:profiles(display_name, avatar_url)
      )
    `)
    .eq('creator_id', creatorId)
    .eq('status', 'pending')
    .order('score', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getActiveCampaigns(): Promise<Campaign[]> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('campaigns')
    .select('*')
    .eq('status', 'active')
    .gte('ends_at', new Date().toISOString())
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}
```

### 4.3 Stripe Connect Integration

```typescript
// src/lib/stripe/actions.ts
'use server';

import Stripe from 'stripe';
import { createClient } from '@/lib/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function createConnectedAccount(userId: string) {
  const supabase = createClient();
  
  // Get user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('email')
    .eq('id', userId)
    .single();

  if (!profile) throw new Error('Profile not found');

  // Create Stripe Express account
  const account = await stripe.accounts.create({
    type: 'express',
    country: 'US',
    email: profile.email,
    capabilities: {
      transfers: { requested: true },
    },
  });

  // Save account ID to profile
  await supabase
    .from('profiles')
    .update({ stripe_account_id: account.id })
    .eq('id', userId);

  // Generate onboarding link
  const accountLink = await stripe.accountLinks.create({
    account: account.id,
    refresh_url: `${process.env.NEXT_PUBLIC_APP_URL}/creator/wallet/reauth`,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/creator/wallet/complete`,
    type: 'account_onboarding',
  });

  return { url: accountLink.url };
}

export async function processCommission(
  campaignId: string,
  creatorId: string,
  amount: number // in cents
) {
  const supabase = createClient();
  
  // Get creator's Stripe account
  const { data: creator } = await supabase
    .from('profiles')
    .select('stripe_account_id')
    .eq('id', creatorId)
    .single();

  if (!creator?.stripe_account_id) {
    throw new Error('Creator has no connected Stripe account');
  }

  const platformFee = Math.round(amount * 0.03); // 3%
  const netAmount = amount - platformFee;

  // Create transfer
  const transfer = await stripe.transfers.create({
    amount: netAmount,
    currency: 'usd',
    destination: creator.stripe_account_id,
    metadata: { campaignId, creatorId, platformFee },
  });

  // Record transaction
  await supabase.from('transactions').insert({
    campaign_id: campaignId,
    creator_id: creatorId,
    type: 'payout',
    amount,
    platform_fee: platformFee / 100, // Store as dollars
    net_amount: netAmount / 100,
    stripe_transfer_id: transfer.id,
    status: 'completed',
  });

  return transfer;
}
```

### 4.4 Matching Algorithm

```typescript
// src/lib/matching/algorithm.ts

interface MatchResult {
  campaignId: string;
  score: number;
  matchedTags: string[];
}

export function calculateMatches(
  creatorHashtags: string[],
  campaigns: Array<{ id: string; hashtags: string[] }>
): MatchResult[] {
  const normalizedCreatorTags = creatorHashtags.map(t => t.toLowerCase());

  return campaigns
    .map(campaign => {
      const normalizedCampaignTags = campaign.hashtags.map(t => t.toLowerCase());
      
      const matchedTags = normalizedCreatorTags.filter(tag =>
        normalizedCampaignTags.includes(tag)
      );

      const score = normalizedCampaignTags.length > 0
        ? matchedTags.length / normalizedCampaignTags.length
        : 0;

      return {
        campaignId: campaign.id,
        score: Math.round(score * 100) / 100, // Round to 2 decimals
        matchedTags,
      };
    })
    .filter(match => match.score >= 0.3) // Minimum 30% overlap
    .sort((a, b) => b.score - a.score);
}

// Enhanced matching with weighted tags (Phase 2)
export function calculateWeightedMatches(
  creatorHashtags: string[],
  campaigns: Array<{ id: string; hashtags: string[]; weights?: Record<string, number> }>
): MatchResult[] {
  const normalizedCreatorTags = creatorHashtags.map(t => t.toLowerCase());

  return campaigns
    .map(campaign => {
      const weights = campaign.weights || {};
      const normalizedCampaignTags = campaign.hashtags.map(t => t.toLowerCase());
      
      const matchedTags = normalizedCreatorTags.filter(tag =>
        normalizedCampaignTags.includes(tag)
      );

      const totalWeight = normalizedCampaignTags.reduce(
        (sum, tag) => sum + (weights[tag] || 1),
        0
      );

      const matchedWeight = matchedTags.reduce(
        (sum, tag) => sum + (weights[tag] || 1),
        0
      );

      const score = totalWeight > 0 ? matchedWeight / totalWeight : 0;

      return {
        campaignId: campaign.id,
        score: Math.round(score * 100) / 100,
        matchedTags,
      };
    })
    .filter(match => match.score >= 0.3)
    .sort((a, b) => b.score - a.score);
}
```

---

## 5. PWA Configuration

### manifest.json

```json
{
  "name": "Oros - The Creative Economy",
  "short_name": "Oros",
  "description": "Where creators monetize, businesses grow, and everyone wins",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#000000",
  "theme_color": "#FFD700",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/icons/icon-72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-96.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-128.png",
      "sizes": "128x128",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-152.png",
      "sizes": "152x152",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-384.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "screenshots": [
    {
      "src": "/screenshots/dashboard.png",
      "sizes": "1280x720",
      "type": "image/png",
      "form_factor": "wide"
    },
    {
      "src": "/screenshots/mobile.png",
      "sizes": "750x1334",
      "type": "image/png",
      "form_factor": "narrow"
    }
  ]
}
```

### next.config.js (PWA)

```javascript
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: '*.supabase.co' },
      { hostname: 'stream.mux.com' },
    ],
  },
};

module.exports = withPWA(nextConfig);
```

---

## 6. Security Considerations

### Row Level Security Policies

```sql
-- Users can only read their own profile
CREATE POLICY "Users read own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can only update their own profile
CREATE POLICY "Users update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Anyone can view active campaigns
CREATE POLICY "Public view active campaigns"
  ON campaigns FOR SELECT
  USING (status = 'active');

-- Businesses can manage their own campaigns
CREATE POLICY "Business manage own campaigns"
  ON campaigns FOR ALL
  USING (auth.uid() = business_id);

-- Creators can only view matches involving them
CREATE POLICY "Creators view own matches"
  ON matches FOR SELECT
  USING (auth.uid() = creator_id);

-- Users can only view their own transactions
CREATE POLICY "Users view own transactions"
  ON transactions FOR SELECT
  USING (
    auth.uid() = creator_id OR
    auth.uid() = supporter_id
  );
```

### API Rate Limiting

```typescript
// src/middleware.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'), // 10 requests per 10 seconds
});

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api')) {
    const ip = request.ip ?? '127.0.0.1';
    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      );
    }
  }

  return updateSession(request);
}
```

---

## 7. Deployment Pipeline

### GitHub Actions CI/CD

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linter
        run: npm run lint
      
      - name: Run type check
        run: npm run type-check
      
      - name: Run tests
        run: npm test
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 8. Monitoring & Observability

### Error Tracking (Sentry)

```typescript
// src/lib/sentry.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
});
```

### Analytics (PostHog)

```typescript
// src/lib/posthog.ts
import posthog from 'posthog-js';

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    capture_pageview: false, // Manual pageview tracking
  });
}

export { posthog };
```

---

**End of Technical Documentation**
