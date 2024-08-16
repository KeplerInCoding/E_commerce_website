import { configureStore } from '@reduxjs/toolkit';
import { productDetailsReducer, productReducer, newReviewReducer } from './reducers/ProductReducer';
import { userReducer } from './reducers/UserReducer'; 
import { cartReducer } from './reducers/CartReducer';

const store = configureStore({
    reducer: {
        products: productReducer,
        productDetails: productDetailsReducer,
        newReview: newReviewReducer,
        user: userReducer,
        cart: cartReducer,
    },
    devTools: process.env.NODE_ENV !== 'production', // Enable devTools only in development
});

export default store;
