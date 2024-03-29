'use client'

import "../../_css/Blog.css"
import {useState, useEffect, useRef} from "react";
import Image from "next/image";
import {useLenis} from "@studio-freight/react-lenis";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import gsap from "gsap"

const Gallery = () => {
    const [gallery, setGallery] = useState([]);
    const containerRef = useRef(null)
    const galleryRef = useRef(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch('/gallery.json')
            .then((response) => response.json())
            .then((data) => {
                setGallery(data)

            })
            .catch((error) => console.error("Fetching blogs failed:", error));
    }, []);

    useEffect(() => {
        if(!gallery) return
        setLoading(false);
    }, [gallery])

    useEffect(() => {
        if (!galleryRef.current || !containerRef.current) return

        ScrollTrigger.create({
            trigger: containerRef.current,
            start: 'top top',
            end: `+=${containerRef.current.clientHeight}`,
            onUpdate: self => {
                galleryRef.current.scrollLeft = galleryRef.current.clientWidth * self.progress
                console.log(self.progress)
            }
        })
        return () => {
            ScrollTrigger.killAll()
        }
    }, [galleryRef, containerRef]);

    return loading || !gallery ? (
        <div className={'loading'}>THE HERD</div>
    ) : (
        <div className='xl:h-[200vh] relative' ref={containerRef}>
            <div ref={galleryRef} className={"gallery-container xl:fixed xl:top-0 xl:left-0 w-screen xl:h-screen"}>
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