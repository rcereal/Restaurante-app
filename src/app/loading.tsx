import { ProductSkeleton } from "@/components/products/ProductSkeleton";

export default function Loading() {
  return (
    <main className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="text-center mb-12 space-y-4">
        <div className="h-10 w-64 bg-gray-200 rounded-lg mx-auto animate-pulse"></div>
        <div className="h-4 w-48 bg-gray-100 rounded mx-auto animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    </main>
  );
}
