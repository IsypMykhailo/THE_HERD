import '../_css/Home.css';

const Hosts = () => {
    return (
        <div className={"flex flex-col"}>
            <div className="bg-black hosts-container">
                <div className={"hosts-info-container"}>
                    <div className={'hosts-label'}>
                        HOSTS
                    </div>
                    <div className={"flex flex-col items-start justify-start hosts-description-container"}
                         style={{ marginLeft: 20 }}>
                        <div className={"hosts-name"}>
                            MYKHAILO ISYP
                        </div>
                        <div className={"hosts-description"}>
                            Whistles if supervisor keep cause. Fastworks speed criticality tentative encourage scraps
                            do. Dive let ensure new people status angel. Responsible fastworks already closest live a.
                            Future-proof be pollination door you door underlying.{" "}
                        </div>
                    </div>
                </div>
                <div className="overflow-hidden hosts-image"
                     style={{backgroundImage: 'url(/assets/img/mykhailo-photo.JPG)'}}></div>
            </div>

            <div className="bg-black hosts-container">
                <div className="overflow-hidden hosts-image"
                     style={{backgroundImage: 'url(/assets/img/konstantin-photo.JPG)', backgroundSize: 'cover'}}></div>
                <div className={"hosts-info-container hosts-info-second"}>
                    <div className={"flex flex-col items-start justify-start hosts-description-container"}
                         style={{ marginRight: 20 }}>
                        <div className={"hosts-name"}>
                            KONSTANTIN TOVSHTEIN
                        </div>
                        <div className={"hosts-description"}>
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
