import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext, useState, type FormEvent } from "react";
import { ShopContext } from "../context/ShopContext";
import { LocationIcon } from "../assets/icons/LocationIcon";
import PhoneIcon from "../assets/icons/PhoneIcon";
import ChevronDownIcon from "../assets/icons/ChevronDownIcon";

const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const ctx = useContext(ShopContext);

  const setShowSearch = ctx?.setShowSearch;
  const getCartCount = ctx?.getCartCount;
  const navigate = ctx?.navigate;
  const setToken = ctx?.setToken;
  const token = ctx?.token;
  const setCartItems = ctx?.setCartItems;

  const logout = () => {
    navigate?.("/login");
    localStorage.removeItem("token");
    setToken?.("");
    setCartItems?.({});
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) setShowSearch?.(true);
  };

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-4 py-4">
        <Link to="/" className="flex flex-col items-start gap-2 shrink-0">
          <p className="font-bold uppercase text-sm leading-tight text-primary">
            NỆM RẠNG ĐÔNG
          </p>
          <p className="text-xs leading-tight text-primary">
            NGỦ NGON - SỐNG KHOẺ
          </p>
        </Link>

        <form
          onSubmit={handleSearch}
          className="flex-1 min-w-[200px] max-w-xl flex items-center rounded-full border-2 border-primary overflow-hidden"
        >
          <input
            type="text"
            placeholder="Bạn cần tìm gì..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none"
          />
          <button
            type="submit"
            className="p-2.5 flex items-center justify-center bg-primary text-white shrink-0"
            aria-label="Tìm kiếm"
          >
            <img src={assets.search_icon} alt="" className="w-5 h-5 invert" />
          </button>
        </form>

        <div className="flex items-center gap-6 shrink-0">
          <button
            type="button"
            className="hidden md:flex flex-col sm:flex-row items-start sm:items-center gap-0.5 text-left cursor-pointer hover:opacity-80"
          >
            <div className="flex items-center gap-1.5 text-primary">
              <LocationIcon className="w-5 h-5 shrink-0" />
              <span className="font-semibold text-sm">15 Showrooms</span>
              <ChevronDownIcon className="w-4 h-4 shrink-0" />
            </div>
            <span className="text-xs text-black ml-6 sm:ml-0">
              trên toàn quốc
            </span>
          </button>

          <a
            href="tel:1800646809"
            className="hidden md:flex flex-col items-start cursor-pointer hover:opacity-80 no-underline"
          >
            <div className="flex items-center gap-1.5 text-primary">
              <PhoneIcon className="w-5 h-5 shrink-0" />
              <span className="font-semibold text-sm">1800646809</span>
            </div>
            <span className="text-xs text-black ml-6">Gọi hotline</span>
          </a>

          <div className="flex items-center gap-4">
            <div className="group relative hidden sm:block">
              <button
                type="button"
                onClick={() => (token ? undefined : navigate?.("/login"))}
                className="p-1"
                aria-label="Tài khoản"
              >
                <img
                  src={assets.profile_icon}
                  className="w-5 h-5 cursor-pointer"
                  alt=""
                />
              </button>
              {token && (
                <div className="group-hover:block hidden absolute right-0 pt-2 z-10">
                  <div className="flex flex-col gap-1 w-36 py-3 px-4 bg-slate-100 text-gray-600 rounded shadow-lg text-sm">
                    <button
                      type="button"
                      onClick={() => navigate?.("/")}
                      className="text-left cursor-pointer hover:text-black"
                    >
                      My Profile
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate?.("/orders")}
                      className="text-left cursor-pointer hover:text-black"
                    >
                      Orders
                    </button>
                    <button
                      type="button"
                      onClick={logout}
                      className="text-left cursor-pointer hover:text-black"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/cart"
              className="relative flex items-center justify-center"
              aria-label="Giỏ hàng"
            >
              <img src={assets.cart_icon} className="w-6 h-6" alt="" />
              <span className="absolute -right-1.5 -bottom-1 min-w-[18px] h-[18px] flex items-center justify-center bg-primary text-white text-xs font-medium rounded-full px-1">
                {getCartCount?.() ?? 0}
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setVisible(true)}
              className="md:hidden p-1"
              aria-label="Menu"
            >
              <img src={assets.menu_icon} className="w-6 h-6" alt="" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center gap-6 py-3 border-t border-gray-100">
        <button
          type="button"
          className="flex items-center gap-2 font-bold text-sm text-gray-900 cursor-pointer hover:opacity-80"
        >
          <img src={assets.menu_icon} className="w-5 h-5" alt="" />
          <span>DANH MỤC SẢN PHẨM</span>
          <ChevronDownIcon className="w-4 h-4 shrink-0 text-primary" />
        </button>

        <ul className="hidden sm:flex items-center gap-6 text-sm font-medium text-primary">
          <li>
            <NavLink
              to="/collection"
              className={({ isActive }) =>
                isActive ? "opacity-100" : "hover:opacity-80"
              }
            >
              Ưu Đãi và Khuyến Mãi
            </NavLink>
          </li>
          <li>
            <NavLink to="/stories" className="hover:opacity-80">
              1001 Chuyện khách hàng
            </NavLink>
          </li>
          <li>
            <NavLink to="/showroom" className="hover:opacity-80">
              Showroom
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "opacity-100" : "hover:opacity-80"
              }
            >
              Về Chúng Tôi
            </NavLink>
          </li>
        </ul>
      </div>

      <div
        className={`fixed inset-0 z-50 bg-white transition-all duration-300 overflow-auto ${
          visible ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col p-4">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-2 py-3 cursor-pointer text-gray-600"
          >
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="" />
            <span>Đóng</span>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            to="/"
            className={({ isActive }) =>
              `py-3 border-b border-gray-100 ${isActive ? "text-primary" : "text-gray-700"}`
            }
          >
            Trang chủ
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to="/collection"
            className={({ isActive }) =>
              `py-3 border-b border-gray-100 ${isActive ? "text-primary" : "text-gray-700"}`
            }
          >
            Ưu Đãi và Khuyến Mãi
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to="/stories"
            className={({ isActive }) =>
              `py-3 border-b border-gray-100 ${isActive ? "text-primary" : "text-gray-700"}`
            }
          >
            1001 Chuyện khách hàng
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to="/showroom"
            className={({ isActive }) =>
              `py-3 border-b border-gray-100 ${isActive ? "text-primary" : "text-gray-700"}`
            }
          >
            Showroom
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to="/about"
            className={({ isActive }) =>
              `py-3 border-b border-gray-100 ${isActive ? "text-primary" : "text-gray-700"}`
            }
          >
            Về Chúng Tôi
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to="/contact"
            className={({ isActive }) =>
              `py-3 border-b border-gray-100 ${isActive ? "text-primary" : "text-gray-700"}`
            }
          >
            Liên hệ
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
