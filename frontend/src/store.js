import { configureStore } from '@reduxjs/toolkit';
import { productDetailsReducer, productReducer, newReviewReducer } from './reducers/ProductReducer';
import { userReducer, forgotPasswordReducer } from './reducers/UserReducer'; 
import { cartReducer } from './reducers/CartReducer';


let initialState = {
    cart: {
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    //   shippingInfo: localStorage.getItem("shippingInfo")
    //     ? JSON.parse(localStorage.getItem("shippingInfo"))
    //     : {},
    },
  };

const store = configureStore({
    reducer: {
        products: productReducer,
        productDetails: productDetailsReducer,
        newReview: newReviewReducer,
        user: userReducer,
        cart: cartReducer,
        forgotPassword: forgotPasswordReducer,
    },
    preloadedState: initialState,
    devTools: process.env.NODE_ENV !== 'production', // Enable devTools only in development
});

export default store;
