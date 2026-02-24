import type { NavigateFunction } from "react-router-dom";

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string[];
  category: string;
  subCategory: string;
  sizes: string[];
  date: number;
  bestseller: boolean;
}

/** Cart: itemId -> size -> quantity */
export type CartItems = Record<string, Record<string, number>>;

export interface ShopContextValue {
  products: Product[];
  currency: string;
  delivery_fee: number;
  search: string;
  setSearch: (v: string) => void;
  showSearch: boolean;
  setShowSearch: (v: boolean) => void;
  cartItems: CartItems;
  setCartItems: (v: CartItems) => void;
  getCartCount: () => number;
  addToCart: (itemId: string, size: string) => Promise<void>;
  updateQuantity: (itemId: string, size: string, quantity: number) => Promise<void>;
  getCartAmount: () => number;
  navigate: NavigateFunction;
  backendUrl: string;
  token: string;
  setToken: (v: string) => void;
}

export interface BestSellerItem {
  _id: string;
  name: string;
  image: string[];
  price: number;
  originalPrice?: number;
  promoBadge?: string;
  rating?: number;
  reviewsCount?: number;
}
