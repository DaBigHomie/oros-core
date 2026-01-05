import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { z } from 'zod';

// Validation schema for course update
const updateCourseSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().optional(),
  short_description: z.string().optional(),
  cover_image_url: z.string().url().optional(),
  trailer_video_url: z.string().url().optional(),
  level: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  categories: z.array(z.string()).optional(),
  price: z.number().min(0).optional(),
  status: z.enum(['draft', 'published', 'archived']).optional(),
});

// GET /api/courses/[id] - Get a specific course
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    const { data, error } = await supabase
      .from('courses')
      .select(`
        *,
        lessons (
          id,
          title,
          description,
          order_index,
          video_duration,
          is_preview
        )
      `)
      .eq('id', params.id)
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 404 }
      );
    }

    return NextResponse.json({ course: data });
  } catch (error) {
    console.error('Get course error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PATCH /api/courses/[id] - Update a course
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const json = await request.json();
    const body = updateCourseSchema.parse(json);

    const supabase = createRouteHandlerClient({ cookies });

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user owns this course
    const { data: course } = await supabase
      .from('courses')
      .select('instructor_id')
      .eq('id', params.id)
      .single();

    if (!course || course.instructor_id !== user.id) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    // Update the course
    const updateData: any = { ...body };
    if (body.status === 'published' && !course.published_at) {
      updateData.published_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from('courses')
      .update(updateData)
      .eq('id', params.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ course: data });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Update course error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/courses/[id] - Delete a course
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user owns this course
    const { data: course } = await supabase
      .from('courses')
      .select('instructor_id')
      .eq('id', params.id)
      .single();

    if (!course || course.instructor_id !== user.id) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', params.id);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete course error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
