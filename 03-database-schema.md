# Database Schema: OROS™ Platform

**Document:** Database Schema (Foundational)  
**Version:** 2.0  
**Date:** December 30, 2025  
**Author:** Dame Luthas  
**Status:** MVP-Ready, Scale-Safe

---

## Design Principles

This schema is:
- **Modular** — Components can be added without rewrites
- **Normalized** — No data duplication
- **Scale-safe** — Supports MVP → enterprise without migration
- **Audit-grade** — Immutable ledger for financial compliance

---

## Schema Overview

### MVP Tables (Q1 2026)

| Table | Purpose |
|-------|---------|
| `users` | Core identity |
| `user_roles` | Multi-role assignment |
| `creator_profiles` | Creator-specific data |
| `business_profiles` | Business-specific data |
| `wallets` | User balances |
| `ledger_entries` | Immutable transaction log |
| `campaigns` | Business campaigns |
| `campaign_creators` | Creator ↔ Campaign relationships |
| `tracking_links` | Attribution URLs |
| `events` | Tracked actions (clicks, sales) |
| `withdrawals` | Payout requests |

### Phase 2 Tables (Feb 2026)

| Table | Purpose |
|-------|---------|
| `memberships` | Subscription tiers |
| `communities` | Creator communities |
| `community_members` | Community membership |
| `community_posts` | Content (locked/unlocked) |
| `tips` | Tip transactions |
| `tip_unlocks` | Content unlocked via tips |
| `boosts` | Supporter campaign boosts |
| `rewards` | Supporter earnings |

### Phase 3 Tables (Q2 2026+)

| Table | Purpose |
|-------|---------|
| `live_events` | Live shopping sessions |
| `live_sales` | Live commerce transactions |

---

## MVP Schema (Detailed)

### 1. Users & Identity

```sql
-- Core user identity
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  username VARCHAR(50) UNIQUE,
  display_name VARCHAR(100),
  profile_image_url VARCHAR(500),
  bio TEXT,
  kyc_status VARCHAR(20) DEFAULT 'pending' 
    CHECK (kyc_status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Multi-role assignment (users can have multiple roles)
CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL 
    CHECK (role IN ('creator', 'supporter', 'business', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Creator-specific profile data
CREATE TABLE creator_profiles (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  hashtags TEXT[] DEFAULT '{}',
  min_tip_amount DECIMAL(10,2) DEFAULT 1.00,
  ranking_score DECIMAL(5,2) DEFAULT 0,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Business-specific profile data
CREATE TABLE business_profiles (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  company_name VARCHAR(200),
  website VARCHAR(500),
  industry VARCHAR(100),
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 2. Wallets & Ledger (Critical System)

```sql
-- User wallets
CREATE TABLE wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  currency VARCHAR(3) DEFAULT 'USD',
  available_balance DECIMAL(12,2) DEFAULT 0.00,
  pending_balance DECIMAL(12,2) DEFAULT 0.00,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Balances can never go negative
  CONSTRAINT positive_available CHECK (available_balance >= 0),
  CONSTRAINT positive_pending CHECK (pending_balance >= 0)
);

-- Immutable ledger (SINGLE SOURCE OF TRUTH)
CREATE TABLE ledger_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_id UUID REFERENCES wallets(id) ON DELETE RESTRICT,
  
  -- What generated this entry
  source_type VARCHAR(30) NOT NULL 
    CHECK (source_type IN (
      'campaign',      -- Campaign payout
      'escrow',        -- Business funding campaign
      'withdrawal',    -- User withdrawal
      'tip',           -- Tip received (Phase 2)
      'boost',         -- Boost reward (Phase 2)
      'live_sale',     -- Live shopping (Phase 3)
      'refund',        -- Refund
      'adjustment'     -- Admin adjustment
    )),
  source_id UUID,  -- Reference to source record
  
  -- Money movement
  amount DECIMAL(12,2) NOT NULL,
  direction VARCHAR(10) NOT NULL CHECK (direction IN ('credit', 'debit')),
  
  -- Status
  status VARCHAR(20) DEFAULT 'pending' 
    CHECK (status IN ('pending', 'settled', 'failed', 'reversed')),
  
  -- Metadata
  description TEXT,
  metadata JSONB DEFAULT '{}',
  
  created_at TIMESTAMPTZ DEFAULT NOW()
  
  -- NO updated_at — ledger is immutable
);

-- Withdrawal requests
CREATE TABLE withdrawals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_id UUID REFERENCES wallets(id) ON DELETE RESTRICT,
  amount DECIMAL(12,2) NOT NULL,
  method VARCHAR(20) NOT NULL CHECK (method IN ('ach', 'instant', 'card')),
  status VARCHAR(20) DEFAULT 'requested' 
    CHECK (status IN ('requested', 'processing', 'completed', 'failed')),
  stripe_transfer_id VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  processed_at TIMESTAMPTZ,
  
  CONSTRAINT positive_withdrawal CHECK (amount > 0)
);
```

### 3. Campaigns & Tasks

```sql
-- Business campaigns
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  -- Campaign details
  title VARCHAR(200) NOT NULL,
  description TEXT,
  hashtags TEXT[] DEFAULT '{}',
  
  -- Payout configuration
  objective VARCHAR(20) NOT NULL 
    CHECK (objective IN ('click', 'conversion', 'sale')),
  payout_per_action DECIMAL(10,2) NOT NULL,
  
  -- Budget
  total_budget DECIMAL(12,2) NOT NULL,
  remaining_budget DECIMAL(12,2) NOT NULL,
  
  -- Status
  status VARCHAR(20) DEFAULT 'draft' 
    CHECK (status IN ('draft', 'active', 'paused', 'completed')),
  
  -- Timeline
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT positive_budget CHECK (total_budget > 0),
  CONSTRAINT valid_remaining CHECK (remaining_budget >= 0),
  CONSTRAINT remaining_lte_total CHECK (remaining_budget <= total_budget)
);

-- Creator ↔ Campaign relationships
CREATE TABLE campaign_creators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  creator_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  status VARCHAR(20) DEFAULT 'pending' 
    CHECK (status IN ('pending', 'accepted', 'rejected', 'completed')),
  
  -- Earnings from this campaign
  total_earned DECIMAL(12,2) DEFAULT 0.00,
  
  accepted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(campaign_id, creator_id)
);
```

### 4. Tracking & Attribution

```sql
-- Tracking links for attribution
CREATE TABLE tracking_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  creator_id UUID REFERENCES users(id) ON DELETE CASCADE,
  supporter_id UUID REFERENCES users(id),  -- Phase 2: supporter attribution
  
  -- The actual tracking URL
  code VARCHAR(20) UNIQUE NOT NULL,  -- Short code for URL
  url TEXT NOT NULL,  -- Full tracking URL
  
  -- Stats
  click_count INTEGER DEFAULT 0,
  conversion_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tracked events (clicks, conversions, sales)
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Attribution
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  creator_id UUID REFERENCES users(id) ON DELETE CASCADE,
  tracking_link_id UUID REFERENCES tracking_links(id),
  supporter_id UUID REFERENCES users(id),  -- Phase 2
  
  -- Event details
  event_type VARCHAR(20) NOT NULL 
    CHECK (event_type IN ('click', 'conversion', 'sale')),
  value DECIMAL(12,2),  -- For sales: the sale amount
  
  -- Verification
  verified BOOLEAN DEFAULT FALSE,
  verified_at TIMESTAMPTZ,
  
  -- Payout tracking
  payout_amount DECIMAL(12,2),
  platform_fee DECIMAL(12,2),
  paid BOOLEAN DEFAULT FALSE,
  paid_at TIMESTAMPTZ,
  
  -- Metadata
  ip_address INET,
  user_agent TEXT,
  metadata JSONB DEFAULT '{}',
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 5. Indexes

```sql
-- Users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);

-- Roles
CREATE INDEX idx_user_roles_user ON user_roles(user_id);
CREATE INDEX idx_user_roles_role ON user_roles(role);

-- Profiles
CREATE INDEX idx_creator_hashtags ON creator_profiles USING GIN(hashtags);

-- Wallets
CREATE INDEX idx_wallets_user ON wallets(user_id);

-- Ledger
CREATE INDEX idx_ledger_wallet ON ledger_entries(wallet_id);
CREATE INDEX idx_ledger_source ON ledger_entries(source_type, source_id);
CREATE INDEX idx_ledger_status ON ledger_entries(status);
CREATE INDEX idx_ledger_created ON ledger_entries(created_at DESC);

-- Campaigns
CREATE INDEX idx_campaigns_business ON campaigns(business_id);
CREATE INDEX idx_campaigns_status ON campaigns(status);
CREATE INDEX idx_campaigns_hashtags ON campaigns USING GIN(hashtags);

-- Campaign Creators
CREATE INDEX idx_campaign_creators_campaign ON campaign_creators(campaign_id);
CREATE INDEX idx_campaign_creators_creator ON campaign_creators(creator_id);

-- Tracking
CREATE INDEX idx_tracking_campaign ON tracking_links(campaign_id);
CREATE INDEX idx_tracking_creator ON tracking_links(creator_id);
CREATE INDEX idx_tracking_code ON tracking_links(code);

-- Events
CREATE INDEX idx_events_campaign ON events(campaign_id);
CREATE INDEX idx_events_creator ON events(creator_id);
CREATE INDEX idx_events_type ON events(event_type);
CREATE INDEX idx_events_verified ON events(verified);
CREATE INDEX idx_events_created ON events(created_at DESC);
```

### 6. Row Level Security

```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE creator_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE ledger_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_creators ENABLE ROW LEVEL SECURITY;
ALTER TABLE tracking_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE withdrawals ENABLE ROW LEVEL SECURITY;

-- Users can view/update own profile
CREATE POLICY "users_own_profile" ON users
  FOR ALL USING (auth.uid() = id);

-- Users can view own roles
CREATE POLICY "users_own_roles" ON user_roles
  FOR SELECT USING (auth.uid() = user_id);

-- Users can view/update own creator profile
CREATE POLICY "creator_own_profile" ON creator_profiles
  FOR ALL USING (auth.uid() = user_id);

-- Users can view/update own business profile
CREATE POLICY "business_own_profile" ON business_profiles
  FOR ALL USING (auth.uid() = user_id);

-- Users can only view own wallet
CREATE POLICY "wallet_owner_only" ON wallets
  FOR SELECT USING (auth.uid() = user_id);

-- Users can only view own ledger entries
CREATE POLICY "ledger_owner_only" ON ledger_entries
  FOR SELECT USING (
    wallet_id IN (SELECT id FROM wallets WHERE user_id = auth.uid())
  );

-- Anyone can view active campaigns
CREATE POLICY "campaigns_public_active" ON campaigns
  FOR SELECT USING (status = 'active');

-- Business can manage own campaigns
CREATE POLICY "campaigns_business_owner" ON campaigns
  FOR ALL USING (auth.uid() = business_id);

-- Creators can view campaigns they're part of
CREATE POLICY "campaign_creators_view" ON campaign_creators
  FOR SELECT USING (
    auth.uid() = creator_id OR
    campaign_id IN (SELECT id FROM campaigns WHERE business_id = auth.uid())
  );

-- Users can view own withdrawals
CREATE POLICY "withdrawals_owner_only" ON withdrawals
  FOR SELECT USING (
    wallet_id IN (SELECT id FROM wallets WHERE user_id = auth.uid())
  );
```

### 7. Functions & Triggers

```sql
-- Auto-create wallet on user signup
CREATE OR REPLACE FUNCTION create_wallet_for_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO wallets (user_id) VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_user_created_create_wallet
  AFTER INSERT ON users
  FOR EACH ROW
  EXECUTE FUNCTION create_wallet_for_user();

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_wallets_updated_at
  BEFORE UPDATE ON wallets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_campaigns_updated_at
  BEFORE UPDATE ON campaigns
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Process ledger entry and update wallet balance
CREATE OR REPLACE FUNCTION process_ledger_entry()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'settled' AND OLD.status = 'pending' THEN
    IF NEW.direction = 'credit' THEN
      UPDATE wallets 
      SET 
        pending_balance = pending_balance - NEW.amount,
        available_balance = available_balance + NEW.amount
      WHERE id = NEW.wallet_id;
    ELSIF NEW.direction = 'debit' THEN
      UPDATE wallets 
      SET available_balance = available_balance - NEW.amount
      WHERE id = NEW.wallet_id;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_ledger_settled
  AFTER UPDATE ON ledger_entries
  FOR EACH ROW
  WHEN (OLD.status = 'pending' AND NEW.status = 'settled')
  EXECUTE FUNCTION process_ledger_entry();
```

---

## Phase 2 Schema (Preview)

```sql
-- Memberships (subscription tiers)
CREATE TABLE memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  membership_type VARCHAR(30) NOT NULL 
    CHECK (membership_type IN (
      'creator_plus', 'creator_pro', 
      'supporter_plus', 'business_growth'
    )),
  status VARCHAR(20) DEFAULT 'active' 
    CHECK (status IN ('active', 'canceled', 'expired')),
  billing_provider_id VARCHAR(100),  -- Stripe subscription ID
  started_at TIMESTAMPTZ DEFAULT NOW(),
  ends_at TIMESTAMPTZ
);

-- Communities (creator-owned)
CREATE TABLE communities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Community members (free to join)
CREATE TABLE community_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID REFERENCES communities(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(20) DEFAULT 'member' CHECK (role IN ('member', 'supporter')),
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(community_id, user_id)
);

-- Community posts (can be tip-locked)
CREATE TABLE community_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID REFERENCES communities(id) ON DELETE CASCADE,
  creator_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content_type VARCHAR(20) CHECK (content_type IN ('text', 'image', 'video', 'link')),
  content_url TEXT,
  is_locked BOOLEAN DEFAULT FALSE,
  min_tip_to_unlock DECIMAL(10,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tips
CREATE TABLE tips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  to_creator_id UUID REFERENCES users(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  platform_fee DECIMAL(10,2) NOT NULL,
  net_amount DECIMAL(10,2) NOT NULL,
  frequency VARCHAR(20) DEFAULT 'one_time' CHECK (frequency IN ('one_time', 'monthly')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tip unlocks
CREATE TABLE tip_unlocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tip_id UUID REFERENCES tips(id) ON DELETE CASCADE,
  community_post_id UUID REFERENCES community_posts(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMPTZ DEFAULT NOW()
);

-- Supporter boosts
CREATE TABLE boosts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  supporter_id UUID REFERENCES users(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Supporter rewards
CREATE TABLE rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  source VARCHAR(30) CHECK (source IN ('boost', 'share', 'prediction')),
  amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'paid')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Entity Relationship Diagram

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    users    │────<│ user_roles  │     │   wallets   │
└─────────────┘     └─────────────┘     └──────┬──────┘
       │                                       │
       ├───────────────────────────────────────┤
       │                                       │
       ▼                                       ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  creator_   │     │  business_  │     │   ledger_   │
│  profiles   │     │  profiles   │     │   entries   │
└─────────────┘     └──────┬──────┘     └─────────────┘
       │                   │
       │                   ▼
       │            ┌─────────────┐
       │            │  campaigns  │
       │            └──────┬──────┘
       │                   │
       ▼                   ▼
┌─────────────────────────────────┐
│       campaign_creators         │
└─────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────┐
│        tracking_links           │
└─────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────┐
│           events                │
└─────────────────────────────────┘
```

---

## Migration Commands

```bash
# Generate Supabase types
npx supabase gen types typescript --local > src/types/database.ts

# Push schema to Supabase
npx supabase db push

# Reset database (development only)
npx supabase db reset
```

---

**Next Document:** [Launch Roadmap](04-launch-roadmap.md)
