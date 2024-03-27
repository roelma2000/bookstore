import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtil";
/* localStorage.getItem('cart'): retrieve an item from the browser's local storage named 'cart'. 
  If  finds and returns a 'cart' item else  returns null (which means there is no 'cart' item in local storage)
*/

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [] };

  

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
      addToCart: (state, action) => {
        const item = action.payload;
        const isItemExist = state.cartItems.find((i) => i._id === item._id); // Check if the item is already in the cart
  
        if (isItemExist) {
          state.cartItems = state.cartItems.map((i) =>
            i._id === isItemExist._id ? item : i
          );
        } else {
          state.cartItems = [...state.cartItems, item]; //add the item to the cart
        }

        return updateCart(state); //pass the state to the updateCart function then return the updated state
      },
    }
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;