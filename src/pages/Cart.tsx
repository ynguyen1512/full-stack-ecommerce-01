import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import type { Product } from "../types";
import { FaShoppingCart } from "react-icons/fa";

interface CartItemRow {
  _id: string;
  size: string;
  quantity: number;
}

/** Fallback khi sản phẩm không có trong API (vd: từ trang chi tiết mock). */
function getCartProductFallback(itemId: string): Product | null {
  const fallbacks: Record<string, Partial<Product>> = {
    "mock-product": {
      _id: "mock-product",
      name: "Nệm Foam Latex Rạng Đông Hybrid Plus – Nâng tầm giấc ngủ, nâng đỡ từng vùng chuyên sâu",
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

const Cart = () => {
  const ctx = useContext(ShopContext);
  const [cartData, setCartData] = useState<CartItemRow[]>([]);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [needInvoice, setNeedInvoice] = useState(false);
  const [addressLine, setAddressLine] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");

  const products = ctx?.products ?? [];
  const cartItems = ctx?.cartItems ?? {};
  const updateQuantity = ctx?.updateQuantity;
  const navigate = ctx?.navigate;
  const getCartAmount = ctx?.getCartAmount ?? (() => 0);

  useEffect(() => {
    const tempData: CartItemRow[] = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  const getProduct = (itemId: string): Product | null => {
    const fromApi = products.find((p) => p._id === itemId);
    if (fromApi) return fromApi;
    return getCartProductFallback(itemId);
  };

  const subtotal = getCartAmount();
  const total = subtotal;

  return (
    <div className="border-t pt-8 pb-20 bg-gray-50/50 min-h-[60vh]">
      <div className="max-w-6xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-4">
          <Link to="/" className="hover:text-primary">
            Trang chủ
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Giỏ hàng</span>
        </nav>

        {/* Title - căn giữa, nổi bật */}
        <div className="flex items-center gap-2 mb-10">
          <FaShoppingCart size={24} className="text-gray-700" />
          <h1 className="text-3xl font-bold text-gray-900">Giỏ Hàng</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 lg:gap-10">
          {/* Left: Thông tin giao hàng */}
          <div className="lg:col-span-3 space-y-5">
            <h2 className="font-semibold text-gray-900 text-lg">
              Thông tin giao hàng
            </h2>
            <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none"
                  placeholder="Nhập họ và tên"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none"
                  placeholder="Nhập số điện thoại"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email (Không bắt buộc)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none"
                  placeholder="Nhập email"
                />
              </div>

              <div>
                <h3 className="block text-sm font-medium text-gray-900 mb-2 mt-4">
                  Địa chỉ giao hàng, lắp đặt
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2">
                  <select
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm w-full focus:border-primary outline-none"
                  >
                    <option value="">Chọn Tỉnh / Thành</option>
                  </select>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm w-full focus:border-primary outline-none"
                  >
                    <option value="">Chọn Quận Huyện</option>
                  </select>
                  <select
                    value={ward}
                    onChange={(e) => setWard(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm w-full focus:border-primary outline-none"
                  >
                    <option value="">Chọn Phường Xã</option>
                  </select>
                </div>
                <input
                  type="text"
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-primary outline-none"
                  placeholder="Số nhà + tên đường"
                />
              </div>
              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={needInvoice}
                  onChange={(e) => setNeedInvoice(e.target.checked)}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-gray-700">
                  Cần xuất hoá đơn công ty?
                </span>
              </label>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ghi chú khi giao hàng, lắp đặt...
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm resize-none focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none"
                  placeholder="Ghi chú thêm (không bắt buộc)"
                />
              </div>
            </div>
          </div>

          {/* Right: Sản phẩm + Tổng */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6">
              <h2 className="font-semibold text-gray-900 text-lg mb-4">
                Tất cả {cartData.length} sản phẩm
              </h2>

              <div className="space-y-4 mb-6">
                {cartData.map((item) => {
                  const productData = getProduct(item._id);
                  if (!productData) return null;
                  const originalPrice = Math.round(productData.price * 1.25);
                  const hasDiscount = originalPrice > productData.price;
                  const shortDesc =
                    productData.description ||
                    (productData.name.includes(" – ")
                      ? productData.name.split(" – ").slice(1).join(" – ")
                      : "");
                  const displayName = productData.name.includes(" – ")
                    ? productData.name.split(" – ")[0]
                    : productData.name;

                  return (
                    <div
                      key={`${item._id}-${item.size}`}
                      className="flex gap-5 p-4 rounded-xl border border-gray-200 bg-white items-start"
                    >
                      {/* Hình ảnh sản phẩm */}
                      <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={productData.image?.[0] ?? assets.product1}
                          alt={productData.name}
                          className="w-full h-full object-cover"
                        />
                        <div
                          className="absolute left-0 top-0 max-w-[90%] rounded-br rounded-tl bg-red-500 px-2 py-1"
                          style={{
                            clipPath:
                              "polygon(0 0, 100% 0, 100% 85%, 90% 100%, 0 100%, 0 15%)",
                          }}
                        >
                          <span className="text-[10px] sm:text-xs font-bold text-white">
                            TẶNG 7
                          </span>
                        </div>
                      </div>

                      {/* Tên, short desc, size, quà tặng */}
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 text-sm sm:text-base leading-snug">
                          {displayName}
                          {shortDesc && (
                            <span className="font-normal text-gray-700">
                              {" – "}
                              {shortDesc}
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          10 – {item.size}
                        </p>
                        <p className="text-xs text-primary mt-1">
                          Quà: Quà tặng 1 Foam (drap microfiber; 2 gối nằm
                          dreamy; 1 gối ôm dreamy)
                        </p>
                      </div>

                      {/* Đơn giá x Số lượng + Tổng dòng + Xoá */}
                      <div className="flex flex-col items-end flex-shrink-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-700 whitespace-nowrap">
                            {formatPriceVnd(productData.price)} x
                          </span>
                          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity?.(
                                  item._id,
                                  item.size,
                                  Math.max(0, item.quantity - 1),
                                )
                              }
                              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                            >
                              −
                            </button>
                            <span className="w-9 h-8 flex items-center justify-center text-sm border-x border-gray-300 bg-white">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity?.(
                                  item._id,
                                  item.size,
                                  item.quantity + 1,
                                )
                              }
                              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <p className="font-bold text-gray-900 text-sm mt-2">
                          {formatPriceVnd(productData.price * item.quantity)}
                        </p>
                        {hasDiscount && (
                          <p className="text-xs text-gray-400 line-through mt-0.5">
                            {formatPriceVnd(originalPrice * item.quantity)}
                          </p>
                        )}
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity?.(item._id, item.size, 0)
                          }
                          className="text-sm text-red-600 hover:underline mt-1"
                        >
                          Xoá
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="rounded-lg bg-gray-50 border border-gray-100 p-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-700">
                  <span>Tạm tính</span>
                  <span className="font-medium">
                    {formatPriceVnd(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Tổng cộng</span>
                  <span>{formatPriceVnd(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: 3 nút full-width theo design */}
      <div className="max-w-6xl mx-auto px-4 mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            to="/"
            className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition shadow-sm"
          >
            TIẾP TỤC MUA HÀNG
          </Link>
          <button
            type="button"
            onClick={() => {
              const parts = [addressLine, ward, district, province].filter(
                Boolean
              );
              navigate?.("/thank-you", {
                state: {
                  fullName: fullName || undefined,
                  phone: phone || undefined,
                  address: parts.length > 0 ? parts.join(", ") : undefined,
                },
              });
            }}
            className="w-full px-6 py-3.5 rounded-lg text-white text-sm font-semibold transition shadow-sm bg-red-800 hover:bg-red-900"
          >
            THANH TOÁN TRỰC TIẾP
          </button>
          <button
            type="button"
            className="w-full px-6 py-3.5 rounded-lg text-white text-sm font-semibold transition shadow-sm hover:opacity-90"
            style={{ backgroundColor: "#A50064" }}
          >
            THANH TOÁN BẰNG MOMO
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
