import { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import { FaStar } from "react-icons/fa";
import {
  HiOutlineBanknotes,
  HiOutlinePhone,
  HiOutlineGift,
} from "react-icons/hi2";
import type { Product as ProductType } from "../types";
import { assets } from "../assets/assets";
import { MdAddShoppingCart } from "react-icons/md";
import { RelatedProducts } from "../components/RelatedProducts";

const THICKNESS_OPTIONS = ["20", "25", "27"];
const SIZE_OPTIONS = ["140x200", "160x200", "180x200", "200x200", "220x200"];

function formatPriceVnd(price: number): string {
  return (
    new Intl.NumberFormat("vi-VN", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price) + " ₫"
  );
}

const TABS = [
  { key: "highlight", label: "Nổi bật" },
  { key: "video", label: "Video" },
  { key: "description", label: "Mô tả" },
  { key: "specs", label: "Thông số" },
  { key: "reviews", label: "Đánh giá" },
];

const BENEFITS: { text: string; bold?: string }[] = [
  { text: "Bảo hành 15 năm 1 đổi 1", bold: "15 năm" },
  { text: "Ngủ thử 101 đêm miễn phí", bold: "101 đêm" },
  { text: "Trả góp 0% lãi suất", bold: "0%" },
  { text: "Giao hàng miễn phí toàn quốc", bold: "miễn phí" },
  { text: "Bộ quà tặng ga gối 7 món", bold: "7 món" },
];

/** Bộ quà tặng đi kèm - mock theo design */
const GIFT_SETS: {
  id: number;
  label: string;
  totalValue: number;
  items: { image: string; title: string; description: string; price: number }[];
}[] = [
  {
    id: 1,
    label: "Quà tặng 1",
    totalValue: 1864000,
    items: [
      {
        image: assets.product1,
        title: "BỘ DRAP 4 MÓN RẠNG ĐÔNG",
        description:
          "[Tặng] Bộ drap cao cấp Rạng Đông 4 món (Áp dụng khi mua nệm từ 10cm)",
        price: 790000,
      },
      {
        image: assets.product1,
        title: "GỐI DREAMY",
        description: "[Tặng] 1 Gối Ôm Gòn Dreamy Rạng Đông",
        price: 174000,
      },
      {
        image: assets.product1,
        title: "GỐI NẰM CAO SU",
        description: "[Tặng] 02 Gối Cao Su Thiên Nhiên",
        price: 900000,
      },
    ],
  },
  {
    id: 2,
    label: "Quà Tặng 2",
    totalValue: 1200000,
    items: [
      {
        image: assets.product1,
        title: "BỘ GA GỐI 7 MÓN",
        description: "[Tặng] Bộ ga gối cao cấp 7 món Rạng Đông",
        price: 700000,
      },
      {
        image: assets.product1,
        title: "GỐI ÔM CAO SU",
        description: "[Tặng] 1 Gối ôm cao su thiên nhiên",
        price: 500000,
      },
    ],
  },
];

const Product = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const ctx = useContext(ShopContext);
  const [productData, setProductData] = useState<ProductType | null>(null);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [thickness, setThickness] = useState("27");
  const [size, setSize] = useState("160x200");
  const [activeTab, setActiveTab] = useState("highlight");
  const [giftTab, setGiftTab] = useState(1);
  const [countdown, setCountdown] = useState({
    days: 156,
    hours: 3,
    mins: 39,
    secs: 43,
  });

  const products = ctx?.products ?? [];
  const addToCart = ctx?.addToCart;

  useEffect(() => {
    const item = products.find((p) => p._id === productId);
    if (item) {
      setProductData(item);
    } else {
      // Fallback dữ liệu cứng khi chưa bind API hoặc id không tồn tại
      setProductData({
        _id: productId ?? "mock-product",
        name: "Nệm Foam Latex Thuần Việt Hybrid Plus - Nâng tầm giấc ngủ với công nghệ 5IN1, nâng đỡ từng vùng chuyên sâu",
        description:
          "Phiên bản nệm Hybrid Plus kết hợp lớp foam và cao su thiên nhiên, mang lại cảm giác êm ái nhưng vẫn nâng đỡ vững chắc cho cột sống. Thiết kế thoáng khí giúp giảm hầm nóng và hỗ trợ giấc ngủ sâu hơn.",
        price: 16590000,
        image: [assets.product1],
        category: "Mattress",
        subCategory: "Hybrid",
        sizes: SIZE_OPTIONS,
        date: Date.now(),
        bestseller: true,
      });
    }
  }, [productId, products]);

  useEffect(() => {
    const t = setInterval(() => {
      setCountdown((c) => {
        let { days, hours, mins, secs } = c;
        if (secs > 0) return { ...c, secs: secs - 1 };
        secs = 59;
        if (mins > 0) return { ...c, mins: mins - 1, secs };
        mins = 59;
        if (hours > 0) return { ...c, hours: hours - 1, mins, secs };
        hours = 23;
        if (days > 0) return { ...c, days: days - 1, hours, mins, secs };
        return c;
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  if (!productData) {
    return <div className="min-h-[40vh] flex items-center justify-center" />;
  }

  const images = productData.image?.length ? productData.image : [""];
  const currentImage = images[mainImageIndex] ?? images[0];
  const originalPrice = Math.round(productData.price * 1.33);
  const discountPercent =
    originalPrice > productData.price
      ? ((1 - productData.price / originalPrice) * 100).toFixed(0)
      : null;
  const reviewCount = 54;

  const goPrevImage = () =>
    setMainImageIndex((i) => (i <= 0 ? images.length - 1 : i - 1));
  const goNextImage = () =>
    setMainImageIndex((i) => (i >= images.length - 1 ? 0 : i + 1));

  const handleAddToCart = async () => {
    if (!size) {
      toast.error("Vui lòng chọn kích thước nệm.");
      return;
    }
    await addToCart?.(productData._id, size);
    toast.success("Đã thêm vào giỏ hàng.");
  };

  const handleBuyNow = () => {
    addToCart?.(productData._id, size);
    navigate("/place-order");
  };

  return (
    <div className="border-t pt-6 pb-16 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-primary">
          Trang chủ
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">Nệm</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
        {/* Left: Gallery - mobile full width + căn giữa, desktop max 55% */}
        <div className="flex flex-col gap-3 w-full min-w-0 lg:max-w-[55%] sm:mx-0 px-0 sm:px-0 items-center sm:items-stretch">
          {/* Wrapper chỉ ảnh chính → prev/next căn giữa theo ảnh; mobile full width, căn giữa màn hình */}
          <div className="relative w-full max-w-[100vw] min-w-0 md:w-[600px] min-h-[280px] sm:min-h-[360px] md:min-h-[420px] md:h-[500px] lg:h-[520px] rounded-none sm:rounded-xl overflow-hidden bg-gray-100">
            <img
              src={currentImage}
              alt={productData.name}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div
              className="absolute left-0 top-0 max-w-[80%] rounded-br-xl rounded-tl-xl bg-red-500 px-3 py-2 shadow-md"
              style={{
                clipPath:
                  "polygon(0 0, 100% 0, 100% 85%, 92% 100%, 0 100%, 0 12%)",
              }}
            >
              <span className="text-xs font-bold text-white">
                GIẢM NGAY 1999K
              </span>
            </div>
            <button
              type="button"
              onClick={goPrevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/95 shadow-md flex items-center justify-center text-gray-800 hover:bg-white text-xl font-light"
              aria-label="Ảnh trước"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={goNextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/95 shadow-md flex items-center justify-center text-gray-800 hover:bg-white text-xl font-light"
              aria-label="Ảnh sau"
            >
              ›
            </button>
            <span className="absolute bottom-3 right-3 text-xs bg-black/60 text-white px-2 py-1 rounded z-10">
              {mainImageIndex + 1}/{images.length}
            </span>
          </div>
          <div className="hidden sm:flex flex-row gap-2 overflow-x-auto pb-1 px-4 sm:px-0">
            {images.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setMainImageIndex(i)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                  i === mainImageIndex
                    ? "border-primary"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Bộ quà tặng trị giá */}
          <div className="w-full max-w-full md:w-[600px] mt-8 rounded-xl border border-gray-200 bg-white p-4 sm:p-5 min-h-[420px] flex flex-col mx-4 sm:mx-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <HiOutlineGift className="w-6 h-6 text-amber-500 shrink-0" />
                  <span className="text-gray-800">
                    Bộ quà tặng trị giá{" "}
                    <span className="font-bold text-red-600">
                      {formatPriceVnd(
                        GIFT_SETS.find((g) => g.id === giftTab)?.totalValue ??
                          0,
                      )}
                    </span>
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  (Chọn từng món để xem chi tiết)
                </p>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-sm text-gray-700">
                  Khuyến mãi chỉ còn trong
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <div className="bg-red-500 text-white text-center rounded-lg min-w-[3rem] px-2 py-1">
                    <span className="font-bold text-sm">
                      {String(countdown.days).padStart(3, "0")}
                    </span>
                    <p className="text-[10px] uppercase">Ngày</p>
                  </div>
                  <span className="text-red-500 font-bold">:</span>
                  <div className="bg-red-500 text-white text-center rounded-lg min-w-[2.5rem] px-1.5 py-1">
                    <span className="font-bold text-sm">
                      {String(countdown.hours).padStart(2, "0")}
                    </span>
                    <p className="text-[10px] uppercase">Giờ</p>
                  </div>
                  <span className="text-red-500 font-bold">:</span>
                  <div className="bg-red-500 text-white text-center rounded-lg min-w-[2.5rem] px-1.5 py-1">
                    <span className="font-bold text-sm">
                      {String(countdown.mins).padStart(2, "0")}
                    </span>
                    <p className="text-[10px] uppercase">Phút</p>
                  </div>
                  <span className="text-red-500 font-bold">:</span>
                  <div className="bg-red-500 text-white text-center rounded-lg min-w-[2.5rem] px-1.5 py-1">
                    <span className="font-bold text-sm">
                      {String(countdown.secs).padStart(2, "0")}
                    </span>
                    <p className="text-[10px] uppercase">Giây</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-1 border-b border-gray-200 mb-4">
              {GIFT_SETS.map((set) => (
                <button
                  key={set.id}
                  type="button"
                  onClick={() => setGiftTab(set.id)}
                  className={`px-4 py-2 text-sm font-semibold border-b-2 -mb-px transition ${
                    giftTab === set.id
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {set.label}
                </button>
              ))}
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2 min-h-[340px] flex-1">
              {(GIFT_SETS.find((g) => g.id === giftTab)?.items ?? []).map(
                (item, i) => (
                  <div
                    key={`${giftTab}-${i}`}
                    className="flex-shrink-0 w-[220px] sm:w-[240px] rounded-xl overflow-hidden border border-gray-100 bg-gradient-to-br from-red-50 to-pink-50"
                  >
                    <div className="relative aspect-square bg-gray-100">
                      <img
                        src={item.image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute left-0 right-0 top-0 bg-gradient-to-b from-black/40 to-transparent px-2 py-1.5">
                        <span className="text-xs font-bold text-white uppercase">
                          Quà tặng
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent px-2 py-2">
                        <span className="text-sm font-bold text-white">
                          {item.title}
                        </span>
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {item.description}
                      </p>
                      <p className="font-bold text-red-600 text-sm mt-1">
                        {formatPriceVnd(item.price)}
                      </p>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex flex-col space-y-4">
          <p className="text-sm text-gray-600">
            Thương hiệu:{" "}
            <span className="font-medium text-gray-900">Nệm Rạng Đông</span>
          </p>

          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-snug">
            {productData.name}
          </h1>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <FaStar key={i} size={18} className="text-[#f29d38]" />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {reviewCount} đánh giá (Bấm vào để xem thêm)
            </span>
          </div>

          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">
              {formatPriceVnd(productData.price)}
            </span>
            {discountPercent && (
              <span className="rounded bg-primary px-2 py-0.5 text-sm font-semibold text-white">
                -{discountPercent}%
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500">
            Giá niêm yết:{" "}
            <span className="line-through">
              {formatPriceVnd(originalPrice)}
            </span>
          </p>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">
              Chọn độ dày:
            </p>
            <div className="flex gap-2 flex-wrap">
              {THICKNESS_OPTIONS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setThickness(t)}
                  className={`min-w-[3rem] py-2 px-4 rounded-lg text-sm font-medium border-2 transition ${
                    thickness === t
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-gray-200 text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {t} cm
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">
              Chọn kích thước:
            </p>
            <div className="flex gap-2 flex-wrap">
              {SIZE_OPTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`min-w-[5rem] py-2 px-4 rounded-lg text-sm font-medium border-2 transition ${
                    size === s
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-gray-200 text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={handleBuyNow}
              className="h-[50px] bg-primary text-white text-xs font-semibold px-6 rounded-lg hover:bg-primary/90 transition"
            >
              MUA NGAY
            </button>
            <button
              type="button"
              onClick={handleAddToCart}
              className="h-[50px] border text-primary border-primary font-semibold text-xs px-6 rounded-lg flex items-center justify-center gap-2 hover:border-primary hover:text-primary transition"
            >
              <MdAddShoppingCart size={20} />
              THÊM GIỎ HÀNG
            </button>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-2 w-full">
            <div className="flex flex-col py-1 gap-1 w-full bg-primary text-white rounded-lg">
              <button
                type="button"
                className="w-full border-2 border-primary text-xs font-semibold px-6 flex items-center justify-center gap-2 hover:bg-primary/5 transition"
              >
                <HiOutlineBanknotes size={20} />
                TRẢ GÓP 0% LÃI SUẤT
              </button>
              <p className="text-xs text-white text-center">
                KHÔNG CẦN CHỨNG MINH THU NHẬP
              </p>
            </div>

            <div className="flex flex-col py-1 gap-1 w-full rounded-lg border text-primary border-primary">
              <button
                type="button"
                className="w-full text-xs font-semibold px-6 flex items-center justify-center gap-2 hover:bg-red-50 transition"
              >
                <HiOutlinePhone size={20} />
                YÊU CẦU GỌI LẠI
              </button>
              <p className="text-xs text-center">
                TƯ VẤN MIỄN PHÍ - LUÔN NHIỆT TÌNH
              </p>
            </div>
          </div>

          {/* Đặc quyền chỉ có tại Nệm Rạng Đông */}
          <div className="mt-6 rounded-b-xl overflow-hidden border border-gray-200 shadow-sm">
            <div className="bg-primary text-white px-4 py-3 flex items-center gap-2 relative">
              <HiOutlinePhone size={20} className="shrink-0 opacity-90" />
              <span className="font-semibold text-sm">
                Đặc quyền chỉ có tại Nệm Rạng Đông
              </span>
            </div>
            <div className="bg-white px-4 py-4 space-y-3 border-t border-gray-100">
              {BENEFITS.map((item) => {
                const parts = item.bold
                  ? item.text.split(item.bold)
                  : [item.text];
                return (
                  <div
                    key={item.text}
                    className="flex items-center gap-2 text-sm text-gray-800"
                  >
                    <span className="inline-flex h-6 w-6 shrink-0 rounded-full bg-primary text-white items-center justify-center text-xs font-bold">
                      ✓
                    </span>
                    <span>
                      {parts[0]}
                      {item.bold && <strong>{item.bold}</strong>}
                      {parts[1]}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="bg-white px-4 pb-4 pt-1 flex items-center gap-2">
              <HiOutlinePhone size={18} className="shrink-0 text-primary" />
              <span className="text-sm text-gray-700">
                Gọi tư vấn miễn cước{" "}
                <a
                  href="tel:1800646809"
                  className="font-bold text-primary hover:underline"
                >
                  1800646809
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12 border-t border-gray-200 pt-6">
        <div className="flex gap-1 border-b border-gray-200 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition ${
                activeTab === tab.key
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="py-6 text-sm text-gray-600">
          {activeTab === "highlight" && (
            <div className="max-w-3xl space-y-4">
              <p>
                Nệm Rạng Đông được thiết kế để mang lại trải nghiệm ngủ thoải
                mái và nâng đỡ cột sống tối ưu. Dưới đây là những điểm nổi bật
                của sản phẩm:
              </p>
              <ul className="space-y-2 list-none">
                {[
                  "Công nghệ lõi cao cấp, đàn hồi ổn định, chống lún lệch theo thời gian.",
                  "Bề mặt thoáng khí, thấm hút mồ hôi, phù hợp khí hậu nóng ẩm Việt Nam.",
                  "Nâng đỡ cột sống tự nhiên, giảm áp lực vai – hông – lưng, hạn chế đau mỏi.",
                  "Chất liệu an toàn, không gây kích ứng, phù hợp cả trẻ em và người lớn tuổi.",
                  "Bảo hành 15 năm 1 đổi 1, ngủ thử 101 đêm, giao hàng và lắp đặt miễn phí.",
                ].map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-primary font-bold shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {activeTab === "description" && (
            <div className="max-w-3xl space-y-4 prose prose-gray">
              <p>
                <strong>Nệm Rạng Đông</strong> là thương hiệu nệm cao cấp Việt
                Nam, sản xuất với công nghệ hiện đại và nguyên liệu đạt chuẩn,
                mang đến giấc ngủ sâu và thoải mái cho cả gia đình.
              </p>
              <p>
                Bề mặt nệm thoáng mát, êm ái, hỗ trợ nâng đỡ cột sống và giảm áp
                lực tại vai, hông, lưng. Lõi nệm có độ đàn hồi ổn định theo thời
                gian, phù hợp mọi tư thế nằm và nhiều đối tượng từ trẻ em đến
                người lớn tuổi.
              </p>
              <p>
                Chất liệu an toàn, không gây kích ứng da, dễ vệ sinh và bảo
                quản. Nệm Rạng Đông cam kết bảo hành dài hạn, chính sách ngủ thử
                và giao hàng tận nơi, giúp khách hàng an tâm trải nghiệm và sở
                hữu sản phẩm chất lượng.
              </p>
            </div>
          )}
          {activeTab === "video" && (
            <div className="max-w-3xl space-y-4">
              <p className="text-gray-700">
                Xem video giới thiệu sản phẩm và quy trình sản xuất nệm Rạng
                Đông.
              </p>
              <div className="aspect-video rounded-xl bg-gray-100 flex items-center justify-center border border-gray-200">
                <div className="text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <span className="text-3xl text-primary">▶</span>
                  </div>
                  <p className="text-gray-500 text-sm">
                    Video sẽ được nhúng tại đây
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    (YouTube / Vimeo embed)
                  </p>
                </div>
              </div>
            </div>
          )}
          {activeTab === "specs" && (
            <div className="max-w-3xl">
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full text-left text-sm text-gray-800">
                  <tbody>
                    <tr>
                      <td
                        colSpan={2}
                        className="px-4 py-3 font-bold text-primary bg-primary/5"
                      >
                        TỔNG QUAN
                      </td>
                    </tr>
                    {[
                      ["Thương hiệu", "Nệm Rạng Đông"],
                      ["Tên sản phẩm", "Nệm Foam Latex Rạng Đông Hybrid Plus"],
                      [
                        "Khoảng giá",
                        "Từ 10 triệu đến 20 triệu, Giá trên 20 triệu",
                      ],
                      [
                        "Chứng nhận",
                        "Chứng chỉ chất lượng Quốc tế ISO 9001:2015, Chứng nhận tiêu chuẩn Hợp quy an toàn sức khỏe cho người tiêu dùng",
                      ],
                      ["Độ bền trung bình", "Thời gian sử dụng từ 15-20 năm"],
                      ["Xuất xứ", "Việt Nam"],
                      [
                        "Chức năng hỗ trợ",
                        "Làm mát, Nệm tiện dụng, Phù hợp người cao tuổi, Phù hợp trẻ em, Phù hợp cho mẹ bầu",
                      ],
                    ].map(([label, value], i) => (
                      <tr
                        key={i}
                        className="border-b border-gray-100 even:bg-gray-50/50"
                      >
                        <td className="px-4 py-2.5 font-medium text-gray-800 w-1/3 align-top">
                          {label}
                        </td>
                        <td className="px-4 py-2.5 text-gray-700">{value}</td>
                      </tr>
                    ))}
                    <tr>
                      <td
                        colSpan={2}
                        className="px-4 py-3 font-bold text-primary bg-primary/5"
                      >
                        THÔNG SỐ CẤU TẠO
                      </td>
                    </tr>
                    {[
                      ["Chất liệu", "Foam kết hợp cao su"],
                      ["Màu sắc", "Xanh lá, Trắng, Đen"],
                      [
                        "Chất liệu áo nệm",
                        "Vải gấm kết hợp công nghệ làm mát Aircool -5 độ C",
                      ],
                      ["Thiết kế", "Mặt trên lỗ tròn thoáng khí"],
                      ["Độ cứng", "Trung bình"],
                      [
                        "Trọng lượng",
                        "Kích thước tiêu chuẩn 1m6x2mx27cm: 40kg",
                      ],
                      ["Độ dày", "27cm"],
                    ].map(([label, value], i) => (
                      <tr
                        key={`struct-${i}`}
                        className="border-b border-gray-100 even:bg-gray-50/50"
                      >
                        <td className="px-4 py-2.5 font-medium text-gray-800 w-1/3 align-top">
                          {label}
                        </td>
                        <td className="px-4 py-2.5 text-gray-700">{value}</td>
                      </tr>
                    ))}
                    <tr>
                      <td
                        colSpan={2}
                        className="px-4 py-3 font-bold text-primary bg-primary/5"
                      >
                        ĐỘ LỆCH CHUẨN
                      </td>
                    </tr>
                    {[
                      ["Độ lệch chuẩn về độ dài", "± 3cm"],
                      [
                        "Độ lệch chuẩn về độ dày (Đối với nệm có độ dày 10cm)",
                        "± 0.5cm",
                      ],
                    ].map(([label, value], i) => (
                      <tr
                        key={`dev-${i}`}
                        className="border-b border-gray-100 even:bg-gray-50/50"
                      >
                        <td className="px-4 py-2.5 font-medium text-gray-800 w-1/3 align-top">
                          {label}
                        </td>
                        <td className="px-4 py-2.5 text-gray-700">{value}</td>
                      </tr>
                    ))}
                    <tr>
                      <td
                        colSpan={2}
                        className="px-4 py-3 font-bold text-primary bg-primary/5"
                      >
                        CHÍNH SÁCH
                      </td>
                    </tr>
                    {[
                      ["Bảo hành", "15 năm 1 đổi 1"],
                      ["Ngủ thử", "101 đêm miễn phí"],
                      ["Giao hàng", "Miễn phí giao hàng toàn quốc"],
                    ].map(([label, value], i) => (
                      <tr
                        key={`policy-${i}`}
                        className="border-b border-gray-100 last:border-0 even:bg-gray-50/50"
                      >
                        <td className="px-4 py-2.5 font-medium text-gray-800 w-1/3 align-top">
                          {label}
                        </td>
                        <td className="px-4 py-2.5 text-gray-700">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {activeTab === "reviews" && (
            <div className="max-w-3xl space-y-6">
              <p className="text-gray-700">
                Đánh giá từ khách hàng đã sử dụng sản phẩm.
              </p>
              {[
                {
                  name: "Nguyễn Văn A",
                  date: "20/02/2025",
                  stars: 5,
                  text: "Nệm êm, ngủ ngon. Giao hàng đúng hẹn, nhân viên nhiệt tình. Rất hài lòng.",
                },
                {
                  name: "Trần Thị B",
                  date: "18/02/2025",
                  stars: 5,
                  text: "Dùng được 3 tháng, chất lượng ổn định, không bị lún. Đúng như mô tả.",
                },
                {
                  name: "Lê Minh C",
                  date: "15/02/2025",
                  stars: 4,
                  text: "Giá hợp lý, nệm thoáng. Chỉ mong có thêm màu vải để chọn.",
                },
              ].map((r, i) => (
                <div
                  key={i}
                  className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex gap-0.5 text-amber-500">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <FaStar
                          key={j}
                          size={14}
                          className={
                            j < r.stars ? "fill-current" : "text-gray-200"
                          }
                        />
                      ))}
                    </div>
                    <span className="font-medium text-gray-900">{r.name}</span>
                    <span className="text-gray-400 text-xs">{r.date}</span>
                  </div>
                  <p className="text-gray-600">{r.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;
