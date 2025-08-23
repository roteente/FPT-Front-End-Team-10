import React from 'react';
import ProfileLayout from '../components/ProfileLayout';

const SecurityPage = () => {
  return (
    <ProfileLayout>
      <div className="p-6">
        <h1 className="text-xl font-semibold text-gray-900 mb-6">
          Thông tin bảo mật
        </h1>

        <div className="max-w-2xl space-y-6">
          {/* Change Password */}
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-4">Đổi mật khẩu</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mật khẩu hiện tại
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập mật khẩu hiện tại"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mật khẩu mới
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập mật khẩu mới"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Xác nhận mật khẩu mới
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Xác nhận mật khẩu mới"
                />
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Cập nhật mật khẩu
              </button>
            </div>
          </div>

          {/* Two-Factor Authentication */}
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-4">Xác thực hai yếu tố</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  Tăng cường bảo mật tài khoản với xác thực hai yếu tố
                </p>
              </div>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                Kích hoạt
              </button>
            </div>
          </div>

          {/* Login History */}
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-4">Lịch sử đăng nhập</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div>
                  <p className="text-sm font-medium">Chrome on Windows</p>
                  <p className="text-xs text-gray-500">192.168.1.1 • Hôm nay, 10:30</p>
                </div>
                <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                  Hiện tại
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium">Mobile App</p>
                  <p className="text-xs text-gray-500">192.168.1.2 • Hôm qua, 14:20</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
};

export default SecurityPage;
