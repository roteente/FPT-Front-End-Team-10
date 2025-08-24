import React from 'react';
import ProfileLayout from '../components/ProfileLayout';

const NotificationsPage = () => {
  const notifications = [
    {
      id: 1,
      type: 'order',
      title: 'Đơn hàng đã được xác nhận',
      message: 'Đơn hàng #861977987 của bạn đã được xác nhận và đang được chuẩn bị.',
      time: '2 giờ trước',
      read: false
    },
    {
      id: 2,
      type: 'promotion',
      title: 'Ưu đãi đặc biệt',
      message: 'Giảm 50% cho đơn hàng tiếp theo. Mã: SAVE50',
      time: '1 ngày trước',
      read: true
    }
  ];

  return (
    <ProfileLayout>
      <div className="p-6">
        <h1 className="text-xl font-semibold text-gray-900 mb-6">
          Thông báo của tôi
        </h1>

        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border ${
                notification.read ? 'bg-white' : 'bg-blue-50 border-blue-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">
                    {notification.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    {notification.time}
                  </p>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                )}
              </div>
            </div>
          ))}
        </div>

        {notifications.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Bạn chưa có thông báo nào.</p>
          </div>
        )}
      </div>
    </ProfileLayout>
  );
};

export default NotificationsPage;
