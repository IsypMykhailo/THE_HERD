'use client'


import React, {useState} from 'react';
import {useRouter} from "next/navigation";
import '../../_css/Auth.css';
import SignUp from "../../_components/auth/SignUp";
import Login from "../../_components/auth/Login";
import Image from "next/image";
import Cookies from 'js-cookie';
import nextConfig from "@/next.config.mjs";

const Auth = () => {
    const router = useRouter()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
        const validateSession = async () => {
            setLoading(true);
            try {
                if(localStorage.getItem("token") != null) {
                    const response = await fetch(nextConfig.env.apiUrl + "/api/auth/validateSession", {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem("token")
                        }
                    });

                    if (response.status === 200) {
                        router.push("/")
                    }
                }
            } catch (error) {
                console.error('Failed to validate session', error);
            } finally {
                setLoading(false);
            }
        };

        validateSession();
    }, [router]);

    const handleRegister = async (e) => {
        e.preventDefault();
        const apiUrl = nextConfig.env.apiUrl + '/api/auth/signup';

        const payload = {
            firstName: firstName,
            lastName: lastName,
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
                setIsLogin(true)
            } else {
                console.error('Failed to register', await response.text());
            }
        } catch (error) {
            console.error('Failed to register', error);
        }
    };

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
        <div className={"w-full flex flex-row parent-div"}>

            <div className={"party-image-parent"}>
                <h2 className={"company-name"} onClick={() => router.push("/")}>THE HERD</h2>
                <Image src={"/assets/img/party-photo.jpg"} alt={"party-photo"} width={0} height={0} unoptimized
                       className={"party-image object-cover"}/>
            </div>
            <div
                className={"w-full flex flex-col justify-center items-center sign-up-div"}>
                <div className={"text-center text-5xl py-10"}>
                    {isLogin ?
                        <h1 className={"title"}>Login</h1>
                        :
                        <h1 className={"title"}>Sign Up</h1>
                    }
                </div>
                {isLogin ?
                    <Login
                        email={email}
                        password={password}
                        setEmail={setEmail}
                        setPassword={setPassword}
                        handleLogin={handleLogin}
                        setIsLogin={setIsLogin}
                    />
                    :
                    <SignUp
                        firstName={firstName}
                        lastName={lastName}
                        email={email}
                        password={password}
                        setFirstName={setFirstName}
                        setLastName={setLastName}
                        setEmail={setEmail}
                        setPassword={setPassword}
                        handleRegister={handleRegister}
                        setIsLogin={setIsLogin}
                    />
                }
            </div>
        </div>
    );
}

export default Auth;