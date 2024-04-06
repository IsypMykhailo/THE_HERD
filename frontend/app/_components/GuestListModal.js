import React from 'react';
import '../_css/Modal.css'; // Ensure this path matches your project structure

const GuestListModal = ({ isOpen, toggleModal, guestList }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2 className="modal-title">Guest List</h2>
                <ul>
                {guestList.map((guest, index) => (
                        <li key={index} className="modal-guest-item">{`${guest.firstName} ${guest.lastName}`}</li>
                    ))}
                </ul>
                <button
                    className="modal-btn"
                    onClick={toggleModal}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default GuestListModal;