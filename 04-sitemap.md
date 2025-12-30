# Oros Platform Sitemap

**Document:** Navigation Architecture & Route Structure  
**Version:** 1.1  
**Date:** December 30, 2025  
**Author:** Dame Luthas

---

## Overview

This sitemap outlines the navigational architecture for the Oros PWA, organized by user type and access level.

---

## Route Structure

```
oros.app/
│
├── Public Routes (Unauthenticated)
│   ├── /                     # Landing / Splash
│   ├── /login                # Sign in
│   ├── /signup               # Account creation
│   │   ├── /creator          # Creator onboarding
│   │   └── /business         # Business onboarding
│   ├── /about                # Platform info
│   ├── /pricing              # Tier comparison
│   └── /legal
│       ├── /terms            # Terms of Service
│       ├── /privacy          # Privacy Policy
│       └── /nda              # Confidentiality
│
├── Creator Portal (Protected)
│   └── /creator
│       ├── /dashboard        # Main hub
│       ├── /discover         # Campaign discovery
│       ├── /campaigns        # Active campaigns
│       ├── /profile          # Profile management
│       ├── /wallet           # Earnings & payouts
│       ├── /messages         # Communications
│       └── /settings         # Account settings
│
├── Business Portal (Protected)
│   └── /business
│       ├── /dashboard        # Performance overview
│       ├── /campaigns        # Campaign management
│       ├── /talent           # Creator search
│       ├── /billing          # Payment methods
│       ├── /messages         # Communications
│       └── /settings         # Account settings
│
├── Supporter Portal (Protected)
│   └── /supporter
│       ├── /dashboard        # Referral overview
│       ├── /links            # Referral URLs
│       ├── /earnings         # Commission tracking
│       └── /settings         # Preferences
│
└── API Routes
    └── /api
        ├── /auth             # Authentication endpoints
        ├── /webhooks         # Stripe/external webhooks
        ├── /campaigns        # Campaign CRUD
        ├── /matches          # Matching engine
        └── /payouts          # Transaction processing
```

---

## 1. Public / Marketing Tier

### Home / Splash Page (`/`)

| Component | Description |
|-----------|-------------|
| Hero Section | Value proposition + CTA |
| Countdown Clock | NYE launch timer |
| Lead Capture Form | Email + handle collection |
| "Day 1 Badge" CTA | Early adopter incentive |
| Three Pillars | Creator / Business / Supporter benefits |
| Social Proof | Testimonials (Phase 2) |
| Footer | Links + legal |

### Login (`/login`)

| Component | Description |
|-----------|-------------|
| OAuth Buttons | Google, Facebook, Microsoft |
| Email/Password Form | Standard login |
| "Forgot Password" Link | Recovery flow |
| "Create Account" Link | Redirect to signup |

### Signup Flow (`/signup`)

| Step | Route | Description |
|------|-------|-------------|
| 1. Type Selection | `/signup` | Creator vs Business choice |
| 2a. Creator Onboarding | `/signup/creator` | Profile setup, hashtags, video |
| 2b. Business Onboarding | `/signup/business` | Company info, campaign goals |
| 3. Verification | `/signup/verify` | Email confirmation |
| 4. Complete | `/signup/complete` | Success + next steps |

### Pricing (`/pricing`)

| Tier | Price | Highlighted Features |
|------|-------|---------------------|
| Free | $0 | 5 matches/day, basic profile |
| Pro | $20/mo | Unlimited matches, analytics |
| Series | $100/mo | Premium brands, verified badge |

---

## 2. Creator Portal

### Dashboard (`/creator/dashboard`)

```
┌─────────────────────────────────────────────────────────────┐
│  OROS                              [Messages] [Profile] [⚙]  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────┐  ┌─────────────────┐                  │
│  │   BALANCE       │  │   THIS MONTH    │                  │
│  │   $1,247.50     │  │   +$523.00      │                  │
│  │   [Withdraw]    │  │   ↑ 23%         │                  │
│  └─────────────────┘  └─────────────────┘                  │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  EVOLUTION PROGRESS           Pro Tier: 7/10 campaigns│   │
│  │  ████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  70%    │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  NEW MATCHES                                    [View All]  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                    │
│  │ Campaign │ │ Campaign │ │ Campaign │                    │
│  │ Beauty   │ │ Tech     │ │ Fitness  │                    │
│  │ $50/sale │ │ $2/click │ │ $75/sale │                    │
│  └──────────┘ └──────────┘ └──────────┘                    │
│                                                             │
│  ACTIVE CAMPAIGNS                               [View All]  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Brand X Campaign        $127.50 earned    [Details] │   │
│  │ Brand Y Promo           $89.00 earned     [Details] │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Campaign Discovery (`/creator/discover`)

| Component | Description |
|-----------|-------------|
| Search Bar | Keyword search |
| Filters | Industry, commission type, payout range |
| Match Feed | Sorted by relevance score |
| Campaign Cards | Preview with quick-apply |

### Profile (`/creator/profile`)

| Section | Fields |
|---------|--------|
| Basic Info | Display name, bio, location |
| Media | Profile photo, intro video (30-60s) |
| Hashtags | Up to 10 niche tags |
| Social Links | Instagram, TikTok, YouTube, etc. |
| Portfolio | Previous work samples |

### Wallet (`/creator/wallet`)

| View | Description |
|------|-------------|
| Balance | Available + pending amounts |
| Transactions | Filterable history |
| Withdraw | Stripe/PayPal payout request |
| Tax Documents | 1099 download (Phase 2) |

---

## 3. Business Portal

### Dashboard (`/business/dashboard`)

```
┌─────────────────────────────────────────────────────────────┐
│  OROS                              [Messages] [Profile] [⚙]  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────┐  ┌─────────────────┐                  │
│  │   TOTAL SPEND   │  │   CONVERSIONS   │                  │
│  │   $4,520.00     │  │   127 sales     │                  │
│  │   This month    │  │   ↑ 34%         │                  │
│  └─────────────────┘  └─────────────────┘                  │
│                                                             │
│  ┌─────────────────┐  ┌─────────────────┐                  │
│  │   ACTIVE        │  │   ROI           │                  │
│  │   3 campaigns   │  │   4.2x          │                  │
│  │                 │  │   avg return    │                  │
│  └─────────────────┘  └─────────────────┘                  │
│                                                             │
│  CAMPAIGN PERFORMANCE                          [View All]   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Summer Promo    │ 45 clicks │ 12 sales │ $890 spent │   │
│  │ Product Launch  │ 128 clicks│ 31 sales │ $2,100     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  TOP CREATORS                                  [Browse All]  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                    │
│  │ Creator  │ │ Creator  │ │ Creator  │                    │
│  │ @jane    │ │ @mike    │ │ @sarah   │                    │
│  │ 98% match│ │ 94% match│ │ 91% match│                    │
│  └──────────┘ └──────────┘ └──────────┘                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Campaign Manager (`/business/campaigns`)

| View | Description |
|------|-------------|
| Create New | Campaign wizard |
| Draft | Unpublished campaigns |
| Active | Live campaigns |
| Completed | Historical with analytics |

#### Campaign Creation Wizard

| Step | Fields |
|------|--------|
| 1. Basics | Name, description, dates |
| 2. Targeting | Hashtags, creator criteria |
| 3. Commission | Type (CPC/CPS), rate, budget |
| 4. Assets | Images, guidelines, tracking links |
| 5. Review | Summary + publish |

### Talent Search (`/business/talent`)

| Component | Description |
|-----------|-------------|
| Search | Name, hashtag, location |
| Filters | Tier, engagement rate, niche |
| Results Grid | Creator cards with match % |
| Favorites | Saved creators list |

---

## 4. Supporter Portal

### Dashboard (`/supporter/dashboard`)

| Component | Description |
|-----------|-------------|
| Earnings Balance | Available micro-commissions |
| Referral Stats | Clicks, conversions, earnings |
| Your Links | Active referral URLs |
| Leaderboard | Top supporters (Phase 2) |

### Links (`/supporter/links`)

| Feature | Description |
|---------|-------------|
| Generate Link | Create new referral URL |
| Copy Link | One-click copy |
| QR Code | Shareable QR generation |
| Analytics | Per-link performance |

---

## 5. Shared Components

### Messages (`/*/messages`)

| Feature | Description |
|---------|-------------|
| Inbox | All conversations |
| Thread View | Individual conversation |
| Compose | New message to match |
| Attachments | File/media sharing |

### Settings (`/*/settings`)

| Section | Options |
|---------|---------|
| Profile | Edit basic info |
| Security | Password, 2FA |
| Notifications | Email/push preferences |
| Billing | Payment methods (Business) |
| Subscription | Tier management |
| Privacy | Data export, account deletion |

---

## 6. API Routes

### Authentication (`/api/auth`)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/callback` | GET | OAuth callback handler |
| `/logout` | POST | Session termination |

### Webhooks (`/api/webhooks`)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/stripe` | POST | Stripe event handler |
| `/conversion` | POST | Sale conversion tracking |

### Campaigns (`/api/campaigns`)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | List campaigns |
| `/` | POST | Create campaign |
| `/[id]` | GET | Get campaign details |
| `/[id]` | PATCH | Update campaign |
| `/[id]/apply` | POST | Creator applies |

### Matches (`/api/matches`)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Get matches for user |
| `/[id]/accept` | POST | Accept match |
| `/[id]/reject` | POST | Reject match |

---

## Navigation Components

### Header (Authenticated)

```tsx
<Header>
  <Logo />
  <Navigation>
    <NavLink to="/dashboard">Dashboard</NavLink>
    <NavLink to="/discover">Discover</NavLink>
    <NavLink to="/campaigns">Campaigns</NavLink>
  </Navigation>
  <Actions>
    <MessagesIcon badge={unreadCount} />
    <ProfileDropdown />
  </Actions>
</Header>
```

### Mobile Navigation

```tsx
<BottomNav>
  <NavItem icon={Home} to="/dashboard" />
  <NavItem icon={Search} to="/discover" />
  <NavItem icon={Briefcase} to="/campaigns" />
  <NavItem icon={MessageCircle} to="/messages" />
  <NavItem icon={User} to="/profile" />
</BottomNav>
```

---

**Next Document:** [Implementation Steps](05-implementation-steps.md)
