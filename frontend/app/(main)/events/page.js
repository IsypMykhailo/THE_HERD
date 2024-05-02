import Header from "@/app/_components/Header";
import Footer from "@/app/_components/Footer";
import '../../_css/Events.css'
import EventsList from "@/app/_components/events/EventsList";

const Events = () => {

    return (
        <div className={'w-full h-full'}>
            <Header />
            <EventsList />
            <Footer />
        </div>
    );
}

export default Events;