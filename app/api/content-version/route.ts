import { NextRequest, NextResponse } from 'next/server';

import {
  getArticleContentVersion,
  hasArticleContent,
} from '@/features/articles/lib/articles';

const SLUG_PATTERN = /^[a-z0-9][a-z0-9-]*$/i;

export function GET(request: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const slug = request.nextUrl.searchParams.get('slug');

  if (!slug || !SLUG_PATTERN.test(slug) || !hasArticleContent(slug)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  try {
    return NextResponse.json({
      version: getArticleContentVersion(slug),
    });
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}
