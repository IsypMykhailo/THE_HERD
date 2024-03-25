import '../../_css/Home.css';
import UpcomingParty from "./UpcomingParty";

const Events = () => {
    return (
        <div className="pt-3 pb-3 flex flex-col gap-3 items-start justify-start upcoming-events-container">
            <div className={"upcoming-label"}>
                Upcoming
            </div>
            <div className="upcoming-events-carousel">
                {[...Array(3)].map((_, index) => (
                    <UpcomingParty
                        key={index}
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
