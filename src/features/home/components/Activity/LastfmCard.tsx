'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CSSProperties, ReactNode, useEffect, useState } from 'react';

import { LastfmStats, LastfmTrack } from '@/types/Lastfm';

const MusicIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
  >
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
);

const DiscIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="2" />
    <path d="M7 12a5 5 0 0 1 5-5" />
    <path d="M17 12a5 5 0 0 1-5 5" />
  </svg>
);

const FadeIn = ({
  children,
  className,
  delay = 0,
  duration = 300,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}) => (
  <div
    className={['site-fade-in', className].filter(Boolean).join(' ')}
    style={
      {
        '--fade-in-delay': `${delay}ms`,
        '--fade-in-duration': `${duration}ms`,
      } as CSSProperties
    }
  >
    {children}
  </div>
);

const TrackArtwork = ({
  track,
  size = 64,
}: {
  track: LastfmTrack;
  size?: number;
}) => {
  const [failed, setFailed] = useState(false);

  if (!track.imageUrl || failed) {
    return (
      <div
        className="flex shrink-0 items-center justify-center rounded bg-site-card-hover text-site-body-muted"
        style={{ width: size, height: size }}
      >
        <MusicIcon size={Math.max(16, size / 2.5)} />
      </div>
    );
  }

  return (
    <Image
      src={track.imageUrl}
      alt={track.album ?? track.name}
      width={size}
      height={size}
      className="shrink-0 rounded"
      style={{ width: size, height: size }}
      onError={() => setFailed(true)}
    />
  );
};

const TrackRow = ({ track }: { track: LastfmTrack }) => (
  <li className="flex min-w-0 items-center gap-3">
    <TrackArtwork track={track} size={40} />
    <div className="flex min-w-0 flex-col">
      <Link
        href={track.url}
        target="_blank"
        rel="noopener noreferrer"
        className="truncate text-sm font-medium no-underline transition-colors hover:text-site-primary-hover"
        title={track.name}
      >
        {track.name}
      </Link>
      <p className="m-0 truncate text-xs text-site-body-muted">
        {track.artist}
      </p>
    </div>
  </li>
);

export const LastfmCard = () => {
  const [lastfm, setLastfm] = useState<LastfmStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetch('/api/lastfm')
      .then((response) => response.json() as Promise<LastfmStats>)
      .then((data) => {
        if (active) setLastfm(data);
      })
      .catch(() => {
        if (active) {
          setLastfm({ nowPlaying: null, lastPlayed: null, tracks: [] });
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const featuredTrack = lastfm?.nowPlaying ?? lastfm?.lastPlayed ?? null;
  const title = lastfm?.nowPlaying ? 'Ouvindo agora' : 'Última música';

  return (
    <section id="activity" className="mt-10">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <FadeIn
          className="col-span-1 flex min-h-36 flex-col gap-3 rounded-md border border-site-border bg-site-card p-5 md:col-span-2"
          duration={500}
        >
          <div className="flex items-center gap-2">
            <h2 className="m-0 text-base font-semibold text-site-foreground">
              {title}
            </h2>
            <DiscIcon />
          </div>

          {loading && (
            <div className="h-16 w-full animate-pulse rounded bg-site-card-hover" />
          )}

          {!loading && featuredTrack && (
            <div className="flex min-w-0 gap-4">
              <TrackArtwork track={featuredTrack} />
              <div className="flex min-w-0 flex-col">
                <Link
                  href={featuredTrack.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-lg font-bold no-underline transition-colors hover:text-site-primary-hover"
                  title={featuredTrack.name}
                >
                  {featuredTrack.name}
                </Link>
                {featuredTrack.album && (
                  <p className="m-0 truncate text-sm text-site-body">
                    {featuredTrack.album}
                  </p>
                )}
                <p className="m-0 truncate text-sm text-site-body">
                  {featuredTrack.artist}
                </p>
              </div>
            </div>
          )}

          {!loading && !featuredTrack && (
            <p className="m-0 text-sm text-site-body-muted">
              Nenhuma música recente encontrada.
            </p>
          )}
        </FadeIn>

        <FadeIn
          className="col-span-1 flex min-h-36 flex-col gap-3 rounded-md border border-site-border bg-site-card p-5 md:col-span-2"
          delay={100}
          duration={500}
        >
          <div className="flex items-center gap-2">
            <h2 className="m-0 text-base font-semibold text-site-foreground">
              Últimas faixas
            </h2>
            <MusicIcon />
          </div>

          {loading && (
            <div className="space-y-3">
              {[0, 1, 2].map((item) => (
                <div
                  key={item}
                  className="h-10 animate-pulse rounded bg-site-card-hover"
                />
              ))}
            </div>
          )}

          {!loading && lastfm && lastfm.tracks.length > 0 && (
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {lastfm.tracks.slice(0, 4).map((track) => (
                <TrackRow key={`${track.name}-${track.artist}`} track={track} />
              ))}
            </ul>
          )}

          {!loading && (!lastfm || lastfm.tracks.length === 0) && (
            <p className="m-0 text-sm text-site-body-muted">
              Sem histórico recente para mostrar.
            </p>
          )}
        </FadeIn>
      </div>
    </section>
  );
};
