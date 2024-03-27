'use client'

import "../../_css/Blog.css"
import {useState, useEffect, useRef, Children, useLayoutEffect} from "react";
import Image from "next/image";
import {useLenis} from "@studio-freight/react-lenis";
import {ScrollTrigger} from "gsap/ScrollTrigger";

// TODO: Fix the Gallery to allow correct horizontal scrolling
const Gallery = () => {
    const [gallery, setGallery] = useState([]);
    const containerRef = useRef(null)
    const galleryRef = useRef(null)

    useEffect(() => {
        fetch('/gallery.json')
            .then((response) => response.json())
            .then((data) => {
                setGallery(data)

            })
            .catch((error) => console.error("Fetching blogs failed:", error));
    }, []);

    useEffect(() => {
        if (!galleryRef.current || !containerRef.current) return

        ScrollTrigger.create({
            trigger: containerRef.current,
            start: 'top top',
            end: `+=${containerRef.current.clientHeight}`,
            onUpdate: self => {
                galleryRef.current.scrollLeft = galleryRef.current.clientWidth * self.progress
            }
        })
        return () => {
            ScrollTrigger.killAll()
        }
    }, [galleryRef, containerRef]);

    return (
        <div className='xl:h-[200vh] relative' ref={containerRef}>
            <div ref={galleryRef} id={'carousel'} className={"gallery-container xl:fixed xl:top-0 xl:left-0 w-screen xl:h-screen"}>
                {gallery.map((el, index) => (
                    el.type === 'image' ? (
                        <Image key={index} src={el.src} alt={`Image ${el.id}`} width={0} height={0}
                               className={"gallery-entity"}
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