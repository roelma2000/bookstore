import { createSlice } from "@reduxjs/toolkit";

/* localStorage.getItem('cart'): retrieve an item from the browser's local storage named 'cart'. 
  If  finds and returns a 'cart' item else  returns null (which means there is no 'cart' item in local storage)
*/

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [] };

  const addDecimals = (num) => { //helper function to round off the decimal places
    return (Math.round(num * 100) / 100).toFixed(2);
  };

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
          state.cartItems = [...state.cartItems, item];
        }

        //Calculate items price 
        // acc is accumulator, 0 is the initial value of acc
        state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)); 
        
        //Calculate shipping price (if order is over $100, shipping is free)
        state.shippingPrice = state.itemsPrice > 100 ? addDecimals(0) : addDecimals(10);

        //Calculate tax price (13% of items price)
        state.taxPrice = addDecimals(Number((0.13 * state.itemsPrice).toFixed(2)));

        //Calculate total price
        state.totalPrice = (Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)).toFixed(2);

        localStorage.setItem('cart', JSON.stringify(state)); //save the cart state to local storage
      },
    }
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;