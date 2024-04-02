'use client'

import {useState, useEffect, useRef} from "react";
import '../../_css/Events.css'
import {ScrollTrigger} from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import {formatDate, formatTime} from "@/app/_utils/parseUtils";

const Event = ({events}) => {
    const containerRef = useRef(null)
    const eventRef = useRef(null)
    useEffect(() => {
        if (!containerRef.current || !eventRef.current) return
        ScrollTrigger.create({
            trigger: containerRef.current,
            start: 'top top',
            end: `+=${containerRef.current.clientHeight}`,
            onUpdate: self => {
                eventRef.current.scrollLeft = eventRef.current.clientWidth * self.progress
            }
        })
        return () => {
            ScrollTrigger.killAll()
        }
    }, [containerRef, eventRef])
    return (
        <div ref={containerRef} className='xl:h-[200vh] relative'>
            <div ref={eventRef} className={'events-container xl:fixed xl:top-0 xl:left-0 w-screen xl:h-screen'}>
                {events.map((el, index) => (
                    <Link key={index} href={`/events/${el.eventId}`} className={'event-entity m-10 xl:my-20 hover:xl:my-14'}>
                        <Image
                            src={el.eventPoster}
                            alt={`Image ${el.eventId}`}
                            width={0} height={0} unoptimized
                            className={'event-poster'}
                        />
                        <div className={'p-10 event-info flex flex-col justify-center'}>
                            <div className={'event-label'}>
                                {el.name}
                            </div>
                            <div className={'flex flex-row items-center mt-1'}>
                                <div className={'event-page-date'}>
                                    {formatDate(el.date)}
                                </div>
                                <div className={'event-time ml-2'}>
                                    {formatTime(el.startTime)}
                                </div>
                            </div>
                            <div className={'mt-1 event-location'}>
                                {el.location}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Event;