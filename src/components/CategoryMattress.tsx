import { useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

type CategoryKey = "latex" | "foam" | "spring" | "bedsheet";

interface CategoryTab {
  key: CategoryKey;
  label: string;
}

interface CategoryProduct {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  promoBadge?: string;
  category: CategoryKey;
}

const CATEGORY_TABS: CategoryTab[] = [
  { key: "latex", label: "Nệm Cao Su Thiên Nhiên" },
  { key: "foam", label: "Nệm Foam" },
  { key: "spring", label: "Nệm Lò Xo" },
  { key: "bedsheet", label: "Ga Giường" },
];

const CATEGORY_PRODUCTS: CategoryProduct[] = [
  {
    id: "cat-1",
    category: "latex",
    name: "Nệm cao su thiên nhiên Thuần Việt Latex",
    image: assets.product1,
    price: 8670000,
    originalPrice: 11120000,
    rating: 5,
    reviewsCount: 50,
    promoBadge: "TẶNG THÊM 01 GỐI CAO SU",
  },
  {
    id: "cat-2",
    category: "latex",
    name: "Nệm cao su Thuần Việt Titan Grey",
    image: assets.product1,
    price: 12690000,
    originalPrice: 16920000,
    rating: 5,
    reviewsCount: 50,
    promoBadge: "GIẢM NGAY 999K",
  },
  {
    id: "cat-3",
    category: "latex",
    name: "Nệm Cao Su Thiên Nhiên Green Premier",
    image: assets.product1,
    price: 27930000,
    originalPrice: 39900000,
    rating: 4.9,
    reviewsCount: 49,
    promoBadge: "GIẢM NGAY 2999K",
  },
  {
    id: "cat-4",
    category: "latex",
    name: "Nệm cao su Thuần Việt Legend",
    image: assets.product1,
    price: 7720000,
    originalPrice: 10390000,
    rating: 5,
    reviewsCount: 50,
    promoBadge: "TẶNG THÊM 01 GỐI CAO SU",
  },
  {
    id: "cat-5",
    category: "latex",
    name: "Nệm Foam Latex Thuần Việt Hybrid",
    image: assets.product1,
    price: 11990000,
    originalPrice: 16660000,
    rating: 4.9,
    reviewsCount: 15,
    promoBadge: "GIẢM NGAY 999K",
  },
  {
    id: "cat-6",
    category: "latex",
    name: "Nệm Foam Latex Thuần Việt Hybrid Plus",
    image: assets.product1,
    price: 16590000,
    originalPrice: 22120000,
    rating: 5,
    reviewsCount: 54,
    promoBadge: "GIẢM NGAY 1999K",
  },
  // Foam
  {
    id: "cat-7",
    category: "foam",
    name: "Nệm Memory Foam Thuần Việt Cool",
    image: assets.product1,
    price: 12990000,
    originalPrice: 17990000,
    rating: 4.9,
    reviewsCount: 32,
    promoBadge: "GIẢM NGAY 999K",
  },
  {
    id: "cat-8",
    category: "foam",
    name: "Nệm Foam Thuần Việt Comfort",
    image: assets.product1,
    price: 8990000,
    originalPrice: 12990000,
    rating: 4.8,
    reviewsCount: 24,
    promoBadge: "GIẢM NGAY 699K",
  },
  // Spring
  {
    id: "cat-9",
    category: "spring",
    name: "Nệm lò xo Thuần Việt Premium Spring",
    image: assets.product1,
    price: 16990000,
    originalPrice: 21990000,
    rating: 5,
    reviewsCount: 40,
    promoBadge: "GIẢM NGAY 1999K",
  },
  {
    id: "cat-10",
    category: "spring",
    name: "Nệm lò xo Thuần Việt Cloudy",
    image: assets.product1,
    price: 13990000,
    originalPrice: 18990000,
    rating: 4.9,
    reviewsCount: 28,
    promoBadge: "GIẢM NGAY 999K",
  },
  // Bedsheet
  {
    id: "cat-11",
    category: "bedsheet",
    name: "Ga giường cotton Thuần Việt Basic",
    image: assets.product1,
    price: 690000,
    originalPrice: 990000,
    rating: 4.8,
    reviewsCount: 20,
    promoBadge: "GIẢM NGAY 100K",
  },
  {
    id: "cat-12",
    category: "bedsheet",
    name: "Ga giường satin Thuần Việt Luxury",
    image: assets.product1,
    price: 990000,
    originalPrice: 1390000,
    rating: 5,
    reviewsCount: 18,
    promoBadge: "GIẢM NGAY 200K",
  },
];

function formatPriceVnd(price: number): string {
  return (
    new Intl.NumberFormat("vi-VN", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price) + " ₫"
  );
}

const CategoryMattress = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("latex");

  const productsForActive = CATEGORY_PRODUCTS.filter(
    (p) => p.category === activeCategory,
  );

  return (
    <section className="my-10 max-w-7xl mx-auto">
      <div className="rounded-2xl py-6 md:py-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold">Chọn Nệm Theo Loại</h2>
          <button
            type="button"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:opacity-80"
          >
            Xem thêm
            <MdOutlineKeyboardArrowRight size={18} />
          </button>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          {CATEGORY_TABS.map((tab) => {
            const isActive = tab.key === activeCategory;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveCategory(tab.key)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition${
                  isActive
                    ? "bg-white text-primary shadow-sm border border-primary-500 "
                    : "bg-transparent text-gray-700 hover:text-primary"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {productsForActive.map((item) => {
            const discount =
              item.originalPrice > item.price
                ? ((1 - item.price / item.originalPrice) * 100).toFixed(2)
                : null;
            return (
              <div
                key={item.id}
                onClick={() => navigate(`/product/${item.id}`)}
                className="group flex flex-col rounded-xl bg-white shadow-md overflow-hidden gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
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
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2 min-h-[2.5rem] mb-1">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1 text-gray-500">
                    <span className="text-sm font-semibold text-gray-900">
                      {item.rating}
                    </span>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <FaStar key={i} size={14} className="!text-[#f29d38]" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">
                      {item.reviewsCount} đánh giá
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap items-baseline gap-2">
                    <span className="text-base font-bold text-[#ff1b40]">
                      {formatPriceVnd(item.price)}
                    </span>
                    {discount && (
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                        -{discount}%
                      </span>
                    )}
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-xs text-gray-400">
                    <span className="line-through">
                      {formatPriceVnd(item.originalPrice)}
                    </span>
                  </div>
                  <div className="mt-3">
                    <Link
                      to={`/product/${item.id}`}
                      className="inline-flex items-center justify-center rounded-full border border-primary px-4 py-1.5 text-xs font-medium text-primary hover:bg-primary hover:text-white transition-colors"
                    >
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryMattress;
