import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// GET /api/music/analytics - Get aggregated music analytics
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const platform = searchParams.get('platform');
    const metric_type = searchParams.get('metric_type');
    const days = parseInt(searchParams.get('days') || '30');

    const supabase = createRouteHandlerClient({ cookies });

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Calculate date range
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    let query = supabase
      .from('music_analytics')
      .select('*')
      .eq('user_id', user.id)
      .gte('recorded_at', startDate.toISOString())
      .order('recorded_at', { ascending: true });

    if (platform) {
      query = query.eq('platform', platform);
    }

    if (metric_type) {
      query = query.eq('metric_type', metric_type);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    // Aggregate data by platform
    const aggregated = data.reduce((acc: any, item: any) => {
      if (!acc[item.platform]) {
        acc[item.platform] = {};
      }
      if (!acc[item.platform][item.metric_type]) {
        acc[item.platform][item.metric_type] = [];
      }
      acc[item.platform][item.metric_type].push({
        value: item.metric_value,
        date: item.recorded_at,
      });
      return acc;
    }, {});

    return NextResponse.json({ analytics: aggregated, raw_data: data });
  } catch (error) {
    console.error('Get analytics error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
