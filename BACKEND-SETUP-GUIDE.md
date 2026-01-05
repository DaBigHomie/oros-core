# Backend Deployment and Orchestration - Setup Guide

This document provides a complete guide for setting up the backend infrastructure for the DJ-Jaytek-Music platform.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Database Setup](#database-setup)
3. [API Endpoints](#api-endpoints)
4. [Security Configuration](#security-configuration)
5. [CI/CD Pipeline](#cicd-pipeline)
6. [Deployment](#deployment)
7. [Environment Variables](#environment-variables)

## Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- Supabase account
- Vercel account (for deployment)
- Stripe account (for payments)

## Database Setup

### 1. Create Supabase Project

1. Go to [Supabase](https://supabase.com)
2. Create a new project
3. Save your project URL and anon key

### 2. Run Database Migrations

The database schema includes:
- User roles and profiles (DJ, Student, Instructor)
- Courses and lessons tables
- Music platform connections
- Payment and wallet system

Migrations are located in `supabase/migrations/`:
- `001_initial_schema.sql` - Core database tables
- `002_rls_policies.sql` - Row-Level Security policies

To apply migrations:

```bash
# Install Supabase CLI
npm install -g supabase

# Link your project
supabase link --project-ref your-project-ref

# Push migrations
supabase db push
```

### 3. Configure Authentication

In your Supabase dashboard:

1. Go to Authentication > Providers
2. Enable Email authentication
3. Enable Google OAuth (optional)
4. Set redirect URLs:
   - Development: `http://localhost:3000/auth/callback`
   - Production: `https://your-domain.com/auth/callback`

## API Endpoints

### Authentication Endpoints

#### POST /api/auth/signup
Register a new user with role assignment.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "role": "student|instructor|dj",
  "displayName": "John Doe"
}
```

**Response:**
```json
{
  "user": { ... },
  "session": { ... }
}
```

#### POST /api/auth/signin
Authenticate an existing user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

### Course Endpoints

#### GET /api/courses
List all published courses or filter by parameters.

**Query Parameters:**
- `status` - Filter by status (draft, published, archived)
- `instructor_id` - Filter by instructor
- `level` - Filter by level (beginner, intermediate, advanced)
- `limit` - Number of results (default: 20)
- `offset` - Pagination offset (default: 0)

#### POST /api/courses
Create a new course (requires instructor role).

**Request Body:**
```json
{
  "title": "DJ Fundamentals",
  "description": "Learn the basics of DJing",
  "level": "beginner",
  "price": 49.99,
  "categories": ["mixing", "basics"]
}
```

#### GET /api/courses/[id]
Get course details including lessons.

#### PATCH /api/courses/[id]
Update course (owner only).

#### DELETE /api/courses/[id]
Delete course (owner only).

### Music Platform Endpoints

#### GET /api/music/platforms
Get user's connected music platforms.

**Response:**
```json
{
  "platforms": [
    {
      "id": "uuid",
      "platform": "spotify",
      "platform_user_id": "spotify_user_123",
      "connected_at": "2026-01-01T00:00:00Z",
      "last_synced_at": "2026-01-05T00:00:00Z"
    }
  ]
}
```

#### GET /api/music/analytics
Get aggregated analytics from connected platforms.

**Query Parameters:**
- `platform` - Filter by specific platform
- `metric_type` - Filter by metric type
- `days` - Number of days to retrieve (default: 30)

## Security Configuration

### JWT Authentication

JWT authentication is handled by Supabase automatically. The middleware at `src/middleware.ts` ensures:

- Protected routes require authentication
- JWT tokens are validated on each request
- Sessions are refreshed automatically

### Row-Level Security (RLS)

All database tables have RLS policies that ensure:

- Users can only access their own data
- Course instructors can manage their courses
- Students can only access enrolled courses
- Public data is accessible to all

### Rate Limiting

Rate limiting is implemented for all API endpoints:

- **Authentication**: 5 requests/minute
- **Standard API**: 100 requests/minute
- **Read-only**: 200 requests/minute
- **Intensive operations**: 10 requests/minute

Rate limits are enforced using the utility at `src/lib/utils/rate-limit.ts`.

## CI/CD Pipeline

### GitHub Actions Workflow

The CI/CD pipeline (`.github/workflows/ci-cd.yml`) includes:

1. **Lint** - Code quality checks
2. **Test** - Run test suite
3. **Build** - Build the application
4. **Deploy to Vercel** - Automatic deployment
5. **Deploy Supabase** - Database migrations
6. **Security Scan** - Vulnerability scanning

### Required Secrets

Add these secrets to your GitHub repository:

```
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
SUPABASE_PROJECT_REF
SUPABASE_ACCESS_TOKEN
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

**Required Variables:**

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Stripe
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# OAuth
GOOGLE_CLIENT_ID=...apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=...

# Music Platforms
SPOTIFY_CLIENT_ID=...
SPOTIFY_CLIENT_SECRET=...
```

## Database Schema Overview

### Core Tables

- **user_roles** - Multi-role system for users
- **dj_profiles** - DJ-specific profile data
- **instructor_profiles** - Instructor credentials and stats
- **courses** - Course catalog
- **lessons** - Course content
- **enrollments** - Student course enrollments
- **music_platform_connections** - Connected streaming platforms
- **wallets** - User financial accounts
- **ledger_entries** - Immutable transaction log

### Security Features

- All tables have RLS enabled
- Users can only access authorized data
- Immutable ledger for financial transactions
- Encrypted sensitive fields

## Testing

### Local Development

```bash
# Start Supabase locally
npm run supabase:start

# Start Next.js dev server
npm run dev

# Access at http://localhost:3000
```

### API Testing

Use tools like Postman or curl to test endpoints:

```bash
# Sign up
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","role":"student"}'

# Get courses
curl http://localhost:3000/api/courses
```

## Monitoring

### Recommended Tools

- **Vercel Analytics** - Performance monitoring
- **Supabase Dashboard** - Database metrics
- **Sentry** - Error tracking (optional)
- **LogRocket** - Session replay (optional)

## Troubleshooting

### Common Issues

**Issue: Database migration fails**
- Check Supabase credentials
- Ensure you're linked to the correct project
- Verify migration file syntax

**Issue: Authentication not working**
- Check redirect URLs in Supabase dashboard
- Verify JWT secret configuration
- Check middleware configuration

**Issue: Rate limiting too strict**
- Adjust limits in `src/lib/utils/rate-limit.ts`
- Consider using Redis for production rate limiting

## Next Steps

1. Set up Stripe for payment processing
2. Implement music platform OAuth flows
3. Add video streaming with Mux
4. Create frontend components
5. Set up monitoring and analytics

## Support

For issues and questions:
- Check the main README.md
- Review DJ-JAYTEK-MUSIC-README.md
- Contact development team

---

**Last Updated:** January 5, 2026  
**Version:** 1.0
