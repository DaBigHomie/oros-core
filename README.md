# Oros - Creator Economy Platform

A high-performance Creative Economy platform bridging influencers, businesses, and supporters through hashtag-based matching and a verified commission-based marketplace.

## 🚀 Features

### NYE Splash Page
- **Countdown Timer**: Real-time countdown to launch
- **Lead Capture**: Email collection for early access
- **Responsive Design**: Mobile-first, PWA-ready interface

### Creator Dashboard
- **Earnings Tracking**: Real-time revenue monitoring
- **Hashtag Management**: Add/remove hashtags for better matching
- **Video Management**: Upload and track video performance
- **Campaign Matching**: Tinder-style swipe interface for campaign opportunities
- **Analytics**: Views, earnings per video, performance metrics

### Business Dashboard
- **Campaign CRUD**: Create, read, update, delete campaigns
- **Analytics**: Track matches, conversions, and ROI
- **Creator Discovery**: Find creators based on hashtag matching
- **Budget Management**: Set and track campaign budgets

### Supporter Dashboard
- **Referral System**: Unique referral links for earning
- **Commission Tracking**: 3% micro-commissions on referrals
- **Payment Management**: Track pending and paid commissions
- **Social Sharing**: Easy sharing to multiple platforms

### Matching Service
- **Smart Algorithm**: Jaccard similarity-based hashtag matching
- **Tinder-Style UI**: Swipe to accept/reject campaign matches
- **Score-Based Ranking**: Matches sorted by relevance
- **Bidirectional Matching**: Creators and businesses find each other

## 🛠️ Tech Stack

- **Framework**: Next.js 16+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js with Google OAuth
- **Payments**: Stripe (subscriptions + 3% platform fee)
- **Deployment**: Vercel-ready

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/DaBigHomie/oros-core.git
cd oros-core

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Configure your environment variables in .env:
# - NEXTAUTH_SECRET
# - GOOGLE_CLIENT_ID
# - GOOGLE_CLIENT_SECRET
# - STRIPE_SECRET_KEY
# - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
# - STRIPE_WEBHOOK_SECRET

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
NEXTAUTH_SECRET=your-secret-key-change-this-in-production
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Stripe
STRIPE_SECRET_KEY=your-stripe-secret-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
```

## 🗂️ Project Structure

```
oros-core/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/    # NextAuth configuration
│   │   └── stripe/                 # Stripe endpoints
│   ├── creator/                    # Creator dashboard
│   ├── business/                   # Business dashboard
│   ├── shared/                     # Supporter/shared dashboard
│   ├── layout.tsx                  # Root layout
│   ├── page.tsx                    # NYE splash page
│   └── globals.css                 # Global styles
├── components/
│   └── Navbar.tsx                  # Shared navigation
├── lib/
│   ├── matching.ts                 # Hashtag matching algorithm
│   └── stripe.ts                   # Stripe utilities
├── types/
│   └── index.ts                    # TypeScript types
└── public/
    └── manifest.json               # PWA manifest
```

## 🎯 Routing

- `/` - NYE Splash Page (countdown + lead capture)
- `/creator` - Creator Dashboard
- `/business` - Business Dashboard
- `/shared` - Supporter Dashboard
- `/api/auth/[...nextauth]` - Authentication
- `/api/stripe/*` - Payment processing

## 💳 Stripe Integration

### Subscription Model
- Businesses and creators can subscribe for premium features
- Checkout sessions created via `/api/stripe/checkout`

### 3% Platform Fee
- All transactions include a 3% platform fee
- Automatically calculated and split via Stripe Connect
- Payment processing at `/api/stripe/payment`

### Webhook Handling
- Subscription events handled at `/api/stripe/webhook`
- Supports: checkout completion, payment success, subscription updates

## 🔐 Authentication

Uses NextAuth.js with Google OAuth provider:
- Sign in with Google account
- Session management
- Protected routes (can be extended)

## 🎨 UI/UX Design

- **Mobile-First**: Responsive design optimized for all devices
- **PWA-Ready**: Installable as a progressive web app
- **App-Like Experience**: Smooth transitions, optimized performance
- **Color Scheme**: Purple/pink gradient theme with professional gray tones
- **Component-Based**: Modular, reusable components

## 🔄 Matching Algorithm

The hashtag matching service uses Jaccard similarity:

```
Match Score = (Intersection of hashtags) / (Union of hashtags) × 100
```

Features:
- Case-insensitive matching
- Configurable minimum match threshold (default: 30%)
- Bidirectional matching (creators ↔ campaigns)
- Sorted by relevance

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Environment Variables
Set all required environment variables in your deployment platform.

### Database (Future)
Currently uses in-memory/localStorage. For production, integrate:
- PostgreSQL (via Vercel Postgres or Supabase)
- MongoDB (via MongoDB Atlas)
- Firebase Firestore

## 📱 PWA Features

- Offline support (via Next.js built-in service worker)
- Installable on mobile devices
- App manifest configured
- Theme color and icons defined

## 🛣️ Roadmap

- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Real-time notifications
- [ ] Advanced analytics dashboard
- [ ] Video upload and hosting
- [ ] Chat/messaging between creators and businesses
- [ ] Payment history and invoicing
- [ ] Multi-language support
- [ ] Mobile apps (React Native)

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, email support@oros.app or open an issue on GitHub.

