import {MutatingDots} from "react-loader-spinner";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Events from "../components/Events";
import Hosts from "../components/Hosts";
import Footer from "../components/Footer";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const Blog = () => {
    let navigate = useNavigate();
    const [loading, setLoading] = useState(false);
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
                        navigate={navigate}
                        setLoading={setLoading}
                    ></Header>
                    <Hero></Hero>
                    <Events></Events>
                    <Hosts></Hosts>
                    <Footer></Footer>
                </div>
            )
    );
}

export default Blog;