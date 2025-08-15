import React, { useState, useRef, useEffect } from "react";

interface ReadMoreHTMLProps {
    html: string;
    charLimit?: number;
    showMoreText?: string;
    showLessText?: string;
}

const ReadMoreHTML: React.FC<ReadMoreHTMLProps> = ({
    html,
    charLimit = 150,
    showMoreText = "Xem thêm",
    showLessText = "Thu gọn",
}) => {
    const [expanded, setExpanded] = useState(false);
    const [maxHeight, setMaxHeight] = useState("0px");
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentRef.current) {
            if (expanded) {
                setMaxHeight(`${contentRef.current.scrollHeight}px`);
            } else {
                setMaxHeight("120px"); // Chiều cao khi thu gọn
            }
        }
    }, [expanded, html]);

    return (
        <div>
            <div
                ref={contentRef}
                className="overflow-hidden transition-all duration-500 ease-in-out"
                style={{ maxHeight }}
            >
                <div
                    dangerouslySetInnerHTML={{
                        __html: html,
                    }}
                />
            </div>

            {/* Overlay khi thu gọn */}
            {!expanded && (
                <div className="relative -mt-12 h-12 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
            )}

            <div className="mt-2 flex justify-center">
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200"
                >
                    {expanded ? `${showLessText}` : `${showMoreText}`}
                </button>
            </div>
        </div>
    );
};

export default ReadMoreHTML;