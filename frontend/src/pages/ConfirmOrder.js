import React from "react";
import { useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { useNavigate } from "react-router-dom";

const ConfirmOrder = () => {
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 50;
  const tax = subtotal * 0.18;
  const discount = subtotal * 0.1; // Assuming a 10% discount
  const totalPrice = subtotal + tax + shippingCharges - discount;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.country} - ${shippingInfo.pinCode}`;

  const proceedToPayment = () => {
    navigate("/payment"); // Adjust to your payment route
  };

  return (
    <div className="min-h-screen">
      {/* Checkout Steps */}
      <CheckoutSteps activeStep={1} />

      <div className="p-6 md:p-10">
        {/* Shipping Info */}
        <div className="bg-white shadow-md rounded-lg p-4 mb-6">
          <h2 className="text-xl font-semibold mb-4">Shipping Info</h2>
          <div className="text-gray-700">
            <p><strong>Address:</strong> {address}</p>
            <p><strong>Phone:</strong> {shippingInfo.phoneNo}</p>
          </div>
        </div>

        {/* Cart Items */}
        <div className="bg-white shadow-md rounded-lg p-4 mb-6">
          <h2 className="text-xl font-semibold mb-4">Your Cart Items</h2>
          {cartItems.map((item) => (
            <div key={item.product} className="flex items-center mb-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex flex-wrap place-content-between w-full px-5">
              <p className=" text-gray-700">{item.name}</p>
              <p className="text-gray-700">
                {item.quantity} x ${item.price.toFixed(2)} = $
                {(item.quantity * item.price).toFixed(2)}
              </p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="text-gray-700 mb-2">
            <p><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
            <p><strong>Shipping Charges:</strong> ${shippingCharges.toFixed(2)}</p>
            <p><strong>Tax (18%):</strong> ${tax.toFixed(2)}</p>
            <p><strong>Discount (10%):</strong> -${discount.toFixed(2)}</p>
            <hr className="my-4" />
            <p className="text-lg font-bold">
              <strong>Total:</strong> ${totalPrice.toFixed(2)}
            </p>
          </div>
          <button
            onClick={proceedToPayment}
            className="w-full mt-4 px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-600"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
