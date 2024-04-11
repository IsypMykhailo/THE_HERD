'use client'

import '@/app/_css/Modal.css';
import '@/app/_css/Pay.css';
import {useEffect, useRef} from "react";
import gsap from "gsap";

const TransactionForm = ({sum, setSum, handleSubmit, isOpen, toggleModal}) => {
    const modalRef = useRef()

    useEffect(() => {
        if (!modalRef.current) return
        if (isOpen) {
            gsap.fromTo(modalRef.current, {autoAlpha: 0}, {duration: 0.3, autoAlpha: 1, ease: "power2.out"});
        }
    }, [isOpen])

    if (!isOpen) return null

    return (
        <div className="modal-backdrop" ref={modalRef}>
            <div className={'p-5 flex flex-col gap-3'}
                 style={{
                     backgroundColor: '#121416',
                     boxShadow: 'rgba(0, 0, 0, 0.75) 0px 5px 15px',
                     transition: '0.3s',
                     width: '80%',
                     maxWidth: 600
                 }}>
                <div className={'modal-title'}>Sum</div>
                <input
                    className={'w-full form-input'}
                    value={sum}
                    onChange={(e) => setSum(e.target.value)}
                    required={true}
                />
                <div
                    className={'flex xl:flex-row flex-col items-center justify-center xl:gap-3 min-w-full gap-3'}>
                    <button onClick={toggleModal} className={'py-3 px-10'}
                            style={{
                                backgroundColor: '#8b3c7e',
                                fontSize: '1.25rem',
                                color: '#fdfeff',
                                fontWeight: 600,
                                letterSpacing: '-0.2px',
                                width: '50%',
                                transition: '0.2s',
                                textAlign: 'center'
                            }}>
                        Close
                    </button>
                    <button onClick={handleSubmit} className={'py-3 px-10'}
                            style={{
                                backgroundColor: '#8b3c7e',
                                fontSize: '1.25rem',
                                color: '#fdfeff',
                                fontWeight: 600,
                                letterSpacing: '-0.2px',
                                width: '50%',
                                transition: '0.2s',
                                textAlign: 'center'
                            }}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TransactionForm