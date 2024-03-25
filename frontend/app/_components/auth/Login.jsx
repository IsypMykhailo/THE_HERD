'use client'

import React from 'react';

const Login = ({email, password, setEmail, setPassword, handleLogin, setIsLogin}) => {
    const [isSubmitDisabled, setIsSubmitDisabled] = React.useState(true);
    React.useEffect(() => {
        const emailField = document.getElementById('email');
        const isFormValid = email !== '' && password !== '' && emailField.validity.valid;
        setIsSubmitDisabled(!isFormValid);
    }, [email, password]);
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