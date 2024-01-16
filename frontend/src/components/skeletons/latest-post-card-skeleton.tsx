import { Skeleton } from '@/components/ui/skeleton';

export const LatestPostCardSkeleton = () => {
  return (
    <div className="rounded-lg bg-light p-3 dark:bg-dark-card" data-testid="latestpostcardskeleton">
      <div className="flex">
        <div className="mb-2 flex flex-1 flex-wrap gap-2">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <Skeleton
                key={index}
                className="h-6 w-16 rounded-full bg-slate-200 dark:bg-slate-700"
              />
            ))}
        </div>
      </div>
      <div className="mb-2">
        <Skeleton className="h-6 w-11/12 bg-slate-200 dark:bg-slate-700" />
        <Skeleton className="mt-2 h-4 w-2/3 bg-slate-200 dark:bg-slate-700" />
      </div>
      <Skeleton className="h-3 w-1/3 bg-slate-200 dark:bg-slate-700" />
    </div>
  );
};
