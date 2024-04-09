import React, {useEffect, useRef, useState} from 'react';
import gsap from 'gsap';
import '../_css/Modal.css';
import Image from 'next/image'
import {FaTicketAlt} from "react-icons/fa";
import {useLenis} from "@studio-freight/react-lenis";

const GuestListModal = ({isOpen, toggleModal, guestList}) => {
    const modalRef = useRef()
    const [guestListSearch, setGuestListSearch] = useState('')
    const [filteredGuestList, setFilteredGuestList] = useState(guestList);
    const lenis = useLenis();
    useEffect(() => {
        if (!modalRef.current || !lenis) return
        if(isOpen) {
            gsap.fromTo(modalRef.current, {autoAlpha: 0}, {duration: 0.3, autoAlpha: 1, ease: "power2.out"});
            lenis.stop()
        }
    }, [isOpen, lenis])

    useEffect(() => {
        // Update filteredGuestList whenever guestListSearch or guestList changes
        const filtered = guestList.filter(guest => (guest.firstName + ' ' + guest.lastName).toLowerCase().includes(guestListSearch.toLowerCase()));
        setFilteredGuestList(filtered);
    }, [guestListSearch, guestList]);

    const searchGuests = (e) => {
        setGuestListSearch(e.target.value);
    };

    if (!isOpen) return null;

    return (
        <div className="modal-backdrop" ref={modalRef}>
            <div className="modal-content flex flex-col">
                <div className={'flex flex-col p-[20px] gap-4 top-0'}>
                    <h2 className="modal-title">Guest List</h2>
                    <input className={'search-guests'} placeholder={'Search Guest List'} value={guestListSearch} onChange={(e) => searchGuests(e)} />
                </div>
                <div className={'guests-container flex flex-col gap-4'} data-lenis-prevent>
                    {filteredGuestList.map((guest, index) => (
                        <div key={index} className="modal-guest-item flex flex-row">
                            <div className={'profile-image-container'}>
                                <Image className={'profile-image'} src={'/assets/img/profile-circle.svg'} alt={index}
                                       width={0} height={0} unoptimized/>
                            </div>
                            <div
                                className={'flex flex-col justify-evenly ml-3'}>
                                <div className={'guest-info'}>
                                    {`${guest.firstName} ${guest.lastName}`}
                                </div>
                                <div className={'guest-tickets flex flex-row items-center gap-2'}>
                                    <FaTicketAlt />
                                    1 ticket
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={'flex flex-col justify-center items-center pt-[20px] pb-[20px]'}>
                    <button
                        className="modal-btn"
                        onClick={() => {
                            lenis.start()
                            toggleModal()
                        }}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GuestListModal;