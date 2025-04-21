import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { ride } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState('cash'); // 'cash' or 'upi'
  const [upiId, setUpiId] = useState('');

  const handlePayment = async () => {
    if (paymentMethod === 'upi' && !upiId) {
      alert("Please enter your UPI ID");
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/payment/confirm`,
        {
          rideId: ride._id,
          method: paymentMethod,
          upiId: paymentMethod === 'upi' ? upiId : undefined,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      if (response.status === 200) {
        alert("Payment successful!")
        navigate('/home');
      }
    } catch (error) {
      console.error(error);
      alert("Payment failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 transform transition duration-500 hover:scale-105">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
          Payment Options
        </h2>
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Select Payment Method:
          </label>
          <div className="flex gap-4">
            <button
              onClick={() => setPaymentMethod('cash')}
              className={`flex-1 py-2 rounded-lg border-2 transition-colors duration-300 font-medium ${
                paymentMethod === 'cash'
                  ? 'bg-green-600 border-green-600 text-white'
                  : 'bg-gray-100 border-gray-300 text-gray-800 hover:bg-green-50'
              }`}
            >
              Cash
            </button>
            <button
              onClick={() => setPaymentMethod('upi')}
              className={`flex-1 py-2 rounded-lg border-2 transition-colors duration-300 font-medium ${
                paymentMethod === 'upi'
                  ? 'bg-green-600 border-green-600 text-white'
                  : 'bg-gray-100 border-gray-300 text-gray-800 hover:bg-green-50'
              }`}
            >
              UPI
            </button>
          </div>
        </div>
        {paymentMethod === 'upi' && (
          <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Enter UPI ID:
            </label>
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              placeholder="example@upi"
            />
          </div>
        )}
        <button
          onClick={handlePayment}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors duration-300 shadow-lg"
        >
          Confirm Payment
        </button>
        <div className="mt-6 text-center">
          <Link to="/home" className="text-blue-600 hover:underline font-medium">
            Cancel Payment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Payment;