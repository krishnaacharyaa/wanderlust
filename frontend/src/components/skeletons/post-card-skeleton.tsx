import { Skeleton } from '@/components/ui/skeleton';

export const PostCardSkeleton = () => {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4" data-testid="postcardskeleton">
      <div className="mb-4 mr-8 mt-4 rounded-lg bg-light shadow-md dark:bg-dark-card">
        <Skeleton className="h-48 w-full rounded-lg bg-slate-200 dark:bg-slate-700" />
        <div className="p-4">
          <Skeleton className="mb-2 h-3 w-full bg-slate-200 dark:bg-slate-700 sm:w-2/3" />
          <Skeleton className="mb-2 h-6 w-full bg-slate-200 dark:bg-slate-700 sm:w-4/5" />
          <Skeleton className="h-16 w-full bg-slate-200 dark:bg-slate-700 sm:w-11/12" />
          <div className="mt-2 flex flex-wrap gap-2">
            <Skeleton
              className={`h-6 w-full rounded-full sm:w-16 ${'sm:mr-8 sm:mt-4'} bg-slate-200 dark:bg-slate-700 sm:mb-4`}
            />
            <Skeleton
              className={`h-6 w-full rounded-full sm:w-16 ${'sm:mr-8 sm:mt-4'} bg-slate-200 dark:bg-slate-700 sm:mb-4`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
