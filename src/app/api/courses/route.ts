import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { z } from 'zod';

// Validation schema for course creation
const courseSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().optional(),
  short_description: z.string().optional(),
  cover_image_url: z.string().url().optional(),
  trailer_video_url: z.string().url().optional(),
  level: z.enum(['beginner', 'intermediate', 'advanced']),
  categories: z.array(z.string()).default([]),
  price: z.number().min(0),
  currency: z.string().default('USD'),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
});

// GET /api/courses - List all published courses or user's own courses
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'published';
    const instructor_id = searchParams.get('instructor_id');
    const level = searchParams.get('level');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    const supabase = createRouteHandlerClient({ cookies });

    let query = supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // Apply filters
    if (status) {
      query = query.eq('status', status);
    }

    if (instructor_id) {
      query = query.eq('instructor_id', instructor_id);
    }

    if (level) {
      query = query.eq('level', level);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ courses: data });
  } catch (error) {
    console.error('Get courses error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/courses - Create a new course
export async function POST(request: Request) {
  try {
    const json = await request.json();
    const body = courseSchema.parse(json);

    const supabase = createRouteHandlerClient({ cookies });

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user has instructor role
    const { data: roles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'instructor')
      .single();

    if (!roles) {
      return NextResponse.json(
        { error: 'User must have instructor role to create courses' },
        { status: 403 }
      );
    }

    // Create the course
    const { data, error } = await supabase
      .from('courses')
      .insert({
        ...body,
        instructor_id: user.id,
        published_at: body.status === 'published' ? new Date().toISOString() : null,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ course: data }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Create course error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
