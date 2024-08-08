import { configureStore } from '@reduxjs/toolkit';
import { productDetailsReducer, productReducer } from './reducers/ProductReducer';

const store = configureStore({
    reducer: {
        products: productReducer,
        productDetails: productDetailsReducer,
    },
    devTools: process.env.NODE_ENV !== 'production', // Enable devTools only in development
});

export default store;
