# Product Requirements Document (PRD): OROS™ Platform

**Version:** 2.0  
**Status:** Confirmed  
**Owner:** Phoenix (Founder) / Dame Luthas (Technical Lead)  
**Date:** December 30, 2025

---

## 1. Project Overview

OROS™ is a performance-based financial operating system that tracks attention, promotion, and conversion — then attributes value and pays users automatically based on verified outcomes.

**Core Principle:** No verified event = no payout.

---

## 2. MVP Scope Definition

### ✅ Included in MVP (Q1 2026)

| Feature | Priority |
|---------|----------|
| User authentication (multi-role) | P0 |
| Creator profiles | P0 |
| Business profiles | P0 |
| Campaign creation & management | P0 |
| Hashtag-based matching engine | P0 |
| Wallet system (escrow-first) | P0 |
| Immutable ledger | P0 |
| Attribution & tracking | P0 |
| Payout processing | P0 |
| Basic analytics | P1 |

### ⏳ Deferred to Phase 2

| Feature | Target |
|---------|--------|
| Communities | Feb 2026 |
| Tipping system | Feb 2026 |
| Content locking | Feb 2026 |
| Supporter earnings (boost/share) | Feb 2026 |
| Membership tiers (Oros+/Pro) | Feb 2026 |
| Reward multipliers | Feb 2026 |

### ⏳ Deferred to Phase 3+

| Feature | Target |
|---------|--------|
| Live shopping | Q2 2026 |
| OrosCard | Q3 2026 |
| Prediction markets | Q4 2026 |
| AI optimization | 2027 |

---

## 3. User Roles & Permissions

### Multi-Role System

Users can hold **multiple roles simultaneously**:

| Role | Description |
|------|-------------|
| `creator` | Executes campaigns, earns payouts |
| `supporter` | Participates, earns rewards (Phase 2) |
| `business` | Funds campaigns, pays for results |
| `admin` | Platform administration |

### MVP Permissions

| Action | Creator | Supporter | Business |
|--------|---------|-----------|----------|
| Create profile | ✅ | ✅ | ✅ |
| Accept campaigns | ✅ | ❌ | ❌ |
| Create campaigns | ❌ | ❌ | ✅ |
| Fund campaigns | ❌ | ❌ | ✅ |
| Earn from campaigns | ✅ | ⏳ Phase 2 | ❌ |
| Receive tips | ✅ | ❌ | ❌ |
| Send tips | ✅ | ✅ | ✅ |
| Withdraw funds | ✅ | ⏳ Phase 2 | ❌ |

---

## 4. Functional Requirements

### 4.1 Authentication & Identity

| Requirement | Priority | Status |
|-------------|----------|--------|
| Email/password authentication | P0 | 🔲 |
| Google OAuth | P0 | 🔲 |
| Role selection during signup | P0 | 🔲 |
| Multi-role assignment | P0 | 🔲 |
| 2FA for financial operations | P1 | 🔲 |
| KYC status tracking | P1 | 🔲 |

### 4.2 Creator Features

| Requirement | Priority | Status |
|-------------|----------|--------|
| Profile creation (bio, image, username) | P0 | 🔲 |
| Hashtag/niche selection | P0 | 🔲 |
| View matched campaigns | P0 | 🔲 |
| Accept/reject campaigns | P0 | 🔲 |
| View earnings dashboard | P0 | 🔲 |
| Wallet balance (available + pending) | P0 | 🔲 |
| Transaction history | P1 | 🔲 |
| Withdrawal requests | P0 | 🔲 |

### 4.3 Business Features

| Requirement | Priority | Status |
|-------------|----------|--------|
| Business profile (company, website, industry) | P0 | 🔲 |
| Campaign creation wizard | P0 | 🔲 |
| Campaign funding (escrow) | P0 | 🔲 |
| Set campaign objective (click/conversion/sale) | P0 | 🔲 |
| Set payout per action | P0 | 🔲 |
| Set total budget | P0 | 🔲 |
| View matched creators | P0 | 🔲 |
| Accept/reject creator applications | P0 | 🔲 |
| Campaign performance dashboard | P1 | 🔲 |
| Budget tracking (remaining/spent) | P0 | 🔲 |

### 4.4 Matching Engine

| Requirement | Priority | Status |
|-------------|----------|--------|
| Hashtag-based matching algorithm | P0 | 🔲 |
| Creator → Campaign discovery | P0 | 🔲 |
| Business → Creator search | P0 | 🔲 |
| Match scoring (% relevance) | P1 | 🔲 |
| Filter by industry/payout/objective | P1 | 🔲 |

### 4.5 Campaign Lifecycle

```
1. Business creates campaign
2. Business funds campaign (escrow)
3. Creators matched and notified
4. Creators accept campaign
5. Tracking links generated
6. Events tracked & verified
7. Payouts calculated (20% platform fee)
8. Creator wallets credited
9. Campaign completes when budget depleted or end date reached
```

### 4.6 Wallet & Ledger System

| Requirement | Priority | Status |
|-------------|----------|--------|
| Wallet created on signup | P0 | 🔲 |
| Separate pending/available balances | P0 | 🔲 |
| Immutable ledger entries | P0 | 🔲 |
| Escrow on campaign funding | P0 | 🔲 |
| Platform fee deduction before credit | P0 | 🔲 |
| Pending → available after verification | P0 | 🔲 |
| Withdrawal processing | P0 | 🔲 |

**Ledger Entry Types:**
- `credit` — Money added to wallet
- `debit` — Money removed from wallet

**Source Types (MVP):**
- `campaign` — Campaign payout
- `withdrawal` — Funds withdrawn
- `escrow` — Business funding campaign

### 4.7 Attribution & Tracking

| Requirement | Priority | Status |
|-------------|----------|--------|
| Tracking link generation | P0 | 🔲 |
| Click event capture | P0 | 🔲 |
| Conversion event capture | P0 | 🔲 |
| Sale event capture | P0 | 🔲 |
| Event verification logic | P0 | 🔲 |
| Attribution to creator | P0 | 🔲 |
| Duplicate/fraud filtering | P1 | 🔲 |

**Event Types:**
- `click` — User clicked tracking link
- `conversion` — User completed signup/action
- `sale` — User completed purchase

### 4.8 Payout System

| Requirement | Priority | Status |
|-------------|----------|--------|
| Calculate payout per verified event | P0 | 🔲 |
| Deduct platform fee (20%) | P0 | 🔲 |
| Credit creator wallet | P0 | 🔲 |
| Debit campaign budget | P0 | 🔲 |
| Stripe Connect payout | P0 | 🔲 |

**Payout Formula:**
```
creator_payout = event_value × (1 - platform_fee)
creator_payout = $10 × 0.80 = $8.00 (Creator receives)
platform_revenue = $10 × 0.20 = $2.00 (OROS™ receives)
```

---

## 5. Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| Page load time | < 2 seconds |
| Uptime | 99.9% |
| Mobile Lighthouse score | 90+ |
| Ledger immutability | Append-only, no updates/deletes |
| Audit trail | Full event history |

---

## 6. Success Metrics (MVP)

### Week 1-2 (Launch)
| Metric | Target |
|--------|--------|
| Creator signups | 50 |
| Business signups | 10 |
| Campaigns created | 5 |

### Week 3-4
| Metric | Target |
|--------|--------|
| Active matches | 25 |
| Tracked events | 500 |
| First payout processed | 1 |

### Month 1
| Metric | Target |
|--------|--------|
| Total GMV | $5,000 |
| Platform revenue (20%) | $1,000 |
| Creator retention | 60% |

---

## 7. Open Questions (Resolved)

| Question | Decision |
|----------|----------|
| Fee structure? | 20% campaigns, 10-15% tips, 3% card |
| Can free creators receive tips? | ✅ Yes |
| Communities in MVP? | ❌ Phase 2 |
| Supporter earnings in MVP? | ❌ Phase 2 |
| Timeline? | Q1 2026 launch |

---

## 8. Engineering Principles

1. **No event = no payout**
2. **Ledger is immutable**
3. **Money always escrowed first**
4. **Permissions controlled by role**
5. **Everything must be auditable**
6. **No verification = no payout**

---

**Next Document:** [Database Schema](03-database-schema.md)
