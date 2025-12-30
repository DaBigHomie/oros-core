# Oros Platform: Implementation Steps

**Document:** Implementation & Execution Roadmap  
**Date:** December 30, 2025  
**Version:** 1.1  
**Author:** Dame Luthas  
**Status:** Confidential / Strategic

---

## Overview

This document outlines the tactical implementation steps for bringing Oros from concept to production. Each section includes specific tasks, code examples, and acceptance criteria.

---

## 1. Immediate Actions (Next 48 Hours)

### 1.1 Domain & Infrastructure

| Task | Owner | Due | Status |
|------|-------|-----|--------|
| Secure domain (oros.app or alternative) | Dame | Day 1 | 🔲 |
| Configure Cloudflare DNS | Dame | Day 1 | 🔲 |
| Set up SSL/TLS (Full Strict) | Dame | Day 1 | 🔲 |
| Configure WAF rules | Dame | Day 1 | 🔲 |
| Initialize Vercel project | Dame | Day 1 | 🔲 |

**Cloudflare Configuration:**
```
DNS Records:
  A     @       → Vercel IP
  CNAME www     → cname.vercel-dns.com
  
SSL/TLS: Full (Strict)
Always Use HTTPS: On
Minimum TLS Version: 1.2
```

### 1.2 Stripe Connect Application

| Task | Owner | Due | Status |
|------|-------|-----|--------|
| Create Stripe account | Phoenix | Day 1 | 🔲 |
| Submit Connect platform application | Dame | Day 1 | 🔲 |
| Prepare business documentation | Phoenix | Day 1 | 🔲 |
| Configure webhook endpoints | Dame | Day 2 | 🔲 |

**Note:** Stripe Connect approval takes 2-3 business days. Submit immediately.

### 1.3 Development Environment

```bash
# 1. Clone/Initialize repository
git clone https://github.com/dameluthas/oros-core.git
cd oros-core

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local

# 4. Initialize Supabase
npx supabase init
npx supabase start

# 5. Run database migrations
npx supabase db push

# 6. Start development server
npm run dev
```

### 1.4 Environment Variables Setup

```env
# .env.local

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Oros

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx
SUPABASE_SERVICE_ROLE_KEY=eyJxxx

# Stripe
STRIPE_SECRET_KEY=sk_test_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# OAuth (configured in Supabase dashboard)
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxx
```

---

## 2. Phase 1 Deployment: MVP Build

### 2.1 Splash Page Implementation

**File:** `src/app/page.tsx`

```tsx
import { CountdownTimer } from '@/components/countdown-timer';
import { LeadCaptureForm } from '@/components/lead-capture-form';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          The Creative Economy
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
          Where creators monetize, businesses grow, and everyone wins.
        </p>
        
        {/* Countdown */}
        <CountdownTimer targetDate="2026-01-01T00:00:00" />
        
        {/* Lead Capture */}
        <div className="mt-12 max-w-md mx-auto">
          <LeadCaptureForm />
        </div>
      </section>
      
      {/* Three Pillars */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <PillarCard
            title="Creators"
            description="Monetize your influence from Day 1"
            icon="✨"
          />
          <PillarCard
            title="Businesses"
            description="Pay only for results, not promises"
            icon="📈"
          />
          <PillarCard
            title="Supporters"
            description="Earn by sharing what you love"
            icon="🤝"
          />
        </div>
      </section>
    </main>
  );
}
```

**File:** `src/components/lead-capture-form.tsx`

```tsx
'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export function LeadCaptureForm() {
  const [email, setEmail] = useState('');
  const [handle, setHandle] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const supabase = createClient();
    
    const { error } = await supabase
      .from('leads')
      .insert({ email, handle, source: 'splash' });

    if (!error) {
      setSuccess(true);
      // Trigger confirmation email via Edge Function
    }
    
    setLoading(false);
  };

  if (success) {
    return (
      <div className="bg-green-900/20 border border-green-500 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-green-400">
          🎉 You're on the list!
        </h3>
        <p className="text-gray-400 mt-2">
          Day 1 Badge secured. We'll notify you at launch.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg"
      />
      <input
        type="text"
        placeholder="@yourhandle"
        value={handle}
        onChange={(e) => setHandle(e.target.value)}
        className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition"
      >
        {loading ? 'Joining...' : 'Get Day 1 Badge →'}
      </button>
    </form>
  );
}
```

### 2.2 Authentication Implementation

**File:** `src/lib/supabase/client.ts`

```tsx
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

**File:** `src/app/login/page.tsx`

```tsx
'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    
    if (error) console.error('Auth error:', error);
  };

  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error) {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <h2 className="text-3xl font-bold text-center">Sign in to Oros</h2>
        
        <button
          onClick={signInWithGoogle}
          className="w-full flex items-center justify-center gap-3 py-3 border rounded-lg hover:bg-gray-50"
        >
          <GoogleIcon />
          Continue with Google
        </button>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">or</span>
          </div>
        </div>
        
        <EmailPasswordForm onSubmit={signInWithEmail} />
      </div>
    </div>
  );
}
```

### 2.3 Database Migrations

**File:** `supabase/migrations/001_initial_schema.sql`

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  type VARCHAR(20) NOT NULL CHECK (type IN ('creator', 'business', 'supporter')),
  display_name VARCHAR(100),
  email VARCHAR(255),
  bio TEXT,
  avatar_url VARCHAR(500),
  video_url VARCHAR(500),
  hashtags TEXT[] DEFAULT '{}',
  tier VARCHAR(20) DEFAULT 'free' CHECK (tier IN ('free', 'pro', 'series')),
  stripe_account_id VARCHAR(100),
  stripe_customer_id VARCHAR(100),
  onboarding_complete BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Campaigns table
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  hashtags TEXT[] DEFAULT '{}',
  commission_type VARCHAR(20) CHECK (commission_type IN ('cpc', 'cps', 'hybrid')),
  cpc_rate DECIMAL(10,2),
  cps_rate DECIMAL(5,2),
  budget_cap DECIMAL(10,2),
  budget_spent DECIMAL(10,2) DEFAULT 0,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused', 'completed')),
  starts_at TIMESTAMPTZ,
  ends_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Matches table
CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  creator_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  score DECIMAL(3,2),
  matched_tags TEXT[],
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(campaign_id, creator_id)
);

-- Transactions table
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id UUID REFERENCES campaigns(id),
  creator_id UUID REFERENCES profiles(id),
  supporter_id UUID REFERENCES profiles(id),
  type VARCHAR(20) CHECK (type IN ('click', 'sale', 'subscription', 'payout')),
  amount DECIMAL(10,2) NOT NULL,
  platform_fee DECIMAL(10,2),
  net_amount DECIMAL(10,2),
  stripe_transfer_id VARCHAR(100),
  status VARCHAR(20) DEFAULT 'pending',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leads table (for splash page)
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  handle VARCHAR(100),
  source VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Messages table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID REFERENCES profiles(id),
  recipient_id UUID REFERENCES profiles(id),
  match_id UUID REFERENCES matches(id),
  content TEXT NOT NULL,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_campaigns_business ON campaigns(business_id);
CREATE INDEX idx_campaigns_status ON campaigns(status);
CREATE INDEX idx_campaigns_hashtags ON campaigns USING GIN(hashtags);
CREATE INDEX idx_matches_creator ON matches(creator_id);
CREATE INDEX idx_matches_campaign ON matches(campaign_id);
CREATE INDEX idx_transactions_creator ON transactions(creator_id);
CREATE INDEX idx_profiles_hashtags ON profiles USING GIN(hashtags);

-- Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Anyone can view active campaigns" ON campaigns
  FOR SELECT USING (status = 'active');

CREATE POLICY "Business can manage own campaigns" ON campaigns
  FOR ALL USING (auth.uid() = business_id);

CREATE POLICY "Users can view own matches" ON matches
  FOR SELECT USING (
    auth.uid() = creator_id OR 
    auth.uid() IN (SELECT business_id FROM campaigns WHERE id = campaign_id)
  );

CREATE POLICY "Users can view own transactions" ON transactions
  FOR SELECT USING (auth.uid() = creator_id OR auth.uid() = supporter_id);

CREATE POLICY "Users can view own messages" ON messages
  FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

-- Functions
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();
```

---

## 3. Beta Onboarding & Data Seeding (Jan 1-5)

### 3.1 Inner Circle Activation

| Task | Target | Status |
|------|--------|--------|
| Identify 10 beta Creators | Phoenix | 🔲 |
| Identify 5 beta Businesses | Phoenix | 🔲 |
| Send personalized invites | Dame | 🔲 |
| Onboard with video calls | Both | 🔲 |
| Collect initial hashtag data | Dame | 🔲 |

### 3.2 Demo Content Creation

```typescript
// Seed script for demo profiles
const demoCreators = [
  {
    display_name: 'Ava Style',
    bio: 'Fashion & lifestyle content creator',
    hashtags: ['fashion', 'beauty', 'lifestyle', 'ootd'],
    tier: 'series',
  },
  {
    display_name: 'TechMike',
    bio: 'Tech reviews and unboxing',
    hashtags: ['tech', 'gadgets', 'reviews', 'unboxing'],
    tier: 'pro',
  },
  // ... more demo profiles
];

const demoCampaigns = [
  {
    title: 'Summer Collection Launch',
    description: 'Promote our new summer fashion line',
    hashtags: ['fashion', 'summer', 'style'],
    commission_type: 'cps',
    cps_rate: 15.00,
    budget_cap: 5000,
  },
  // ... more demo campaigns
];
```

### 3.3 Transactional QA

| Test Case | Expected Result | Status |
|-----------|-----------------|--------|
| Creator receives payout | Stripe transfer successful | 🔲 |
| 3% fee deducted correctly | Platform receives fee | 🔲 |
| Transaction history updates | UI reflects transaction | 🔲 |
| Webhook handles edge cases | Graceful error handling | 🔲 |

---

## 4. Revenue & Scale Triggers (Jan 15)

### 4.1 Subscription Implementation

**File:** `src/app/api/stripe/checkout/route.ts`

```typescript
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { tier, userId } = await req.json();
  
  const prices = {
    pro: 'price_xxx', // $20/mo
    series: 'price_yyy', // $100/mo
  };
  
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{
      price: prices[tier as keyof typeof prices],
      quantity: 1,
    }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings/subscription?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    metadata: { userId, tier },
  });
  
  return NextResponse.json({ url: session.url });
}
```

### 4.2 Tier Gating Logic

```typescript
// Middleware for tier-based access
export function checkTierAccess(
  requiredTier: 'free' | 'pro' | 'series',
  userTier: string
): boolean {
  const tierHierarchy = { free: 0, pro: 1, series: 2 };
  return tierHierarchy[userTier] >= tierHierarchy[requiredTier];
}

// Usage in API route
if (!checkTierAccess('pro', user.tier)) {
  return NextResponse.json(
    { error: 'Upgrade to Pro for unlimited matches' },
    { status: 403 }
  );
}
```

---

## 5. Deployment Checklist

### Pre-Launch (Day Before)

- [ ] All environment variables set in Vercel
- [ ] Supabase production project configured
- [ ] Stripe Connect approved and configured
- [ ] DNS propagation verified
- [ ] SSL certificate active
- [ ] Error monitoring enabled (Sentry)
- [ ] Analytics tracking verified (PostHog)

### Launch Day

- [ ] Remove countdown, enable signup
- [ ] Send launch emails to leads
- [ ] Monitor error logs
- [ ] Track signup funnel
- [ ] Respond to support requests
- [ ] Social media announcements

### Post-Launch (Week 1)

- [ ] Daily metrics review
- [ ] Bug triage and hotfixes
- [ ] User feedback collection
- [ ] Performance optimization
- [ ] Documentation updates

---

## 6. Monitoring & Observability

### Key Metrics to Track

| Metric | Tool | Alert Threshold |
|--------|------|-----------------|
| Error rate | Sentry | > 1% |
| Page load time | Vercel Analytics | > 3s |
| API latency | Supabase Dashboard | > 500ms |
| Signup conversion | PostHog | < 10% |
| Match acceptance rate | Custom | < 20% |

### Logging Strategy

```typescript
// Structured logging
import { logger } from '@/lib/logger';

logger.info('User signed up', {
  userId: user.id,
  type: user.type,
  source: 'google_oauth',
});

logger.error('Payment failed', {
  userId: user.id,
  error: error.message,
  stripeError: error.code,
});
```

---

**Next Document:** [Cost Validation](06-cost-validation.md)
