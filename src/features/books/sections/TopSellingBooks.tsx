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

  // Lấy top sách bán chạy nhất từ dữ liệu thật
  const topBooks = React.useMemo(() => {
    return [...books]
      .filter((book) => book.quantity_sold?.value || book.current_seller?.price || book.list_price)
      .sort((a, b) => (b.quantity_sold?.value || 0) - (a.quantity_sold?.value || 0))
      .slice(0, 10)
      .map((book, index) => ({
        id: book.id,
        name: book.name,
        price: formatPrice(book.current_seller?.price || book.list_price || 0) + 'đ'
      }));
  }, [books]);

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
        {/* Danh sách bảng xếp hạng - sử dụng dữ liệu thật từ API */}
        <div className="py-4">
          <ul className="space-y-2">
            {topBooks.map((book, index) => (
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
