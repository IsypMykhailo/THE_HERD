'use client'

import {useEffect, useState} from "react";
import '../../../_css/Events.css'
import Header from "@/app/_components/Header";
import Footer from "@/app/_components/Footer";
import GuestListModal from "../../../_components/GuestListModal"
import Image from "next/image";
import {formatDate, formatTime} from "@/app/_utils/parseUtils";
import nextConfig from "@/next.config.mjs";

const EventPage = ({params}) => {
    const id = params.id
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [guestList, setGuestList] = useState([]);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    useEffect(() => {
        setLoading(true)
        fetch(nextConfig.env.apiUrl + '/api/events/get/' + id)
            .then((response) => response.json())
            .then((data) => {
                console.log(data.descriptionArray)
                data.descriptionArray = JSON.parse(data.descriptionArray)
                console.log(data.descriptionArray)
                setEvent(data)
            })
            .catch((error) => console.error("Fetching events failed:", error));

        const fetchGuests = async () => {
            try {
                const response = await fetch(nextConfig.env.apiUrl + `/api/events/get/${id}/guests`);
                if (!response.ok){
                    throw new Error("Network response was not ok");
                }
                const guests = await response.json();
                setGuestList(guests);
            } catch(error){
                console.log("Failed to fetch guests: ", error);
            }
        };

        fetchGuests();

    }, [id]);

    useEffect(() => {
        if (!event || !guestList) return
        setLoading(false)
    }, [event, guestList])

    return (
        <div>
            {loading || !event ? (
                <div className={'loading'}>THE HERD</div>
            ) : (
                <div>
                    <Header></Header>
                    <div className={'w-full event-container py-10 flex flex-col justify-center items-center'}>
                        <Image
                            src={event.eventPoster}
                            alt={`Image ${event.eventId}`}
                            width={0} height={0} unoptimized
                            className={'event-info-poster'}
                            style={{
                                boxShadow: 'rgba(0, 0, 0, 0.75) 0px 5px 15px'
                            }}
                        />
                        <div className={'flex flex-col items-center mt-10 w-full'}>
                            <div className={'py-10 flex flex-col justify-center event-about'}>
                                <div className={'event-label'}>
                                    {event.name}
                                </div>
                                <div className={'flex flex-row items-center mt-1'}>
                                    <div className={'event-page-date'}>
                                        {formatDate(event.date)}
                                    </div>
                                    <div className={'event-time ml-2'}>
                                        {formatTime(event.startTime)}
                                    </div>
                                </div>
                                <div className={'mt-1 event-location'}>
                                    {event.location}
                                </div>
                                <div className={'mt-1 event-location'}>
                                    {guestList.length} guest(s)
                                </div>
                                <div className={'flex xl:flex-row flex-col my-10 items-center justify-center xl:gap-10 min-w-full gap-5'}>
                                <button className={'event-btn py-3 px-10'} onClick={toggleModal}>
                                    Show guest list
                                </button>
                                    <button className={'event-btn p-3 px-10'}>
                                        Buy tickets
                                    </button>
                                </div>
                                <div className={'event-description-label'} style={{color: '#fdfeff', fontSize: '1.5rem', fontWeight: '600'}}>
                                    About this event
                                </div>
                                <div className={'mt-2 event-description'}>
                                    {event.descriptionArray.map((el, index) => (
                                        <div key={index}>{el}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer></Footer>
                </div>
            )}
            <GuestListModal isOpen={isModalOpen} toggleModal={toggleModal} guestList={guestList} />
        </div>
    );
}

export default EventPage;