import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItemsFromCart, updateQuantity } from '../actions/CartAction'; // Adjust import path
import { Link } from 'react-router-dom';

const CartCard = ({ item }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const handleRemove = () => {
    dispatch(removeItemsFromCart(item.product));
  };

  const handleIncrease = () => {
    if (item.quantity < item.stock) {
      dispatch(updateQuantity(item.product, item.quantity + 1));
    }
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity(item.product, item.quantity - 1));
    }
  };

  return (
<div className="flex items-center p-4 bg-white shadow-md rounded-lg mb-4">
      <Link to={`/product/${item.product}`}>
      <img src={item.image} alt={item.name} className="w-32 h-32 object-cover rounded-lg" />
      </Link>
      <div className='w-full px-5 flex place-content-between flex-wrap'>
        <div>

            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p className="text-gray-600">${item.price.toFixed(2)}</p>
            
            <button
              onClick={handleRemove}
              className="mt-2 text-red-500 text-2xl hover:underline"
            >
              <i class="fa-solid fa-trash"></i>
            </button>

        </div>
        <div>
          <div className="flex items-center mt-2">
            <button
              onClick={handleDecrease}
              className="w-10 h-10 flex justify-center items-center bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            >
              -
            </button>
            <span className="mx-4">{item.quantity}</span>
            <button
              onClick={handleIncrease}
              className="w-10 h-10 flex justify-center items-center bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            >
              +
            </button>
          </div>
          <p className="mt-2 font-semibold text-lg">Total: ${(item.price * item.quantity).toFixed(2)}</p>

        </div>
      </div>
    </div>

  
    
  );
};

export default CartCard;
