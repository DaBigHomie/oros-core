# Product Requirements Document (PRD): Oros Platform

**Version:** 1.1  
**Status:** Draft  
**Owner:** Phoenix (Founder) / Dame Luthas (Technical Lead)  
**Date:** December 30, 2025

---

## 1. Project Overview

Oros is a performance-based "Creative Economy" platform designed to facilitate transactions between three distinct user groups: Creators, Businesses, and Supporters. The platform solves the problem of unverified marketing spend and influencer monetization through a verified, commission-based ecosystem.

---

## 2. Target Audience

| User Type | Description | Primary Need |
|-----------|-------------|--------------|
| **Creators** | Micro-influencers and talent seeking monetization | Performance-based income opportunities |
| **Businesses** | Companies seeking risk-free marketing | High ROI with cultural alignment |
| **Supporters** | Users driving traffic through engagement | Micro-commissions for sharing |

---

## 3. Functional Requirements

### 3.1 User Management & Authentication

| Requirement | Priority | Status |
|-------------|----------|--------|
| Multi-Platform OAuth (Google, Facebook, Microsoft) | P0 | 🔲 Pending |
| Email/Password fallback with verification | P0 | 🔲 Pending |
| Dual-Factor Authentication (2FA) for financial operations | P0 | 🔲 Pending |
| Distinct onboarding flows (Creator vs Business) | P0 | 🔲 Pending |
| Profile type selection during signup | P1 | 🔲 Pending |

**Implementation Notes:**
- Use Supabase Auth or Clerk for out-of-box OAuth + 2FA
- Session management with secure HTTP-only cookies
- Rate limiting on auth endpoints (10 attempts/minute)

---

### 3.2 Core Feature: Matching Engine

| Requirement | Priority | Status |
|-------------|----------|--------|
| Hashtag-based matching algorithm | P0 | 🔲 Pending |
| Weighted keyword scoring for relevance | P1 | 🔲 Pending |
| Dual-sided discovery (Creators ↔ Businesses) | P0 | 🔲 Pending |
| "Tinder-style" match notifications | P1 | 🔲 Pending |
| Search with filters (industry, payout, location) | P1 | 🔲 Pending |

**Algorithm Logic:**
```
Match Score = (Σ matched_hashtag_weights) / total_campaign_hashtags
```

- Creators select up to 10 niche hashtags
- Businesses tag campaigns with relevant keywords
- System calculates intersection and weighted relevance
- Matches above threshold (e.g., 0.6) trigger notifications

---

### 3.3 Creator Features

| Requirement | Priority | Status |
|-------------|----------|--------|
| Video profile uploads (30-60 sec intros) | P0 | 🔲 Pending |
| Niche hashtag selection (up to 10 tags) | P0 | 🔲 Pending |
| Real-time earnings dashboard | P0 | 🔲 Pending |
| Campaign acceptance/rejection workflow | P0 | 🔲 Pending |
| Withdrawal portal (Stripe/PayPal) | P0 | 🔲 Pending |
| Transaction history with filtering | P1 | 🔲 Pending |
| "Evolution" progress tracking (tier system) | P1 | 🔲 Pending |

**Dashboard Components:**
- Current Balance (available / pending)
- Active Campaigns list with status
- Match suggestions feed
- Messages/notifications center
- Profile completion percentage

---

### 3.4 Business Features

| Requirement | Priority | Status |
|-------------|----------|--------|
| Campaign creation wizard | P0 | 🔲 Pending |
| Commission structure definition (CPC/CPS/Hybrid) | P0 | 🔲 Pending |
| Performance analytics dashboard | P0 | 🔲 Pending |
| Talent search with filters | P0 | 🔲 Pending |
| Budget management and spend tracking | P1 | 🔲 Pending |
| Favorites/saved creators list | P2 | 🔲 Pending |

**Campaign Creation Fields:**
- Campaign name and description
- Hashtag/keyword tags (for matching)
- Commission type: CPC (cost per click) / CPS (cost per sale) / Hybrid
- Commission rate ($ or %)
- Budget cap (optional)
- Duration (start/end dates)
- Media assets (images, guidelines)

---

### 3.5 Supporter Features

| Requirement | Priority | Status |
|-------------|----------|--------|
| Unique referral link generation | P0 | 🔲 Pending |
| Click/conversion tracking | P0 | 🔲 Pending |
| Micro-commission balance and history | P0 | 🔲 Pending |
| Social sharing integration | P1 | 🔲 Pending |
| Withdrawal threshold ($10 minimum) | P1 | 🔲 Pending |

**Tracking Mechanism:**
- 30-day cookie attribution window
- UTM parameter tracking for link clicks
- Conversion webhooks from business sites
- Real-time balance updates

---

### 3.6 Financial & Transactional Logic

| Requirement | Priority | Status |
|-------------|----------|--------|
| Stripe Connect integration (split payouts) | P0 | 🔲 Pending |
| Automated 3% platform fee deduction | P0 | 🔲 Pending |
| Click attribution tracking | P0 | 🔲 Pending |
| Sale conversion webhook handlers | P0 | 🔲 Pending |
| Tiered subscription gating | P1 | 🔲 Pending |
| PayPal fallback for payouts | P2 | 🔲 Pending |

**Stripe Connect Flow:**
```
Business funds campaign → Escrow in Stripe
    ↓
Creator generates click/sale → Verified via webhook
    ↓
Payout triggered:
  - Creator receives: 97% of commission
  - Platform receives: 3% fee
    ↓
Transfer to Creator's connected Stripe account
```

---

### 3.7 Gamification & Psychology

| Requirement | Priority | Status |
|-------------|----------|--------|
| Milestone bonuses for campaign completion | P1 | 🔲 Pending |
| "Evolution" tier progress visualization | P1 | 🔲 Pending |
| Achievement badges | P2 | 🔲 Pending |
| Time-limited bonus multipliers | P2 | 🔲 Pending |
| Leaderboards (Phase 2) | P3 | 🔲 Pending |

**Evolution Tiers:**
| Tier | Requirements | Benefits |
|------|--------------|----------|
| **Free** | Signup | 5 matches/day, basic profile |
| **Pro** | $20/mo or 10 completed campaigns | Unlimited matches, analytics |
| **Series** | $100/mo or 50 completed campaigns | Premium brands, verified badge, priority support |

---

### 3.8 Communication System

| Requirement | Priority | Status |
|-------------|----------|--------|
| Real-time messaging between matched parties | P0 | 🔲 Pending |
| Message encryption (E2E) | P1 | 🔲 Pending |
| File/media sharing in chat | P2 | 🔲 Pending |
| Email notifications for new messages | P1 | 🔲 Pending |
| Push notifications (PWA) | P2 | 🔲 Pending |

---

## 4. Technical Requirements

### 4.1 Architecture

| Component | Specification |
|-----------|---------------|
| **Frontend** | Next.js 14 (App Router) with PWA manifest |
| **Styling** | Tailwind CSS + shadcn/ui components |
| **Database** | Supabase (PostgreSQL) with Row Level Security |
| **Authentication** | Supabase Auth (OAuth 2.0 + 2FA) |
| **Payments** | Stripe Connect (Express accounts) |
| **Video Hosting** | Mux or Cloudflare Stream |
| **CDN/Security** | Cloudflare (WAF, DDoS, SSL) |
| **Hosting** | Vercel (Edge deployment) |

### 4.2 PWA Requirements

```json
{
  "name": "Oros",
  "short_name": "Oros",
  "description": "The Creative Economy Platform",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#000000",
  "theme_color": "#FFD700"
}
```

- Service worker for offline capability
- "Add to Home Screen" prompt
- App-like navigation (no browser chrome)
- Push notification support

### 4.3 External Integrations

| Service | Purpose | Priority |
|---------|---------|----------|
| **Stripe Connect** | Multi-party payouts with fee splitting | P0 |
| **Supabase** | Database + Auth + Realtime subscriptions | P0 |
| **Mux** | Video upload and streaming | P1 |
| **Cloudflare** | Security, CDN, DNS | P0 |
| **PostHog** | Product analytics | P2 |
| **Resend** | Transactional emails | P1 |

---

## 5. Non-Functional Requirements

| Requirement | Target | Measurement |
|-------------|--------|-------------|
| **Page Load Time** | < 2 seconds | Core Web Vitals |
| **Uptime** | 99.9% | Vercel + Supabase SLA |
| **Mobile Lighthouse Score** | 90+ | PWA audit |
| **Security** | SOC 2 ready | Penetration testing |
| **Scalability** | 100K concurrent users | Load testing |

---

## 6. Success Metrics

### 6.1 Onboarding Metrics

| Metric | Target (30 days) |
|--------|------------------|
| Creator signups | 500 |
| Business signups | 50 |
| Profile completion rate | 70% |

### 6.2 Engagement Metrics

| Metric | Target (30 days) |
|--------|------------------|
| Matches created | 1,000 |
| Messages sent | 5,000 |
| Campaigns launched | 100 |

### 6.3 Revenue Metrics

| Metric | Target (30 days) |
|--------|------------------|
| Total GMV | $25,000 |
| Platform revenue (3%) | $750 |
| Pro subscriptions | 25 |

---

## 7. Out of Scope (MVP)

The following features are explicitly excluded from MVP and planned for future phases:

- Native iOS/Android apps
- Advanced ML-based matching
- White-label creator cards (SoFi)
- Oros OS enterprise features
- Multi-language support
- Advanced analytics dashboards
- API for third-party integrations

---

## 8. Open Questions

| Question | Owner | Status |
|----------|-------|--------|
| Minimum payout threshold for Creators? | Phoenix | 🔲 Pending |
| Campaign approval workflow (auto vs manual)? | Phoenix | 🔲 Pending |
| Dispute resolution process? | Phoenix | 🔲 Pending |
| Content moderation policy? | Phoenix | 🔲 Pending |
| KYC requirements for high-volume Creators? | Dame | 🔲 Pending |

---

**Next Document:** [Launch Roadmap](03-launch-roadmap.md)
