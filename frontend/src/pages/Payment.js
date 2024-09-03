import React, { useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Snackbar, Alert } from '@mui/material';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { useSelector } from "react-redux";

const Payment = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const { cartItems, shippingInfo } = useSelector((state) => state.cart);


    const handlePayment = async () => {
        try {
            // Extracting data from localStorage and sessionStorage
            const shippingInfo = JSON.parse(localStorage.getItem('shippingInfo'));
            const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));

            if (!shippingInfo || !orderInfo) {
                enqueueSnackbar('Missing order or shipping information!', { variant: 'error' });
                return;
            }

            // Create order object
            
            const orderData = {
                orderItems: cartItems,  
                shippingInfo,
                paymentInfo: {
                    id: 'payment-id-simulated',
                    status: 'Paid',
                },
                itemsPrice: orderInfo.subtotal,
                taxPrice: orderInfo.tax,
                shippingPrice: orderInfo.shippingCharges,
                totalPrice: orderInfo.totalPrice,
            };
            

            // Send request to the backend to update orders schema
            await axios.post('/api/v1/order/new', orderData);

            enqueueSnackbar('Paid Successfully!', {
                variant: 'success',
                autoHideDuration: 3000,
                action: (
                    <CheckCircleIcon className="w-6 h-6 text-green-500" />
                ),
            });
        } catch (error) {
            // enqueueSnackbar('Payment failed!', { variant: 'error' });
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900">Payment Information</h2>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">Card Number</label>
                        <input
                            id="card-number"
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <label htmlFor="expiry-date" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                            <input
                                id="expiry-date"
                                type="text"
                                placeholder="MM/YY"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                            <input
                                id="cvv"
                                type="text"
                                placeholder="123"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="button"
                            onClick={handlePayment}
                            className="w-full py-2 px-4 bg-blue-900 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none"
                        >
                            Pay - $100
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Payment;
