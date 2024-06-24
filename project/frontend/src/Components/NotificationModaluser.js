import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/notificationmodal.css";

export default function NotificationModal({ notifications, onClose }) {
    const navigate = useNavigate();

    const handleViewDetails = (sticker, newDevice, serial_number) => {
        navigate('/usersendstatus', { state: { sticker, newDevice, serial_number, action: 'change' } });
    };

    const handleViewDetails2 = (submission_id, sticker, device_name) => {
        navigate('/usersendstatus', { state: { submission_id, sticker, device_name, action: 'change' } });
    };

    const isNew = (timestamp) => {
        const oneDay = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        return (new Date() - new Date(timestamp)) < oneDay;
    };

    return (
        <div className="notification-modal-overlay">
            <div className="notification-modal">
                <button className="close-button" onClick={onClose}>X</button>
                <h3>การแจ้งเตือน</h3>
                {notifications.length === 0 ? (
                    <p>ไม่มีการแจ้งเตือน</p>
                    
                ) : (
                    notifications.map((notification, index) => (
                        <div key={index} className={`notification ${isNew(notification.timestamp) ? 'new' : ''}`}>
                            
                            {notification.acceptadevice && (
                                <div>
                                    <h5>Admin อนุมติการเพิ่มอุปกรณ์ของคุณแล้ว</h5>
                                    <p>{notification.acceptadevice.sticker} 
                                        <br/>อุปกรณ์: {notification.acceptadevice.newDevice} 
                                        <br/> รอบ: {notification.acceptadevice.serial_number}</p>
                                    <button onClick={() => handleViewDetails(notification.acceptadevice.sticker, notification.acceptadevice.newDevice, notification.acceptadevice.serial_number)}>
                                        ดูรายละเอียด
                                    </button>
                                </div>
                            )}

                            {notification.changedevice && (
                                <div>
                                    <h5>Admin อนุมติการเปลี่ยนอุปกรณ์ของคุณแล้ว</h5>
                                    <p>{notification.changedevice.sticker}</p>
                                    <p>{notification.changedevice.device_name}</p>
                                    <button onClick={() => handleViewDetails2(notification.changedevice.submission_id, notification.changedevice.sticker, notification.changedevice.device_name)}>
                                        ดูรายละเอียด
                                    </button>
                                </div>
                            )}

                            {notification.deletedevice && (
                                <div>
                                    <h5>Admin อนุมัติการลบอุปกรณ์ของคุณแล้ว</h5>
                                    <p>{notification.deletedevice.selectedDevice} {notification.deletedevice.selectedserial}</p>
                                </div>
                            )}

                            {notification.acceptsubmit && (
                                <div>
                                    <h5>Admin อนุมติการการส่งผลตรวจแล้ว</h5>
                                    <p>{notification.acceptsubmit.sticker} 
                                        <br/>อุปกรณ์: {notification.acceptsubmit.device_name} 
                                        <br/> รอบ: {notification.acceptsubmit.serial_round}</p>
                                    <button onClick={() => handleViewDetails2(notification.acceptsubmit.submission_id, notification.acceptsubmit.sticker, notification.acceptsubmit.device_name)}>
                                        ดูรายละเอียด
                                    </button>
                                </div>
                            )}

                            {notification.acceptupdate && (
                                <div>
                                    <h5>Admin อนุมติการการแก้ไขข้อมูลของตุณแล้ว</h5>
                                    <p>{notification.acceptupdate.sticker} 
                                        <br/>อุปกรณ์: {notification.acceptupdate.device_name} 
                                        <br/> รอบ: {notification.acceptupdate.serial_round}</p>
                                    <button onClick={() => handleViewDetails2(notification.acceptupdate.submission_id, notification.acceptupdate.sticker, notification.acceptupdate.device_name)}>
                                        ดูรายละเอียด
                                    </button>
                                </div>
                            )}

                            {notification.rejectsubmit && (
                                <div>
                                    <h5>Admin ปฏิเสธการส่งของคุณ</h5>
                                    <button onClick={() => handleViewDetails2(notification.rejectsubmit.submission_id)}>
                                        ดูรายละเอียด
                                    </button>
                                </div>
                            )}

                            {notification.repair && (
                                <div>
                                    <h5>Admin ส่งซ่อมอุปกรณ์ของคุณแล้ว</h5>
                                    <p>{notification.repair.sticker}</p>
                                    <p>{notification.repair.device_name}</p>
                                    <button onClick={() => handleViewDetails2(notification.repair.submission_id, notification.repair.sticker, notification.repair.device_name)}>
                                        ดูรายละเอียด
                                    </button>
                                </div>
                            )}

                            {notification.rejectaddchange && (
                                <div>
                                    <h5>Admin ปฏิเสธคำขออุปกรณ์ของคุณ</h5>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
