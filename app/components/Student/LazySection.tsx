import React, { Suspense } from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

interface LazySectionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  threshold?: number;
}

const defaultFallback = (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

const LoadingSkeleton = () => (
  <div className="h-32 rounded-lg overflow-hidden">
    <div className="animate-pulse space-y-4">
      <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-3/4"></div>
      <div className="space-y-2">
        <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded"></div>
        <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-5/6"></div>
      </div>
      <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-1/2"></div>
    </div>
  </div>
);

export default function LazySection({
  children,
  fallback = defaultFallback,
  threshold = 0.1,
}: LazySectionProps) {
  const { elementRef, hasIntersected } = useIntersectionObserver({
    threshold,
  });

  return (
    <div ref={elementRef} className="transition-all duration-300 ease-in-out">
      {hasIntersected ? (
        <Suspense fallback={fallback}>
          <div className="transform transition-all duration-300 ease-in-out">
            {children}
          </div>
        </Suspense>
      ) : (
        <LoadingSkeleton />
      )}
    </div>
  );
}
