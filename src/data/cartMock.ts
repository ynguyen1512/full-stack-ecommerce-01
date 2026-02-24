import type { CartItems } from "../types";

/**
 * Mock giỏ hàng ban đầu để demo trang /cart.
 * Sản phẩm dùng id có trong Cart.tsx fallback: mock-product, related-1..8.
 * Set USE_CART_MOCK = false khi đã dùng API thật.
 */
export const USE_CART_MOCK = true;

export const cartMock: CartItems = {
  "related-2": {
    "160x200": 1,
  },
  "mock-product": {
    "160x200": 2,
  },
};
