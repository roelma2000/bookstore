export const addDecimals = (num) => { //helper function to round off the decimal places
    return (Math.round(num * 100) / 100).toFixed(2);
  };

export const updateCart = (state) => { //helper function to update the cart
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
        return state;
};