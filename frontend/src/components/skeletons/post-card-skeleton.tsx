import { Skeleton } from '@/components/ui/skeleton';

export const PostCardSkeleton = () => {
  return (
    <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4" data-testid="postcardskeleton">
      <div className="mb-4 mr-8 mt-4 rounded-lg bg-light shadow-md dark:bg-dark-card">
        <Skeleton className="h-48 w-full rounded-lg bg-slate-200 dark:bg-slate-700" />
        <div className="p-4">
          <Skeleton className="mb-2 h-3 w-full pr-2 bg-slate-200 dark:bg-slate-700" />
          <Skeleton className="mb-2 h-6 w-full pr-2 bg-slate-200 dark:bg-slate-700" />
          <Skeleton className="mb-2 sm:mb-4 h-6 w-full pr-2 bg-slate-200 dark:bg-slate-700" />
          <div className="mt-1 sm:mt-2 flex flex-wrap gap-1 sm:gap-1.5">
            <Skeleton
              className={`h-6 w-16 rounded-full bg-slate-200 dark:bg-slate-700`}
            />
            <Skeleton
              className={`h-6 w-16 rounded-full bg-slate-200 dark:bg-slate-700`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
