# Oros: The Creative Economy Platform

> A high-performance Creative Economy platform bridging influencers, businesses, and supporters through hashtag-based matching and a verified commission-based marketplace.

[![Status](https://img.shields.io/badge/Status-Active%20Development-brightgreen)]()
[![Phase](https://img.shields.io/badge/Phase-MVP%20Sprint-blue)]()
[![Target Launch](https://img.shields.io/badge/Launch-Q1%202026-orange)]()

---

## Overview

Oros is a multi-sided marketplace designed to revolutionize the creator economy through cultural alignment and performance-based marketing. By leveraging a unique three-sided model, Oros creates a symbiotic ecosystem where creators monetize influence, businesses scale with zero risk, and supporters share in the revenue.

**Target Market:** $750 Billion annual creator and influence industry

---

## 🚀 The MVP Sprint

This repository represents a professional agency-led build targeting a production-ready MVP for Q1 2026. The development follows a structured 14-day sprint methodology broken into focused delivery blocks.

---

## 💎 Core Pillars

| Pillar | Value Proposition |
|--------|-------------------|
| **Creators** | Global monetization via "Tinder-style" hashtag matching and video-centric talent profiles |
| **Businesses** | Risk-free marketing environment; pay only for performance (clicks/sales) |
| **Supporters** | Engagement-based micro-commissions for driving traffic and social sharing |

---

## 🛠️ Key Features

- **Hashtag Matching Engine:** Dual-sided keyword-weighted alignment logic
- **PWA Architecture:** High-performance Progressive Web App for cross-platform, app-store-free installation
- **Transaction Logic:** Automated 3% platform fee deduction and integrated Stripe Connect payout modules
- **Gamification (Evolution Loops):** Psychological progress tracking for tier upgrades (Free → Pro → Series)
- **Oros OS (Alpha):** Initial framework for enterprise Revenue Operations and sales leakage optimization

---

## 💻 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 14 (App Router) + Tailwind CSS |
| **PWA** | Service Workers + Web App Manifest |
| **Authentication** | Supabase Auth (Google OAuth 2.0 + 2FA) |
| **Database** | Supabase (PostgreSQL) with Row Level Security |
| **Payments** | Stripe Connect + PayPal |
| **Video Hosting** | Mux / Cloudflare Stream |
| **Infrastructure** | Vercel + Cloudflare (Security & CDN) |

---

## 📂 Repository Structure

```
oros-core/
├── docs/
│   ├── 01-executive-summary.md
│   ├── 02-product-requirements.md
│   ├── 03-launch-roadmap.md
│   ├── 04-sitemap.md
│   ├── 05-implementation-steps.md
│   ├── 06-cost-validation.md
│   └── 07-technical-stack.md
├── src/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── types/
├── public/
│   ├── icons/
│   └── manifest.json
├── .env.example
├── next.config.js
├── tailwind.config.ts
└── README.md
```

---

## 📄 Documentation

| Document | Description |
|----------|-------------|
| [Executive Summary](docs/01-executive-summary.md) | Mission, market opportunity, ecosystem overview |
| [Product Requirements](docs/02-product-requirements.md) | Functional & technical requirements (PRD) |
| [Launch Roadmap](docs/03-launch-roadmap.md) | Sprint timeline and milestones |
| [Platform Sitemap](docs/04-sitemap.md) | Navigation architecture and routes |
| [Implementation Steps](docs/05-implementation-steps.md) | Execution roadmap and next actions |
| [Cost Validation](docs/06-cost-validation.md) | Budget breakdown by phase |
| [Technical Stack](docs/07-technical-stack.md) | Recommended technologies and architecture |

---

## 🚦 Getting Started

```bash
# Clone the repo
git clone https://github.com/dameluthas/oros-core.git
cd oros-core

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local

# Run development server
npm run dev
```

---

## 🔐 Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

# App
NEXT_PUBLIC_APP_URL=
```

---

## Project Team

- **Phoenix** - Founder
- **Dame Luthas** - Technical Lead (DAMIEUS Technology Solutions)

---

## Confidentiality

> ⚠️ **CONFIDENTIAL:** This repository contains proprietary business information protected under NDA. Unauthorized distribution is prohibited.

---

**Author:** Dame Luthas  
**Status:** Confidential / Active Sprint  
**Copyright:** © 2025 Oros. All Rights Reserved.

*Last Updated: December 30, 2025*
