'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type ArticleDevRefreshProps = {
  slug: string;
};

export function ArticleDevRefresh({ slug }: ArticleDevRefreshProps) {
  const router = useRouter();

  useEffect(() => {
    let lastVersion: number | null = null;
    let refreshTimeout: number | undefined;

    const checkForContentUpdate = async () => {
      try {
        const response = await fetch(
          `/api/content-version?slug=${encodeURIComponent(slug)}`,
          { cache: 'no-store' },
        );

        if (!response.ok) return;

        const data = (await response.json()) as { version?: number };
        if (typeof data.version !== 'number') return;

        if (lastVersion === null) {
          lastVersion = data.version;
          return;
        }

        if (data.version !== lastVersion) {
          lastVersion = data.version;
          window.clearTimeout(refreshTimeout);
          refreshTimeout = window.setTimeout(() => router.refresh(), 80);
        }
      } catch {
        // Keep editing resilient if the dev server is briefly rebuilding.
      }
    };

    void checkForContentUpdate();
    const interval = window.setInterval(checkForContentUpdate, 1000);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(refreshTimeout);
    };
  }, [router, slug]);

  return null;
}
