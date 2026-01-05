# DJ-Jaytek-Music Backend Infrastructure

This directory contains the complete backend infrastructure for the DJ-Jaytek-Music platform, including database migrations, API endpoints, authentication, and CI/CD configuration.

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- Supabase account
- Vercel account (for deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/DaBigHomie/oros-core.git
   cd oros-core
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your credentials
   ```

4. **Set up Supabase**
   ```bash
   # Install Supabase CLI
   npm install -g supabase

   # Link to your project
   supabase link --project-ref your-project-ref

   # Push database migrations
   supabase db push
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
.
├── .github/
│   └── workflows/
│       └── ci-cd.yml              # CI/CD pipeline configuration
│
├── src/
│   ├── app/
│   │   └── api/
│   │       ├── auth/              # Authentication endpoints
│   │       │   ├── signup/
│   │       │   ├── signin/
│   │       │   └── callback/
│   │       ├── courses/           # Course management endpoints
│   │       │   ├── route.ts
│   │       │   └── [id]/
│   │       └── music/             # Music platform aggregator
│   │           ├── platforms/
│   │           └── analytics/
│   │
│   ├── lib/
│   │   └── utils/
│   │       └── rate-limit.ts      # Rate limiting utility
│   │
│   └── middleware.ts              # JWT authentication middleware
│
├── supabase/
│   ├── migrations/
│   │   ├── 001_initial_schema.sql # Core database tables
│   │   └── 002_rls_policies.sql   # Row-Level Security policies
│   └── config.toml                # Supabase configuration
│
├── .env.example                   # Environment variables template
├── package.json                   # Dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
├── next.config.js                 # Next.js configuration
├── API-DOCUMENTATION.md           # Detailed API documentation
└── BACKEND-SETUP-GUIDE.md         # Setup and deployment guide
```

## 🔐 Security Features

### Authentication
- JWT-based authentication via Supabase
- Multi-role system (DJ, Student, Instructor, Admin)
- OAuth support (Google, Facebook, etc.)
- Secure password hashing

### Authorization
- Row-Level Security (RLS) on all database tables
- Role-based access control
- Owner-only permissions for resources
- Protected API routes

### Rate Limiting
- Configurable rate limits per endpoint type
- Token bucket algorithm implementation
- Rate limit headers in responses

### Data Protection
- Encrypted sensitive data
- Immutable ledger for financial transactions
- HTTPS enforcement
- CORS protection

## 🗄️ Database Schema

The database includes the following core models:

### User Management
- `user_roles` - Multi-role assignment
- `dj_profiles` - DJ-specific profiles
- `instructor_profiles` - Instructor credentials

### Content
- `courses` - Course catalog
- `lessons` - Course lessons
- `enrollments` - Student enrollments
- `lesson_progress` - Progress tracking

### Music Integration
- `music_platform_connections` - Connected platforms
- `music_analytics` - Aggregated analytics

### Financial
- `wallets` - User balances
- `ledger_entries` - Transaction log
- `withdrawals` - Payout requests

See [BACKEND-SETUP-GUIDE.md](./BACKEND-SETUP-GUIDE.md) for detailed schema information.

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/signin` - Authenticate user
- `GET /api/auth/callback` - OAuth callback

### Courses
- `GET /api/courses` - List courses
- `POST /api/courses` - Create course
- `GET /api/courses/:id` - Get course details
- `PATCH /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

### Music Platforms
- `GET /api/music/platforms` - List connected platforms
- `GET /api/music/analytics` - Get analytics data

See [API-DOCUMENTATION.md](./API-DOCUMENTATION.md) for complete API reference.

## 🚢 Deployment

### Vercel Deployment

1. **Connect to Vercel**
   - Link your GitHub repository to Vercel
   - Configure environment variables
   - Deploy automatically on push to main

2. **Environment Variables**
   Configure these in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `STRIPE_SECRET_KEY`
   - Other API keys as needed

### Supabase Deployment

Database migrations are automatically deployed via GitHub Actions when pushing to the main branch.

Manual deployment:
```bash
supabase db push
```

## 🔄 CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/ci-cd.yml`) includes:

1. **Lint** - Code quality checks
2. **Test** - Run test suite
3. **Build** - Build Next.js application
4. **Deploy to Vercel** - Automatic deployment
5. **Deploy Supabase** - Database migrations
6. **Security Scan** - Vulnerability scanning

### Required GitHub Secrets

```
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
SUPABASE_PROJECT_REF
SUPABASE_ACCESS_TOKEN
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

## 📊 Monitoring

### Recommended Tools
- **Vercel Analytics** - Performance monitoring
- **Supabase Dashboard** - Database metrics
- **Sentry** - Error tracking (optional)
- **LogRocket** - Session replay (optional)

## 🧪 Testing

```bash
# Run linter
npm run lint

# Run type check
npm run type-check

# Run tests (when implemented)
npm test
```

## 📝 Documentation

- [BACKEND-SETUP-GUIDE.md](./BACKEND-SETUP-GUIDE.md) - Complete setup guide
- [API-DOCUMENTATION.md](./API-DOCUMENTATION.md) - API reference
- [DJ-JAYTEK-MUSIC-README.md](./DJ-JAYTEK-MUSIC-README.md) - Platform overview
- [03-database-schema.md](./03-database-schema.md) - Database schema details

## 🛠️ Development

### Local Supabase

```bash
# Start local Supabase instance
npm run supabase:start

# Stop local instance
npm run supabase:stop

# Check status
npm run supabase:status
```

### Database Management

```bash
# Create new migration
supabase migration new migration_name

# Reset database
supabase db reset

# Generate TypeScript types
supabase gen types typescript --local > src/types/database.ts
```

## 🔧 Configuration

### Rate Limiting

Adjust rate limits in `src/lib/utils/rate-limit.ts`:

```typescript
export const RATE_LIMITS = {
  AUTH: { interval: 60000, maxRequests: 5 },
  API: { interval: 60000, maxRequests: 100 },
  READ: { interval: 60000, maxRequests: 200 },
  INTENSIVE: { interval: 60000, maxRequests: 10 },
};
```

### Middleware

Protected routes are configured in `src/middleware.ts`:

```typescript
const protectedRoutes = ['/dashboard', '/api/courses', '/api/music'];
const authRoutes = ['/auth/signin', '/auth/signup'];
```

## 🐛 Troubleshooting

### Common Issues

**Database migration fails**
- Verify Supabase credentials
- Check migration file syntax
- Ensure project is linked correctly

**Authentication not working**
- Check redirect URLs in Supabase dashboard
- Verify JWT secret configuration
- Check middleware configuration

**Rate limiting too strict**
- Adjust limits in `src/lib/utils/rate-limit.ts`
- Consider Redis for production

See [BACKEND-SETUP-GUIDE.md](./BACKEND-SETUP-GUIDE.md) for more troubleshooting tips.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

Copyright © 2026 DJ-Jaytek-Music Platform

## 🙏 Acknowledgments

Built on the foundation of the OROS platform architecture.

---

**Last Updated:** January 5, 2026  
**Version:** 1.0.0

For questions or support, please refer to the documentation or contact the development team.
