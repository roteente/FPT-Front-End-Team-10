import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

const DebugUserInfo = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">⚠️ Debug: User Not Found</h3>
        <p className="text-yellow-700">Không có thông tin user trong Redux store</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <h3 className="text-lg font-semibold text-blue-800 mb-3">🔍 Debug: Current User Data</h3>
      <div className="space-y-2 text-sm">
        <div><strong>ID:</strong> {user.id}</div>
        <div><strong>Name:</strong> {user.name}</div>
        <div><strong>Email:</strong> {user.email}</div>
        <div><strong>Phone:</strong> {user.phone || 'Chưa có'}</div>
        <div><strong>Role:</strong> {user.role}</div>
        <div><strong>Gender:</strong> {user.gender || 'Chưa có'}</div>
        <div><strong>Date of Birth:</strong> {user.dateOfBirth || 'Chưa có'}</div>
        <div><strong>Avatar:</strong> {user.avatar || 'Chưa có'}</div>
        <div><strong>Active:</strong> {user.isActive ? 'Yes' : 'No'}</div>
        <div><strong>Loyalty Points:</strong> {user.loyaltyPoints || 0}</div>
        <div><strong>Membership:</strong> {user.membershipLevel || 'bronze'}</div>
        <div><strong>Created At:</strong> {user.createdAt || 'Chưa có'}</div>
        <div><strong>Default Address:</strong> {user.defaultAddress?.street || 'Chưa có'}</div>
        <div><strong>Addresses Count:</strong> {user.addresses?.length || 0}</div>
      </div>
    </div>
  );
};

export default DebugUserInfo;
