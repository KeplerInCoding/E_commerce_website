import { configureStore } from '@reduxjs/toolkit';
import { productDetailsReducer, productReducer, newReviewReducer } from './reducers/ProductReducer';
import { userReducer } from './reducers/UserReducer'; 

const store = configureStore({
    reducer: {
        products: productReducer,
        productDetails: productDetailsReducer,
        newReview: newReviewReducer,
        user: userReducer,
    },
    devTools: process.env.NODE_ENV !== 'production', // Enable devTools only in development
});

export default store;
