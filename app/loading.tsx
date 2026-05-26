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
          <div className="mt-10 mb-10">
            <Skeleton className="h-11 w-52 sm:h-12" />
            <Skeleton className="mt-3 h-5 w-80" />
          </div>

          <div className="flex flex-col gap-4">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </main>
    </>
  );
}
