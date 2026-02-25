import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import type { BestSellerItem } from "../types";
import { relatedProductsMock } from "../data/relatedProductsMock";
import { FaStar } from "react-icons/fa";
import { HiChevronRight } from "react-icons/hi2";

/** Set to true when related products API is ready. */
const USE_RELATED_PRODUCTS_API = false;

function formatPriceVnd(price: number | null | undefined): string {
  if (price == null) return "";
  return (
    new Intl.NumberFormat("vi-VN", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price) + " ₫"
  );
}

interface RelatedProductsProps {
  category: string;
  subCategory: string;
}

interface RelatedCardProps {
  item: BestSellerItem;
}

function RelatedCard({ item }: RelatedCardProps) {
  const discountPercent =
    item.originalPrice && item.originalPrice > item.price && item.price > 0
      ? ((1 - item.price / item.originalPrice) * 100).toFixed(2)
      : null;

  return (
    <Link
      to={`/product/${item._id}`}
      className="group max-sm:w-full flex flex-col shrink-0 w-[calc(50%-0.5rem)] sm:w-56 md:w-64 lg:w-72 rounded-xl bg-white shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={item.image?.[0]}
          alt={item.name}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {item.promoBadge && (
          <div
            className="absolute left-0 top-0 max-w-[85%] rounded-br-xl rounded-tl-xl bg-red-500 px-3 py-1.5 shadow"
            style={{
              clipPath:
                "polygon(0 0, 100% 0, 100% 85%, 90% 100%, 0 100%, 0 15%)",
            }}
          >
            <span className="text-xs font-bold text-white leading-tight">
              {item.promoBadge}
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2 min-h-[2.5rem]">
          {item.name}
        </h3>
        <div className="flex items-center gap-1.5 mt-2 text-gray-500">
          <span className="text-sm font-semibold text-gray-900">
            {item.rating ?? 5}
          </span>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <FaStar
                key={i}
                size={14}
                className={
                  i <= Math.round(item.rating ?? 5)
                    ? "text-amber-500 fill-amber-500"
                    : "text-gray-200"
                }
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">
            {item.reviewsCount ?? 0} đánh giá
          </span>
        </div>
        <div className="mt-3 flex flex-wrap items-baseline gap-2">
          <span className="text-lg font-bold text-red-600">
            {formatPriceVnd(item.price)}
          </span>
          {discountPercent && (
            <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-semibold text-white">
              -{discountPercent}%
            </span>
          )}
        </div>
        {item.originalPrice && item.originalPrice > item.price && (
          <p className="mt-0.5 text-sm text-gray-400 line-through">
            {formatPriceVnd(item.originalPrice)}
          </p>
        )}
      </div>
    </Link>
  );
}

export const RelatedProducts = ({
  category,
  subCategory,
}: RelatedProductsProps) => {
  const ctx = useContext(ShopContext);
  const products = ctx?.products ?? [];
  const [related, setRelated] = useState<BestSellerItem[]>(relatedProductsMock);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (USE_RELATED_PRODUCTS_API && products.length > 0) {
      const filtered = products
        .filter((item) => category === item.category)
        .filter((item) => subCategory === item.subCategory)
        .slice(0, 8)
        .map((p) => ({
          _id: p._id,
          name: p.name,
          image: p.image,
          price: p.price,
          originalPrice: p.price,
          rating: 4.9,
          reviewsCount: 0,
        }));
      setRelated(filtered.length > 0 ? filtered : relatedProductsMock);
    } else {
      setRelated(relatedProductsMock);
    }
  }, [products, category, subCategory]);

  const scrollRight = () => {
    if (scrollRef.current) {
      const step = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({ left: step, behavior: "smooth" });
    }
  };

  return (
    <div className="mt-24">
      <h2 className="text-left font-bold text-gray-900 text-xl mb-6">
        Sản Phẩm Liên Quan
      </h2>
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto overflow-y-hidden py-4 pr-14 -mx-2 pl-2 scroll-smooth"
          style={{ scrollbarWidth: "thin" }}
        >
          {related.map((item) => (
            <RelatedCard key={item._id} item={item} />
          ))}
        </div>
        <button
          type="button"
          onClick={scrollRight}
          aria-label="Xem thêm sản phẩm"
          className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-700 hover:bg-primary hover:text-white hover:border-primary transition-colors z-10"
        >
          <HiChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};
