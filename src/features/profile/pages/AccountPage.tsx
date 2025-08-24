import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import ProfileLayout from '../components/ProfileLayout';
import DebugUserInfo from '../components/DebugUserInfo';

const AccountPage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  
  // Initialize userInfo từ Redux store thay vì hardcode
  const [userInfo, setUserInfo] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || user?.defaultAddress?.street || '',
    birthDate: user?.dateOfBirth || '01/01/1990',
    gender: user?.gender === 'male' ? 'Nam' : user?.gender === 'female' ? 'Nữ' : 'Khác'
  });

  const [isEditing, setIsEditing] = useState(false);

  // Update userInfo khi user data thay đổi từ Redux
  useEffect(() => {
    if (user) {
      setUserInfo({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || user.defaultAddress?.street || '',
        birthDate: user.dateOfBirth || '01/01/1990',
        gender: user.gender === 'male' ? 'Nam' : user.gender === 'female' ? 'Nữ' : 'Khác'
      });
    }
  }, [user]);

  const handleSave = () => {
    // TODO: API call to save user info
    // Trong thực tế sẽ dispatch action để update user trong Redux
    setIsEditing(false);
    alert('Thông tin đã được cập nhật thành công!');
  };

  return (
    <ProfileLayout>
      <div className="p-6">
        {/* Debug User Info - có thể remove sau khi test xong */}
        <div className="mb-6">
          <DebugUserInfo />
        </div>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold text-gray-900">
            Thông tin tài khoản
          </h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-colors"
          >
            {isEditing ? 'Hủy' : 'Chỉnh sửa'}
          </button>
        </div>

        <div className="max-w-2xl space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{user?.name || 'Chưa cập nhật tên'}</h3>
              <p className="text-sm text-gray-500">
                Thành viên từ {user?.createdAt ? new Date(user.createdAt).getFullYear() : '2023'}
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Họ và tên
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={userInfo.name}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="py-2 text-gray-900">{userInfo.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={userInfo.email}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="py-2 text-gray-900">{userInfo.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số điện thoại
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={userInfo.phone}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="py-2 text-gray-900">{userInfo.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Giới tính
              </label>
              {isEditing ? (
                <select
                  value={userInfo.gender}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, gender: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                </select>
              ) : (
                <p className="py-2 text-gray-900">{userInfo.gender}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ngày sinh
              </label>
              {isEditing ? (
                <input
                  type="date"
                  value={userInfo.birthDate.split('/').reverse().join('-')}
                  onChange={(e) => {
                    const date = new Date(e.target.value);
                    const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
                    setUserInfo(prev => ({ ...prev, birthDate: formattedDate }));
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="py-2 text-gray-900">{userInfo.birthDate}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Địa chỉ
            </label>
            {isEditing ? (
              <textarea
                value={userInfo.address}
                onChange={(e) => setUserInfo(prev => ({ ...prev, address: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="py-2 text-gray-900">{userInfo.address}</p>
            )}
          </div>

          {isEditing && (
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Lưu thay đổi
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Hủy
              </button>
            </div>
          )}
        </div>
      </div>
    </ProfileLayout>
  );
};

export default AccountPage;
