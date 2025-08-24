import React from 'react';

interface ValidationWarningProps {
  type: 'missing-data' | 'incomplete-shipping' | 'no-products';
  message: string;
  warnings?: string[];
  onAction?: () => void;
  actionText?: string;
}

export const ValidationWarning: React.FC<ValidationWarningProps> = ({
  type,
  message,
  warnings = [],
  onAction,
  actionText = 'Cập nhật ngay'
}) => {
  const getIcon = () => {
    switch (type) {
      case 'missing-data':
        return (
          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      case 'incomplete-shipping':
        return (
          <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      case 'no-products':
        return (
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.5m0 0V8a2 2 0 00-2-2h-4V6a2 2 0 00-2-2v0a2 2 0 00-2 2v0h-4a2 2 0 00-2 2v5m16 0h-2.5" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getColorClasses = () => {
    switch (type) {
      case 'missing-data':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'incomplete-shipping':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'no-products':
        return 'bg-gray-50 border-gray-200 text-gray-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  return (
    <div className={`p-4 border rounded-lg ${getColorClasses()}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3 mt-0.5">
          {getIcon()}
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-medium mb-1">{message}</h4>
          
          {warnings.length > 0 && (
            <ul className="text-xs mt-2 space-y-1">
              {warnings.map((warning, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-1 h-1 bg-current rounded-full mr-2"></span>
                  {warning}
                </li>
              ))}
            </ul>
          )}
          
          {onAction && (
            <button
              onClick={onAction}
              className={`mt-3 text-xs font-medium underline hover:no-underline transition-all duration-200 ${
                type === 'missing-data' ? 'text-red-700 hover:text-red-900' :
                type === 'incomplete-shipping' ? 'text-yellow-700 hover:text-yellow-900' :
                'text-gray-700 hover:text-gray-900'
              }`}
            >
              {actionText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Hook để sử dụng validation warnings
export const useOrderValidation = (order: any) => {
  const validateOrder = () => {
    // Return empty warnings if no order
    if (!order) {
      return [];
    }

    const warnings: Array<{
      type: ValidationWarningProps['type'];
      message: string;
      warnings?: string[];
    }> = [];

    // Check required data
    if (!order.id || !order.total || !order.createdAt) {
      warnings.push({
        type: 'missing-data',
        message: 'Thiếu dữ liệu quan trọng',
        warnings: [
          !order.id && 'Mã đơn hàng',
          !order.total && 'Tổng tiền',
          !order.createdAt && 'Ngày tạo'
        ].filter(Boolean) as string[]
      });
    }

    // Check shipping info
    const shippingWarnings: string[] = [];
    if (!order.receiverName) shippingWarnings.push('Tên người nhận');
    if (!order.receiverAddress) shippingWarnings.push('Địa chỉ giao hàng');
    if (!order.receiverPhone) shippingWarnings.push('Số điện thoại');

    if (shippingWarnings.length > 0) {
      warnings.push({
        type: 'incomplete-shipping',
        message: 'Thông tin giao hàng chưa đầy đủ',
        warnings: shippingWarnings
      });
    }

    // Check products
    if (!order.products || order.products.length === 0) {
      warnings.push({
        type: 'no-products',
        message: 'Đơn hàng chưa có sản phẩm'
      });
    }

    return warnings;
  };

  const validationResult = validateOrder();

  return {
    warnings: validationResult,
    hasWarnings: validationResult.length > 0,
    hasCriticalErrors: validationResult.some(w => w.type === 'missing-data')
  };
};
