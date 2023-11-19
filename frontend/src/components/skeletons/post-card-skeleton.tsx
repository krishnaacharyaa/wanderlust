import { Skeleton } from '../ui/skeleton';

export const PostCardSkeleton = () => {
  return (
    <div className="w-full p-4 md:w-1/2 lg:w-1/3 xl:w-1/4">
      <div className="rounded-lg bg-white shadow-md">
        <Skeleton className="h-48 w-full rounded-lg" />
        <div className="p-4">
          <div className="mb-2 flex text-xs text-gray-500">
            <Skeleton className="mr-2 h-4 w-2/3 bg-gray-200" />
          </div>
          <Skeleton className="mb-2 h-6 w-4/5 bg-gray-200" />
          <Skeleton className="line-clamp-2 h-14 w-full bg-gray-200 text-gray-600" />
          <div className="mt-4 flex flex-wrap gap-2">
            <Skeleton className="h-6 w-16 rounded-3xl bg-gray-200" />
            <Skeleton className="h-6 w-16 rounded-3xl bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
};
