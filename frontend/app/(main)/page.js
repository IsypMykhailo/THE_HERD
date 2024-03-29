'use client'

import React, {useState} from 'react';
import '../_css/Home.css';
import {MutatingDots} from "react-loader-spinner";
import Events from "../_components/home/Events";
import Footer from "../_components/Footer";
import Header from "../_components/Header";
import Hero from "../_components/home/Hero";
import Hosts from "../_components/home/Hosts";
import Loading from "@/app/_components/Loading";

const Home = () => {

    return (
        <div>
            <Header></Header>
            <Hero></Hero>
            <Events></Events>
            <Hosts></Hosts>
            <Footer></Footer>
        </div>
    );
}

export default Home;