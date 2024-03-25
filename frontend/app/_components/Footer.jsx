import '../_css/Home.css';

const Footer = () => {
    return (
        <div className="bg-black p-4 footer-container">
            <svg
                className={"footer-logo"}
                viewBox="0 0 291 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M0 5.4668V0H28.7227V5.4668H17.5957V36H11.127V5.4668H0Z"
                    fill="white"
                />
                <path
                    d="M41.1898 36V0H47.7112V15.2402H64.3929V0H70.9319V36H64.3929V20.707H47.7112V36H41.1898Z"
                    fill="white"
                />
                <path
                    d="M84.9547 36V0H108.369V5.4668H91.4762V15.2402H107.156V20.707H91.4762V30.5332H108.509V36H84.9547Z"
                    fill="white"
                />
                <path
                    d="M141.16 36V0H147.682V15.2402H164.364V0H170.903V36H164.364V20.707H147.682V36H141.16Z"
                    fill="white"
                />
                <path
                    d="M184.925 36V0H208.339V5.4668H191.447V15.2402H207.127V20.707H191.447V30.5332H208.48V36H184.925Z"
                    fill="white"
                />
                <path
                    d="M221.923 36V0H235.423C238.188 0 240.509 0.480469 242.384 1.44141C244.27 2.40234 245.694 3.75 246.655 5.48437C247.628 7.20703 248.114 9.2168 248.114 11.5137C248.114 13.8223 247.622 15.8262 246.638 17.5254C245.665 19.2129 244.229 20.5195 242.331 21.4453C240.433 22.3594 238.1 22.8164 235.335 22.8164H225.72V17.4023H234.456C236.073 17.4023 237.397 17.1797 238.429 16.7344C239.46 16.2773 240.222 15.6152 240.714 14.748C241.218 13.8691 241.47 12.791 241.47 11.5137C241.47 10.2363 241.218 9.14649 240.714 8.24414C240.21 7.33008 239.442 6.63867 238.411 6.16992C237.38 5.68945 236.05 5.44922 234.421 5.44922H228.444V36H221.923ZM240.52 19.6875L249.433 36H242.155L233.401 19.6875H240.52Z"
                    fill="white"
                />
                <path
                    d="M273.246 36H261.047V0H273.492C277.067 0 280.137 0.720703 282.703 2.16211C285.281 3.5918 287.262 5.64844 288.645 8.33203C290.028 11.0156 290.719 14.2266 290.719 17.9648C290.719 21.7148 290.022 24.9375 288.627 27.6328C287.244 30.3281 285.246 32.3965 282.633 33.8379C280.031 35.2793 276.903 36 273.246 36ZM267.569 30.3574H272.93C275.438 30.3574 277.529 29.9004 279.205 28.9863C280.881 28.0605 282.141 26.6836 282.985 24.8555C283.828 23.0156 284.25 20.7188 284.25 17.9648C284.25 15.2109 283.828 12.9258 282.985 11.1094C282.141 9.28125 280.893 7.91602 279.24 7.01367C277.6 6.09961 275.561 5.64258 273.123 5.64258H267.569V30.3574Z"
                    fill="white"
                />
            </svg>
            <div className="flex flex-row gap-[55px]">
                <div
                    className={"footer-link"}
                     onClick={() => window.location.href = 'https://www.instagram.com/the_herd_van/'}>
                    Instagram
                </div>
                <div
                    className={"footer-link"}
                     onClick={() => window.location.href = 'https://t.me/the_herd32'}>
                    Telegram
                </div>
            </div>
        </div>
    );
}

export default Footer;