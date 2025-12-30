# Oros Launch Roadmap

**Document:** Launch Roadmap & Sprint Plan  
**Date:** December 30, 2025  
**Version:** 1.1  
**Author:** Dame Luthas  
**Status:** Active Sprint

---

## Sprint Overview

**Original Plan:** 36-Hour Agency Sprint  
**Revised Plan:** 14-Day Structured Build

The original aggressive timeline has been revised to ensure production-quality delivery while maintaining momentum. The build is organized into focused sprints with clear deliverables.

---

## Phase 1: MVP Foundation (14 Days)

### Sprint 1: Launch Infrastructure (Days 1-2)

**Objective:** Deploy landing presence and capture early interest

#### Deliverables

| Task | Priority | Est. Hours | Status |
|------|----------|------------|--------|
| Domain acquisition + DNS configuration | P0 | 1 | 🔲 |
| Cloudflare setup (SSL, WAF, caching) | P0 | 2 | 🔲 |
| Next.js PWA scaffold with manifest | P0 | 3 | 🔲 |
| Splash page with countdown timer | P0 | 4 | 🔲 |
| Lead capture form (email + handle) | P0 | 2 | 🔲 |
| "Day 1 Badge" confirmation emails | P1 | 2 | 🔲 |
| Basic SEO meta tags | P1 | 1 | 🔲 |

**Sprint 1 Total:** ~15 hours

#### Technical Setup

```bash
# Initialize project
npx create-next-app@latest oros-platform --typescript --tailwind --app --src-dir

# Install core dependencies
npm install @supabase/supabase-js stripe @stripe/stripe-js
npm install lucide-react class-variance-authority clsx tailwind-merge

# PWA dependencies
npm install next-pwa
```

#### Acceptance Criteria

- [ ] Domain resolves with valid SSL
- [ ] Splash page loads in < 2 seconds
- [ ] Lead capture stores to Supabase
- [ ] Countdown displays correct time to Jan 1
- [ ] Mobile responsive (tested on iOS/Android)

---

### Sprint 2: Authentication & Profiles (Days 3-5)

**Objective:** Enable user registration and basic profiles

#### Deliverables

| Task | Priority | Est. Hours | Status |
|------|----------|------------|--------|
| Supabase project setup | P0 | 1 | 🔲 |
| Database schema (profiles, campaigns) | P0 | 3 | 🔲 |
| Row Level Security policies | P0 | 2 | 🔲 |
| Google OAuth implementation | P0 | 3 | 🔲 |
| Email/password authentication | P0 | 2 | 🔲 |
| 2FA configuration (TOTP) | P1 | 3 | 🔲 |
| Creator onboarding flow | P0 | 4 | 🔲 |
| Business onboarding flow | P0 | 4 | 🔲 |
| Profile CRUD operations | P0 | 3 | 🔲 |

**Sprint 2 Total:** ~25 hours

#### Database Schema

```sql
-- Profiles (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  type VARCHAR(20) NOT NULL CHECK (type IN ('creator', 'business', 'supporter')),
  display_name VARCHAR(100),
  bio TEXT,
  video_url VARCHAR(500),
  hashtags TEXT[],
  tier VARCHAR(20) DEFAULT 'free',
  stripe_account_id VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Campaigns
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES profiles(id),
  title VARCHAR(200) NOT NULL,
  description TEXT,
  hashtags TEXT[],
  commission_type VARCHAR(20) CHECK (commission_type IN ('cpc', 'cps', 'hybrid')),
  commission_rate DECIMAL(10,2),
  budget_cap DECIMAL(10,2),
  status VARCHAR(20) DEFAULT 'draft',
  starts_at TIMESTAMPTZ,
  ends_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
```

#### Acceptance Criteria

- [ ] Users can sign up with Google OAuth
- [ ] Users can sign up with email/password
- [ ] 2FA can be enabled for accounts
- [ ] Creator/Business selection during onboarding
- [ ] Profile data persists correctly

---

### Sprint 3: Core Matching Engine (Days 6-9)

**Objective:** Enable Creators and Businesses to discover each other

#### Deliverables

| Task | Priority | Est. Hours | Status |
|------|----------|------------|--------|
| Hashtag taxonomy system | P0 | 3 | 🔲 |
| Campaign creation wizard | P0 | 6 | 🔲 |
| Matching algorithm v1 | P0 | 8 | 🔲 |
| Creator discovery feed | P0 | 5 | 🔲 |
| Business talent search | P0 | 5 | 🔲 |
| Match notification system | P1 | 4 | 🔲 |
| Search filters (industry, payout) | P1 | 4 | 🔲 |

**Sprint 3 Total:** ~35 hours

#### Matching Algorithm

```typescript
interface Creator {
  id: string;
  hashtags: string[];
  tier: 'free' | 'pro' | 'series';
}

interface Campaign {
  id: string;
  hashtags: string[];
  commissionRate: number;
}

interface Match {
  creatorId: string;
  campaignId: string;
  score: number;
  matchedTags: string[];
}

function calculateMatches(
  creator: Creator,
  campaigns: Campaign[]
): Match[] {
  return campaigns
    .map(campaign => {
      const matchedTags = creator.hashtags.filter(tag =>
        campaign.hashtags.includes(tag.toLowerCase())
      );
      
      const score = matchedTags.length / campaign.hashtags.length;
      
      return {
        creatorId: creator.id,
        campaignId: campaign.id,
        score,
        matchedTags,
      };
    })
    .filter(match => match.score >= 0.3) // Minimum 30% overlap
    .sort((a, b) => b.score - a.score);
}
```

#### Acceptance Criteria

- [ ] Businesses can create campaigns with hashtags
- [ ] Creators see matched campaigns in feed
- [ ] Businesses can search/filter creators
- [ ] Match score displays on suggestions
- [ ] Notifications trigger on new matches

---

### Sprint 4: Transactions & Payouts (Days 10-14)

**Objective:** Enable financial transactions between parties

#### Deliverables

| Task | Priority | Est. Hours | Status |
|------|----------|------------|--------|
| Stripe Connect account setup | P0 | 2 | 🔲 |
| Creator connected account onboarding | P0 | 6 | 🔲 |
| Campaign funding workflow | P0 | 5 | 🔲 |
| Click tracking infrastructure | P0 | 6 | 🔲 |
| Conversion webhook handlers | P0 | 5 | 🔲 |
| Automated 3% fee logic | P0 | 3 | 🔲 |
| Payout initiation system | P0 | 5 | 🔲 |
| Transaction history UI | P1 | 4 | 🔲 |
| Earnings dashboard | P1 | 4 | 🔲 |

**Sprint 4 Total:** ~40 hours

#### Stripe Connect Integration

```typescript
// Create connected account for Creator
export async function createCreatorAccount(email: string) {
  const account = await stripe.accounts.create({
    type: 'express',
    country: 'US',
    email,
    capabilities: {
      transfers: { requested: true },
    },
    business_type: 'individual',
  });
  
  return account.id;
}

// Generate onboarding link
export async function getOnboardingLink(accountId: string) {
  const accountLink = await stripe.accountLinks.create({
    account: accountId,
    refresh_url: `${process.env.APP_URL}/creator/wallet/reauth`,
    return_url: `${process.env.APP_URL}/creator/wallet/complete`,
    type: 'account_onboarding',
  });
  
  return accountLink.url;
}

// Process payout with platform fee
export async function processCommission(
  amount: number, // in cents
  creatorAccountId: string,
  campaignId: string
) {
  const platformFee = Math.round(amount * 0.03); // 3%
  
  const transfer = await stripe.transfers.create({
    amount: amount - platformFee,
    currency: 'usd',
    destination: creatorAccountId,
    metadata: {
      campaignId,
      platformFee,
    },
  });
  
  return transfer;
}
```

#### Acceptance Criteria

- [ ] Creators can connect Stripe accounts
- [ ] Businesses can fund campaigns
- [ ] Clicks are tracked with attribution
- [ ] Conversions trigger payouts
- [ ] 3% fee deducted automatically
- [ ] Transaction history displays correctly

---

## Phase 2: Market Validation (Q1 2026)

**Timeline:** January 15 - March 31, 2026

| Milestone | Target Date | Deliverables |
|-----------|-------------|--------------|
| Public Marketplace | Jan 15 | Open registration for all users |
| Pro Tier Launch | Jan 20 | $20/mo subscription + features |
| Series Tier Launch | Feb 1 | $100/mo premium features |
| Supporter System | Feb 15 | Referral links + micro-commissions |
| Analytics v1 | Mar 1 | Creator/Business dashboards |
| Series A Prep | Mar 15 | Investor deck with real data |

---

## Phase 3: Scale Infrastructure (Q2 2026)

**Timeline:** April - June 2026

| Milestone | Deliverables |
|-----------|--------------|
| Multi-Region Database | Supabase read replicas |
| Advanced Matching | ML-based recommendations |
| Mobile Optimization | React Native evaluation |
| Oros OS Alpha | RevOps dashboard for Businesses |

---

## Phase 4: Enterprise & Fintech (Q3-Q4 2026)

**Timeline:** July - December 2026

| Milestone | Deliverables |
|-----------|--------------|
| 100K User Milestone | Trigger fintech partnerships |
| SoFi Integration | White-label creator cards |
| Enterprise Tier | Fortune 500 onboarding |
| International | Multi-currency support |

---

## Risk Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Stripe Connect approval delay | Medium | High | Apply immediately, have PayPal fallback |
| Low creator adoption | Medium | High | Seed with inner circle, create demo profiles |
| Payment disputes | Low | Medium | Clear ToS, escrow funds, dispute workflow |
| Technical debt | Medium | Medium | Code reviews, testing from Sprint 2 |

---

## Sprint Ceremonies

| Ceremony | Frequency | Duration | Purpose |
|----------|-----------|----------|---------|
| Daily Standup | Daily | 15 min | Progress + blockers |
| Sprint Review | End of sprint | 30 min | Demo deliverables |
| Sprint Planning | Start of sprint | 1 hour | Scope next sprint |

---

**Next Document:** [Platform Sitemap](04-sitemap.md)
