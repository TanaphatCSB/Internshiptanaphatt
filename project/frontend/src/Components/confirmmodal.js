import React from 'react';
import Modal from 'react-modal';

const ConfirmModal = ({ isOpen, onRequestClose, oldData, selectedApproval, handleApproveFinal }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: 'auto',
          borderRadius: '10px',
          padding: '20px',
          overflow: 'auto'
        }
      }}
    >
      <div className="modal-content">
        <h2>Compare Changes</h2>
        {oldData ? (
          <div className="olddata">
            <h4>Old Data (accepttable)</h4>
            <h5>{oldData.sticker}</h5>
            <p>คุรภัณฑ์: {oldData.durable}</p>
            <p>อุปกรณ์: {oldData.device_name}</p>
            <p>ยี่ห้อ: {oldData.brand}</p>
            <p>รุ่น: {oldData.model}</p>
            <p>Serial: {oldData.serial}</p>
            <p>status: {oldData.status}</p>
            <p>left: {oldData.left_side} right: {oldData.right_side}</p>
            <p>หมายเหตุ:{oldData.note}</p>
            <p>Test-report: {oldData.test_report}</p>
          </div>
        ) : (
          <p>Loading old data...</p>
        )}
        {selectedApproval ? (
          <div className="newdata">
            <h4>New Data (pending approvals)</h4>
            <p>status: {selectedApproval.status}</p>
            <p>ซ้าย: {selectedApproval.left_side} ขวา: {selectedApproval.right_side}</p>
            <p>หมายเหตุ: {selectedApproval.note}</p>
            <p>test_report: {selectedApproval.test_report}</p>
          </div>
        ) : (
          <p>Loading new data...</p>
        )}
        <div className="modal-buttons">
          <button onClick={handleApproveFinal} disabled={!selectedApproval}>Approve Changes</button>
          <button onClick={onRequestClose}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
