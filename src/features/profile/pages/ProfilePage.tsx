import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useUpdateUserProfileWithFallback, useGetUserProfileWithFallback } from '../api/profileApi';
import { LoadingSpinner } from '@/ui/primitives/LoadingSpinner';

interface UserProfile {
  id: string | number;
  name?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  nickname?: string;
  phone?: string;
  email?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  nationality?: string;
  avatar?: string;
}

const ProfilePage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  
  // Get user profile từ API - sử dụng fallback hook
  const { 
    data: profileData, 
    isLoading: isLoadingProfile,
    error: profileError,
    refetch 
  } = useGetUserProfileWithFallback();

  // Update profile mutation - sử dụng fallback hook
  const [updateProfile, { isLoading: isUpdating }] = useUpdateUserProfileWithFallback();

  // Form state
  const [formData, setFormData] = useState<UserProfile>({
    id: '',
    name: '',
    nickname: '',
    phone: '',
    email: '',
    dateOfBirth: '',
    gender: 'male',
    nationality: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');

  // Initialize form data từ API
  useEffect(() => {
    if (profileData) {
      setFormData({
        id: profileData.id || user?.id || '',
        name: profileData.name || profileData.fullName || '',
        nickname: profileData.nickname || '',
        phone: profileData.phone || '',
        email: profileData.email || '',
        dateOfBirth: profileData.dateOfBirth || '',
        gender: profileData.gender || 'male',
        nationality: profileData.nationality || ''
      });
    } else if (user) {
      // Fallback to user data from auth state
      setFormData({
        id: user.id || '',
        name: user.name || user.fullName || '',
        nickname: user.nickname || '',
        phone: user.phone || '',
        email: user.email || '',
        dateOfBirth: user.dateOfBirth || '',
        gender: user.gender || 'male',
        nationality: user.nationality || ''
      });
    }
  }, [profileData, user]);

  // Parse date for form inputs
  const parseDateOfBirth = () => {
    if (!formData.dateOfBirth) return { day: '', month: '', year: '' };
    
    try {
      const date = new Date(formData.dateOfBirth);
      return {
        day: date.getDate().toString(),
        month: (date.getMonth() + 1).toString(),
        year: date.getFullYear().toString()
      };
    } catch {
      return { day: '', month: '', year: '' };
    }
  };

  const [dateFields, setDateFields] = useState(parseDateOfBirth());

  useEffect(() => {
    setDateFields(parseDateOfBirth());
  }, [formData.dateOfBirth]);

  // Validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) {
      newErrors.name = 'Họ và tên không được để trống';
    }

    if (!formData.phone?.trim()) {
      newErrors.phone = 'Số điện thoại không được để trống';
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }

    if (!formData.email?.trim()) {
      newErrors.email = 'Email không được để trống';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    // Validate date of birth
    if (dateFields.day && dateFields.month && dateFields.year) {
      const day = parseInt(dateFields.day);
      const month = parseInt(dateFields.month);
      const year = parseInt(dateFields.year);

      if (day < 1 || day > 31) {
        newErrors.dateOfBirth = 'Ngày không hợp lệ';
      } else if (month < 1 || month > 12) {
        newErrors.dateOfBirth = 'Tháng không hợp lệ';
      } else if (year < 1900 || year > new Date().getFullYear()) {
        newErrors.dateOfBirth = 'Năm không hợp lệ';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error khi user nhập lại
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Handle date changes
  const handleDateChange = (field: 'day' | 'month' | 'year', value: string) => {
    const newDateFields = { ...dateFields, [field]: value };
    setDateFields(newDateFields);

    // Update formData.dateOfBirth if all fields are filled
    if (newDateFields.day && newDateFields.month && newDateFields.year) {
      const dateString = `${newDateFields.year}-${newDateFields.month.padStart(2, '0')}-${newDateFields.day.padStart(2, '0')}`;
      setFormData(prev => ({
        ...prev,
        dateOfBirth: dateString
      }));
    }

    // Clear date error
    if (errors.dateOfBirth) {
      setErrors(prev => ({
        ...prev,
        dateOfBirth: ''
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      // Remove id from formData since /profile endpoint doesn't need it
      const { id, ...profileDataToUpdate } = formData;
      await updateProfile(profileDataToUpdate).unwrap();

      setSuccessMessage('Cập nhật thông tin thành công!');
      setTimeout(() => setSuccessMessage(''), 3000);
      
      // Refetch profile data
      refetch();
    } catch (error: any) {
      console.error('Update profile error:', error);
      setErrors({
        submit: error?.data?.message || 'Có lỗi xảy ra khi cập nhật thông tin'
      });
    }
  };

  if (isLoadingProfile) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <LoadingSpinner size="lg" className="py-20" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-gray-700">Trang chủ</Link>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          <span className="text-gray-900">Thông tin tài khoản</span>
        </nav>

        {/* Main Layout with Sidebar */}
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              {/* User Info */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user?.name || 'User'} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div>
                  <div className="text-sm text-gray-500">Tài khoản của</div>
                  <div className="font-medium text-gray-900">
                    {formData.name || 'Vũ Anh Tú'}
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <nav className="space-y-2">
                <Link 
                  to="/profile" 
                  className="flex items-center gap-3 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">Thông tin tài khoản</span>
                </Link>
                
                <Link 
                  to="/notifications" 
                  className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                  <span className="text-sm">Thông báo của tôi</span>
                </Link>
                
                <Link 
                  to="/orders" 
                  className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 00-2 2v6a2 2 0 002 2h8a2 2 0 002-2V6a2 2 0 00-2-2v1a2 2 0 01-2 2H8a2 2 0 01-2-2V4a2 2 0 012-2v1a2 2 0 00-2 2z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Quản lý đơn hàng</span>
                </Link>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-200">
                <h1 className="text-xl font-semibold text-gray-900">Thông tin tài khoản</h1>
              </div>

              {/* Success Message */}
              {successMessage && (
                <div className="mx-6 mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-green-700 text-sm font-medium">{successMessage}</span>
                  </div>
                </div>
              )}

              {/* Form Content */}
              <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column - Personal Info */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-4 uppercase tracking-wide">
                      Thông tin cá nhân
                    </h3>
                    
                    <div className="space-y-6">
                      {/* Profile Picture */}
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden">
                          {user?.avatar ? (
                            <img 
                              src={user.avatar} 
                              alt="Profile" 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          ) : (
                            <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1">
                          <button
                            type="button"
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                          >
                            Thay đổi ảnh
                          </button>
                        </div>
                      </div>

                      {/* Họ & Tên */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Họ & Tên *
                        </label>
                        <input
                          type="text"
                          value={formData.name || ''}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                            errors.name ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="Nhập họ và tên"
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                        )}
                      </div>

                      {/* Nickname */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nickname
                        </label>
                        <input
                          type="text"
                          value={formData.nickname || ''}
                          onChange={(e) => handleInputChange('nickname', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                          placeholder="Thêm nickname"
                        />
                      </div>

                      {/* Ngày sinh */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ngày sinh
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <input
                              type="number"
                              placeholder="Ngày"
                              min="1"
                              max="31"
                              value={dateFields.day}
                              onChange={(e) => handleDateChange('day', e.target.value)}
                              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                                errors.dateOfBirth ? 'border-red-300' : 'border-gray-300'
                              }`}
                            />
                          </div>
                          <div>
                            <input
                              type="number"
                              placeholder="Tháng"
                              min="1"
                              max="12"
                              value={dateFields.month}
                              onChange={(e) => handleDateChange('month', e.target.value)}
                              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                                errors.dateOfBirth ? 'border-red-300' : 'border-gray-300'
                              }`}
                            />
                          </div>
                          <div>
                            <input
                              type="number"
                              placeholder="Năm"
                              min="1900"
                              max={new Date().getFullYear()}
                              value={dateFields.year}
                              onChange={(e) => handleDateChange('year', e.target.value)}
                              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                                errors.dateOfBirth ? 'border-red-300' : 'border-gray-300'
                              }`}
                            />
                          </div>
                        </div>
                        {errors.dateOfBirth && (
                          <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>
                        )}
                      </div>

                      {/* Giới tính */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Giới tính
                        </label>
                        <div className="flex gap-6">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="gender"
                              value="male"
                              checked={formData.gender === 'male'}
                              onChange={(e) => handleInputChange('gender', e.target.value)}
                              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">Nam</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="gender"
                              value="female"
                              checked={formData.gender === 'female'}
                              onChange={(e) => handleInputChange('gender', e.target.value)}
                              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">Nữ</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="gender"
                              value="other"
                              checked={formData.gender === 'other'}
                              onChange={(e) => handleInputChange('gender', e.target.value)}
                              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">Khác</span>
                          </label>
                        </div>
                      </div>

                      {/* Quốc tịch */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Quốc tịch
                        </label>
                        <select
                          value={formData.nationality || ''}
                          onChange={(e) => handleInputChange('nationality', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                        >
                          <option value="">Chọn quốc tịch</option>
                          <option value="VN">Việt Nam</option>
                          <option value="US">Hoa Kỳ</option>
                          <option value="JP">Nhật Bản</option>
                          <option value="KR">Hàn Quốc</option>
                          <option value="CN">Trung Quốc</option>
                          <option value="OTHER">Khác</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Contact Info */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-4 uppercase tracking-wide">
                      Số điện thoại và Email
                    </h3>
                    
                    <div className="space-y-6">
                      {/* Số điện thoại */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Số điện thoại
                          </label>
                          <button
                            type="button"
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                          >
                            Cập nhật
                          </button>
                        </div>
                        <input
                          type="tel"
                          value={formData.phone || ''}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                            errors.phone ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="Nhập số điện thoại"
                        />
                        {errors.phone && (
                          <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Địa chỉ email
                          </label>
                          <button
                            type="button"
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                          >
                            Cập nhật
                          </button>
                        </div>
                        <input
                          type="email"
                          value={formData.email || ''}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-colors ${
                            errors.email ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="Nhập địa chỉ email"
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Error */}
                {errors.submit && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 text-sm">{errors.submit}</p>
                  </div>
                )}

                {/* Submit Button */}
                <div className="mt-8 flex justify-center">
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="px-8 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUpdating ? 'Đang lưu...' : 'Lưu thay đổi'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
