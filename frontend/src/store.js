import { configureStore } from '@reduxjs/toolkit';



// import { createStore, combineReducers, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
import {
  newProductReducer,
  newReviewReducer,
  productDetailsReducer,
  productReducer,
  productReviewsReducer,
  productsReducer,
  reviewReducer,
} from "./reducers/ProductReducer";

import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
} from "./reducers/UserReducer";

import { cartReducer } from "./reducers/CartReducer";
import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from "./reducers/OrderReducer";


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
        myOrders: myOrdersReducer,
        orderDetails: orderDetailsReducer,
    },
    preloadedState: initialState,
    devTools: process.env.NODE_ENV !== 'production', // Enable devTools only in development
});

export default store;
