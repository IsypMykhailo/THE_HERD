import dynamic from "next/dynamic";

const EventInfo = dynamic(() => import('@/app/_components/events/EventInfo'), {ssr: false});

export default function EventPage ({params}) {
    const id = params.id

    return (
        <div>
            <EventInfo id={id} />
        </div>
    )
}
