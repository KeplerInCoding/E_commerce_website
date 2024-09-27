import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO,
    UPDATE_CART_ITEM_QUANTITY,
  } from "../constants/CartConstants";
  
  export const cartReducer = (
    state = { cartItems: [], shippingInfo: {} },
    action
  ) => {
    switch (action.type) {
      case ADD_TO_CART:
        const item = action.payload;
  
        const isItemExist = state.cartItems.find(
          (i) => i.product === item.product
        );
  
        if (isItemExist) {
          return {
            ...state,
            cartItems: state.cartItems.map((i) =>
              i.product === isItemExist.product ? item : i
            ),
          };
        } else {
          return {
            ...state,
            cartItems: [...state.cartItems, item],
          };
        }
  
      case REMOVE_CART_ITEM:
        return {
          ...state,
          cartItems: state.cartItems.filter((i) => i.product !== action.payload),
        };
  
      case SAVE_SHIPPING_INFO:
        return {
          ...state,
          shippingInfo: action.payload,
        };

      case UPDATE_CART_ITEM_QUANTITY:
        const updatedItems = state.cartItems.map(item =>
          item.product === action.payload.product
            ? { ...item, quantity: action.payload.quantity }
            : item
        );
        return {
          ...state,
          cartItems: updatedItems
        };

      case 'CLEAR_CART':
          return {
            ...state,
            cartItems: [], // Clear the cart items
          };
  
      default:
        return state;
    }
  };