import { Skeleton } from "../ui/skeleton";

export function ProductSkeleton() {
  return (
    <div className="border rounded-lg p-4 space-y-4 shadow-sm">
      <Skeleton className="h-40 w-full rounded-md" />

      <div className="space-y-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-1/2" />
      </div>

      <div className="flex justify-between items-center pt-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-8 w-20 rounded-md" />
      </div>
    </div>
  );
}
