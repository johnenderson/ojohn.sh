import { Navbar } from '@/base/components/Navbar';

const Skeleton = ({ className }: { className: string }) => (
  <div className={`animate-pulse rounded-md bg-site-card ${className}`} />
);

export default function Loading() {
  return (
    <>
      <Navbar />
      <main id="main">
        <div className="content">
          <div className="flex max-w-5xl flex-col items-start gap-8">
            <div className="mt-10 mb-10 w-full">
              <Skeleton className="h-11 w-48 sm:h-12" />
              <Skeleton className="mt-3 h-5 w-80" />
            </div>

            <div className="h-px w-full bg-site-border-muted" />

            <div className="flex w-full flex-col gap-6">
              <Skeleton className="h-7 w-44" />
              <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <Skeleton className="min-h-28" />
                <Skeleton className="min-h-28" />
                <Skeleton className="min-h-28" />
                <Skeleton className="min-h-28" />
              </div>
            </div>

            <div className="h-px w-full bg-site-border-muted" />

            <div className="flex w-full max-w-3xl flex-col gap-6">
              <Skeleton className="h-7 w-36" />
              <div className="flex flex-col gap-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-11/12" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-10/12" />
                <Skeleton className="h-4 w-9/12" />
              </div>
            </div>

            <div className="h-px w-full bg-site-border-muted" />

            <div className="flex w-full max-w-3xl flex-col gap-4">
              <Skeleton className="h-7 w-44" />
              <Skeleton className="h-4 w-72" />
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-24" />
              </div>
            </div>

            <div className="h-px w-full bg-site-border-muted" />

            <div className="flex w-full max-w-3xl flex-col gap-4">
              <Skeleton className="h-7 w-48" />
              <Skeleton className="h-4 w-80" />
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-28" />
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-24" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
