'use client'

import {Inter} from "next/font/google";
import "../globals.css";
import {useEffect, useRef} from "react";
import ReactLenis, {useLenis} from "@studio-freight/react-lenis";
import gsap from 'gsap'
import {ScrollTrigger} from "gsap/ScrollTrigger";
import Head from "next/head";

const inter = Inter({subsets: ["latin"]});
gsap.registerPlugin(ScrollTrigger)

export default function RootLayout({children}) {
    const lenisRef = useRef()

    useEffect(() => {
        function update(time) {
            lenisRef.current?.lenis?.raf(time * 1000)
        }

        gsap.ticker.add(update)

        return () => {
            gsap.ticker.remove(update)
        }
    })
    return (
        <html lang="en">
        <head>
            <title>THE HERD</title>
            <link rel="icon" href="/assets/img/favicon.ico" sizes="any"/>
        </head>
        <body className={inter.className}>
        <ReactLenis ref={lenisRef} root autoRaf={false}>
            {children}
        </ReactLenis>
        </body>
        </html>
    );
}
