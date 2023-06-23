import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Fruit } from "types/Fruit";

type CartState = Fruit[];

const cartSlice = createSlice({
  name: "cart",
  initialState: [] as CartState,
  reducers: {
    addToCart: (state, action: PayloadAction<Fruit>) => {
      const fruit = action.payload;
      state.push(fruit);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const fruitId = action.payload;
      return state.filter((fruit) => fruit.id !== fruitId);
    },
    clearCart: () => [],
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
