import { Skeleton } from '../ui/skeleton';

export const FeaturedPostCardSkeleton = () => {
  return (
    <div className="flex h-48 gap-4 rounded-lg bg-white">
      <div className="w-1/3">
        {/* for image */}
        <Skeleton className="h-full w-full rounded-lg bg-gray-200" />
      </div>
      <div className="flex h-full w-2/3 flex-col gap-2">
        {/* for title */}
        <Skeleton className="h-6 w-full bg-gray-200 text-xl" />
        <Skeleton className="h-6 w-2/3 bg-gray-200 text-xl" />
        <div className="flex flex-wrap gap-2">
          {/* for categories */}
          <Skeleton className="h-6 w-16 rounded-3xl bg-gray-200" />
          <Skeleton className="h-6 w-16 rounded-3xl bg-gray-200" />
          <Skeleton className="h-6 w-16 rounded-3xl bg-gray-200" />
        </div>
        {/* for description */}
        <Skeleton className="line-clamp-2 h-12 w-full bg-gray-200" />
        <div className="mb-1 flex flex-1 items-end">
          {/* for author and time */}
          <Skeleton className="h-5 w-1/3 bg-gray-200" />
        </div>
      </div>
    </div>
  );
};
