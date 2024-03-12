import React, {useState} from 'react';
import Cookies from 'js-cookie';

const Home = () => {
    const logOut = () => {
        Cookies.set('token', '');
        Cookies.set('email', '');
        Cookies.set('password', '');
        window.location.reload();
    }
    return (
        <div>
            <h1>Home Page</h1>
            <button onClick={logOut}>Log out</button>
        </div>
    );
}

export default Home;