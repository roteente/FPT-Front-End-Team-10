import { baseApi } from "@/core/api/baseApi";
import type { Category } from "../model/types";

type GetCategoriesArgs =
  | {
      parentId?: number | null;   // null => root categories
      isFeatured?: boolean;
      slug?: string;
    }
  | void;

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query<Category[], GetCategoriesArgs>({
      // luôn lấy sorted list rồi lọc phía FE (tránh vấn đề filter null của json-server)
      query: () => ({ url: "/categories", params: { _sort: "order" } }),
      transformResponse: (res: Category[], _meta, arg) => {
        let items = Array.isArray(res) ? res : [];
        if (!arg) return items;

        if (typeof arg.slug === "string") {
          items = items.filter((c) => c.slug === arg.slug);
        }
        if ("parentId" in arg) {
          items = items.filter((c) => c.parentId === arg.parentId);
        }
        if ("isFeatured" in arg) {
          const wanted = Boolean(arg.isFeatured);
          items = items.filter((c) => Boolean(c.isFeatured) === wanted);
        }
        return items;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map((c) => ({ type: "Category" as const, id: c.id })),
              { type: "Category" as const, id: "LIST" },
            ]
          : [{ type: "Category" as const, id: "LIST" }],
    }),
  }),
  overrideExisting: true,
});

export const { useGetCategoriesQuery } = categoryApi;
