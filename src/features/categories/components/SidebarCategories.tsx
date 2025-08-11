import { Link } from "react-router-dom";
import { Card, List, Skeleton } from "antd";
import { useGetCategoriesQuery } from "@/features/categories/categoryApi";

export default function SidebarCategories() {
  const { data, isLoading, isError } = useGetCategoriesQuery();

  return (
    <div style={{ position: 'sticky', top: 80 }}>
      <Card 
        title="Khám phá theo danh mục" 
        size="small"
        style={{ marginBottom: 16 }}
      >
        {isLoading && (
          <List>
            {Array.from({ length: 8 }).map((_, i) => (
              <List.Item key={i} style={{ padding: '8px 0' }}>
                <Skeleton.Button active size="small" style={{ width: '80%', height: 20 }} />
              </List.Item>
            ))}
          </List>
        )}
        
        {!isLoading && !isError && (
          <List
            dataSource={data}
            renderItem={(category: any) => (
              <List.Item style={{ padding: '4px 0', border: 'none' }}>
                <Link 
                  to={`/?categoryId=${category.id}`}
                  style={{ 
                    display: 'block',
                    padding: '8px 12px',
                    borderRadius: 6,
                    color: '#666',
                    textDecoration: 'none',
                    fontSize: 14,
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  {category.name}
                </Link>
              </List.Item>
            )}
          />
        )}
        
        {!isLoading && isError && (
          <div style={{ padding: 16, color: '#f5222d', fontSize: 12, textAlign: 'center' }}>
            Không tải được danh mục
          </div>
        )}
      </Card>
    </div>
  );
}
