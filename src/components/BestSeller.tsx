import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { bestSellerMock } from "../data/bestSellerMock";
import type { BestSellerItem as BestSellerItemType } from "../types";
// import { CiStar } from "react-icons/ci";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaStar } from "react-icons/fa";

const USE_BEST_SELLER_API = false;

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

interface BestSellerCardProps {
  id: string;
  image: string[];
  name: string;
  price: number;
  promoBadge?: string;
  rating?: number;
  reviewsCount?: number;
  originalPrice?: number;
}

function BestSellerCard({
  id,
  image,
  name,
  price,
  promoBadge,
  rating = 4.9,
  reviewsCount = 15,
  originalPrice,
}: BestSellerCardProps) {
  const discountPercent =
    originalPrice && originalPrice > price && price > 0
      ? ((1 - price / originalPrice) * 100).toFixed(2)
      : null;

  return (
    <Link
      to={`/product/${id}`}
      className="group flex flex-col shrink-0 w-[260px] sm:w-[280px] rounded-xl bg-white shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={image?.[0]}
          alt={name}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {promoBadge && (
          <div
            className="absolute left-0 top-0 max-w-[85%] rounded-br-xl rounded-tl-xl bg-red-500 px-3 py-1.5 shadow"
            style={{
              clipPath:
                "polygon(0 0, 100% 0, 100% 85%, 90% 100%, 0 100%, 0 15%)",
            }}
          >
            <span className="text-xs font-bold text-white leading-tight">
              {promoBadge}
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2 min-h-[2.5rem]">
          {name}
        </h3>
        <div className="flex items-center gap-1.5 mt-2 text-gray-500">
          <span className="text-sm font-semibold text-gray-900">{rating}</span>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <FaStar key={i} size={16} className="!text-[#f29d38]" />
            ))}
          </div>
          <span className="text-xs text-gray-500">{reviewsCount} đánh giá</span>
        </div>
        <div className="mt-3 flex flex-wrap items-baseline gap-2">
          <span className="text-lg font-bold text-gray-900">
            {formatPriceVnd(price)}
          </span>
          {discountPercent && (
            <span className="rounded bg-primary px-1.5 py-0.5 text-xs font-semibold text-white">
              -{discountPercent}%
            </span>
          )}
        </div>
        {originalPrice && originalPrice > price && (
          <p className="mt-0.5 text-sm text-gray-400 line-through">
            {formatPriceVnd(originalPrice)}
          </p>
        )}
      </div>
    </Link>
  );
}

const BestSeller = () => {
  const ctx = useContext(ShopContext);
  const products = ctx?.products ?? [];
  const [bestSeller, setBestSeller] =
    useState<BestSellerItemType[]>(bestSellerMock);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (USE_BEST_SELLER_API) {
      const fromApi = products.filter((item) => item.bestseller).slice(0, 8);
      setBestSeller(
        fromApi.length > 0
          ? fromApi.map((p) => ({
              _id: p._id,
              name: p.name,
              image: p.image,
              price: p.price,
            }))
          : bestSellerMock,
      );
    } else {
      setBestSeller(bestSellerMock);
    }
  }, [products]);

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <section className="my-10 max-w-7xl mx-auto">
      <div className="rounded-2xl bg-white py-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-gray-900">Nệm bán chạy</h2>
          <button
            type="button"
            onClick={scrollRight}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white border border-gray-200 text-gray-700 shadow-sm hover:bg-gray-50 hover:border-primary/30 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Xem thêm sản phẩm"
          >
            <MdOutlineKeyboardArrowRight size={24} />
          </button>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-2 -mx-1 scroll-smooth scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {bestSeller.length === 0 ? (
            <p className="text-gray-500 py-8 w-full text-center">
              Đang tải sản phẩm...
            </p>
          ) : (
            bestSeller.map((item) => (
              <BestSellerCard
                key={item._id}
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
                promoBadge={item.promoBadge}
                rating={item.rating ?? 4.9}
                reviewsCount={item.reviewsCount ?? 15}
                originalPrice={
                  item.originalPrice ??
                  (item.price ? Math.round(item.price * 1.35) : undefined)
                }
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default BestSeller;
