import React from 'react';

const Login = ({email, password, setEmail, setPassword, handleLogin, setIsLogin}) => {
    return (
        <form onSubmit={handleLogin} className={"form"}>
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
                <button type={"submit"} className={"btn btn-primary btn-submit mb-3"}>Login</button>
                <a onClick={() => setIsLogin(false)} className={"login-button"}>Don't have an account?</a>
            </div>
        </form>
    );
}

export default Login;