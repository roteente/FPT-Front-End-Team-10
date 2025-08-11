// src/features/categories/categoryApi.ts
import { baseApi } from '@/features/api/baseApi';

export type Category = { id: string; name: string };

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    getCategories: b.query<Category[], void>({
      query: () => '/categories',
      transformResponse: (raw: any[]) =>
        raw.map(r => ({ id: String(r.id), name: r.name }))
           .sort((a, b) => a.name.localeCompare(b.name, 'vi')),
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;
