import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// GET /api/music/platforms - Get user's connected music platforms
export async function GET(request: Request) {
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

    const { data, error } = await supabase
      .from('music_platform_connections')
      .select('id, platform, platform_user_id, connected_at, last_synced_at')
      .eq('user_id', user.id)
      .order('connected_at', { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ platforms: data });
  } catch (error) {
    console.error('Get platforms error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
