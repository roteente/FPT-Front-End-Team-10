import React from 'react';

export const OrderDetailSkeleton: React.FC = () => {
  return (
    <div className="p-6 border rounded-lg animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="h-6 bg-gray-200 rounded w-64 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-40"></div>
        </div>
      </div>

      {/* Grid Info Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((item) => (
          <div key={item}>
            <div className="h-5 bg-gray-200 rounded w-32 mb-3"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Products Table Header Skeleton */}
      <div className="bg-gray-50 px-4 py-3 grid grid-cols-12 gap-4 border-b">
        <div className="col-span-5 h-4 bg-gray-200 rounded"></div>
        <div className="col-span-2 h-4 bg-gray-200 rounded"></div>
        <div className="col-span-2 h-4 bg-gray-200 rounded"></div>
        <div className="col-span-2 h-4 bg-gray-200 rounded"></div>
        <div className="col-span-1 h-4 bg-gray-200 rounded"></div>
      </div>

      {/* Products Skeleton */}
      {[1, 2].map((item) => (
        <div key={item} className="px-4 py-4 grid grid-cols-12 gap-4 items-center border-b">
          <div className="col-span-5 flex items-center gap-3">
            <div className="w-16 h-20 bg-gray-200 rounded"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
          <div className="col-span-2 text-center">
            <div className="h-4 bg-gray-200 rounded w-16 mx-auto"></div>
          </div>
          <div className="col-span-2 text-center">
            <div className="h-4 bg-gray-200 rounded w-8 mx-auto"></div>
          </div>
          <div className="col-span-2 text-center">
            <div className="h-4 bg-gray-200 rounded w-12 mx-auto"></div>
          </div>
          <div className="col-span-1 text-right">
            <div className="h-4 bg-gray-200 rounded w-16 ml-auto"></div>
          </div>
        </div>
      ))}

      {/* Summary Skeleton */}
      <div className="mt-6 flex justify-end">
        <div className="w-80 space-y-2">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const OrderListSkeleton: React.FC = () => {
  return (
    <div className="space-y-2">
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="p-3 border rounded-lg animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-16 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-12 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>
      ))}
    </div>
  );
};
