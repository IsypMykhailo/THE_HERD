import Header from "../../_components/Header";
import Footer from "../../_components/Footer";
import React from "react";
import Gallery from "../../_components/blog/Gallery";

const Blog = () => {
    return (
        <div className={"blog-container"}>
            <Header></Header>
            <Gallery></Gallery>
            <Footer></Footer>
        </div>
    );
}

export default Blog;