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
        //console.log("Item: ", item.id);
     
        const isItemExist = state.cartItems.find((i) => i.id === item.id); // Check if the item is already in the cart

        if (isItemExist) {
          state.cartItems = state.cartItems.map((i) =>
            i.id === isItemExist.id ? item : i
          );
        } else {
          state.cartItems = [...state.cartItems, item]; //add the item to the cart
        }
        return updateCart(state); //pass the state to the updateCart function then return the updated state
      },
      removeFromCart: (state, action) => {
        state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
        return updateCart(state); //update local storage
      },
    }
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;