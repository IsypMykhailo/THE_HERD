'use client'

import React, {useState} from 'react';
import nextConfig from "@/next.config.mjs";
import {useRouter} from "next/navigation";

const Login = ({setIsLogin}) => {
    const router = useRouter()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitDisabled, setIsSubmitDisabled] = React.useState(true);
    React.useEffect(() => {
        const emailField = document.getElementById('email');
        const isFormValid = email !== '' && password !== '' && emailField.validity.valid;
        setIsSubmitDisabled(!isFormValid);
    }, [email, password]);

    const handleLogin = async (e) => {
        e.preventDefault();
        const apiUrl = nextConfig.env.apiUrl + '/api/auth/signin';

        const payload = {
            email: email,
            password: password
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.status === 200) {
                const data = await response.json();
                localStorage.setItem("token", data.token);
                router.push("/");
            } else {
                console.error('Failed to login', await response.text());
            }
        } catch (error) {
            console.error('Failed to login', error);
        }
    };

    return (
        <form onSubmit={handleLogin} className={"form max-w-[560px]"}>
            <div className={"my-6 mx-3"}>
                <input
                    id={"email"}
                    placeholder={"Email"}
                    type={"email"}
                    className={"w-full form-input"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required={true}
                />
            </div>
            <div className={"my-6 mx-3"}>
                <input
                    placeholder={"Password"}
                    type={"password"}
                    className={"w-full form-input"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required={true}
                />
            </div>
            <div className={"text-center my-4 mx-3 flex flex-col"}>
                <button type={"submit"} className={"btn btn-submit mb-3"} disabled={isSubmitDisabled}>Login</button>
                <a onClick={() => setIsLogin(false)} className={"login-button"}>{`Don't have an account`}</a>
            </div>
        </form>
    );
}

export default Login;