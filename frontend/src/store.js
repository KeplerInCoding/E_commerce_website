import { configureStore } from '@reduxjs/toolkit';
import { productDetailsReducer, productReducer, newReviewReducer } from './reducers/ProductReducer';

const store = configureStore({
    reducer: {
        products: productReducer,
        productDetails: productDetailsReducer,
        newReview: newReviewReducer,
    },
    devTools: process.env.NODE_ENV !== 'production', // Enable devTools only in development
});

export default store;
