import { Link } from "react-router-dom";
import { Row, Col, Card, Skeleton } from "antd";
import { useGetCategoriesQuery } from "@/features/categories/categoryApi";

export default function CategoryStrip() {
  const { data, isLoading, isError } = useGetCategoriesQuery();

  // Icons for categories (in real app, this could come from API)
  const getCategoryIcon = (name: string) => {
    const icons: Record<string, string> = {
      'English Books': '📚',
      'Sách tiếng Việt': '📖', 
      'Văn phòng phẩm': '✏️',
      'Quà lưu niệm': '🎁',
      'Kinh tế': '💼',
      'Tâm lý': '🧠',
      'Kỹ năng': '⚡',
      'Thiếu nhi': '🧸',
      'Văn học': '📝',
      'Khoa học': '🔬'
    };
    return icons[name] || '📖';
  };

  // Fallback data if API fails
  const fallbackCategories = [
    { id: '1', name: 'English Books' },
    { id: '2', name: 'Sách tiếng Việt' },
    { id: '3', name: 'Văn phòng phẩm' },
    { id: '4', name: 'Quà lưu niệm' }
  ];
  
  const categoriesToShow = data?.slice(0, 4) || fallbackCategories;

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '16px',
      borderRadius: 8,
      border: '1px solid #e8e8e8',
      marginBottom: 16,
      boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
    }}>
      <h3 style={{ 
        fontSize: 16, 
        fontWeight: 600, 
        color: '#333', 
        margin: '0 0 16px 0' 
      }}>
        Khám phá theo danh mục
      </h3>
      
      <Row gutter={[16, 16]}>
        {isLoading &&
          Array.from({ length: 4 }).map((_, i) => (
            <Col xs={12} sm={6} key={i}>
              <div style={{ textAlign: 'center', padding: 16 }}>
                <Skeleton.Avatar size={64} style={{ marginBottom: 8 }} />
                <Skeleton.Button size="small" style={{ width: 80, height: 20 }} />
              </div>
            </Col>
          ))
        }
        
        {!isLoading && categoriesToShow.map((category) => (
          <Col xs={12} sm={6} key={category.id}>
            <Link
              to={`/?categoryId=${category.id}`}
              style={{ textDecoration: 'none' }}
            >
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 16,
                borderRadius: 8,
                transition: 'background-color 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <div style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  backgroundColor: '#fff2e8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                  marginBottom: 8
                }}>
                  {getCategoryIcon(category.name)}
                </div>
                <span style={{
                  fontSize: 14,
                  color: '#666',
                  textAlign: 'center',
                  fontWeight: 500
                }}>
                  {category.name}
                </span>
              </div>
            </Link>
          </Col>
        ))}
        

      </Row>
    </div>
  );
}
