import React, {useState} from 'react';
import Cookies from 'js-cookie';
import '../css/Home.css';
import {useNavigate} from "react-router-dom";
import {MutatingDots} from "react-loader-spinner";
import Events from "../components/Events";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Hosts from "../components/Hosts";

const Home = () => {
    let navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const logOut = () => {
        Cookies.set('token', '');
        Cookies.set('email', '');
        Cookies.set('password', '');
        window.location.reload();
    }

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
                    setIsLoggedIn(true);
                    setLoading(false);
                } else if (response.status === 200 && data.valid === false) {
                    setIsLoggedIn(false);
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
    }, []);

    return (
        loading ?
            (
                <div className={"container-fluid d-flex flex-row justify-content-center align-items-center parent-div"}>
                    <MutatingDots
                        color="#8b3c7e"
                        secondaryColor={"#8b3c7e"}
                        height={100}
                        width={100}
                    />
                </div>
            )
            :
            (
                <div style={{overflow: 'hidden'}}>
                    <Header
                        isLoggedIn={isLoggedIn}
                        navigate={navigate}
                        logOut={logOut}
                    ></Header>
                    <Hero></Hero>
                    <Events></Events>
                    <Hosts></Hosts>
                    <Footer></Footer>
                </div>
            )
    );
}

export default Home;