import { useSearchParams } from "react-router-dom";
import { Card } from "antd";

export default function SortBar() {
  const [params, setParams] = useSearchParams();
  const sort = (params.get("sort") as "sold" | "rating" | "price") || "sold";
  const order = (params.get("order") as "asc" | "desc") || (sort === "price" ? "asc" : "desc");

  const setSort = (s: "sold" | "rating" | "price") => {
    const p = new URLSearchParams(params);
    p.set("sort", s);
    if (s === "price" && !p.get("order")) p.set("order", "asc");
    setParams(p, { replace: true });
  };

  const togglePriceOrder = () => {
    const p = new URLSearchParams(params);
    p.set("sort", "price");
    p.set("order", order === "asc" ? "desc" : "asc");
    setParams(p, { replace: true });
  };

  return (
    <div style={{ 
      backgroundColor: 'white', 
      padding: '12px 16px',
      borderRadius: 8,
      border: '1px solid #e8e8e8',
      marginBottom: 16,
      boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
    }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12, fontSize: 14 }}>
        {/* Left side - Filter tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, flex: 1 }}>
          <span style={{ color: '#333', fontWeight: 500, fontSize: 14, marginRight: 8 }}>
            Tất cả sản phẩm
          </span>
          
          <span style={{ 
            borderRadius: 20,
            border: '1px solid #1890ff',
            padding: '4px 12px',
            backgroundColor: '#e6f7ff',
            color: '#1890ff',
            fontSize: 12,
            fontWeight: 500
          }}>
            FREESHIP XTRA
          </span>
          
          <span style={{
            borderRadius: 20,
            border: '1px solid #52c41a',
            padding: '4px 12px',
            backgroundColor: '#f6ffed',
            color: '#52c41a',
            fontSize: 12,
            fontWeight: 500
          }}>
            ⭐ từ 4 sao
          </span>
        </div>

        {/* Right side - Sort buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: '#8c8c8c', fontSize: 13 }}>Sắp xếp</span>
          
          <button 
            onClick={() => setSort("sold")}   
            style={{
              borderRadius: 4,
              padding: '6px 12px',
              fontSize: 13,
              cursor: 'pointer',
              backgroundColor: sort === "sold" ? '#1890ff' : 'white',
              color: sort === "sold" ? 'white' : '#666',
              border: '1px solid #d9d9d9',
              fontWeight: sort === "sold" ? 500 : 400
            }}
          >
            Bán chạy
          </button>
          
          <button 
            onClick={() => setSort("rating")} 
            style={{
              borderRadius: 4,
              padding: '6px 12px',
              fontSize: 13,
              cursor: 'pointer',
              backgroundColor: sort === "rating" ? '#1890ff' : 'white',
              color: sort === "rating" ? 'white' : '#666',
              border: '1px solid #d9d9d9',
              fontWeight: sort === "rating" ? 500 : 400
            }}
          >
            Đánh giá cao
          </button>
          
          <button 
            onClick={togglePriceOrder}       
            style={{
              borderRadius: 4,
              padding: '6px 12px',
              fontSize: 13,
              cursor: 'pointer',
              backgroundColor: sort === "price" ? '#1890ff' : 'white',
              color: sort === "price" ? 'white' : '#666',
              border: '1px solid #d9d9d9',
              fontWeight: sort === "price" ? 500 : 400
            }}
          >
            Giá {sort === "price" ? (order === "asc" ? "↑" : "↓") : ""}
          </button>
        </div>
      </div>
    </div>
  );
}
