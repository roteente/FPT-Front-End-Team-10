import { baseApi } from '@/core/api/baseApi';

export interface UserProfile {
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
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateProfileRequest {
  id: string | number;
  name?: string;
  nickname?: string;
  phone?: string;
  email?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  nationality?: string;
  avatar?: string;
}

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get user profile - use the existing /me endpoint
    getUserProfile: builder.query<UserProfile, void>({
      query: () => ({
        url: `/me`,
        method: 'GET',
      }),
      providesTags: ['User'],
      transformResponse: (response: any) => {
        // Transform API response to match our interface
        return {
          id: response.id,
          name: response.name || response.fullName,
          fullName: response.fullName,
          firstName: response.firstName,
          lastName: response.lastName,
          nickname: response.nickname,
          phone: response.phone,
          email: response.email,
          dateOfBirth: response.dateOfBirth,
          gender: response.gender,
          nationality: response.nationality,
          avatar: response.avatar,
          createdAt: response.createdAt,
          updatedAt: response.updatedAt,
        };
      },
    }),

    // Update user profile - use the existing /profile endpoint
    updateUserProfile: builder.mutation<UserProfile, Omit<UpdateProfileRequest, 'id'>>({
      query: (profileData) => ({
        url: `/profile`,
        method: 'PUT',
        body: {
          name: profileData.name,
          nickname: profileData.nickname,
          phone: profileData.phone,
          email: profileData.email,
          dateOfBirth: profileData.dateOfBirth,
          gender: profileData.gender,
          nationality: profileData.nationality,
          avatar: profileData.avatar,
        },
      }),
      invalidatesTags: ['User'],
      transformResponse: (response: any) => {
        return {
          id: response.id,
          name: response.name || response.fullName,
          fullName: response.fullName,
          firstName: response.firstName,
          lastName: response.lastName,
          nickname: response.nickname,
          phone: response.phone,
          email: response.email,
          dateOfBirth: response.dateOfBirth,
          gender: response.gender,
          nationality: response.nationality,
          avatar: response.avatar,
          createdAt: response.createdAt,
          updatedAt: response.updatedAt,
        };
      },
    }),

    // Update profile avatar
    updateProfileAvatar: builder.mutation<UserProfile, { userId: string | number; avatar: File }>({
      query: ({ userId, avatar }) => {
        const formData = new FormData();
        formData.append('avatar', avatar);
        
        return {
          url: `/users/${userId}/avatar`,
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['User'],
    }),

    // Upload avatar và update profile
    uploadAvatar: builder.mutation<{ avatarUrl: string }, { userId: string | number; file: File }>({
      query: ({ userId, file }) => {
        const formData = new FormData();
        formData.append('avatar', file);
        
        return {
          url: `/users/${userId}/upload-avatar`,
          method: 'POST',
          body: formData,
        };
      },
      transformResponse: (response: any) => ({
        avatarUrl: response.avatarUrl || response.url,
      }),
    }),

    // Validate phone number
    validatePhone: builder.mutation<{ isValid: boolean; message?: string }, { phone: string }>({
      query: ({ phone }) => ({
        url: '/users/validate-phone',
        method: 'POST',
        body: { phone },
      }),
    }),

    // Validate email
    validateEmail: builder.mutation<{ isValid: boolean; message?: string }, { email: string; excludeUserId?: string | number }>({
      query: ({ email, excludeUserId }) => ({
        url: '/users/validate-email',
        method: 'POST',
        body: { 
          email,
          excludeUserId,
        },
      }),
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useUpdateProfileAvatarMutation,
  useUploadAvatarMutation,
  useValidatePhoneMutation,
  useValidateEmailMutation,
} = profileApi;

// Enhanced hooks with fallback for development
export const useGetUserProfileWithFallback = () => {
  const queryResult = useGetUserProfileQuery();
  
  // If API is not available, return mock data
  if (queryResult.error && (queryResult.error as any).status === 404) {
    return {
      ...queryResult,
      data: {
        id: 1,
        name: 'Nguyễn Văn A',
        fullName: 'Nguyễn Văn A',
        phone: '0123456789',
        email: 'user@example.com',
        dateOfBirth: '1990-01-01',
        gender: 'male' as const,
        nationality: 'Việt Nam',
        avatar: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      isLoading: false,
      error: null,
    };
  }
  
  return queryResult;
};

export const useUpdateUserProfileWithFallback = () => {
  const [updateMutation] = useUpdateUserProfileMutation();
  
  const updateProfile = async (profileData: Omit<UpdateProfileRequest, 'id'>) => {
    try {
      const result = await updateMutation(profileData).unwrap();
      console.log('✅ Profile update success:', result);
      return result;
    } catch (error: any) {
      console.log('❌ Profile update error:', error);
      
      // If API is not available, return mock success
      if (error.status === 404 || error.status === 'FETCH_ERROR') {
        console.warn('🔧 Profile API not available, using mock update');
        const mockResponse = {
          id: 1,
          ...profileData,
          updatedAt: new Date().toISOString(),
        };
        console.log('🎭 Using mock profile update response:', mockResponse);
        return mockResponse;
      }
      
      // Re-throw other errors
      throw error;
    }
  };
  
  return [updateProfile, { isLoading: false }] as const;
};
