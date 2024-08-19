import React from 'react';
import { useSelector } from 'react-redux';
import CartCard from '../components/CartCard';
import { useNavigate } from 'react-router-dom';
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import Metadata from '../components/Metadata';

const CartItems = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(
    (state) => state.user
  );

  const handleCheckout = () => {
    if(isAuthenticated)navigate('/shipping');
    else navigate('/login-signup');
  };

  const handleExploreProducts = () => {
    navigate('/products'); // Adjust to your products route
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen ">
        <Metadata title={"Cart"} />
        <RemoveShoppingCartIcon style={{ color: 'red', fontSize: '150px' }}/>
        <p className="text-xl font-semibold mt-4">No items in cart</p>
        <button
          onClick={handleExploreProducts}
          className="mt-4 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-600"
        >
          Explore Products
        </button>
      </div>
    );
  }

  const grossTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="p-4 pt-20 min-h-screen">
        <Metadata title={"Cart"} />
      {cartItems.map((item) => (
        <CartCard key={item.product} item={item} />
      ))}
      <div className="flex justify-between items-center mt-10">
        <p className="text-xl font-semibold">Gross Total: ${grossTotal.toFixed(2)}</p>
        <button
          onClick={handleCheckout}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItems;
