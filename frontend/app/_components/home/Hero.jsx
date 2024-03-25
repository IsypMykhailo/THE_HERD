import '../../_css/Home.css';

const Hero = () => {
    return (
        <div className={"hero-container"}>
            <div className="bg-black hero-image-container"
                 style={{
                     backgroundImage: 'url(/assets/img/party-photo.jpg)',
                 }}>
            </div>
            <div className={"hero-label"}>
                Party that never ends.
            </div>
        </div>
    )
        ;
}

export default Hero;