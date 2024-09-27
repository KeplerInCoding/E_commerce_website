import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrderDetails } from '../actions/OrderAction'; // Redux action
import Metadata from '../components/Metadata';
import Spinner from '../components/Spinner';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

const OrderDetails = () => {
  const { id } = useParams(); // Getting the order ID from the URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { order, loading, error } = useSelector((state) => state.orderDetails);

  useEffect(() => {
    if (error) {
      alert(error); // Handle errors, e.g., show a notification
      navigate('/');
    }
    dispatch(getOrderDetails(id)); // Fetch order details by ID
  }, [dispatch, id, error, navigate]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen py-10 px-4 bg-gray-50 pt-20">
      <Metadata title={`Order Details - ${id}`} />

      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Order #{order && order._id}</h2>
        
        {/* Shipping Information */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
          <div className="flex flex-wrap gap-4">
            <p><strong>Name:</strong> {order.user && order.user.name}</p>
            <p><strong>Phone:</strong> {order.shippingInfo && order.shippingInfo.phoneNo}</p>
            <p><strong>Address:</strong> {order.shippingInfo && `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.postalCode}, ${order.shippingInfo.country}`}</p>
          </div>
        </div>

        {/* Payment Status */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Payment Status</h3>
          <p className={`text-lg font-semibold ${order.paymentInfo && order.paymentInfo.status === 'succeeded' ? 'text-green-600' : 'text-red-600'}`}>
            {order.paymentInfo && order.paymentInfo.status === 'succeeded' ? 
              <><CheckCircleIcon className="mr-1"/> Paid</> :
              <><ErrorIcon className="mr-1"/> Not Paid</>}
          </p>
        </div>

        {/* Order Status */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Order Status</h3>
          <p className={`text-lg font-semibold ${order.orderStatus === 'Delivered' ? 'text-green-600' : 'text-red-600'}`}>
            {order.orderStatus}
          </p>
        </div>

        {/* Order Items */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Order Items</h3>
          <div className="space-y-4">
            {order.orderItems && order.orderItems.map((item) => (
              <div key={item.product} className="flex flex-wrap justify-between items-center bg-gray-100 p-4 rounded-lg">
                <div className="flex items-center">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg"/>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <p className="text-lg font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-2xl font-semibold mb-6">Order Summary</h3>
          <div className="flex justify-between mb-2">
            <p>Subtotal:</p>
            <p>${order.itemsPrice && order.itemsPrice.toFixed(2)}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p>Shipping:</p>
            <p>${order.shippingPrice && order.shippingPrice.toFixed(2)}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p>Tax:</p>
            <p>${order.taxPrice && order.taxPrice.toFixed(2)}</p>
          </div>
          <div className="flex justify-between mt-4 font-bold text-xl">
            <p>Total:</p>
            <p>${order.totalPrice && order.totalPrice.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
