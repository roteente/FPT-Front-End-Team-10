import * as React from "react";
import { cn } from "@/core/utils/cn";
import type { Category } from "../model/types";

type SidebarUIProps = {
  title?: string;
  categories: Category[];
  selectedCategory?: string;
  onCategorySelect?: (slug: string) => void;
  className?: string;
  itemClassName?: string;
};

export default function SidebarUI({
  title = "Khám phá theo danh mục",
  categories,
  selectedCategory,
  onCategorySelect,
  className,
  itemClassName,
}: SidebarUIProps) {
  return (
    <aside
      className={cn(
        "w-[240px] min-h-[722px]",
        "bg-white border border-[#EBEBF0] rounded-[8px]",
        "sticky top-[88px] max-h-[calc(100vh-88px-24px)] overflow-auto",
        "px-3 py-2 md:px-4 md:py-3",
        className
      )}
    >
      <div className="h-[46px] flex items-center px-2">
        <h2 className="text-[15px] font-semibold text-[#27272A]">{title}</h2>
      </div>

      <nav className="mt-1 space-y-1">
        {categories.map((c) => {
          const slug = c.slug ?? String(c.id);
          const active = selectedCategory === slug;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => onCategorySelect?.(slug)}
              className={cn(
                "w-full text-left h-10 px-3 rounded-lg transition",
                "text-[14px] leading-5 text-[#27272A]",
                "hover:bg-[#F6F7F9]",
                active && "bg-[#F6F7F9] font-medium",
                itemClassName
              )}
            >
              {c.name}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
