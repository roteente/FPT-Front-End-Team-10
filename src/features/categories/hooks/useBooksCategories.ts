import { useMemo } from 'react';
import { useGetBooksQuery } from '../../books/api/bookApi';

export interface BookCategory {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export function useBooksCategories() {
  const { data: books = [], isLoading, error } = useGetBooksQuery();

  const categories = useMemo(() => {
    if (!books.length) return [];

    // Extract unique categories from books
    const categoryMap = new Map<string, BookCategory>();

    books.forEach(book => {
      if (book.categories?.name) {
        const categoryName = book.categories.name;
        const slug = categoryName.toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '');
        
        if (categoryMap.has(categoryName)) {
          const existing = categoryMap.get(categoryName)!;
          existing.count += 1;
        } else {
          categoryMap.set(categoryName, {
            id: `cat-${slug}`,
            name: categoryName,
            slug: slug,
            count: 1
          });
        }
      }
    });

    // Convert map to array and sort by count (descending)
    return Array.from(categoryMap.values())
      .sort((a, b) => b.count - a.count);
  }, [books]);

  return {
    categories,
    isLoading,
    error
  };
}
