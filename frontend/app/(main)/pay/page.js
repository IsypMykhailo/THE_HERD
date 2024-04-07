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
        const validateSession = async () => {
            setLoading(true);
            try {
                if(localStorage.getItem("token") != null) {
                    const response = await fetch(nextConfig.mjs + "/api/v1/create-payment-intent", {
                        method: 'POST',
                        credential: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        }

                    });
                    
                }
            }
        }
    })
}