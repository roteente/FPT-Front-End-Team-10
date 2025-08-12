import * as React from "react";

type Banner = { id?: number | string; image: string; href?: string; alt?: string };
type Props = { items?: Banner[] };

export default function BannerSlider({ items }: Props) {
  // luôn an toàn là mảng
  const slides: Banner[] = Array.isArray(items) ? items : [];

  // chưa có data → placeholder để không trắng màn hình
  if (slides.length === 0) {
    return (
      <div className="h-48 md:h-64 rounded-xl border border-[#EBEBF0] bg-white flex items-center justify-center">
        <div className="text-xs text-gray-500">Banner Slider (đang phát triển)</div>
      </div>
    );
  }

  return (
    <div className="h-48 md:h-64 rounded-xl border border-[#EBEBF0] bg-white overflow-hidden">
      <img
        src={slides[0].image}
        alt={slides[0].alt ?? "banner"}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
