'use client'

import {MutatingDots} from "react-loader-spinner";
import Header from "../../_components/Header";
import Footer from "../../_components/Footer";
import React, {useState} from "react";
import Gallery from "../../_components/Gallery";

const Blog = () => {
    const [loading, setLoading] = useState(false);
    return (
        // loading ?
        //     (
        //         <div className={"w-full flex flex-row justify-center items-center parent-div"}>
        //             <MutatingDots
        //                 color="#8b3c7e"
        //                 secondaryColor={"#8b3c7e"}
        //                 height={100}
        //                 width={100}
        //             />
        //         </div>
        //     )
        //     :
        //     (
                <div className={"blog-container"}>
                    <Header
                        setLoading={setLoading}
                    ></Header>
                    <Gallery
                        setLoading={setLoading}
                    ></Gallery>
                    <Footer></Footer>
                </div>
            // )
    );
}

export default Blog;