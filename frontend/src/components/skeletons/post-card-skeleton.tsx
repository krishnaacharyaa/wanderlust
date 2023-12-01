import { Skeleton } from '@/components/ui/skeleton';

export const PostCardSkeleton = () => {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
      <div className="bg-light m-4 rounded-lg shadow-md dark:bg-dark-card">
        <Skeleton className="h-48 w-full rounded-lg bg-slate-200 dark:bg-slate-700" />
        <div className="p-4">
          <Skeleton className="mb-2 h-3 w-2/3 bg-slate-200 dark:bg-slate-700" />
          <Skeleton className="mb-2 h-6 w-4/5 bg-slate-200 dark:bg-slate-700" />
          <Skeleton className="h-16 w-11/12 bg-slate-200 dark:bg-slate-700" />
          <div className="mt-2 flex flex-wrap gap-2">
            <Skeleton className="h-6 w-16 rounded-full bg-slate-200 dark:bg-slate-700" />
            <Skeleton className="h-6 w-16 rounded-full bg-slate-200 dark:bg-slate-700" />
          </div>
        </div>
      </div>
    </div>
  );
};
