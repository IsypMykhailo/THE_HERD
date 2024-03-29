'use client'

import Header from "@/app/_components/Header";
import Footer from "@/app/_components/Footer";
import '../../_css/Events.css'
import Event from "@/app/_components/events/Event";
import {useEffect, useState} from "react";

const Events = () => {
    const [events, setEvents] = useState([]);
    useEffect(() => {
        fetch('/events.json')
            .then((response) => response.json())
            .then((data) => {
                setEvents(data)
            })
            .catch((error) => console.error("Fetching blogs failed:", error));
    }, []);
    return (
        <div className={'w-full h-full'}>
            <Header />
            <Event events={events}/>
            <Footer />
        </div>
    );
}

export default Events;