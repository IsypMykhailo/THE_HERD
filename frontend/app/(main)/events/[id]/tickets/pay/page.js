'use client'

import {useEffect, useState} from 'react';
import {useRouter} from "next/navigation";
import Image from "next/image";
import '@/app/_css/Pay.css';
import PaymentForm from "../../../../../_components/pay/payment";
import nextConfig from "@/next.config.mjs";
import Tiers from "@/app/_components/pay/Tiers";
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from "@stripe/react-stripe-js";

const stripePromise = loadStripe('pk_test_51OEmaiGwybuQiwu1P2ZnsbVJewmMEMapKH0HhnyHZXYcEPkDZosoT0csJQDnqnMvFXny9P2434FhKFRTqxLbRuSu008VmF1B5E');

const Pay = ({params}) => {
    const eventId = params.id;
    const router = useRouter();
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('usd');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCVV] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isTierChosen, setIsTierChosen] = useState(false)
    const [loading, setLoading] = useState(true)
    const [tiers, setTiers] = useState(null)
    const [tierId, setTierId] = useState(null)

    useEffect(() => {
        setLoading(true)
        const fetchTiers = async () => {
            try {
                const response = await fetch(nextConfig.env.apiUrl + '/api/tiers/get/' + eventId, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    },
                })

                if (!response.ok) {
                    throw new Error(response.statusText)
                }

                const data = await response.json();
                setTiers(data)
            } catch (error) {
                console.error('Failed to fetch tiers ' + error)
            }
        }

        fetchTiers()
    }, [eventId]);

    useEffect(() => {
        if (tiers === null) return
        setLoading(false)
    }, [tiers]);

    const handlePayment = async (paymentMethodId) => {
        try {
            const amountInCents = amount * 100;
            // API call to your backend to create a PaymentIntent and finalize the payment
            const response = await fetch(nextConfig.env.apiUrl + '/api/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                },
                body: JSON.stringify({
                    paymentMethodId,
                    amount: amountInCents,
                }),
            });

            if (!response.ok) throw new Error('Network response was not ok.');

            const data = await response.json();

            if (data.error) {
                console.error(data.error);
            } else {
                if (data.paymentIntentStatus === 'succeeded') {
                    console.log('Payment succeeded!');

                    try{
                        const transactionResponse = await fetch(nextConfig.env.apiUrl + '/api/transactions/create', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + localStorage.getItem("token")
                            },
                            body: JSON.stringify({
                                sum: amount
                            }),
                        })

                        if(!response.ok) {
                            throw new Error(response.statusText)
                        }
                    } catch (error) {
                        console.error(error)
                    }

                    try {
                        const ticketResponse = await fetch(nextConfig.env.apiUrl + '/api/ticket/create', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + localStorage.getItem("token")
                            },
                            body: JSON.stringify({
                                tierId
                            }),
                        })

                        if (!response.ok) {
                            throw new Error(response.statusText)
                        }
                        alert('Payment succeded')
                        router.push(`/events/${eventId}/tickets`)
                    } catch (error) {
                        console.error(error)
                    }
                }
            }
        } catch (error) {
            console.error('Payment failed', error);
        }
    };


    return (
        <div className={"w-full flex flex-row parent-div"}>

            <div className={"party-image-parent"}>
                <h2 className={"company-name"} onClick={() => router.push("/")}>THE HERD</h2>
                <Image src={"/assets/img/party-photo.jpg"} alt={"party-photo"} width={0} height={0} unoptimized
                       className={"party-image object-cover"}/>
            </div>
            <div className={"w-full flex flex-col justify-center items-center payment-div"}>
                {!loading && (
                    <>
                        <div className={"text-center text-5xl py-10"}>
                            <h1 className={"title"}>{isTierChosen ? "Payment" : "Choose a tier"}</h1>
                        </div>

                        {isTierChosen ? (
                            <Elements stripe={stripePromise}>
                                <PaymentForm
                                    amount={amount}
                                    handlePayment={handlePayment}
                                    setIsTierChosen={setIsTierChosen}
                                />
                            </Elements>
                        ) : (
                            <Tiers tiers={tiers} setAmount={setAmount} setIsTierChosen={setIsTierChosen} tierId={tierId} setTierId={setTierId} />
                        )}
                    </>
                )}
            </div>
        </div>
    );

}

export default Pay;