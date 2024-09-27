import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { myOrders } from '../actions/OrderAction'; 
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';

const MyOrders = () => {
  const dispatch = useDispatch();
  
  const { orders, loading, error } = useSelector(state => state.myOrders); 
  useEffect(() => {
    dispatch(myOrders());
    console.log(orders);
  }, [dispatch]);

  return (
    <div className="container mx-auto p-8 min-h-screen pt-20">
      <h1 className="text-2xl font-semibold mb-6">MY ORDERS</h1>

      {loading ? (
        <Spinner />
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <div className="overflow-x-auto bg-white">
          <table className="min-w-full bg-white shadow-md rounded-lg block md:table">
            <thead>
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Items Qty</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id} className="border-t">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order._id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.orderStatus}</td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-center 
                      ${order.orderStatus === 'Delivered' 
                        ? 'bg-green-100 text-green-700'  
                        : 'bg-red-100 text-red-700'      
                      }`}>
                    {order.orderStatus}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${order.totalPrice}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Link to={`/order/${order._id}`} className="text-indigo-600 hover:text-indigo-900">
                      <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
