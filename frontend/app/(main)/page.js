'use client'

import React, {useState} from 'react';
import '../_css/Home.css';
import {MutatingDots} from "react-loader-spinner";
import Events from "../_components/Events";
import Footer from "../_components/Footer";
import Header from "../_components/Header";
import Hero from "../_components/Hero";
import Hosts from "../_components/Hosts";

const Home = () => {
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
              <div>
                <Header
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

export default Home;