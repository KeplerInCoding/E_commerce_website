import { configureStore } from '@reduxjs/toolkit';
import { productDetailsReducer, productReducer, newReviewReducer } from './reducers/ProductReducer';
import { userReducer, forgotPasswordReducer } from './reducers/UserReducer'; 
import { cartReducer } from './reducers/CartReducer';

const store = configureStore({
    reducer: {
        products: productReducer,
        productDetails: productDetailsReducer,
        newReview: newReviewReducer,
        user: userReducer,
        cart: cartReducer,
        forgotPassword: forgotPasswordReducer,
    },
    devTools: process.env.NODE_ENV !== 'production', // Enable devTools only in development
});

export default store;
