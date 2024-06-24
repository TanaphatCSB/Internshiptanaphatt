// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import "../css/notificationmodal.css";

// export default function NotificationModal({ notifications, onClose }) {
//     const navigate = useNavigate();

//     const handleViewDetails = (submissionId, userId, deviceName) => {
//         navigate(`/admincheckreport`, { state: { submissionId, userId } });
//     };

//     const handleViewDetails2 = (historyId,userId)=>{
//         navigate('admincheckreport', {state:{historyId,userId}});
//     };

//     const isNew = (timestamp) => {
//         const oneDay = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
//         return (new Date() - new Date(timestamp)) < oneDay;
//     };

//     return (
//         <div className="notification-modal-overlay">
//             <div className="notification-modal">
//                 <button className="close-button" onClick={onClose}>X</button>
//                 <h3>การแจ้งเตือน</h3>
//                 {notifications.length === 0 ? (
//                     <p>ไม่มีการแจ้งเตือน</p>
//                 ) : (
//                     notifications.map((notification, index) => (
//                         <div key={index} className={`notification ${isNew(notification.timestamp) ? 'new' : ''}`}>
//                             {notification.assignment ? (
//                                 <div>
//                                     <h5>{notification.assignment.name} ส่งผลตรวจเครื่องวัด</h5>
//                                     <p>{notification.assignment.sticker} 
//                                         <br/>อุปกรณ์: {notification.assignment.deviceName} 
//                                         <br/> รอบ: {notification.assignment.round}</p>
//                                     <button onClick={() => handleViewDetails(notification.assignment.submissionId, notification.assignment.userId, notification.assignment.deviceName)}>
//                                         ดูรายละเอียด
//                                     </button>
//                                 </div>
//                             ) : null}

//                             {notification.update ? (
//                                 <div>
//                                     <h5>{notification.update.username} แก้ไขหมายเหตุ</h5>
//                                     <p>{notification.update.sticker}
//                                         <br/> อุปกรณ์: {notification.update.deviceName}
//                                         <br/> รอบ: {notification.update.round}</p>
//                                     <button onClick={() => handleViewDetails(notification.update.submissionId, notification.update.userId, notification.update.deviceName)}>
//                                         ดูรายละเอียด
//                                     </button>
//                                 </div>
//                             ) : null}

//                             {notification.adevice ? (
//                                 <div>
//                                     <h5>{notification.adevice.username} แจ้งขอเพิ่มอุปกรณ์
//                                         {notification.adevice.historyId}
//                                     </h5>
                                  
//                                     <button onClick={() => handleViewDetails2(notification.adevice.userId, notification.adevice.historyId)}>
//                                         ดูรายละเอียด
//                                     </button>
//                                 </div>
//                             ) : null}
                           

                            
//                         </div>
//                     ))
//                 )}
            
//             </div>
//         </div>
//     );
// }


import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/notificationmodal.css";

export default function NotificationModal({ notifications, onClose }) {
    const navigate = useNavigate();

    const handleViewDetails = (submissionId, userId, deviceName) => {
        navigate('/admincheckreport', { state: { submissionId, userId } });
    };

    const handleViewDetails2 = (historyId, userId) => {
        navigate('/admincheckreport', { state: { historyId, userId, action: 'checkrequest' } });
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
                            {notification.assignment && (
                                <div>
                                    <h5>{notification.assignment.name} ส่งผลตรวจเครื่องวัด</h5>
                                    <p>{notification.assignment.sticker} 
                                        <br/>อุปกรณ์: {notification.assignment.deviceName} 
                                        <br/> รอบ: {notification.assignment.round}</p>
                                    <button onClick={() => handleViewDetails(notification.assignment.submissionId, notification.assignment.userId, notification.assignment.deviceName)}>
                                        ดูรายละเอียด
                                    </button>
                                </div>
                            )}

                            {notification.update && (
                                <div>
                                    <h5>{notification.update.username} แก้ไขหมายเหตุ</h5>
                                    <p>{notification.update.sticker}
                                        <br/> อุปกรณ์: {notification.update.deviceName}
                                        <br/> รอบ: {notification.update.round}</p>
                                    <button onClick={() => handleViewDetails(notification.update.submissionId, notification.update.userId, notification.update.deviceName)}>
                                        ดูรายละเอียด
                                    </button>
                                </div>
                            )}

                            {notification.adevice && (
                                <div>
                                    <h5>{notification.adevice.username} แจ้งขอเพิ่มอุปกรณ์
                                        {notification.adevice.historyId}
                                    </h5>
                                  
                                    <button onClick={() => handleViewDetails2(notification.adevice.historyId, notification.adevice.userId)}>
                                        ดูรายละเอียด
                                    </button>
                                </div>
                            )}

                            {notification.cdevice && (
                                <div>
                                    <h5>{notification.cdevice.username} แจ้งขอเพิ่มอุปกรณ์
                                        {notification.cdevice.historyId}
                                    </h5>
                                  
                                    <button onClick={() => handleViewDetails2(notification.cdevice.historyId, notification.cdevice.userId)}>
                                        ดูรายละเอียด
                                    </button>
                                </div>
                            )}

                            {notification.ddevice && (
                                <div>
                                    <h5>{notification.ddevice.username} แจ้งขอเพิ่มอุปกรณ์
                                        {notification.ddevice.historyId}
                                    </h5>
                                  
                                    <button onClick={() => handleViewDetails2(notification.ddevice.historyId, notification.ddevice.userId)}>
                                        ดูรายละเอียด
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
