import { baseApi } from '@/core/api/baseApi';

export type Category = { id: number | string; name: string; slug?: string };

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    getCategories: b.query<Category[], void>({
      query: () => '/categories',
      providesTags: ['Categories'],
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;
