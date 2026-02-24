import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const ctx = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  const search = ctx?.search ?? "";
  const setSearch = ctx?.setSearch;
  const showSearch = ctx?.showSearch ?? false;
  const setShowSearch = ctx?.setShowSearch;

  useEffect(() => {
    setVisible(location.pathname.includes("collection"));
  }, [location.pathname]);

  if (!showSearch || !visible) return null;

  return (
    <div className="border-t border-b bg-gray-50 text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          value={search}
          onChange={(e) => setSearch?.(e.target.value)}
          type="text"
          placeholder="Search"
          className="flex-1 outline-none bg-inherit text-sm"
        />
        <img src={assets.search_icon} className="w-4" alt="" />
      </div>
      <img
        src={assets.cross_icon}
        alt=""
        className="inline w-3 cursor-pointer"
        onClick={() => setShowSearch?.(false)}
      />
    </div>
  );
};

export default SearchBar;
