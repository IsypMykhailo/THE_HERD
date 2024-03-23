import '../css/Home.css';

const Hero = () => {
    return (
        <div style={{height: '90vh', position: 'relative', overflow: 'hidden', minHeight: '600px'}}>
            <div className="bg-black" style={{
                height: '90vh',
                minHeight: '600px',
                overflow: 'hidden',
                paddingLeft: 20,
                backgroundImage: 'url(/assets/img/party-photo.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.6
            }}>

            </div>
            <div style={{
                color: '#ffffff',
                textAlign: 'left',
                fontSize: '82px',
                lineHeight: '80px',
                fontWeight: '600',
                position: 'absolute',
                bottom: 64,
                width: '30%',
                marginLeft: 20
            }}>
                Party that never ends.
            </div>
        </div>
    )
        ;
}

export default Hero;