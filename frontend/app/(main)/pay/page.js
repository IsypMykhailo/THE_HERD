'use client'

const Pay = () => {
    const router = useRouter();
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('usd');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCVC] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    React.useEffect(() => {
        const createpaymentintent = async (e) => {
            e.preventDefault();
            try {
                if(localStorage.getItem("token") != null) {
                    const response = await fetch(nextConfig.mjs + "/api/v1/create-payment-intent", {
                        method: 'POST',
                        credential: 'include',
                        headers: {
                            'Content-Type': 'application/json'
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
}