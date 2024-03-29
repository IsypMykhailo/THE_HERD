'use client'

import Header from "@/app/_components/Header";
import Footer from "@/app/_components/Footer";
import '../../_css/Events.css'
import Event from "@/app/_components/events/Event";

const Events = () => {
    const data = [
        {
            "id": "1",
            "eventPoster": "/assets/img/valentines-party.jpg",
            "location": "8889 Laurel Street #106, Vancouver, BC",
            "startTime": "8:30 PM",
            "name": "Valentine's Day Party",
            "date": "02.17.2024"
        },
        {
            "id": "2",
            "eventPoster": "/assets/img/halloween-party.jpg",
            "location": "304 East 1st Avenue, Vancouver, BC",
            "startTime": "10:00 PM",
            "name": "Halloween's party",
            "date": "11.03.2023"
        }
    ]
    return (
        <div className={'w-full h-full'}>
            <Header />
            <Event events={data}/>
            <Footer />
        </div>
    );
}

export default Events;