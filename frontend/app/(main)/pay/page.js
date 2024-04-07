'use client'


import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import axios from 'axios';
import nextConfig from "@/next.config.mjs";

const PaymentPage = () => {
    const router = useRouter();
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('usd');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCVC] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/v1/create-payment-intent', {
                amount,
                currency,
                token: {
                    card: {
                        number: cardNumber,
                        exp_month: expiry.slice(0, 2),
                        exp_year: expiry.slice(3, 5),
                        cvc
                    }
                }
            });
            console.log('Payment Successful:', response.data);
            setErrorMessage('');
        } catch (error) {
            console.error('Payment Error:', error.response.data);
            setErrorMessage(error.response.data);
        }
    };

    return (
        <div className="w-full flex flex-row parent-div">
            <div className="party-image-parent">
                <h2 className="company-name" onClick={() => router.push("/")}>THE HERD</h2>
                <Image src="/assets/img/party-photo.jpg" alt="party-photo" width={0} height={0} unoptimized className="party-image object-cover"/>
            </div>
            <div className="w-full flex flex-col justify-center items-center sign-up-div">
                <div className="text-center text-5xl py-10">
                    <h1 className="title">Buy Tickets</h1>
                </div>
                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Amount:</label>
                        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Currency:</label>
                        <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value="usd">USD</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Card Number:</label>
                        <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Expiry (MM/YY):</label>
                        <input type="text" value={expiry} onChange={(e) => setExpiry(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">CVC:</label>
                        <input type="text" value={cvc} onChange={(e) => setCVC(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="flex items-center justify-center">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Pay</button>
                    </div>
                    {errorMessage && <div className="text-red-600">{errorMessage}</div>}
                </form>
            </div>
        </div>
    );
};

export default PaymentPage;