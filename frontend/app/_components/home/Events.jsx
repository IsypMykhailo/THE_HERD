'use client'

import '../../_css/Home.css';
import UpcomingParty from "./UpcomingParty";
import {useEffect, useState} from "react";
import {formatDate, formatTime} from "@/app/_utils/parseUtils";
import nextConfig from "@/next.config.mjs";

const Events = () => {
    const [events, setEvents] = useState(null);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(true)
        fetch(nextConfig.env.apiUrl + '/api/events/get/all')
            .then((response) => response.json())
            .then((data) => {
                setEvents(data)
            })
            .catch((error) => console.error("Fetching blogs failed:", error));
    }, []);

    useEffect(() => {
        if(!events) return
        setLoading(false)
    }, [events])

    return (
        <>
            {(loading || !events) ? (
                <div className={'loading'}>THE HERD</div>
            ) : (
                <div className="pt-3 pb-3 flex flex-col gap-3 items-start justify-start upcoming-events-container">
                    <div className={"upcoming-label"}>
                        Upcoming
                    </div>
                    <div className="upcoming-events-carousel">
                        {events.map((event, index) => (
                            <UpcomingParty
                                key={index}
                                name={event.name}
                                date={formatDate(event.date)}
                                time={formatTime(event.startTime)}
                                id={event.eventId}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

export default Events;
