-- DJ-Jaytek-Music Platform - Row Level Security Policies
-- This migration implements RLS policies for data access control

-- Enable RLS on all tables
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE dj_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE instructor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE mixes ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE music_platform_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE music_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE ledger_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE withdrawals ENABLE ROW LEVEL SECURITY;

-- User Roles Policies
CREATE POLICY "Users can view their own roles"
  ON user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own roles"
  ON user_roles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- DJ Profiles Policies
CREATE POLICY "DJ profiles are publicly viewable"
  ON dj_profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update their own DJ profile"
  ON dj_profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own DJ profile"
  ON dj_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Instructor Profiles Policies
CREATE POLICY "Instructor profiles are publicly viewable"
  ON instructor_profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update their own instructor profile"
  ON instructor_profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own instructor profile"
  ON instructor_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Mixes Policies
CREATE POLICY "Published mixes are publicly viewable"
  ON mixes FOR SELECT
  USING (status = 'published' OR dj_id = auth.uid());

CREATE POLICY "DJs can insert their own mixes"
  ON mixes FOR INSERT
  WITH CHECK (auth.uid() = dj_id);

CREATE POLICY "DJs can update their own mixes"
  ON mixes FOR UPDATE
  USING (auth.uid() = dj_id);

CREATE POLICY "DJs can delete their own mixes"
  ON mixes FOR DELETE
  USING (auth.uid() = dj_id);

-- Events Policies
CREATE POLICY "Published events are publicly viewable"
  ON events FOR SELECT
  USING (status IN ('upcoming', 'completed') OR dj_id = auth.uid());

CREATE POLICY "DJs can insert their own events"
  ON events FOR INSERT
  WITH CHECK (auth.uid() = dj_id);

CREATE POLICY "DJs can update their own events"
  ON events FOR UPDATE
  USING (auth.uid() = dj_id);

CREATE POLICY "DJs can delete their own events"
  ON events FOR DELETE
  USING (auth.uid() = dj_id);

-- Courses Policies
CREATE POLICY "Published courses are publicly viewable"
  ON courses FOR SELECT
  USING (status = 'published' OR instructor_id = auth.uid());

CREATE POLICY "Instructors can insert their own courses"
  ON courses FOR INSERT
  WITH CHECK (auth.uid() = instructor_id);

CREATE POLICY "Instructors can update their own courses"
  ON courses FOR UPDATE
  USING (auth.uid() = instructor_id);

CREATE POLICY "Instructors can delete their own courses"
  ON courses FOR DELETE
  USING (auth.uid() = instructor_id);

-- Lessons Policies
CREATE POLICY "Lessons viewable by course owner or enrolled students"
  ON lessons FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM courses 
      WHERE courses.id = lessons.course_id 
      AND (courses.instructor_id = auth.uid() OR courses.status = 'published')
    )
    OR 
    EXISTS (
      SELECT 1 FROM enrollments 
      WHERE enrollments.course_id = lessons.course_id 
      AND enrollments.student_id = auth.uid()
    )
  );

CREATE POLICY "Instructors can insert lessons for their courses"
  ON lessons FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM courses 
      WHERE courses.id = lessons.course_id 
      AND courses.instructor_id = auth.uid()
    )
  );

CREATE POLICY "Instructors can update lessons for their courses"
  ON lessons FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM courses 
      WHERE courses.id = lessons.course_id 
      AND courses.instructor_id = auth.uid()
    )
  );

CREATE POLICY "Instructors can delete lessons for their courses"
  ON lessons FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM courses 
      WHERE courses.id = lessons.course_id 
      AND courses.instructor_id = auth.uid()
    )
  );

-- Enrollments Policies
CREATE POLICY "Users can view their own enrollments"
  ON enrollments FOR SELECT
  USING (auth.uid() = student_id OR 
         EXISTS (
           SELECT 1 FROM courses 
           WHERE courses.id = enrollments.course_id 
           AND courses.instructor_id = auth.uid()
         ));

CREATE POLICY "Users can enroll in courses"
  ON enrollments FOR INSERT
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Users can update their own enrollments"
  ON enrollments FOR UPDATE
  USING (auth.uid() = student_id);

-- Lesson Progress Policies
CREATE POLICY "Users can view their own lesson progress"
  ON lesson_progress FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM enrollments 
      WHERE enrollments.id = lesson_progress.enrollment_id 
      AND enrollments.student_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert their own lesson progress"
  ON lesson_progress FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM enrollments 
      WHERE enrollments.id = lesson_progress.enrollment_id 
      AND enrollments.student_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own lesson progress"
  ON lesson_progress FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM enrollments 
      WHERE enrollments.id = lesson_progress.enrollment_id 
      AND enrollments.student_id = auth.uid()
    )
  );

-- Course Reviews Policies
CREATE POLICY "Reviews are publicly viewable"
  ON course_reviews FOR SELECT
  USING (true);

CREATE POLICY "Enrolled students can insert reviews"
  ON course_reviews FOR INSERT
  WITH CHECK (
    auth.uid() = student_id AND
    EXISTS (
      SELECT 1 FROM enrollments 
      WHERE enrollments.course_id = course_reviews.course_id 
      AND enrollments.student_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own reviews"
  ON course_reviews FOR UPDATE
  USING (auth.uid() = student_id);

CREATE POLICY "Users can delete their own reviews"
  ON course_reviews FOR DELETE
  USING (auth.uid() = student_id);

-- Certificates Policies
CREATE POLICY "Users can view their own certificates"
  ON certificates FOR SELECT
  USING (auth.uid() = student_id);

CREATE POLICY "Certificates can be inserted for enrolled students"
  ON certificates FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM enrollments 
      WHERE enrollments.id = certificates.enrollment_id 
      AND enrollments.student_id = auth.uid()
      AND enrollments.completed = true
    )
  );

-- Music Platform Connections Policies
CREATE POLICY "Users can view their own platform connections"
  ON music_platform_connections FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own platform connections"
  ON music_platform_connections FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own platform connections"
  ON music_platform_connections FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own platform connections"
  ON music_platform_connections FOR DELETE
  USING (auth.uid() = user_id);

-- Music Analytics Policies
CREATE POLICY "Users can view their own music analytics"
  ON music_analytics FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own music analytics"
  ON music_analytics FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Wallets Policies
CREATE POLICY "Users can view their own wallet"
  ON wallets FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own wallet"
  ON wallets FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Ledger Entries Policies (Read-only for users)
CREATE POLICY "Users can view their own ledger entries"
  ON ledger_entries FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM wallets 
      WHERE wallets.id = ledger_entries.wallet_id 
      AND wallets.user_id = auth.uid()
    )
  );

-- Withdrawals Policies
CREATE POLICY "Users can view their own withdrawals"
  ON withdrawals FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM wallets 
      WHERE wallets.id = withdrawals.wallet_id 
      AND wallets.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can request withdrawals from their wallet"
  ON withdrawals FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM wallets 
      WHERE wallets.id = withdrawals.wallet_id 
      AND wallets.user_id = auth.uid()
      AND wallets.available_balance >= withdrawals.amount
    )
  );
