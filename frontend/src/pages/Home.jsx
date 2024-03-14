import React, {useState} from 'react';
import Cookies from 'js-cookie';
import '../css/Home.css';
import {useNavigate} from "react-router-dom";
import {MutatingDots} from "react-loader-spinner";

const Home = () => {
    let navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const logOut = () => {
        Cookies.set('token', '');
        Cookies.set('email', '');
        Cookies.set('password', '');
        window.location.reload();
    }

    React.useEffect(() => {

        const validateSession = async () => {
            setLoading(true);
            const token = Cookies.get('token')
            const email = Cookies.get('email')
            const password = Cookies.get('password')
            if (token === '' || email === '' || password === '' || token === undefined || email === undefined || password === undefined) {
                setLoading(false);
                return;
            }
            const payload = {
                email: email,
                password: password,
                token: token
            }
            try {
                const response = await fetch("http://localhost:8080/api/v1/auth/validateSession", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });

                const data = await response.json();

                if (response.status === 200 && data.valid === true) {
                    setIsLoggedIn(true);
                    setLoading(false);
                } else if (response.status === 200 && data.valid === false) {
                    setIsLoggedIn(false);
                    setLoading(false);
                } else if(response.status === 403) {
                    Cookies.set('token', '');
                    Cookies.set('email', '');
                    Cookies.set('password', '');
                    setLoading(false);
                }
                else {
                    console.error('Failed to submit form', await response.text());
                }
            } catch (error) {
                console.error('Failed to submit form', error);
            }
        }

        validateSession();
    }, []);

    return (
        loading ?
            (
                <div className={"container-fluid d-flex flex-row justify-content-center align-items-center parent-div"}>
                    <MutatingDots
                        color="#8b3c7e"
                        secondaryColor={"#8b3c7e"}
                        height={100}
                        width={100}
                    />
                </div>
            )
            :
            (
                <div>
                    {/*NAVIGATION BAR -STATUS: DONE! */}
                    <nav className="navbar navbar-expand-lg navdiv">
                        <div className="container-fluid">
                            <a className="navbar-brand d-flex flex-row justify-content-center align-items-center"
                               href="#">
                                <img src="/assets/img/logo.svg" alt="Logo" width="50"
                                     className="d-inline-block align-text-top logo"/>
                                <div className={"mx-3 d-flex flex-column justify-content-center align-items-center"}><h2
                                    className={"nav-title"}>THE HERD</h2></div>
                            </a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                                    aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse d-flex flex-row justify-content-between"
                                 id="navbarNav">
                                <div
                                    className={"d-flex flex-row justify-content-center align-items-center text-center"}>
                                    <div>
                                        <a className="mx-3 nav-link-text" aria-current="page" href="/">Home</a>
                                    </div>
                                    <div>
                                        <a className="mx-3 nav-link-text" href="#">Blog</a>
                                    </div>
                                    <div>
                                        <a className="mx-3 nav-link-text" href="#">Tickets</a>
                                    </div>
                                </div>
                                {isLoggedIn ? (
                                    <div className={"login-nav-button"} onClick={logOut}>
                                        <a className="nav-link-text" href="/">Log out</a>
                                    </div>
                                ) : (
                                    <div className={"login-nav-button"} onClick={() => navigate('/authenticate')}>
                                        <span className="nav-link-text">Login</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </nav>

                    {/*CONTENT*/}
                    {/*Section 1 Intro Below Header -STATUS: DONE! */}
                    <div className="container1" style={{height: 'calc(100vh - 75px)', overflow: 'hidden', position: 'relative'}}>
                        <img src={"/assets/img/party-photo.jpg"} alt="pic1" style={{width: '100%', position: 'absolute', bottom: 0}} />
                    </div>

                    {/*Section 2 About -STATUS: DONE! */}
                    <div className="sectionContainer">
                        <div className="block2">
                            <div className="textBlock2">
                                <div className="sec234header">
                                    <li>01</li>
                                    <li>About</li>
                                </div>
                                <div className="con2statsContainer">
                                    <div className="con2stats">
                                        <div className="list-item-container">
                                            <div className="additional-text-box">27+</div>
                                            <li>Your Experience</li>
                                        </div>
                                        <div className="list-item-container">
                                            <div className="additional-text-box">1.2k</div>
                                            <li>Succesfull Events</li>
                                        </div>
                                        <div className="list-item-container">
                                            <div className="additional-text-box">6.9k</div>
                                            <li>Satisfied Clients</li>
                                            <div className="sec2paragraph">
                                                <p> hi hi hi hi hi hi hih ih ih ih ih ih ih i hih i hi hi h i hi hi hi
                                                    hi hi
                                                    hih ih ihi hih ih i hidhishfisdhfushih ih ihu cuhh ih i hiuhui hui
                                                    hu hi hi
                                                    hu hui h uih uih uih uih iuuh iuh ih iuh i hi hiu hui hu ihu ih ih
                                                    ih uih ih
                                                    iuh uh i hi h iuh</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <img src={"/assets/img/filler.jpg"} alt="pic2"/>
                            <div className="S2-text">
                                <p className="Here">LIVE YOUR LIFE</p>
                            </div>
                            <div className="S2-text2">
                                <p className="TFN">ACCORDING TO</p>
                            </div>
                            <div className="S2-text3">
                                <p className="END">YOUR WISH</p>
                            </div>
                        </div>
                    </div>

                    {/*Section 3 Special Tickets -STATUS: DONE! */}
                    <div className="sectionContainer">
                        <div className="block2">
                            <div className="textBlock2">
                                <div className="sec234header">
                                    <li>02</li>
                                    <li>Tickets</li>
                                </div>
                                <h1 className="heading"> SPECIAL TICKETS </h1>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut
                                    labore et dolore magna aliqua. Id nibh tortor id aliquet. Et netus et malesuada
                                    fames ac
                                    turpis egestas. Egestas diam in arcu cursus. Pellentesque sit amet porttitor eget
                                    dolor
                                    morbi. Quis risus sed vulputate odio ut enim blandit volutpat. A iaculis at erat
                                    pellentesque adipiscing commodo elit at. Pretium aenean pharetra magna ac placerat
                                    vestibulum lectus mauris ultrices. Pellentesque habitant morbi tristique senectus et
                                    netus
                                    et malesuada. Tellus in hac habitasse platea dictumst vestibulum rhoncus. Neque
                                    vitae tempus
                                    quam pellentesque nec. A scelerisque purus semper eget duis at. Viverra adipiscing
                                    at in
                                    tellus integer feugiat. In fermentum posuere urna nec tincidunt praesent semper.
                                    Varius quam
                                    quisque id diam vel. Diam ut venenatis tellus in metus vulputate. Interdum
                                    consectetur
                                    libero id faucibus nisl tincidunt eget nullam non. Suspendisse faucibus interdum
                                    posuere
                                    lorem ipsum. Lorem dolor sed viverra ipsum. Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    Id nibh
                                    tortor id aliquet. Et netus et malesuada fames ac turpis egestas. Egestas diam in
                                    arcu
                                    cursus. Pellentesque sit amet porttitor eget dolor morbi. Quis risus sed vulputate
                                    odio ut
                                    enim blandit volutpat. A iaculis at erat pellentesque adipiscing commodo elit at.
                                    Pretium
                                    aenean pharetra magna ac placerat vestibulum lectus mauris ultrices. Pellentesque
                                    habitant
                                    morbi tristique senectus et netus et malesuada. Tellus in hac habitasse platea
                                    dictumst
                                    vestibulum rhoncus. Neque vitae tempus quam pellentesque nec. A scelerisque purus
                                    semper
                                    eget duis at. Viverra adipiscing at in tellus integer feugiat. In fermentum posuere
                                    urna nec
                                    tincidunt praesent semper. Varius quam quisque id diam vel. Diam ut venenatis tellus
                                    in
                                    metus vulputate. Interdum consectetur libero id faucibus nisl tincidunt eget nullam
                                    non.
                                    Suspendisse faucibus interdum posuere lorem ipsum. Lorem dolor sed viverra ipsum.
                                </p>

                                <section className="tickets" id="tickets">
                                    <div className="box-container">
                                        {/*Ticket buttons*/}
                                        <div className="box">
                                            <a href="#">
                                                <button className="box-text btn-design">
                                                    <h3 className="ticket-type">VIP Room</h3>
                                                    <h1 className="title">V.I.P</h1>
                                                    <h1 className="amount"> $12k </h1>
                                                    <ul>
                                                        <li>Free Drinks and Food</li>
                                                        <li>Lounge Area</li>
                                                        <li>Vamous Star</li>
                                                        <li>Big Event and Party</li>
                                                        <li>Special DJ</li>
                                                        <li>Full Service</li>
                                                    </ul>
                                                </button>
                                            </a>
                                        </div>

                                        <div className="box">
                                            <a href="#">
                                                <button className="box-text btn-design">
                                                    <h3 className="ticket-type">Special Room</h3>
                                                    <h1 className="title">Exotic</h1>
                                                    <h1 className="amount"> $799 </h1>
                                                    <ul>
                                                        <li>10 People Participant</li>
                                                        <li>10 Food and Drink</li>
                                                        <li>Special Party</li>
                                                        <li>Lounge Area</li>
                                                        <li>Big Event and Party</li>
                                                        <li>Special DJ</li>
                                                    </ul>
                                                </button>
                                            </a>
                                        </div>

                                        <div className="box">
                                            <a href="#">
                                                <button className="box-text btn-design">
                                                    <h3 className="ticket-type">Standard Room</h3>
                                                    <h1 className="title">Flying</h1>
                                                    <h1 className="amount"> $599 </h1>
                                                    <ul>
                                                        <li>6 People Participant</li>
                                                        <li>6 Drink and Food</li>
                                                        <li>Standard Party</li>
                                                        <li>6 Photo with Guest Star</li>
                                                        <li>Standard Dance Floor</li>
                                                        <li>Popular DJ</li>
                                                    </ul>
                                                </button>
                                            </a>
                                        </div>

                                        <div className="box">
                                            <a href="#">
                                                <button className="box-text btn-design">
                                                    <h3 className="ticket-type">classic Room</h3>
                                                    <h1 className="title">Mini</h1>
                                                    <h1 className="amount"> $299 </h1>
                                                    <ul>
                                                        <li>3 People Only</li>
                                                        <li>3 Drink and Food</li>
                                                        <li>Mini Party</li>
                                                        <li>3 Photo with Guest Star</li>
                                                        <li>Mini Dance Floor</li>
                                                        <li>Popular DJ</li>
                                                    </ul>
                                                </button>
                                            </a>
                                        </div>
                                        {/*Ticket buttons END*/}

                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>

                    {/*Section 4 Events below Special Tickets -STATUS: WORKING ON IT*/}
                    <div className="sectionContainer">
                        <div className="block2">
                            <div className="textBlock2">
                                <div className="sec234header">
                                    <li>02</li>
                                    <li>Events</li>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            )
    );
}

export default Home;