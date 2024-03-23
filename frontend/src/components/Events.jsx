import '../css/Home.css';

const Events = () => {
    return (
        <div className="bg-purple-600 pt-3 pr-4 pb-3 pl-4 d-flex flex-column gap-3 align-items-start justify-content-start" style={{ height: 'auto', position: 'relative', overflow: 'hidden', paddingLeft: 20, backgroundColor: "#8b3c7e" }}>
            <div style={{ color: '#ffffff', textAlign: 'left', fontSize: '1.25rem', fontWeight: '600', textTransform: 'uppercase' }}>
                Upcoming{" "}
            </div>
            <div className="d-flex flex-row" style={{ gap: '23px', overflowX: 'scroll', scrollbarWidth: "none" }}>
                {[...Array(3)].map((_, index) => (
                    <div key={index} className="bg-white" style={{ width: '350px', height: '100px', position: 'relative', overflow: 'hidden' }}>
                        <svg
                            style={{ position: 'absolute', right: '0', top: 'calc(50% - 50px)' }}
                            width="100"
                            height="100"
                            viewBox="0 0 100 100"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect width="100" height="100" fill="black" />
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M71.7161 43.4049L78.017 49.7058C78.4037 50.0925 78.4037 50.7194 78.017 51.106L71.7161 57.407C71.3294 57.7936 70.7025 57.7936 70.3159 57.407C69.9292 57.0203 69.9292 56.3934 70.3159 56.0068L74.9266 51.396H22.6831V49.4158H74.9266L70.3159 44.8051C69.9292 44.4184 69.9292 43.7915 70.3159 43.4049C70.7025 43.0182 71.3294 43.0182 71.7161 43.4049Z"
                                fill="white"
                            />
                        </svg>
                        <div style={{ color: '#000000', textAlign: 'left', fontSize: '1.5rem', lineHeight: '25px', fontWeight: '600', position: 'absolute', left: '10.23px', bottom: '41.36px', width: '156.99px' }}>
                            Valentine’s Day Party{" "}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '0.5rem', alignItems: 'start', justifyContent: 'start', position: 'absolute', left: '10.23px', top: '73px' }}>
                            <div style={{ color: '#000000', textAlign: 'left', fontSize: '1.25rem', lineHeight: '20px', fontWeight: '600' }}>
                                02.17.24{" "}
                            </div>
                            <div style={{ color: '#000000', textAlign: 'left', fontSize: '1.25rem', lineHeight: '20px', fontWeight: '600', opacity: '0.2' }}>
                                8:30{" "}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Events;
