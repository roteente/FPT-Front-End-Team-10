import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetBookByIdQuery } from '../api/bookApi';
import DetailBodyThreeCols from '../sections/detail/DetailBodyThreeCols';
import DebugAuth from '@/features/auth/components/DebugAuth';

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  console.log('Detail page - ID from params:', id);
  const { data: book, isLoading, error } = useGetBookByIdQuery(id!);
  
  console.log('Detail page - API state:', { book, isLoading, error });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4">
            <div className="w-full h-96 bg-gray-200 animate-pulse rounded-lg"></div>
          </div>
          <div className="lg:col-span-5">
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2"></div>
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="w-full h-64 bg-gray-200 animate-pulse rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Không tìm thấy sản phẩm</h2>
          <p className="text-gray-500">Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Không có dữ liệu</h2>
          <p className="text-gray-500">Không thể tải thông tin sản phẩm.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <DebugAuth />
      <DetailBodyThreeCols book={book} />
    </>
  );
};

export default Detail;
