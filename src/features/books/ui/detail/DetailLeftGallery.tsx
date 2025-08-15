import React, { useState, CSSProperties } from "react";
import { ImageWithFallback } from "@/ui/primitives";
import { FaAngleRight } from "react-icons/fa6";
import type { Book } from "../../api/bookApi";

type DetailLeftGalleryProps = {
  book: Book;
};

function DetailLeftGallery({ book }: DetailLeftGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Chuẩn hóa images thành mảng object { large_url, medium_url, base_url }
  const bookImages =
    (book.images || []).map((img) =>
      typeof img === "string" ? { base_url: img } : img
    ) || [];

  const imageUrl =
    bookImages.length > 0
      ? bookImages[selectedImageIndex]?.large_url ||
        bookImages[selectedImageIndex]?.medium_url ||
        bookImages[selectedImageIndex]?.base_url
      : "https://via.placeholder.com/400x600";

  return (
    <div style={styles.colSpan}>
      <div style={styles.container}>
        <div style={styles.innerContainer}>
          {/* Main Image */}
          <div style={styles.mainImageWrapper}>
            <ImageWithFallback
              src={imageUrl}
              alt={book.name}
              style={styles.mainImage}
            />
          </div>

          {/* Thumbnail Images */}
          {bookImages.length > 1 && (
            <div style={styles.thumbnailContainer}>
              {bookImages.slice(0, 5).map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  style={{
                    ...styles.thumbnailButton,
                    borderColor:
                      selectedImageIndex === index ? "#3b82f6" : "#e5e7eb",
                  }}
                >
                  <ImageWithFallback
                    src={image?.large_url || image?.medium_url || image.base_url}
                    alt={`${book.name} ${index + 1}`}
                    style={styles.thumbnailImage}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Button */}
        <div style={styles.bottomButton}>
          <div style={styles.bottomText}>
            <ImageWithFallback
              src={"/bookDetail-icon-left.png"}
              style={styles.icon}
            />
            <span style={styles.textSpan}>Xem thêm</span>
            Tóm tắt nội dung sách
          </div>
          <FaAngleRight style={styles.icon} />
        </div>
      </div>
    </div>
  );
}

export default DetailLeftGallery;

const styles: { [key: string]: CSSProperties } = {
  colSpan: {
    gridColumn: "span 5",
    width: "100%"
  },
  container: {
    backgroundColor: "#ffffff",
    borderRadius: "0.5rem",
  },
  innerContainer: {
    padding: "1rem",
  },
  mainImageWrapper: {
    aspectRatio: "3 / 4",
    backgroundColor: "#ffffff",
    borderRadius: "0.5rem",
    marginBottom: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    border: "0.0625rem solid #e5e7eb",
  },
  mainImage: {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
  },
  thumbnailContainer: {
    display: "flex",
    gap: "0.5rem",
    justifyContent: "center",
  },
  thumbnailButton: {
    width: "4rem",
    height: "5rem",
    borderRadius: "0.375rem",
    borderWidth: "0.125rem",
    overflow: "hidden",
    padding: 0,
    cursor: "pointer",
  },
  thumbnailImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    padding: "0.3125rem",
  },
  bottomButton: {
    borderTop: "0.0625rem solid rgba(235, 235, 240, 1)",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
    marginTop: "1rem",
    width: "100%",
  },
  bottomText: {
    display: "flex",
    flexDirection: "row",
    color: "black",
    fontSize: "0.875rem",
    gap: "0.3125rem",
  },
  textSpan: {
    color: "rgba(128, 128, 137, 1)",
  },
  icon: {
    width: "1.5rem",
    height: "1.5rem",
    color: "rgba(128, 128, 137, 1)",
  },
};