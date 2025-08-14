import React from 'react';

interface FilterTag {
  id: string;
  label: string;
  value: string;
  type: 'category' | 'author' | 'price' | 'query';
}

interface FilterTagsProps {
  tags: FilterTag[];
  onRemoveTag: (tagId: string) => void;
  onClearAll: () => void;
}

export const FilterTags: React.FC<FilterTagsProps> = ({
  tags,
  onRemoveTag,
  onClearAll
}) => {
  if (tags.length === 0) return null;

  const getTagColor = (type: FilterTag['type']) => {
    switch (type) {
      case 'category':
        return 'bg-blue-100 text-blue-800';
      case 'author':
        return 'bg-green-100 text-green-800';
      case 'price':
        return 'bg-purple-100 text-purple-800';
      case 'query':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
      <span className="text-sm font-medium text-gray-700">Bộ lọc đang áp dụng:</span>
      
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag.id}
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getTagColor(tag.type)}`}
          >
            <span className="mr-1">{tag.label}:</span>
            <span className="font-semibold">{tag.value}</span>
            <button
              onClick={() => onRemoveTag(tag.id)}
              className="ml-2 hover:bg-black hover:bg-opacity-10 rounded-full p-0.5 transition-colors"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </span>
        ))}
      </div>

      {tags.length > 1 && (
        <button
          onClick={onClearAll}
          className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
        >
          Xóa tất cả
        </button>
      )}
    </div>
  );
};

export default FilterTags;
