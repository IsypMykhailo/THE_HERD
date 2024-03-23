import '../css/Home.css';

const Header = ({isLoggedIn, navigate, logOut}) => {
    return (
        <div
            className="d-flex flex-row align-items-start justify-content-between position-fixed overflow-hidden"
            style={{mixBlendMode: "difference", paddingLeft: 20, paddingRight: 20, paddingTop: 25, zIndex: 999, width: '100%'}}>
            <div className="d-flex flex-column gap-3 align-items-start justify-content-start">
                {isLoggedIn ? (
                    <div className="bg-white p-2 d-flex flex-row gap-2 align-items-start justify-content-start nav-btn"
                         onClick={logOut}>
                        <div className="text-black text-start" style={{
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            textTransform: 'uppercase'
                        }}>
                            Log out
                        </div>
                    </div>
                ) : (
                    <div className="bg-white p-2 d-flex flex-row gap-2 align-items-start justify-content-start nav-btn"
                         onClick={() => navigate('/authenticate')}>
                        <div className="text-black text-start" style={{
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            textTransform: 'uppercase'
                        }}>
                            Log in
                        </div>
                    </div>
                )}
                <div className="text-white text-start nav-btn" style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    textTransform: 'uppercase'
                }}>
                    Home
                </div>
                <div className="text-white text-start nav-btn" style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    textTransform: 'uppercase'
                }}>
                    Blog
                </div>
                <div className="text-white text-start nav-btn" style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    textTransform: 'uppercase'
                }}>
                    Tickets
                </div>
            </div>
            <div>
                <svg className="w-auto h-auto" width="130" height="16" viewBox="0 0 130 16" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0.791626 2.42969V0H13.5573V2.42969H8.61194V16H5.73694V2.42969H0.791626Z"
                        fill="white"
                    />
                    <path
                        d="M19.0982 16V0H21.9966V6.77344H29.4107V0H32.3169V16H29.4107V9.20312H21.9966V16H19.0982Z"
                        fill="white"
                    />
                    <path
                        d="M38.5493 16V0H48.9555V2.42969H41.4477V6.77344H48.4165V9.20312H41.4477V13.5703H49.018V16H38.5493Z"
                        fill="white"
                    />
                    <path
                        d="M63.5296 16V0H66.428V6.77344H73.8421V0H76.7483V16H73.8421V9.20312H66.428V16H63.5296Z"
                        fill="white"
                    />
                    <path
                        d="M82.9807 16V0H93.3869V2.42969H85.8791V6.77344H92.8479V9.20312H85.8791V13.5703H93.4494V16H82.9807Z"
                        fill="white"
                    />
                    <path
                        d="M99.424 16V0H105.424C106.653 0 107.684 0.213542 108.518 0.640625C109.356 1.06771 109.989 1.66667 110.416 2.4375C110.848 3.20313 111.065 4.09635 111.065 5.11719C111.065 6.14323 110.846 7.03385 110.408 7.78906C109.976 8.53906 109.338 9.11979 108.494 9.53125C107.651 9.9375 106.614 10.1406 105.385 10.1406H101.111V7.73437H104.994C105.713 7.73437 106.302 7.63542 106.76 7.4375C107.218 7.23437 107.557 6.9401 107.776 6.55469C107.999 6.16406 108.111 5.6849 108.111 5.11719C108.111 4.54948 107.999 4.0651 107.776 3.66406C107.552 3.25781 107.21 2.95052 106.752 2.74219C106.294 2.52865 105.703 2.42188 104.979 2.42188H102.322V16H99.424ZM107.69 8.75L111.651 16H108.416L104.526 8.75H107.69Z"
                        fill="white"
                    />
                    <path
                        d="M122.234 16H116.813V0H122.344C123.932 0 125.297 0.320313 126.438 0.960938C127.583 1.59635 128.464 2.51042 129.078 3.70312C129.693 4.89583 130 6.32292 130 7.98438C130 9.65104 129.69 11.0833 129.07 12.2812C128.456 13.4792 127.568 14.3984 126.406 15.0391C125.25 15.6797 123.859 16 122.234 16ZM119.711 13.4922H122.094C123.208 13.4922 124.138 13.2891 124.883 12.8828C125.628 12.4714 126.188 11.8594 126.563 11.0469C126.938 10.2292 127.125 9.20833 127.125 7.98438C127.125 6.76042 126.938 5.74479 126.563 4.9375C126.188 4.125 125.633 3.51823 124.898 3.11719C124.169 2.71094 123.263 2.50781 122.18 2.50781H119.711V13.4922Z"
                        fill="white"
                    />
                </svg>
            </div>
        </div>
    );
}

export default Header;