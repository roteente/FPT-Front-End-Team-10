// src/features/books/pages/Home.tsx
import { useSearchParams } from "react-router-dom";
import { Row, Col, Card, Spin } from "antd";

import SidebarCategories from "../../categories/components/SidebarCategories";
import BannerSlider from "../components/BannerSlider";
import CategoryStrip from "../../categories/components/CategoryStrip";
import SortBar from "../components/SortBar";
import BookCard from "../components/BookCard";
import { useGetBooksQuery } from "../bookApi";

export default function Home() {
  // đọc tham số từ URL (search, sort, order)
  const [params] = useSearchParams();
  const q = params.get("q") ?? "";
  const sortBy = (params.get("sort") as "sold" | "rating" | "price") || "sold";
  const order =
    (params.get("order") as "asc" | "desc") || (sortBy === "price" ? "asc" : "desc");

  // gọi API - 4 cột x 3 hàng = 12 sản phẩm
  const { data, isLoading, isError, refetch } = useGetBooksQuery({
    q,
    sort: sortBy,
    order,
    page: 1,
    limit: 12, // 4 cột x 3 hàng
  });

  return (
    <div style={{ width: '100%', backgroundColor: '#f5f5f5' }}>
      <div style={{ maxWidth: 1640, margin: '0 auto', padding: '24px' }}>
        <Row gutter={[24, 16]}>
          {/* Sidebar trái */}
          <Col xs={0} lg={5} xl={4}>
            <SidebarCategories />
          </Col>

          {/* Content phải */}
          <Col xs={24} lg={19} xl={20}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Banner */}
              <BannerSlider />

              {/* Dải danh mục ngang */}
              <CategoryStrip />

              {/* Thanh sort/filter */}
              <SortBar />

            {/* Section Header */}
            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: 18, fontWeight: 600, color: '#262626', margin: 0 }}>Nhà Sách Tiki</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#8c8c8c' }}>
                  <span>Tất cả sản phẩm</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span>Phổ biến</span>
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Card>

            {/* Grid sản phẩm - 4 cột x 3 hàng */}
            <div style={{
              backgroundColor: 'white',
              padding: '16px',
              borderRadius: 8,
              border: '1px solid #e8e8e8',
              boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
            }}>
              <Row gutter={[12, 16]}>
                {isLoading &&
                  Array.from({ length: 12 }).map((_, i) => (
                    <Col xs={12} sm={8} md={6} lg={6} xl={6} key={i}>
                      <Card loading style={{ height: 350 }} />
                    </Col>
                  ))}

                {!isLoading &&
                  !isError &&
                  data?.items?.map((b: any) => (
                    <Col xs={12} sm={8} md={6} lg={6} xl={6} key={b.id}>
                      <BookCard book={b} />
                    </Col>
                  ))}

                {!isLoading && !isError && (data?.items?.length ?? 0) === 0 && (
                  <Col span={24}>
                    <div style={{ textAlign: 'center', padding: 40, color: '#8c8c8c' }}>
                      Không tìm thấy sách phù hợp.
                    </div>
                  </Col>
                )}
              </Row>
            </div>

            {isError && (
              <div style={{
                backgroundColor: 'white',
                padding: '16px',
                borderRadius: 8,
                border: '1px solid #ffccc7',
                marginTop: 16
              }}>
                <div style={{ color: '#f5222d', fontSize: 14 }}>
                  Lỗi tải dữ liệu.{" "}
                  <button 
                    style={{ textDecoration: 'underline', background: 'none', border: 'none', color: '#f5222d', cursor: 'pointer' }} 
                    onClick={() => refetch()}
                  >
                    Thử lại
                  </button>
                </div>
              </div>
            )}
          </div>
        </Col>
      </Row>
      </div>
    </div>
  );
}
