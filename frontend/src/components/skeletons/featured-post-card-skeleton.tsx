import { Skeleton } from '@/components/ui/skeleton';

export const FeaturedPostCardSkeleton = () => {
  return (
    <div
      className="flex flex-col rounded-lg bg-light dark:bg-dark-card sm:flex-row"
      data-testid="featurepostcardskeleton"
    >
      {/* Image */}
      <div className="mb-4 w-full sm:mb-0 sm:w-1/3">
        <Skeleton
          className="h-50 w-full rounded-lg bg-slate-200 object-cover shadow-lg dark:bg-slate-700 sm:h-full"
          style={{ height: '190px' }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col p-3 sm:w-2/3">
        {/* Title */}
        <Skeleton className="mb-3 h-6 w-full bg-slate-200 dark:bg-slate-700" />

        {/* Categories */}
        <div className="mb-3 flex flex-wrap gap-2">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <Skeleton
                key={index}
                className="h-6 w-16 rounded-full bg-slate-200 dark:bg-slate-700"
              />
            ))}
        </div>

        {/* Description */}
        <Skeleton className="mb-4 h-10 w-full bg-slate-200 dark:bg-slate-700 sm:h-16 lg:h-16" />

        {/* Author and Time */}
        <div className="flex items-end">
          <Skeleton className="h-3 w-1/3 bg-slate-200 dark:bg-slate-700" />
        </div>
      </div>
    </div>
  );
};
