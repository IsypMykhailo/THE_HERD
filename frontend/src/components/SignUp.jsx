import React from 'react';
import '../css/Auth.css';

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
    React.useEffect(() => {
        console.log(firstName, lastName)
    }, [firstName, lastName]);

    return (
        <form onSubmit={handleRegister} className={"form"}>
            <div className={"my-4 mx-3"}>
                <input
                    placeholder={"First Name"}
                    type={"text"}
                    className={"form-control form-input"}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </div>
            <div className={"my-4 mx-3"}>
                <input
                    placeholder={"Last Name"}
                    type={"text"}
                    className={"form-control form-input"}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>
            <div className={"my-4 mx-3"}>
                <input
                    placeholder={"Email"}
                    type={"email"}
                    className={"form-control form-input"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className={"my-4 mx-3"}>
                <input
                    placeholder={"Password"}
                    type={"password"}
                    className={"form-control form-input"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className={"text-center my-4 mx-3 d-flex flex-column"}>
                <button type={"submit"} className={"btn btn-primary btn-submit mb-3"}>Create an account</button>
                <a onClick={() => setIsLogin(true)} className={"login-button"}>Already have an account?</a>
            </div>
        </form>
    );
}

export default SignUp;