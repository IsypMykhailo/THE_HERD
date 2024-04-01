'use client'

import Header from "@/app/_components/Header";
import Footer from "@/app/_components/Footer";
import '../../_css/Events.css'
import Event from "@/app/_components/events/Event";
import {useEffect, useState} from "react";

const Events = () => {
    const [events, setEvents] = useState([]);
    useEffect(() => {
        fetch('https://the-herd.braverock-df19d8cb.eastus.azurecontainerapps.io/api/v1/events/get/all')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response failed');
                }
                return response.json();
            })
            .then((data) => {
                setEvents(data);
            })
            .catch((error) => {
                console.error("Fetching blogs failed: ", error);
            });
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