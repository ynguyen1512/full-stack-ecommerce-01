import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import type { Product } from "../types";
import { HiHome } from "react-icons/hi2";

interface CartItemRow {
  _id: string;
  size: string;
  quantity: number;
}

interface ThankYouLocationState {
  fullName?: string;
  phone?: string;
  address?: string;
}

function getCartProductFallback(itemId: string): Product | null {
  const fallbacks: Record<string, Partial<Product>> = {
    "mock-product": {
      _id: "mock-product",
      name: "Nệm Foam Latex Rạng Đông Hybrid Plus – Nâng tầm giấc ngủ với công nghệ 5IN1, nâng đỡ từng vùng chuyên sâu",
      description: "Nệm foam êm ái nâng đỡ",
      price: 16590000,
      image: [assets.product1],
      category: "Nệm",
      subCategory: "Nệm cao cấp",
      sizes: [],
      date: 0,
      bestseller: false,
    },
  };
  for (let i = 1; i <= 8; i++) {
    fallbacks[`related-${i}`] = {
      _id: `related-${i}`,
      name:
        i === 2
          ? "Nệm Foam Rạng Đông Standard – Nệm foam êm ái nâng đỡ"
          : `Nệm Rạng Đông #${i} – Nệm cao cấp êm ái`,
      description: "Nệm foam êm ái nâng đỡ",
      price: 3630000,
      image: [assets.product1],
      category: "Nệm",
      subCategory: "Nệm cao cấp",
      sizes: [],
      date: 0,
      bestseller: false,
    };
  }
  const f = fallbacks[itemId];
  if (!f) return null;
  return {
    _id: f._id!,
    name: f.name ?? "Sản phẩm",
    description: f.description ?? "",
    price: f.price ?? 0,
    image: f.image ?? [assets.product1],
    category: f.category ?? "",
    subCategory: f.subCategory ?? "",
    sizes: f.sizes ?? [],
    date: f.date ?? 0,
    bestseller: f.bestseller ?? false,
  };
}

function formatPriceVnd(price: number): string {
  return (
    new Intl.NumberFormat("vi-VN", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price) + " ₫"
  );
}

const ThankYou = () => {
  const location = useLocation();
  const state = (location.state ?? {}) as ThankYouLocationState;
  const ctx = useContext(ShopContext);
  const products = ctx?.products ?? [];
  const cartItems = ctx?.cartItems ?? {};
  const getCartAmount = ctx?.getCartAmount ?? (() => 0);
  const [cartData, setCartData] = useState<CartItemRow[]>([]);

  useEffect(() => {
    const temp: CartItemRow[] = [];
    for (const id in cartItems) {
      for (const size in cartItems[id]) {
        if (cartItems[id][size] > 0) {
          temp.push({ _id: id, size, quantity: cartItems[id][size] });
        }
      }
    }
    setCartData(temp);
  }, [cartItems]);

  const getProduct = (itemId: string): Product | null => {
    const fromApi = products.find((p) => p._id === itemId);
    if (fromApi) return fromApi;
    return getCartProductFallback(itemId);
  };

  const customerName = state.fullName?.trim() || "----";
  const phone = state.phone?.trim() || "—";
  const address = state.address?.trim() || "Sẽ xác nhận qua điện thoại";
  const total = getCartAmount();

  return (
    <div className="min-h-[70vh] relative border-t pt-8 pb-20">
      {/* Nền xanh lá / xanh dương nhạt */}
      <div
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          background:
            "linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 25%, #80cbc4 50%, #4db6ac 75%, #26a69a 100%)",
          backgroundSize: "400% 400%",
        }}
      />

      <div className="max-w-2xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <HiHome size={18} className="text-gray-500" />
          <Link to="/" className="hover:text-primary">
            Trang chủ
          </Link>
          <span>/</span>
          <span className="text-gray-800">Cảm ơn</span>
        </nav>

        {/* Card trắng */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 sm:p-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center uppercase tracking-wide">
            Cảm ơn
          </h1>
          <p className="text-center text-gray-700 mt-2">Khách Hàng</p>
          <p className="text-center font-bold text-gray-900 text-lg mt-1">
            {customerName ? customerName : "----"}
          </p>

          <p className="text-center text-gray-700 text-sm sm:text-base mt-6 leading-relaxed max-w-xl mx-auto">
            Xin cảm ơn Quý Khách đã chọn chúng tôi. Nệm Rạng Đông sẽ gọi điện
            hoặc gửi tin nhắn xác nhận giao hàng cho Quý Khách trong thời gian
            sớm nhất.
          </p>

          <h2 className="font-bold text-gray-900 mt-8 mb-4">Đơn hàng</h2>
          <div className="space-y-1 text-sm text-gray-700">
            <p>
              <span className="text-gray-500">Người nhận:</span> {customerName}{" "}
              – {phone}
            </p>
            <p>
              <span className="text-gray-500">Giao đến:</span> {address}
            </p>
          </div>

          {/* Danh sách sản phẩm */}
          <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
            {cartData.map((item) => {
              const product = getProduct(item._id);
              if (!product) return null;
              return (
                <div
                  key={`${item._id}-${item.size}`}
                  className="flex gap-4 items-start"
                >
                  <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                    <img
                      src={product.image?.[0] ?? assets.product1}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm leading-snug line-clamp-2">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Số lượng: {item.quantity}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200 text-right">
            <span className="text-gray-700">Tổng số tiền: </span>
            <span className="font-bold text-gray-900 text-lg">
              {formatPriceVnd(total)}
            </span>
          </div>
        </div>

        {/* CTA */}
        <p className="text-center mt-8">
          <Link
            to="/"
            className="text-primary font-medium hover:underline text-base"
          >
            Tiếp tục xem sản phẩm khác
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ThankYou;
