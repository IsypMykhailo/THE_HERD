'use client'

import React from 'react';
import '../../_css/Pay.css';


import React, { useEffect, useState } from 'react';

const PaymentForm = ({
    amount,
    currency,
    cardNumber,
    expiry,
    cvv,
    setAmount,
    setCurrency,
    setCardNumber,
    setExpiry,
    setCVV,
    handlePayment

}) => {

    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    useEffect(() => {

        const cardNumberField = document.getElementById('cardNumber');
        const expiryField = document.getElementById('expiry');
        const cvvField = document.getElementById('cvv');
        const isFormValid = amount !== '' && currency !== '' && cardNumber !== '' && expiry !== '' && cvv !== '' && cardNumberField.validity.valid && expiryField.validity.valid && cvvField.validity.valid;
        setIsSubmitDisabled(!isFormValid);
    }, [amount, currency, cardNumber, expiry, cvv]);

    return (

        <form onSubmit={handlePayment} className={"form max-w-[560px]"}>
            <div className={"my-6 mx-3"}>
                <input
                    placeholder={"Amount"}
                    type={"text"}
                    className={"w-full form-input"}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required={true}
                />
            </div>
            <div className={"my-6 mx-3"}>
                <input
                    placeholder={"Currency"}
                    type={"text"}
                    className={"w-full form-input"}
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    required={true}
                />
            </div>
            <div className={"my-6 mx-3"}>
                <input
                    id={"cardNumber"}
                    placeholder={"Card Number"}
                    type={"text"}
                    className={"w-full form-input"}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    required={true}
                />
            </div>
            <div className={"my-6 mx-3"}>
                <input
                    id={"expiry"}
                    placeholder={"Expiry Date"}
                    type={"text"}
                    className={"w-full form-input"}
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    required={true}
                />
            </div>
            <div className={"my-6 mx-3"}>
                <input
                    id={"cvv"}
                    placeholder={"CVV"}
                    type={"text"}
                    className={"w-full form-input"}
                    value={cvv}
                    onChange={(e) => setCVV(e.target.value)}
                    required={true}
                />

            </div>
            <div className={"text-center my-6 mx-3 flex flex-col"}>
                <button type={"submit"} className={"btn btn-submit mb-3"} disabled={isSubmitDisabled}>Make Payment</button>
            </div>
        </form>
    );

}

export default PaymentForm;