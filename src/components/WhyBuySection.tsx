import type { ReactElement } from "react";
import { FiTruck } from "react-icons/fi";
import {
  HiOutlineArrowPath,
  HiOutlineShieldCheck,
  HiOutlineGift,
} from "react-icons/hi2";

interface WhyItem {
  title: string;
  description: string;
  icon: ReactElement;
}

const ITEMS: WhyItem[] = [
  {
    title: "Miễn phí giao hàng toàn quốc",
    description:
      "Giao nhanh tận nơi trên toàn quốc, đóng gói tiêu chuẩn, hỗ trợ hẹn giờ linh hoạt theo nhu cầu của bạn.",
    icon: (
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
        <FiTruck size={22} />
      </div>
    ),
  },
  {
    title: "1 đổi 1 trong vòng 7 ngày",
    description:
      "Nếu sản phẩm có lỗi kỹ thuật hoặc không đúng cam kết, hỗ trợ đổi mới trong 7 ngày, quy trình đơn giản, minh bạch.",
    icon: (
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
        <HiOutlineArrowPath size={22} />
      </div>
    ),
  },
  {
    title: "15 năm bảo hành chính hãng",
    description:
      "Chính sách bảo hành dài hạn từ Nệm Rạng Đông, hệ thống showroom và trung tâm chăm sóc khách hàng trên toàn quốc.",
    icon: (
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
        <HiOutlineShieldCheck size={22} />
      </div>
    ),
  },
  {
    title: "Quà tặng đi kèm hấp dẫn",
    description:
      "Tặng kèm gối, drap giường hoặc voucher giảm giá cho đơn hàng tiếp theo, áp dụng theo từng chương trình khuyến mãi.",
    icon: (
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
        <HiOutlineGift size={22} />
      </div>
    ),
  },
];

const WhyBuySection = () => {
  return (
    <section className="my-10 max-w-7xl mx-auto">
      <div className="rounded-2xl bg-white py-6 md:py-8">
        <h2 className="text-xl font-bold mb-5">
          Tại sao nên mua hàng tại Nệm Rạng Đông?
        </h2>
        <div className="grid gap-4 md:gap-6 md:grid-cols-2 xl:grid-cols-4">
          {ITEMS.map((item) => (
            <div
              key={item.title}
              className="flex flex-col gap-3 rounded-xl bg-[#F9FBFF] px-4 py-5 hover:shadow-md transition-shadow border border-transparent hover:border-primary/10"
            >
              {item.icon}
              <h3 className="text-sm font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyBuySection;
