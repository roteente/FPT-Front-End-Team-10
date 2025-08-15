import * as React from "react";
import { Book } from "../api/bookApi";
import { Link } from "react-router-dom";

interface TopSellingBooksProps {
  books: Book[];
}

const TopSellingBooks = ({ books }: TopSellingBooksProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  // Lấy top sách bán chạy nhất
  const topBooks = React.useMemo(() => {
    return [...books]
      .filter((book) => book.quantity_sold?.value)
      .sort((a, b) => (b.quantity_sold?.value || 0) - (a.quantity_sold?.value || 0))
      .slice(0, 10);
  }, [books]);

  // Tạo một mảng giả lập tương tự với hình ảnh
  const hardcodedBooks = [
    { id: '1', name: 'NEXUS - Luộc Sử Của Những Mạng Lưới Thông Tin Từ Thời Đá Đến Thời Nhân Tạo', price: '365.000' },
    { id: '2', name: 'Chat GPT Thực Chiến', price: '110.000' },
    { id: '3', name: 'Đắt Đỏ Một Bầy Sói Hay Chăn Một Đàn Cừu', price: '127.000' },
    { id: '4', name: 'Thao Túng Tâm Lý', price: '115.100' },
    { id: '5', name: 'Giải mã Hóc-môn Dopamine', price: '145.000' },
    { id: '6', name: 'Personal Best American B1+ Intermediate Pack B', price: '228.920' },
    { id: '7', name: 'Bookmark lạp xách giấy cứng', price: '2.000' },
    { id: '8', name: 'Hero U Arc - Tập 3', price: '119.000' },
    { id: '9', name: 'Blue Period - Tập 03', price: '45.500' },
    { id: '10', name: 'Semantic Error - Lỗi Logic (Tập 2)', price: '161.000' }
  ];

  return (
    <div 
      className="bg-white border border-[#EBEBF0]"
      style={{
        width: '100%',
        height: 'auto',
        opacity: 1,
      }}
    >
      {/* Title */}
      <div 
        style={{
          width: '100%',
          height: '21px',
          opacity: 1,
          padding: '16px 16px 0',
        }}
      >
        <h2 
          className="text-[20px] font-normal text-[#333333]"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            lineHeight: '21px',
            letterSpacing: '0%',
            verticalAlign: 'middle',
            height: '24.5px',
            marginTop: '-2px',
          }}
        >
          Top Bán Chạy Sản Phẩm Nhà Sách Tiki
        </h2>
      </div>

      {/* Content */}
      <div className="px-4 mt-4">
        {/* Danh sách bảng xếp hạng - sử dụng dữ liệu cố định từ hình ảnh */}
        <div className="py-4">
          <ul className="space-y-2">
            {hardcodedBooks.map((book, index) => (
              <li key={book.id} className="py-1">
                <Link
                  to={`/books/${book.id}`}
                  className="flex justify-between items-center hover:bg-[#F5F5FA] group"
                >
                  <div className="flex items-center flex-1 min-w-0">
                    <span 
                      className="mr-2 text-[14px] font-normal w-5 flex-shrink-0"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 400,
                        lineHeight: '21px',
                        letterSpacing: '0%',
                        verticalAlign: 'middle',
                        color: '#0B74E5',
                      }}
                    >
                      {index + 1}.
                    </span>
                    <span
                      className="text-[14px] font-normal text-[#333333] group-hover:text-[#0B74E5] truncate"
                      style={{ 
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 400,
                        lineHeight: '21px',
                        letterSpacing: '0%',
                        verticalAlign: 'middle',
                      }}
                    >
                      {book.name}
                    </span>
                  </div>
                  <div 
                    className="text-right text-[14px] font-normal text-[#FF424E] flex-shrink-0 ml-4 whitespace-nowrap"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 400,
                      lineHeight: '21px',
                      letterSpacing: '0%',
                      verticalAlign: 'middle',
                    }}
                  >
                    {book.price}
                    <sup>đ</sup>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopSellingBooks;
