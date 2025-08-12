export type Category = {
  id: number;
  slug: string;
  name: string;
  parentId: number | null;
  order: number;
  image?: string;
  banner?: string;
  description?: string;
  isFeatured?: boolean;
  active?: boolean;
};
