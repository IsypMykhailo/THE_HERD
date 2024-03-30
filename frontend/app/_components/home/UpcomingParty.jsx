import Link from 'next/link'

const UpcomingParty = ({name, date, time, id}) => {
    return (
        <Link href={`/events/${id}`} className={"flex flex-row event-container group"}>
            <div className="bg-white flex flex-col event-info-container">
                <div className={"event-name"}>
                    {name}
                </div>
                <div className={"flex flex-row items-start justify-start event-datetime-container"}>
                    <div className={"event-date"}>
                        {date}
                    </div>
                    <div className={"event-date"} style={{opacity: '0.2'}}>
                        {time}
                    </div>
                </div>
            </div>
            <div className='w-[100px] h-[100px] flex items-center justify-center bg-black group-hover:w-[150px] transition-all duration-300'>
                <svg
                    width="100"
                    height="100"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M71.7161 43.4049L78.017 49.7058C78.4037 50.0925 78.4037 50.7194 78.017 51.106L71.7161 57.407C71.3294 57.7936 70.7025 57.7936 70.3159 57.407C69.9292 57.0203 69.9292 56.3934 70.3159 56.0068L74.9266 51.396H22.6831V49.4158H74.9266L70.3159 44.8051C69.9292 44.4184 69.9292 43.7915 70.3159 43.4049C70.7025 43.0182 71.3294 43.0182 71.7161 43.4049Z"
                        fill="white"
                    />
                </svg>
            </div>
        </Link>
    );
}

export default UpcomingParty;