import React from 'react';
import Modal from 'react-modal';
import "../css/modal.css"; // Ensure the path for modal CSS

const UserModal = ({ isOpen, onRequestClose, content }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="User Information"
            className="Modal"
            overlayClassName="Overlay"
        >
            <button onClick={onRequestClose} className="close-button">X</button>
            <div className="modal-content">
                {content}
            </div>
        </Modal>
    );
};

export default UserModal;
