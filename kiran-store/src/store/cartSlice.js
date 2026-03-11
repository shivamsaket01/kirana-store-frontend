import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalAmount: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, name, price, image, quantity = 1 } = action.payload;
      const existingItem = state.items.find(item => item.id === id || item.name === name); // Use name as fallback ID if no ID

      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      } else {
        const uniqueId = id || name; // Ensure uniqueness
        state.items.push({
          id: uniqueId,
          name,
          price,
          image,
          quantity,
          totalPrice: price * quantity
        });
      }
      state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (existingItem) {
        state.items = state.items.filter(item => item.id !== id);
        state.totalAmount = state.totalAmount - existingItem.totalPrice;
      }
    },
    updateQuantity: (state, action) => {
      const { id, amount } = action.payload; // amount can be +1 or -1
      const existingItem = state.items.find(item => item.id === id);

      if (existingItem) {
        existingItem.quantity += amount;
        
        if (existingItem.quantity <= 0) {
          state.items = state.items.filter(item => item.id !== id);
        } else {
          existingItem.totalPrice = existingItem.price * existingItem.quantity;
        }
        
        state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    }
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
