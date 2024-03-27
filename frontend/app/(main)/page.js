'use client'

import React, {useState} from 'react';
import '../_css/Home.css';
import {MutatingDots} from "react-loader-spinner";
import Events from "../_components/home/Events";
import Footer from "../_components/Footer";
import Header from "../_components/Header";
import Hero from "../_components/home/Hero";
import Hosts from "../_components/home/Hosts";

const Home = () => {
    const [loading, setLoading] = useState(false);

    return (
        <div>
            <Header
                setLoading={setLoading}
            ></Header>
            <Hero></Hero>
            <Events></Events>
            <Hosts></Hosts>
            <Footer></Footer>
        </div>
    );
}

export default Home;