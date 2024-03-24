'use client'


import React, {useState} from 'react';
import {useRouter} from "next/navigation";
import '../../_css/Auth.css';
import SignUp from "../../_components/SignUp";
import Login from "../../_components/Login";
import Cookies from 'js-cookie';
import {MutatingDots} from 'react-loader-spinner';
import Image from "next/image";

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
            const token = Cookies.get('token')
            const email = Cookies.get('email')
            const password = Cookies.get('password')
            if (token === '' || email === '' || password === '' || token === undefined || email === undefined || password === undefined) {
                setLoading(false);
                return;
            }
            const payload = {
                email: email,
                password: password,
                token: token
            }
            try {
                const response = await fetch("https://the-herd.braverock-df19d8cb.eastus.azurecontainerapps.io/api/v1/auth/validateSession", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });

                const data = await response.json();

                if (response.status === 200 && data.valid === true) {
                    router.push("/");
                } else if (response.status === 200 && data.valid === false) {
                    setLoading(false);
                } else if(response.status === 403) {
                    Cookies.set('token', '');
                    Cookies.set('email', '');
                    Cookies.set('password', '');
                    setLoading(false);
                }
                else {
                    console.error('Failed to submit form', await response.text());
                }
            } catch (error) {
                console.error('Failed to submit form', error);
            }
        }

        validateSession();
    }, [router]);

    const handleRegister = async (e) => {
        e.preventDefault();
        const apiUrl = 'https://the-herd.braverock-df19d8cb.eastus.azurecontainerapps.io/api/v1/auth/register';

        const payload =
            {
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
                const data = await response.json();
                console.log(data);
                const token = data.token;
                Cookies.set('token', token, {expires: 7, secure: true});
                Cookies.set('email', email, {expires: 7, secure: true});
                Cookies.set('password', password, {expires: 7, secure: true});
                router.push("/");
            } else {
                console.error('Failed to submit form', await response.text());
            }
        } catch (error) {
            console.error('Failed to submit form', error);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const apiUrl = 'https://the-herd.braverock-df19d8cb.eastus.azurecontainerapps.io/api/v1/auth/authenticate';

        const payload =
            {
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
                console.log(data);
                const token = data.token;
                Cookies.set('token', token, {expires: 7, secure: true});
                Cookies.set('email', email, {expires: 7, secure: true});
                Cookies.set('password', password, {expires: 7, secure: true});
                router.push("/");

            } else {
                console.error('Failed to submit form', await response.text());
            }
        } catch (error) {
            console.error('Failed to submit form', error);
        }
    }

    return (
        // loading ?
        //     (
        //         <div className={"w-full flex flex-row justify-center items-center parent-div"}>
        //             <MutatingDots
        //                 color="#8b3c7e"
        //                 secondaryColor={"#8b3c7e"}
        //                 height={100}
        //                 width={100}
        //             />
        //         </div>
        //     )
        //     :
        //     (
                <div className={"w-full flex flex-row parent-div"}>

                    <div className={"party-image-parent"}>
                        <h2 className={"company-name"} onClick={() => router.push("/")}>THE HERD</h2>
                        <Image src={"/assets/img/party-photo.jpg"} alt={"party-photo"} width={0} height={0} unoptimized className={"party-image object-cover"}/>
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
            // )

    );
}

export default Auth;