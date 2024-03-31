// Implementing Redux: Create this boiler plate first
// Implementing Redux: Create constants.js define the APIs
import {configureStore} from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import  cartSliceReducer  from './slices/cartSlice'

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        cart: cartSliceReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export default store;