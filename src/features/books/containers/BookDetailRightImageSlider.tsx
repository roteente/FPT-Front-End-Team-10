import React, { useState, CSSProperties } from "react";
import { ImageWithFallback } from "@/ui/primitives";
import { FaAngleRight } from "react-icons/fa6";

type BookDetailRightImageSliderProps = {
    BookName: string;
    BookImages: {
        large_url?: string;
        medium_url?: string;
        base_url?: string;
    }[];
};

function BookDetailRightImageSlider({
    BookName,
    BookImages,
}: BookDetailRightImageSliderProps) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const imageUrl =
        BookImages && BookImages.length > 0
            ? BookImages[selectedImageIndex]?.large_url ||
            BookImages[selectedImageIndex]?.medium_url ||
            BookImages[selectedImageIndex]?.base_url
            : "https://via.placeholder.com/400x600";

    return (
        <div style={styles.colSpan}>
            <div style={styles.container}>
                <div style={styles.innerContainer}>
                    {/* Main Image */}
                    <div style={styles.mainImageWrapper}>
                        <ImageWithFallback
                            src={imageUrl}
                            alt={BookName}
                            style={styles.mainImage}
                        />
                    </div>

                    {/* Thumbnail Images */}
                    {BookImages && BookImages.length > 1 && (
                        <div style={styles.thumbnailContainer}>
                            {BookImages.slice(0, 5).map((image, index) => (
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
                                        alt={`${BookName} ${index + 1}`}
                                        style={styles.thumbnailImage}
                                    />
                                </button>
                            ))}
                        </div>
                    )}

                </div>


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

export default BookDetailRightImageSlider;

const styles: { [key: string]: CSSProperties } = {
    colSpan: {
        gridColumn: "span 5",
        width: 400
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
        border: "1px solid #e5e7eb",
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
        borderWidth: 2,
        overflow: "hidden",
        padding: 0,
        cursor: "pointer",
    },
    thumbnailImage: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        padding: 5
    },
    bottomButton: {
        padding: "1rem",
        borderTopWidth: 1,
        borderTopStyle: "solid",
        borderTopColor: "rgba(235, 235, 240, 1)",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 10,
        marginTop: "1rem",
    },
    bottomText: {
        display: "flex",
        flexDirection: "row",
        color: "black",
        fontSize: 14,
        gap: 5
    },
    textSpan: {
        color: "rgba(128, 128, 137, 1)"
    },
    icon: {
        width: 24,
        height: 24,
        color: "rgba(128, 128, 137, 1)"
    }
};