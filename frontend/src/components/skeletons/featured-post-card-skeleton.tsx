import { Skeleton } from "../ui/skeleton";

export const FeaturedPostCardSkeleton = () => {
  return (
    <div className="flex flex-col sm:flex-row rounded-lg bg-light dark:bg-dark-card" data-testid="featurepostcardskeleton">
      {/* Image */}
      <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
        <Skeleton className="h-48 sm:h-full w-full rounded-lg bg-slate-200 dark:bg-slate-700" />
      </div>

      {/* Content */}
      <div className="flex flex-col sm:w-2/3 p-3">
        {/* Title */}
        <Skeleton className="h-6 w-full mb-2 bg-slate-200 dark:bg-slate-700" />
        
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-2">
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
        <Skeleton className="h-12 w-full mb-2 bg-slate-200 dark:bg-slate-700" />
        
        {/* Author and Time */}
        <div className="flex items-end">
          <Skeleton className="h-3 w-1/3 bg-slate-200 dark:bg-slate-700" />
        </div>
      </div>
    </div>
  );
};
