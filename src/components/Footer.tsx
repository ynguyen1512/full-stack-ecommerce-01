import { assets } from "../assets/assets";
import {
  FaFacebookF,
  FaYoutube,
  FaTiktok,
  FaCcVisa,
  FaCcMastercard,
} from "react-icons/fa";
import { MdPhoneInTalk } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-10 text-sm text-gray-700">
        <div className="grid gap-10 lg:gap-8 lg:grid-cols-[2.4fr_1.2fr_1.4fr_1.2fr_1.4fr]">
          {/* Cột thông tin công ty + logo */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              {/* <img
                src={assets.logo}
                alt="Nệm Rạng Đông"
                className="w-16 h-auto object-contain mt-1"
              /> */}
              <div>
                <p className="text-base font-bold uppercase text-primary">
                  Nệm Rạng Đông
                </p>
                <p className="text-xs text-primary">
                  Chăm sóc sức khỏe của bạn từ giấc ngủ!
                </p>
              </div>
            </div>
            <div className="space-y-1 text-xs sm:text-[13px] leading-relaxed">
              <p className="font-semibold text-gray-900">
                CÔNG TY CP NỆM RẠNG ĐÔNG
              </p>
              <p>
                Trụ sở doanh nghiệp: H76–H77 đường Dương Thị Giang, phường Đông
                Hưng Thuận, TP. Hồ Chí Minh
              </p>
              <p>Giấy CNĐKDN: 0318629555</p>
              <p>Ngày cấp: 4/10/2018 – Sở KH&ĐT TP.HCM</p>
            </div>
            <img
              src={assets.boCongThuong}
              alt="Bộ công thương"
              className="w-1/2 h-auto"
            />
          </div>

          {/* Mua hàng */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-gray-900 uppercase">
              Mua hàng
            </p>
            <ul className="space-y-1.5 text-xs text-gray-600">
              <li>Nệm Cao Su</li>
              <li>Nệm Foam</li>
              <li>Nệm Lò xo</li>
              <li>Nệm Bông ép</li>
              <li>Gối</li>
              <li>Ga Giường/Drap</li>
              <li>Mền</li>
              <li>Topper</li>
              <li>Chăn ga gối đệm</li>
            </ul>
          </div>

          {/* Chính sách mua hàng */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-gray-900 uppercase">
              Chính sách mua hàng
            </p>
            <ul className="space-y-1.5 text-xs text-gray-600">
              <li>Điều khoản &amp; điều kiện</li>
              <li>Chính sách “101 Đêm Ngủ Thử”</li>
              <li>Chính sách bảo hành</li>
              <li>Chính sách thanh toán</li>
              <li>Chính sách giao hàng</li>
              <li>Chính sách đổi trả</li>
              <li>Chính sách xử lý khiếu nại</li>
              <li>Chính sách bảo mật</li>
            </ul>
          </div>

          {/* Tổng đài miễn phí */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-gray-900 uppercase">
              Tổng đài miễn phí
            </p>
            <ul className="space-y-2 text-xs text-gray-600">
              <li>
                <p className="text-[11px] uppercase text-gray-500">
                  Tư vấn - Mua hàng
                </p>
                <p className="text-primary font-semibold text-sm">
                  1800 646 809
                </p>
              </li>
              <li>
                <p className="text-[11px] uppercase text-gray-500">
                  Tuyển dụng
                </p>
                <p className="font-semibold text-sm text-gray-900">
                  028.7300.7489
                </p>
              </li>
            </ul>
          </div>

          {/* Thông tin công ty */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-gray-900 uppercase">
              Thông tin công ty
            </p>
            <ul className="space-y-1.5 text-xs text-gray-600">
              <li>Giới thiệu</li>
              <li>Tin trong ngành</li>
              <li>Sức khỏe &amp; Giấc ngủ</li>
              <li>Tư vấn – Kinh nghiệm mua hàng</li>
              <li>Cắt góc bảo trì</li>
              <li>Tuyển dụng</li>
            </ul>
          </div>
        </div>

        {/* Dòng dưới: social + hotline + thanh toán */}
        <div className="mt-8 border-t border-gray-100 pt-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="font-medium text-gray-700">
              Theo dõi Nệm Rạng Đông
            </span>
            <div className="flex items-center gap-2">
              <a
                href="#"
                className="h-7 w-7 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:text-primary hover:border-primary"
              >
                <FaFacebookF size={12} />
              </a>
              <a
                href="#"
                className="h-7 w-7 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:text-primary hover:border-primary"
              >
                <FaYoutube size={14} />
              </a>
              <a
                href="#"
                className="h-7 w-7 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:text-primary hover:border-primary"
              >
                <FaTiktok size={12} />
              </a>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-start md:justify-center">
            <div className="flex items-center gap-2 text-xs">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                <MdPhoneInTalk size={16} />
              </span>
              <div>
                <p className="text-[11px] uppercase text-gray-500">
                  Tư vấn, mua hàng 24/7
                </p>
                <p className="text-sm font-semibold text-primary">
                  1800 646 809
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                <MdPhoneInTalk size={16} />
              </span>
              <div>
                <p className="text-[11px] uppercase text-gray-500">
                  Kỹ thuật, bảo hành
                </p>
                <p className="text-sm font-semibold text-primary">
                  1800 646 809
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-1 text-xs text-gray-500">
            <p>nemrangdong.com © Copyright 2026</p>
            <div className="flex items-center gap-2">
              <span className="mr-1">Thanh toán:</span>
              <span className="inline-flex items-center gap-1 rounded-full border border-gray-300 px-2 py-0.5 text-[11px]">
                <FaCcVisa /> VISA
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-gray-300 px-2 py-0.5 text-[11px]">
                <FaCcMastercard /> Mastercard
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-gray-300 px-2 py-0.5 text-[11px]">
                ATM
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
