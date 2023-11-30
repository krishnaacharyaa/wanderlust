import { Skeleton } from '@/components/ui/skeleton';

export const LatestPostCardSkeleton = () => {
  return (
    <div className="rounded-lg bg-slate-50 py-2 shadow-sm">
      <div className="flex">
        <div className="mb-2 flex flex-1 flex-wrap gap-2">
          <Skeleton className="h-6 w-16 rounded-3xl bg-slate-200" />
          <Skeleton className="h-6 w-16 rounded-3xl bg-slate-200" />
          <Skeleton className="h-6 w-16 rounded-3xl bg-slate-200" />
        </div>
        <Skeleton className="h-4 w-4 bg-slate-200" style={{ height: 12, width: 12 }} />
      </div>
      <div className="mb-2 line-clamp-2 text-xl font-semibold">
        <Skeleton className="h-6 w-full bg-slate-200" />
        <Skeleton className="mt-2 h-6 w-2/3 bg-slate-200" />
      </div>
      <div className="flex text-xs text-slate-500">
        <Skeleton className="h-4 w-1/3 bg-slate-200" />
      </div>
    </div>
  );
};
