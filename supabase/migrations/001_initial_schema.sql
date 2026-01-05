-- DJ-Jaytek-Music Platform - Initial Schema Migration
-- This migration creates the core database tables for Users, Courses, Payments, and Music Integrations

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User Roles Table (Multi-role system)
CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL CHECK (role IN ('dj', 'student', 'instructor', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- DJ Profiles
CREATE TABLE dj_profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  stage_name VARCHAR(100),
  bio TEXT,
  genres TEXT[] DEFAULT '{}',
  location VARCHAR(100),
  website VARCHAR(500),
  social_links JSONB DEFAULT '{}',
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Instructor Profiles
CREATE TABLE instructor_profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  bio TEXT,
  credentials TEXT[],
  teaching_experience INTEGER,
  rating DECIMAL(3,2) DEFAULT 0,
  total_students INTEGER DEFAULT 0,
  stripe_account_id VARCHAR(100),
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Mixes (DJ Portfolio)
CREATE TABLE mixes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  dj_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  duration INTEGER,
  file_url TEXT NOT NULL,
  cover_image_url TEXT,
  genres TEXT[] DEFAULT '{}',
  tracklist JSONB DEFAULT '[]',
  play_count INTEGER DEFAULT 0,
  download_count INTEGER DEFAULT 0,
  download_enabled BOOLEAN DEFAULT TRUE,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Events (DJ Portfolio)
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  dj_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  venue_name VARCHAR(200),
  venue_address TEXT,
  venue_city VARCHAR(100),
  venue_country VARCHAR(100),
  event_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ,
  ticket_url TEXT,
  flyer_image_url TEXT,
  status VARCHAR(20) DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Courses (LMS)
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  instructor_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  short_description TEXT,
  cover_image_url TEXT,
  trailer_video_url TEXT,
  level VARCHAR(20) CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  categories TEXT[] DEFAULT '{}',
  price DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  enrollment_count INTEGER DEFAULT 0,
  average_rating DECIMAL(3,2) DEFAULT 0,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Course Lessons
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL,
  video_url TEXT,
  video_duration INTEGER,
  is_preview BOOLEAN DEFAULT FALSE,
  resources JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(course_id, order_index)
);

-- Course Enrollments
CREATE TABLE enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  progress_percentage DECIMAL(5,2) DEFAULT 0,
  last_accessed_lesson_id UUID REFERENCES lessons(id),
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(course_id, student_id)
);

-- Lesson Progress
CREATE TABLE lesson_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  enrollment_id UUID REFERENCES enrollments(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT FALSE,
  watch_time INTEGER DEFAULT 0,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(enrollment_id, lesson_id)
);

-- Course Reviews
CREATE TABLE course_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(course_id, student_id)
);

-- Certificates
CREATE TABLE certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  enrollment_id UUID REFERENCES enrollments(id) ON DELETE CASCADE,
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  certificate_url TEXT,
  issued_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(enrollment_id)
);

-- Music Platform Connections
CREATE TABLE music_platform_connections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  platform VARCHAR(50) NOT NULL CHECK (platform IN (
    'spotify', 'apple_music', 'soundcloud', 'beatport', 'tidal',
    'youtube_music', 'amazon_music', 'deezer', 'bandcamp', 'mixcloud'
  )),
  platform_user_id VARCHAR(200),
  access_token TEXT,
  refresh_token TEXT,
  token_expires_at TIMESTAMPTZ,
  connected_at TIMESTAMPTZ DEFAULT NOW(),
  last_synced_at TIMESTAMPTZ,
  UNIQUE(user_id, platform)
);

-- Music Platform Analytics (Aggregated)
CREATE TABLE music_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  platform VARCHAR(50) NOT NULL,
  metric_type VARCHAR(50) NOT NULL,
  metric_value DECIMAL(12,2),
  recorded_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Wallets (Financial System)
CREATE TABLE wallets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  currency VARCHAR(3) DEFAULT 'USD',
  available_balance DECIMAL(12,2) DEFAULT 0.00,
  pending_balance DECIMAL(12,2) DEFAULT 0.00,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT positive_available CHECK (available_balance >= 0),
  CONSTRAINT positive_pending CHECK (pending_balance >= 0)
);

-- Ledger Entries (Immutable transaction log)
CREATE TABLE ledger_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  wallet_id UUID REFERENCES wallets(id) ON DELETE RESTRICT,
  source_type VARCHAR(30) NOT NULL CHECK (source_type IN (
    'course_purchase',
    'instructor_payout',
    'withdrawal',
    'refund',
    'subscription',
    'adjustment'
  )),
  source_id UUID,
  amount DECIMAL(12,2) NOT NULL,
  direction VARCHAR(10) NOT NULL CHECK (direction IN ('credit', 'debit')),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'settled', 'failed', 'reversed')),
  description TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Withdrawals
CREATE TABLE withdrawals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  wallet_id UUID REFERENCES wallets(id) ON DELETE RESTRICT,
  amount DECIMAL(12,2) NOT NULL,
  method VARCHAR(20) NOT NULL CHECK (method IN ('stripe', 'paypal')),
  status VARCHAR(20) DEFAULT 'requested' CHECK (status IN ('requested', 'processing', 'completed', 'failed')),
  stripe_transfer_id VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  processed_at TIMESTAMPTZ,
  CONSTRAINT positive_withdrawal CHECK (amount > 0)
);

-- Create indexes for performance
CREATE INDEX idx_user_roles_user ON user_roles(user_id);
CREATE INDEX idx_user_roles_role ON user_roles(role);

CREATE INDEX idx_dj_profiles_genres ON dj_profiles USING GIN(genres);
CREATE INDEX idx_dj_profiles_verified ON dj_profiles(verified);

CREATE INDEX idx_mixes_dj ON mixes(dj_id);
CREATE INDEX idx_mixes_status ON mixes(status);
CREATE INDEX idx_mixes_genres ON mixes USING GIN(genres);
CREATE INDEX idx_mixes_published ON mixes(published_at DESC);

CREATE INDEX idx_events_dj ON events(dj_id);
CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_events_status ON events(status);

CREATE INDEX idx_courses_instructor ON courses(instructor_id);
CREATE INDEX idx_courses_status ON courses(status);
CREATE INDEX idx_courses_categories ON courses USING GIN(categories);
CREATE INDEX idx_courses_published ON courses(published_at DESC);

CREATE INDEX idx_enrollments_course ON enrollments(course_id);
CREATE INDEX idx_enrollments_student ON enrollments(student_id);
CREATE INDEX idx_enrollments_completed ON enrollments(completed);

CREATE INDEX idx_lesson_progress_enrollment ON lesson_progress(enrollment_id);
CREATE INDEX idx_lesson_progress_lesson ON lesson_progress(lesson_id);

CREATE INDEX idx_music_platforms_user ON music_platform_connections(user_id);
CREATE INDEX idx_music_platforms_platform ON music_platform_connections(platform);

CREATE INDEX idx_ledger_wallet ON ledger_entries(wallet_id);
CREATE INDEX idx_ledger_source ON ledger_entries(source_type, source_id);
CREATE INDEX idx_ledger_created ON ledger_entries(created_at DESC);
