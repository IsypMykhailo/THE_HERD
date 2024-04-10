'use client'

import Header from "@/app/_components/Header";
import Footer from "@/app/_components/Footer";
import Ticket from "@/app/_components/Ticket"
import {useEffect, useState} from "react";
import nextConfig from "@/next.config.mjs";

export default function Tickets({params}) {
    const eventId = params.id;
    const [ticket, setTicket] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        const fetchTicket = async () => {
            try{
                const response = await fetch(nextConfig.env.apiUrl + '/api/ticket/get/event/' + eventId, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    },
                })
                if(!response.ok) {
                    throw new Error(response.statusText)
                }

                const data = await response.json()
                setTicket(data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchTicket()
    }, [eventId])

    useEffect(() => {
        if(!ticket) return
        setLoading(false)
    }, [ticket]);

    return (
        <div className={'w-full h-full'}>
            <Header></Header>
            {!loading && (
                <Ticket ticket={ticket}></Ticket>
            )}
            <Footer></Footer>
        </div>
    )
}