import '../css/Home.css';
import UpcomingParty from "./UpcomingParty";

const Events = () => {
    return (
        <div className="pt-3 pb-3 d-flex flex-column gap-3 align-items-start justify-content-start upcoming-events-container">
            <div className={"upcoming-label"}>
                Upcoming
            </div>
            <div className="upcoming-events-carousel">
                {[...Array(3)].map((_, index) => (
                    <UpcomingParty
                        name={"Valentine's Day Party"}
                        date={"02.17.2024"}
                        time={"8:30 PM"}
                    />
                ))}
            </div>
        </div>
    );
}

export default Events;
