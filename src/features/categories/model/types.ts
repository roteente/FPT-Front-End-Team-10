export type Category = {
  id: number | string;
  slug: string;
  name: string;
  parentId?: number | string | null;
  order?: number;
  isLeaf?: boolean; // From api.json: true if has no children
  image?: string;
  banner?: string;
  description?: string;
  isFeatured?: boolean;
  active?: boolean;
};
