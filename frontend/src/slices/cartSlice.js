import { createSlice } from "@reduxjs/toolkit";

// Helper function to get cart key based on user ID
const getCartKey = (userId) => {
  return userId ? `cart_${userId}` : "cart_guest";
};

// Helper function to get cart from localStorage
const getCartFromStorage = (userId) => {
  const cartKey = getCartKey(userId);
  const cart = localStorage.getItem(cartKey);
  return cart
    ? JSON.parse(cart)
    : {
        cartItems: [],
        shippingAddress: {},
        paymentMethod: "Stripe",
        itemsPrice: 0,
        shippingPrice: 0,
        taxPrice: 0,
        totalPrice: 0,
      };
};

// Helper function to save cart to localStorage
const saveCartToStorage = (userId, state) => {
  const cartKey = getCartKey(userId);
  localStorage.setItem(cartKey, JSON.stringify(state));
};

// Helper function to calculate prices
const calculatePrices = (state) => {
  // Calculate items price (sum of price * quantity of all items)
  state.itemsPrice = state.cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Calculate shipping price (free if order > ₹100)
  state.shippingPrice = state.itemsPrice > 100 ? 0 : 15;

  // Calculate tax price (18% GST)
  state.taxPrice = Number((0.18 * state.itemsPrice).toFixed(2));

  // Calculate total price
  state.totalPrice = Number(
    (state.itemsPrice + state.shippingPrice + state.taxPrice).toFixed(2)
  );
};

// Get initial user info from localStorage
const getUserIdFromStorage = () => {
  const userInfo = localStorage.getItem("userInfo");
  if (userInfo) {
    const parsed = JSON.parse(userInfo);
    return parsed._id || parsed.id || null;
  }
  return null;
};

// Initial state - load cart for current user (if logged in)
const initialUserId = getUserIdFromStorage();
const initialState = {
  ...getCartFromStorage(initialUserId),
  currentUserId: initialUserId,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add item to cart
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        // If exists, update quantity
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        // If new, add to cart
        state.cartItems = [...state.cartItems, item];
      }

      // Recalculate prices
      calculatePrices(state);

      // Save to localStorage with user-specific key
      saveCartToStorage(state.currentUserId, {
        cartItems: state.cartItems,
        itemsPrice: state.itemsPrice,
        shippingPrice: state.shippingPrice,
        taxPrice: state.taxPrice,
        totalPrice: state.totalPrice,
      });
    },

    // Remove item from cart
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.cartItems = state.cartItems.filter((x) => x._id !== productId);

      // Recalculate prices
      calculatePrices(state);

      // Save to localStorage with user-specific key
      saveCartToStorage(state.currentUserId, {
        cartItems: state.cartItems,
        itemsPrice: state.itemsPrice,
        shippingPrice: state.shippingPrice,
        taxPrice: state.taxPrice,
        totalPrice: state.totalPrice,
      });
    },

    // Clear entire cart
    clearCart: (state) => {
      state.cartItems = [];
      state.itemsPrice = 0;
      state.shippingPrice = 0;
      state.taxPrice = 0;
      state.totalPrice = 0;

      // Clear from localStorage
      const cartKey = getCartKey(state.currentUserId);
      localStorage.removeItem(cartKey);
    },

    // Set user and load their cart (call this on login)
    setCartUser: (state, action) => {
      const userId = action.payload;
      state.currentUserId = userId;

      // Load cart for this user
      const userCart = getCartFromStorage(userId);
      state.cartItems = userCart.cartItems;
      state.itemsPrice = userCart.itemsPrice;
      state.shippingPrice = userCart.shippingPrice;
      state.taxPrice = userCart.taxPrice;
      state.totalPrice = userCart.totalPrice;
    },

    // Clear cart state on logout (but keep in localStorage for next login)
    clearCartOnLogout: (state) => {
      state.cartItems = [];
      state.itemsPrice = 0;
      state.shippingPrice = 0;
      state.taxPrice = 0;
      state.totalPrice = 0;
      state.currentUserId = null;
      state.shippingAddress = {};
      state.paymentMethod = "Stripe";
    },

    // Save shipping address
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      saveCartToStorage(state.currentUserId, {
        cartItems: state.cartItems,
        shippingAddress: state.shippingAddress,
        paymentMethod: state.paymentMethod,
        itemsPrice: state.itemsPrice,
        shippingPrice: state.shippingPrice,
        taxPrice: state.taxPrice,
        totalPrice: state.totalPrice,
      });
    },

    // Save payment method
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      saveCartToStorage(state.currentUserId, {
        cartItems: state.cartItems,
        shippingAddress: state.shippingAddress,
        paymentMethod: state.paymentMethod,
        itemsPrice: state.itemsPrice,
        shippingPrice: state.shippingPrice,
        taxPrice: state.taxPrice,
        totalPrice: state.totalPrice,
      });
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  setCartUser,
  clearCartOnLogout,
  saveShippingAddress,
  savePaymentMethod,
} = cartSlice.actions;

export default cartSlice.reducer;
