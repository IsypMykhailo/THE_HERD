import '../css/Home.css';

const Hosts = () => {
    return (
        <div>
            <div className="bg-black row" style={{position: 'relative', overflow: 'hidden'}}>
                <div className={"col d-flex flex-column justify-content-center"} style={{aspectRatio: '1/1'}}>
                    <div style={{
                        color: '#ffffff',
                        textAlign: 'left',
                        fontSize: '1rem',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        position: 'absolute',
                        top: 38,
                        marginLeft: 20
                    }}>
                        HOSTS
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '42px',
                        alignItems: 'start',
                        justifyContent: 'start',
                        marginLeft: 20,
                        width: '65%'
                    }}>
                        <div style={{
                            color: '#ffffff',
                            textAlign: 'left',
                            fontSize: '82px',
                            lineHeight: '80px',
                            fontWeight: '600'
                        }}>
                            MYKHAILO ISYP
                        </div>
                        <div style={{
                            color: '#ffffff',
                            textAlign: 'left',
                            fontSize: '24px',
                            lineHeight: '25px',
                            fontWeight: '600',
                        }}>
                            Whistles if supervisor keep cause. Fastworks speed criticality tentative encourage scraps
                            do. Dive let ensure new people status angel. Responsible fastworks already closest live a.
                            Future-proof be pollination door you door underlying.{" "}
                        </div>
                    </div>
                </div>
                <div className="overflow-hidden col"
                     style={{backgroundImage: 'url(/assets/img/mykhailo-photo.JPG)', backgroundSize: 'cover'}}></div>
            </div>

            <div className="bg-black row" style={{position: 'relative', overflow: 'hidden'}}>
                <div className="overflow-hidden col"
                     style={{background: 'rgba(255,255,255,0.10)'}}></div>
                <div className={"col d-flex flex-column justify-content-center align-items-end"} style={{aspectRatio: '1/1'}}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '42px',
                        alignItems: 'start',
                        justifyContent: 'start',
                        marginRight: 20,
                        width: '65%'
                    }}>
                        <div style={{
                            color: '#ffffff',
                            textAlign: 'left',
                            fontSize: '82px',
                            lineHeight: '80px',
                            fontWeight: '600'
                        }}>
                            KONSTANTIN TOVSHTEIN
                        </div>
                        <div style={{
                            color: '#ffffff',
                            textAlign: 'left',
                            fontSize: '24px',
                            lineHeight: '25px',
                            fontWeight: '600'
                        }}>
                            Whistles if supervisor keep cause. Fastworks speed criticality tentative encourage scraps
                            do. Dive let ensure new people status angel. Responsible fastworks already closest live a.
                            Future-proof be pollination door you door underlying.{" "}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hosts;
