import React from 'react';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

interface APIErrorDisplayProps {
  error: FetchBaseQueryError | SerializedError | undefined;
  title?: string;
  showDetails?: boolean;
  onRetry?: () => void;
}

export const APIErrorDisplay: React.FC<APIErrorDisplayProps> = ({ 
  error, 
  title = "Lỗi tải dữ liệu",
  showDetails = false,
  onRetry 
}) => {
  if (!error) return null;

  const getErrorMessage = (error: FetchBaseQueryError | SerializedError): string => {
    if ('status' in error) {
      // FetchBaseQueryError
      if (typeof error.status === 'number') {
        switch (error.status) {
          case 404:
            return 'Không tìm thấy dữ liệu';
          case 500:
            return 'Lỗi server nội bộ';
          case 403:
            return 'Không có quyền truy cập';
          case 401:
            return 'Vui lòng đăng nhập lại';
          default:
            return `Lỗi HTTP ${error.status}`;
        }
      } else {
        return 'Lỗi kết nối mạng';
      }
    } else {
      // SerializedError
      return error.message || 'Lỗi không xác định';
    }
  };

  const getErrorDetails = (error: FetchBaseQueryError | SerializedError): string => {
    if ('status' in error) {
      return JSON.stringify(error, null, 2);
    } else {
      return error.stack || error.message || 'No details available';
    }
  };

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-red-800">{title}</h3>
          <p className="mt-1 text-sm text-red-700">{getErrorMessage(error)}</p>
          
          {onRetry && (
            <div className="mt-3">
              <button
                onClick={onRetry}
                className="bg-red-600 text-white text-sm px-3 py-1 rounded hover:bg-red-700 transition-colors"
              >
                Thử lại
              </button>
            </div>
          )}
          
          {showDetails && (
            <details className="mt-3">
              <summary className="cursor-pointer text-sm text-red-600 hover:text-red-800">
                Chi tiết lỗi
              </summary>
              <pre className="mt-2 text-xs bg-red-100 p-2 rounded overflow-auto max-h-32">
                {getErrorDetails(error)}
              </pre>
            </details>
          )}
        </div>
      </div>
    </div>
  );
};

// Loading skeleton component
export const LoadingSkeleton: React.FC<{ 
  count?: number; 
  height?: string; 
  className?: string 
}> = ({ count = 4, height = "h-6", className = "" }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array(count).fill(0).map((_, i) => (
        <div key={i} className={`bg-gray-200 animate-pulse rounded ${height}`} />
      ))}
    </div>
  );
};

// Empty state component
export const EmptyState: React.FC<{
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}> = ({ icon, title, description, action }) => {
  return (
    <div className="text-center py-12">
      {icon && <div className="text-4xl mb-4">{icon}</div>}
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      {description && <p className="text-gray-500 mb-4">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  );
};
