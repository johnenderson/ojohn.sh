import { NextResponse } from 'next/server';

import { getLastfmStats } from 'src/lib/lastfm';

export async function GET() {
  try {
    const lastfm = await getLastfmStats();

    return NextResponse.json(lastfm, {
      headers: {
        'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('Error fetching Last.fm stats:', error);

    return NextResponse.json(
      {
        nowPlaying: null,
        lastPlayed: null,
        tracks: [],
      },
      { status: 200 },
    );
  }
}
