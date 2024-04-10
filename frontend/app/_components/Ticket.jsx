'use client'

import QRCode from 'qrcode.react';
import '@/app/_css/Ticket.css';

const Ticket = ({ticket}) => {
    return (
        <div className={'ticket-container flex flex-col justify-center items-center'}>
            <QRCode value={ticket.id} size={256} level={"H"} includeMargin={true} />
        </div>
    )
}

export default Ticket