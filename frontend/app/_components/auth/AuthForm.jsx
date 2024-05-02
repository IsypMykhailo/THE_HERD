'use client'

import React, {useEffect, useState} from "react";
import Login from './Login';
import SignUp from './SignUp';
import nextConfig from "@/next.config.mjs";
import {useRouter} from "next/navigation";
import Loading from "@/app/_components/Loading";

export default function AuthForm() {
    const router = useRouter()
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(true)
    const [loadingClass, setLoadingClass] = useState('')
    useEffect(() => {
        const validateSession = async () => {
            try {
                if (localStorage.getItem("token") != null) {
                    const response = await fetch(nextConfig.env.apiUrl + "/api/auth/validateSession", {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem("token")
                        }
                    });

                    if (response.status === 200) {
                        router.push('/')
                    } else {
                        setLoadingClass('hidden')
                        const timer = setTimeout(() => setLoading(false), 500);
                        clearTimeout(timer)
                    }
                }
            } catch (error) {
                console.error('Failed to validate session', error);
            } finally {
                setLoadingClass('hidden')
                const timer = setTimeout(() => setLoading(false), 500);
                clearTimeout(timer)
            }
        }
        validateSession()
    }, [router]);
    return (
            <div
                className={"w-full flex flex-col justify-center items-center sign-up-div"}>
                {loading && (
                    <Loading loadingClass={loadingClass}/>
                )}
                <div className={"text-center text-5xl py-10"}>
                    {isLogin ?
                        <h1 className={"title"}>Login</h1>
                        :
                        <h1 className={"title"}>Sign Up</h1>
                    }
                </div>
                {isLogin ?
                    <Login
                        setIsLogin={setIsLogin}
                    />
                    :
                    <SignUp
                        setIsLogin={setIsLogin}
                    />
                }
            </div>
    )
}