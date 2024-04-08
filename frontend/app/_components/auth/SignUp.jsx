'use client'

import React from 'react';
import '../../_css/Auth.css';


const SignUp = ({
                    firstName,
                    lastName,
                    email,
                    password,
                    setFirstName,
                    setLastName,
                    setEmail,
                    setPassword,
                    handleRegister,
                    setIsLogin
                }) => {
    const [isSubmitDisabled, setIsSubmitDisabled] = React.useState(true);
    React.useEffect(() => {
        const emailField = document.getElementById('email');
        const passwordField = document.getElementById('password');
        const isFormValid = firstName !== '' && lastName !== '' && email !== '' && password !== '' && emailField.validity.valid && passwordField.validity.valid;
        setIsSubmitDisabled(!isFormValid);
    }, [firstName, lastName, email, password]);

    return (
        <form onSubmit={handleRegister} className={"form max-w-[560px]"}>
            <div className={"my-6 mx-3"}>
                <input
                    placeholder={"First Name"}
                    type={"text"}
                    className={"w-full form-input"}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required={true}
                />
            </div>
            <div className={"my-6 mx-3"}>
                <input
                    placeholder={"Last Name"}
                    type={"text"}
                    className={"w-full form-input"}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required={true}
                />
            </div>
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
                    id={"password"}
                    placeholder={"Password"}
                    type={"password"}
                    className={"w-full form-input"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength="8"
                    required={true}
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                />
            </div>
            <div className={"text-center my-6 mx-3 flex flex-col"}>
                <button type={"submit"} className={"btn btn-submit mb-3"} disabled={isSubmitDisabled}>Create an account</button>
                <a onClick={() => setIsLogin(true)} className={"login-button"}>Already have an account?</a>
            </div>
        </form>
    );
}

export default SignUp;