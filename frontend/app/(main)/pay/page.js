'use client'

import React, {useState} from 'react';
import {useRouter} from "next/navigation";
import Image from "next/image";
import '../../_css/Pay.css';
import payment from "../../_components/pay/payment";
import nextConfig from "@/next.config.mjs";



const Pay = (e) => {
    const router = useRouter();
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('usd');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCVV] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    React.useEffect(() => {
        const createpaymentintent = async (e) => {
            e.preventDefault();
            try {
                if(localStorage.getItem("token") != null) {
                    const response = await fetch(nextConfig.mjs + "/api/v1/create-payment-intent", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                            ,'Authorization': 'Bearer ' + localStorage.getItem("token")
                        },
                        body: JSON.stringify({
                            amount: parseInt(amount)
                            ,currency: currency
                            ,method: method
                        })
                    });
                    if (response.status === 200) {
                        console.log('Payment successful')
                    } else {
                        console.error('Payment failed:', response.statusText);
                        setErrorMessage('Failed to process payment. Please try again.');
                    }
                } 
            } catch (error) {
                console.error('Failed to create PaymentIntent:', error.message);
                setErrorMessage('Failed to process payment. Please try again.');
            }
        }
    });


return (
    <div className={"w-full flex flex-row parent-div"}>

        <div className={"party-image-parent"}>
            <h2 className={"company-name"} onClick={() => router.push("/")}>THE HERD</h2>
            <Image src={"/assets/img/party-photo.jpg"} alt={"party-photo"} width={0} height={0} unoptimized
                    className={"party-image object-cover"}/>
        </div>
        <div className={"w-full flex flex-col justify-center items-center payment-div"}>
            <div className={"text-center text-5xl py-10"}>
                    <h1 className={"payment"}>Payment</h1>
        </div>
        <Payment  
            setAmount = {setAmount}
            setCurrency = {setCurrency}
            setCardNumber = {setCardNumber}
            setExpiry = {setExpiry}
            setCVV = {setCVV}
        />
    </div>
    </div>
);
}

export default Pay;