# OROS™ Technical Stack & Architecture

**Document:** Technical Architecture Guide  
**Date:** December 30, 2025  
**Version:** 2.0  
**Author:** Dame Luthas  
**Status:** Confirmed

---

## 1. Architecture Overview

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
│              └───────────────────────┘                             │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                        EDGE LAYER                                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    Cloudflare                                │   │
│  │   WAF  •  DDoS Protection  •  CDN  •  SSL Termination       │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                          │                                          │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                      Vercel                                  │   │
│  │   Edge Functions  •  Serverless  •  ISR  •  Analytics       │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                        DATA LAYER                                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                     Supabase                                 │   │
│  │   PostgreSQL  •  Auth  •  Realtime  •  Storage  •  RLS      │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                    EXTERNAL SERVICES                                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                 │
│  │   Stripe    │  │    Mux      │  │   Resend    │                 │
│  │  Connect    │  │   Video     │  │   Email     │                 │
│  │  (Escrow)   │  │  (Phase 2)  │  │             │                 │
│  └─────────────┘  └─────────────┘  └─────────────┘                 │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 2. Core Technology Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 14.x | React framework (App Router) |
| **React** | 18.x | UI library |
| **TypeScript** | 5.x | Type safety |
| **Tailwind CSS** | 3.x | Styling |
| **Lucide React** | Latest | Icons |
| **React Hook Form** | 7.x | Form handling |
| **Zod** | 3.x | Validation |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Supabase** | Latest | BaaS (Database + Auth) |
| **PostgreSQL** | 15.x | Primary database |
| **Row Level Security** | — | Data access control |

### Infrastructure

| Technology | Purpose |
|------------|---------|
| **Vercel** | Hosting + Edge |
| **Cloudflare** | CDN + Security |
| **GitHub** | Version control |

### Payments

| Technology | Purpose |
|------------|---------|
| **Stripe Connect** | Marketplace payments |
| **Stripe Checkout** | Campaign funding |
| **Stripe Transfers** | Creator payouts |

---

## 3. Core System Subsystems

| # | Subsystem | MVP | Description |
|---|-----------|-----|-------------|
| 1 | Identity & Role System | ✅ | Multi-role user management |
| 2 | Campaign & Task Engine | ✅ | Business campaign lifecycle |
| 3 | Attribution & Tracking | ✅ | Click/conversion tracking |
| 4 | Wallet & Ledger Engine | ✅ | Escrow-first money flow |
| 5 | Matching Engine | ✅ | Hashtag-based discovery |
| 6 | Community & Tipping | ⏳ | Phase 2 |
| 7 | Live Commerce | ⏳ | Phase 3 |

---

## 4. Project Structure

```
oros-core/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/             # Auth routes
│   │   │   ├── login/
│   │   │   ├── signup/
│   │   │   │   ├── role/
│   │   │   │   ├── creator/
│   │   │   │   └── business/
│   │   │   └── auth/callback/
│   │   ├── (protected)/        # Authenticated routes
│   │   │   ├── creator/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── discover/
│   │   │   │   ├── campaigns/
│   │   │   │   ├── wallet/
│   │   │   │   └── profile/
│   │   │   └── business/
│   │   │       ├── dashboard/
│   │   │       ├── campaigns/
│   │   │       │   ├── new/
│   │   │       │   └── [id]/
│   │   │       └── creators/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   ├── campaigns/
│   │   │   ├── tracking/
│   │   │   ├── payouts/
│   │   │   └── webhooks/stripe/
│   │   ├── t/[code]/           # Tracking redirect
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── ui/                 # Base components
│   │   ├── forms/              # Form components
│   │   ├── dashboard/          # Dashboard widgets
│   │   └── layout/             # Layout components
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts
│   │   │   ├── server.ts
│   │   │   └── middleware.ts
│   │   ├── stripe/
│   │   │   ├── client.ts
│   │   │   └── actions.ts
│   │   ├── auth/
│   │   │   └── roles.ts
│   │   ├── wallet/
│   │   │   ├── operations.ts
│   │   │   └── ledger.ts
│   │   ├── campaigns/
│   │   │   └── create.ts
│   │   ├── matching/
│   │   │   └── algorithm.ts
│   │   ├── tracking/
│   │   │   └── links.ts
│   │   └── payouts/
│   │       └── process.ts
│   │
│   ├── hooks/
│   │   ├── use-user.ts
│   │   ├── use-wallet.ts
│   │   └── use-campaigns.ts
│   │
│   └── types/
│       ├── database.ts         # Generated from Supabase
│       └── index.ts
│
├── supabase/
│   ├── migrations/
│   │   └── 001_initial_schema.sql
│   └── config.toml
│
├── public/
│   ├── icons/
│   └── manifest.json
│
├── .env.example
├── .env.local
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 5. Engineering Principles

### Financial Safety

```
┌────────────────────────────────────────────────────────────┐
│                   MONEY FLOW PRINCIPLES                    │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  1. ESCROW FIRST                                           │
│     Money must be held before any payout                   │
│                                                            │
│  2. IMMUTABLE LEDGER                                       │
│     Never update or delete ledger entries                  │
│                                                            │
│  3. FEE FIRST                                              │
│     Platform fee deducted before crediting creator         │
│                                                            │
│  4. VERIFICATION WINDOW                                    │
│     Pending → Settled only after verification              │
│                                                            │
│  5. NO EVENT = NO PAYOUT                                   │
│     Actions must be tracked and verified                   │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### Money Flow Diagram

```
CAMPAIGN FUNDING FLOW
─────────────────────────────────────────────────────────────

Business                    Stripe                  Platform
    │                          │                        │
    │── Create Campaign ──────►│                        │
    │                          │                        │
    │── Fund Campaign ────────►│                        │
    │   (Checkout Session)     │                        │
    │                          │                        │
    │                          │── Hold Funds ─────────►│
    │                          │   (Escrow)             │
    │                          │                        │
    │◄── Campaign Active ──────│                        │
    │                          │                        │


PAYOUT FLOW
─────────────────────────────────────────────────────────────

Event                      Platform                  Creator
    │                          │                        │
    │── Click/Sale ───────────►│                        │
    │                          │                        │
    │                          │── Verify Event         │
    │                          │                        │
    │                          │── Calculate Payout     │
    │                          │   Gross: $10.00        │
    │                          │   Fee:   $2.00 (20%)   │
    │                          │   Net:   $8.00         │
    │                          │                        │
    │                          │── Credit Wallet ──────►│
    │                          │   (Pending)            │
    │                          │                        │
    │                          │── After Verification ─►│
    │                          │   (Available)          │
    │                          │                        │
```

---

## 6. Database Design Patterns

### Immutable Ledger

```sql
-- NEVER do this:
UPDATE ledger_entries SET amount = 100 WHERE id = '...';
DELETE FROM ledger_entries WHERE id = '...';

-- ALWAYS do this:
INSERT INTO ledger_entries (wallet_id, amount, direction, source_type, source_id)
VALUES ('...', 100, 'credit', 'campaign', '...');

-- For corrections, create a new entry:
INSERT INTO ledger_entries (wallet_id, amount, direction, source_type, source_id, description)
VALUES ('...', 100, 'debit', 'adjustment', '...', 'Correction for entry xyz');
```

### Balance Calculation

```sql
-- Available balance = settled credits - settled debits
SELECT 
  COALESCE(SUM(CASE WHEN direction = 'credit' AND status = 'settled' THEN amount ELSE 0 END), 0) -
  COALESCE(SUM(CASE WHEN direction = 'debit' AND status = 'settled' THEN amount ELSE 0 END), 0)
  AS available_balance,
  
  COALESCE(SUM(CASE WHEN direction = 'credit' AND status = 'pending' THEN amount ELSE 0 END), 0)
  AS pending_balance
FROM ledger_entries
WHERE wallet_id = $1;
```

### Row Level Security Pattern

```sql
-- Users can only see their own data
CREATE POLICY "user_own_data" ON table_name
  FOR ALL
  USING (auth.uid() = user_id);

-- Public data readable by all
CREATE POLICY "public_read" ON campaigns
  FOR SELECT
  USING (status = 'active');

-- Owner can manage their data
CREATE POLICY "owner_manage" ON campaigns
  FOR ALL
  USING (auth.uid() = business_id);
```

---

## 7. API Design Patterns

### Server Actions (Next.js 14)

```typescript
// src/app/creator/campaigns/[id]/actions.ts
'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function acceptCampaign(campaignId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error('Unauthorized');
  
  const { error } = await supabase
    .from('campaign_creators')
    .update({ 
      status: 'accepted',
      accepted_at: new Date().toISOString()
    })
    .eq('campaign_id', campaignId)
    .eq('creator_id', user.id);
  
  if (error) throw error;
  
  revalidatePath('/creator/campaigns');
  return { success: true };
}
```

### API Route Pattern

```typescript
// src/app/api/campaigns/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(req: Request) {
  const supabase = await createClient();
  const { searchParams } = new URL(req.url);
  
  const status = searchParams.get('status') || 'active';
  
  const { data, error } = await supabase
    .from('campaigns')
    .select('*')
    .eq('status', status);
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json({ campaigns: data });
}

export async function POST(req: Request) {
  const supabase = await createClient();
  const body = await req.json();
  
  // Validate with Zod
  const validated = campaignSchema.parse(body);
  
  const { data, error } = await supabase
    .from('campaigns')
    .insert(validated)
    .select()
    .single();
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json({ campaign: data }, { status: 201 });
}
```

---

## 8. Security Patterns

### Authentication Middleware

```typescript
// src/middleware.ts
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => 
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );
  
  const { data: { user } } = await supabase.auth.getUser();
  
  // Protect routes
  if (!user && request.nextUrl.pathname.startsWith('/creator')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  if (!user && request.nextUrl.pathname.startsWith('/business')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return response;
}

export const config = {
  matcher: ['/creator/:path*', '/business/:path*'],
};
```

### Input Validation

```typescript
// src/lib/validators/campaign.ts
import { z } from 'zod';

export const campaignSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string().max(2000).optional(),
  hashtags: z.array(z.string()).min(1).max(10),
  objective: z.enum(['click', 'conversion', 'sale']),
  payout_per_action: z.number().positive().max(1000),
  total_budget: z.number().positive().max(100000),
  start_date: z.string().datetime().optional(),
  end_date: z.string().datetime().optional(),
});

export type CampaignInput = z.infer<typeof campaignSchema>;
```

---

## 9. PWA Configuration

### manifest.json

```json
{
  "name": "OROS - The Creative Economy",
  "short_name": "OROS",
  "description": "Performance-based creator economy platform",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#000000",
  "theme_color": "#EAB308",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

### next.config.js

```javascript
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: '*.supabase.co' },
    ],
  },
};

module.exports = withPWA(nextConfig);
```

---

## 10. Deployment

### Vercel Configuration

```json
// vercel.json
{
  "framework": "nextjs",
  "regions": ["iad1"],
  "env": {
    "NEXT_PUBLIC_SUPABASE_URL": "@supabase-url",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@supabase-anon-key",
    "SUPABASE_SERVICE_ROLE_KEY": "@supabase-service-key",
    "STRIPE_SECRET_KEY": "@stripe-secret-key",
    "STRIPE_WEBHOOK_SECRET": "@stripe-webhook-secret"
  }
}
```

### GitHub Actions

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
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run lint
      - run: npm run build
```

---

**End of Documentation**
