import React from 'react';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            color: "#fdfeff",
            fontFamily: '"Inter, sans-serif',
            fontSize: "16px",
        },
        invalid: {
            color: "#fa755a",
            iconColor: "#fa755a",
        },
        complete: {
            color: "#00e676",
        },
    },
};

const PaymentForm = ({amount, handlePayment, setIsTierChosen}) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            handlePayment(paymentMethod.id);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form max-w-[560px]">
            <div className="my-6 mx-3">
                <div className={'w-full form-input'}>${amount}</div>
            </div>
            <div className="my-6 mx-3">
                <CardElement options={CARD_ELEMENT_OPTIONS} />
            </div>
            <div className="text-center my-6 mx-3 flex flex-row gap-2">
                <button type="button" onClick={() => setIsTierChosen(false)} className='btn btn-submit mb-3 w-[50%] transition-[0.2s]'>
                    Back
                </button>
                <button type="submit" className="btn btn-submit mb-3 w-[50%] transition-[0.2s]" disabled={!stripe}>
                    Buy
                </button>
            </div>
        </form>
    );
};

export default PaymentForm;
