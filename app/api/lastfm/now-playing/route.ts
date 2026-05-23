import { NextResponse } from 'next/server';

import { getLastfmNowPlaying } from '@/lib/lastfm';

export const revalidate = 30;

export async function GET() {
  try {
    const nowPlaying = await getLastfmNowPlaying();

    return NextResponse.json(
      { nowPlaying },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
        },
      },
    );
  } catch (error) {
    console.error('Error fetching Last.fm now playing:', error);

    return NextResponse.json(
      { nowPlaying: null },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
        },
        status: 200,
      },
    );
  }
}
