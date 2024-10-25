import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO,
    UPDATE_CART_ITEM_QUANTITY,
  } from "../constants/CartConstants";
  import axios from "axios";

  const apiUrl = process.env.REACT_APP_API_URL;
  
  // Add to Cart
  export const addToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`${apiUrl}/api/v1/product/${id}`, {
      withCredentials: true
    });
  
    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.stock,
        quantity,
      },
    });
    // console.log("adding to local storage: ", getState().cart.cartItems);
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  };
  
  // REMOVE FROM CART
  export const removeItemsFromCart = (id) => async (dispatch, getState) => {
    dispatch({
      type: REMOVE_CART_ITEM,
      payload: id,
    });
    
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  };


  // Update quantity in cart logic
  export const updateQuantity = (product, quantity) => async (dispatch, getState) => {
    dispatch({
      type: 'UPDATE_CART_ITEM_QUANTITY',
      payload: { product, quantity }
    });
  };
  
  // SAVE SHIPPING INFO
  export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
      type: SAVE_SHIPPING_INFO,
      payload: data,
    });
  
    localStorage.setItem("shippingInfo", JSON.stringify(data));
  };

  // CLEAR CART AFTER ORDER IS PLACED
export const clearCart = () => async (dispatch) => {
  dispatch({ type: 'CLEAR_CART' });

  // Clear cart items from local storage
  localStorage.removeItem('cartItems');
};
