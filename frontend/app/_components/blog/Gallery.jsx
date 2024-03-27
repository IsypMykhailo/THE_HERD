'use client'

import "../../_css/Blog.css"
import {useState, useEffect, useRef, Children, useLayoutEffect} from "react";
import Image from "next/image";
import {useLenis} from "@studio-freight/react-lenis";
import gsap from 'gsap'

// TODO: Fix the Gallery to allow correct horizontal scrolling
const Gallery = () => {
    const [gallery, setGallery] = useState([]);
    // const galleryRef = useRef(null)
    // const timelineRef = useRef(null)
    // const spacerRef = useRef(null)

    useEffect(() => {
        fetch('/gallery.json')
            .then((response) => response.json())
            .then((data) => {
                setGallery(data)

            })
            .catch((error) => console.error("Fetching blogs failed:", error));
    }, []);

    // useEffect(() => {
    //     if(!galleryRef.current) return
    //
    //     spacerRef.current.style.height = galleryRef.current.clientWidth
    //
    //     timelineRef.current = gsap.timeline({
    //         scrollTrigger: {
    //             trigger: galleryRef.current,
    //             pin: false,
    //             start: 'top top',
    //             end: galleryRef.current.clientWidth,
    //             scrub: 1
    //         }
    //     }).to(galleryRef.current, {
    //         translateX: -galleryRef.current.clientWidth + window.innerWidth
    //     })
    //
    //     console.log(galleryRef.current.offsetWidth, galleryRef.current.clientWidth, galleryRef.current.scrollWidth)
    // }, [galleryRef]);
    //
    // useLayoutEffect(() => {
    //     if(!galleryRef.current) return
    //             console.log(galleryRef.current)
    //     console.log(galleryRef.current.getBoundingClientRect())
    // }, [galleryRef]);

    return (
        <div>
            <div className={"gallery-container top-0 left-0 overflow-x-auto"}>
                {gallery.map((el, index) => (
                    el.type === 'image' ? (
                        <Image src={el.src} alt={`Image ${el.id}`} width={0} height={0} className={"gallery-entity"}
                               unoptimized/>
                    ) : (
                        <video key={index} controls style={{width: '100%'}}>
                            <source src={el.src} type="video/mp4"/>
                            Your browser does not support the video tag.
                        </video>
                    )
                ))}
            </div>
        </div>
    );
}

export default Gallery;