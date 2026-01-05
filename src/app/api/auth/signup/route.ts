import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { z } from 'zod';

// Validation schema for sign up
const signUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['dj', 'student', 'instructor']).default('student'),
  displayName: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const body = signUpSchema.parse(json);

    const supabase = createRouteHandlerClient({ cookies });

    // Sign up the user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: body.email,
      password: body.password,
      options: {
        data: {
          display_name: body.displayName,
        },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    });

    if (authError) {
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      );
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      );
    }

    // Assign user role
    const { error: roleError } = await supabase
      .from('user_roles')
      .insert({
        user_id: authData.user.id,
        role: body.role,
      });

    if (roleError) {
      console.error('Failed to assign role:', roleError);
      // Continue - user is created, role can be assigned later
    }

    // Create profile based on role
    if (body.role === 'dj') {
      await supabase.from('dj_profiles').insert({
        user_id: authData.user.id,
      });
    } else if (body.role === 'instructor') {
      await supabase.from('instructor_profiles').insert({
        user_id: authData.user.id,
      });
    }

    // Create wallet for the user
    await supabase.from('wallets').insert({
      user_id: authData.user.id,
    });

    return NextResponse.json({
      user: authData.user,
      session: authData.session,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Sign up error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
