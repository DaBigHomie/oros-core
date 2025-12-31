# OROS™ Launch Roadmap

**Document:** Launch Roadmap & Sprint Plan  
**Date:** December 30, 2025  
**Version:** 2.0  
**Author:** Dame Luthas  
**Status:** Confirmed

---

## Timeline Overview

| Phase | Timeline | Focus |
|-------|----------|-------|
| **MVP** | 2-3 Weeks | Core matching + transactions + wallets |
| **Phase 2** | Feb 2026 | Communities + tipping + supporter earnings |
| **Phase 3** | Q2 2026 | Live shopping + advanced features |
| **Phase 4** | Q3-Q4 2026 | OrosCard + enterprise scale |

---

## MVP Sprint (Q1 2026)

### Sprint 1: Foundation (Days 1-3)

**Goal:** Core identity + infrastructure

| Task | Priority | Hours | Status |
|------|----------|-------|--------|
| Domain + Cloudflare setup | P0 | 2 | 🔲 |
| Vercel project initialization | P0 | 1 | 🔲 |
| Next.js + PWA scaffold | P0 | 3 | 🔲 |
| Supabase project setup | P0 | 1 | 🔲 |
| Database schema (MVP tables) | P0 | 4 | 🔲 |
| Row Level Security policies | P0 | 2 | 🔲 |
| Email/password authentication | P0 | 3 | 🔲 |
| Google OAuth | P0 | 2 | 🔲 |
| Multi-role assignment system | P0 | 3 | 🔲 |
| Wallet creation on signup | P0 | 2 | 🔲 |

**Sprint 1 Deliverables:**
- [ ] Users can sign up (email or Google)
- [ ] Users select role(s) during onboarding
- [ ] Wallet created automatically
- [ ] Basic profile creation

---

### Sprint 2: Profiles & Campaigns (Days 4-7)

**Goal:** Creator and Business functionality

| Task | Priority | Hours | Status |
|------|----------|-------|--------|
| Creator profile setup | P0 | 4 | 🔲 |
| Hashtag/niche selection UI | P0 | 3 | 🔲 |
| Business profile setup | P0 | 4 | 🔲 |
| Campaign creation wizard | P0 | 6 | 🔲 |
| Campaign funding flow (escrow) | P0 | 4 | 🔲 |
| Campaign listing/management | P0 | 4 | 🔲 |
| Campaign status management | P1 | 2 | 🔲 |

**Sprint 2 Deliverables:**
- [ ] Creators can set up profile with hashtags
- [ ] Businesses can create campaigns
- [ ] Campaigns funded via Stripe (escrowed)
- [ ] Campaign budget tracking works

---

### Sprint 3: Matching & Discovery (Days 8-10)

**Goal:** Connect creators with campaigns

| Task | Priority | Hours | Status |
|------|----------|-------|--------|
| Matching algorithm (hashtag-based) | P0 | 6 | 🔲 |
| Creator → Campaign discovery feed | P0 | 4 | 🔲 |
| Business → Creator search | P0 | 4 | 🔲 |
| Match scoring display | P1 | 2 | 🔲 |
| Campaign accept/reject flow | P0 | 3 | 🔲 |
| Notifications on match | P1 | 2 | 🔲 |

**Sprint 3 Deliverables:**
- [ ] Creators see matched campaigns
- [ ] Businesses can browse creators
- [ ] Creators can accept campaigns
- [ ] Match relevance % displayed

---

### Sprint 4: Tracking & Payouts (Days 11-14)

**Goal:** Money flows end-to-end

| Task | Priority | Hours | Status |
|------|----------|-------|--------|
| Tracking link generation | P0 | 3 | 🔲 |
| Click event capture | P0 | 4 | 🔲 |
| Conversion event webhook | P0 | 4 | 🔲 |
| Event verification logic | P0 | 3 | 🔲 |
| Payout calculation (20% fee) | P0 | 3 | 🔲 |
| Ledger entry creation | P0 | 3 | 🔲 |
| Wallet balance updates | P0 | 2 | 🔲 |
| Stripe Connect payout | P0 | 4 | 🔲 |
| Creator earnings dashboard | P0 | 4 | 🔲 |
| Withdrawal request flow | P0 | 3 | 🔲 |

**Sprint 4 Deliverables:**
- [ ] Tracking links generated per creator/campaign
- [ ] Clicks and conversions tracked
- [ ] Payouts calculated with 20% platform fee
- [ ] Creators see earnings in wallet
- [ ] Creators can request withdrawal

---

### Sprint 5: Polish & Launch (Days 15-17)

**Goal:** Production-ready

| Task | Priority | Hours | Status |
|------|----------|-------|--------|
| QA testing all flows | P0 | 6 | 🔲 |
| Bug fixes | P0 | 4 | 🔲 |
| Mobile responsiveness | P0 | 3 | 🔲 |
| Error handling | P1 | 2 | 🔲 |
| Production deployment | P0 | 2 | 🔲 |
| DNS cutover | P0 | 1 | 🔲 |

**Sprint 5 Deliverables:**
- [ ] All user flows tested
- [ ] Mobile experience polished
- [ ] Production environment live
- [ ] Domain pointing to production

---

## MVP Total Estimate

| Category | Hours |
|----------|-------|
| Sprint 1: Foundation | 23 |
| Sprint 2: Profiles & Campaigns | 27 |
| Sprint 3: Matching | 21 |
| Sprint 4: Tracking & Payouts | 33 |
| Sprint 5: Polish | 18 |
| **Total** | **~122 hours** |

---

## Phase 2: Community & Tipping (Feb 2026)

**Goal:** Retention + earnings optimization

| Feature | Description |
|---------|-------------|
| Communities | Creator-owned, free to join |
| Tipping | All creators can receive tips |
| Content locking | Tip-gated content |
| Membership tiers | Oros+ ($19.99), Pro ($99) |
| Supporter rewards | Boost-to-earn, share-to-earn |
| Leaderboards | Top creators/supporters |
| Analytics dashboard | Detailed performance metrics |

### Phase 2 Tasks

| Task | Est. Hours |
|------|------------|
| Community creation | 8 |
| Community posts (public/locked) | 10 |
| Tipping system | 12 |
| Tip unlock flow | 6 |
| Membership billing (Stripe) | 10 |
| Supporter boost system | 8 |
| Reward multipliers | 6 |
| Leaderboards | 6 |
| Analytics dashboard | 12 |
| **Total** | **~78 hours** |

---

## Phase 3: Live Commerce (Q2 2026)

**Goal:** Commerce flywheel

| Feature | Description |
|---------|-------------|
| Live events | Scheduled live shopping sessions |
| Product linking | Track products in live streams |
| Live tracking | Real-time attribution |
| Sale attribution | Multi-party commission splitting |
| Post-live analytics | Performance breakdown |

### Phase 3 Tasks

| Task | Est. Hours |
|------|------------|
| Live event scheduling | 8 |
| Product catalog integration | 12 |
| Live stream tracking | 10 |
| Real-time attribution | 12 |
| Commission splitting | 8 |
| Post-live analytics | 6 |
| **Total** | **~56 hours** |

---

## Phase 4: Enterprise Scale (Q3-Q4 2026)

**Goal:** Platform infrastructure

| Feature | Description |
|---------|-------------|
| OrosCard | White-label payment card (3% tx fee) |
| API for merchants | External integrations |
| Prediction markets | User betting/forecasting |
| Fraud detection | Automated verification |
| AI optimization | Smart matching + recommendations |

---

## Development Milestones

```
2026 Timeline
─────────────────────────────────────────────────────────────
Jan         Feb         Mar         Apr         May         Jun
│           │           │           │           │           │
├─── MVP ───┤           │           │           │           │
│  Launch   │           │           │           │           │
│           ├── Phase 2 ┤           │           │           │
│           │ Community │           │           │           │
│           │  Tipping  │           │           │           │
│           │           ├────── Phase 3 ────────┤           │
│           │           │     Live Commerce     │           │
│           │           │                       ├─ Phase 4 ─┤
│           │           │                       │ OrosCard  │
─────────────────────────────────────────────────────────────
```

---

## Success Criteria

### MVP Launch (Q1 2026)

| Metric | Target |
|--------|--------|
| Creators registered | 100 |
| Businesses registered | 20 |
| Campaigns live | 10 |
| First payout processed | ✅ |
| Total GMV | $5,000 |

### Phase 2 (Feb 2026)

| Metric | Target |
|--------|--------|
| Communities created | 25 |
| Tips processed | 100 |
| Paid memberships | 10 |
| Monthly GMV | $15,000 |

### Phase 3 (Q2 2026)

| Metric | Target |
|--------|--------|
| Live events hosted | 50 |
| Live sales processed | 200 |
| Monthly GMV | $50,000 |

---

## Risk Mitigation

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Stripe Connect delay | Medium | Apply immediately, PayPal backup |
| Low creator adoption | Medium | Seed with beta creators, demo profiles |
| Payment disputes | Low | Clear ToS, escrow, verification window |
| Technical debt | Medium | Code reviews, testing from Sprint 2 |

---

## Engineering Principles (Reminder)

1. **No event = no payout**
2. **Ledger is immutable**
3. **Money always escrowed first**
4. **Permissions controlled by role**
5. **Everything must be auditable**
6. **No verification = no payout**

---

**Next Document:** [Platform Sitemap](05-sitemap.md)
