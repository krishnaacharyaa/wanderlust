import { Skeleton } from './ui/skeleton';

export function PostMobileViewCardSkeleton() {
  return (
    <div
      className="flex h-fit rounded-lg border bg-slate-50 dark:border-none dark:bg-dark-card"
      data-testid={'postMobileViewCardSkeleton'}
    >
      <div className="flex h-fit w-full gap-2 p-3">
        <Skeleton className="w-1/3 overflow-hidden  rounded-lg bg-slate-200 dark:bg-slate-700" />
        <div className="flex h-full w-2/3 flex-col gap-2 ">
          <Skeleton className="mb-2 h-3 w-full bg-slate-200 pr-2 dark:bg-slate-700" />
          <div className="mt-1 flex flex-wrap gap-1 sm:mt-2 sm:gap-1.5">
            <Skeleton className={`h-6 w-16 rounded-full bg-slate-200 dark:bg-slate-700`} />
            <Skeleton className={`h-6 w-16 rounded-full bg-slate-200 dark:bg-slate-700`} />
          </div>
          <Skeleton className="mb-2 h-6 w-full bg-slate-200 pr-2 dark:bg-slate-700 sm:mb-4" />
          <Skeleton className="mb-2 h-3 w-full bg-slate-200 pr-2 dark:bg-slate-700" />
        </div>
      </div>
    </div>
  );
}
