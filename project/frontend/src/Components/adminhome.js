// import React, { useContext, useEffect, useState } from 'react';
// import { json, useNavigate } from 'react-router-dom';
// import "../css/adminhome.css";
// import { AdminContext } from './adminContext';
// import NotificationModal from './NotificationModal';

// export default function Admin() {
//     const navigate = useNavigate();
//     const { admin, setAdmin } = useContext(AdminContext);
//     const [notifications, setNotifications] = useState([]);
//     const [showNotifications, setShowNotifications] = useState(false);
//     const [notificationCount, setNotificationCount] = useState(0);

//     useEffect(() => {
//         if (!admin) {
//             const storedAdmin = localStorage.getItem('admin');
//             if (storedAdmin) {
//                 setAdmin(JSON.parse(storedAdmin));
//             } else {
//                 navigate('/login');
//             }
//         }
//     }, [admin, navigate, setAdmin]);

//     // useEffect(() => {
//     //     const ws = new WebSocket('ws://localhost:8081');
        
//     //     ws.onmessage = (event) => {
//     //         const newAssignment = JSON.parse(event.data);
//     //         const updatedRemark = JSON.parse(event.data);//add ma
//     //         if(newAssignment){
//     //         setNotifications(prev => [...prev, newAssignment]);
//     //         setNotificationCount(prevCount => prevCount + 1);
//     //         }else if(updatedRemark){ //addma
//     //        setNotifications(prev => [...prev, updatedRemark]);
//     //          setNotificationCount(prevCount => prevCount + 1);
//     //         }
//     //     };

//     //     return () => {
//     //         ws.close();
//     //     };
//     // }, []);

//     useEffect(() => {
//         const ws = new WebSocket('ws://localhost:8081');
        
//         ws.onmessage = (event) => {
//             const data = JSON.parse(event.data);
//             if (data.assignment || data.update || data.adevice ||data.cdevice||data.ddevice) {
//                 setNotifications(prev => [data, ...prev]);
//                 setNotificationCount(prevCount => prevCount + 1);
//             }
//         };
    
//         return () => {
//             ws.close();
//         };
//     }, []);
    


//     const handleSubmit = (event) => {
//         event.preventDefault();
//         setAdmin(null);
//         localStorage.removeItem('admin');
//         navigate('/');
//     };

//     const Handleuserlist = (event) =>{
//         event.preventDefault();
//         navigate('/admin');
//     };
//     const Handlechecktest = (event) => {
//         event.preventDefault();
//         navigate('/adminchecktest');
//     };

//     const Handlecheckreport = (event) => {
//         event.preventDefault();
//         navigate('/admincheckreport');
//     };

//     const HandleRecyclebin = (event) =>{
//         event.preventDefault();
//         navigate('/adminrecyclebin');
//     }

//     const HandleCheckstatus = (event) =>{
//         event.preventDefault();
//         navigate('/admincheckstatus')
//     }

//     const toggleNotifications = () => {
//         setShowNotifications(!showNotifications);
//         setNotificationCount(0);  // Reset the notification count when the modal is opened
//     };

//     const closeNotifications = () => {
//         setShowNotifications(false);
//     };

//     if (!admin) {
//         return null;
//     }

//     return (
//         <div className="Home">
//             <div className="adminheader">
//                 <h2>ยินดีต้อนรับคุณ {admin.name}</h2>
//                 <div className="logout">
//                     <button type="button" onClick={toggleNotifications} className="notification-button">
//                         การแจ้งเตือน
//                         {notificationCount > 0 && (
//                             <span className="notification-badge">{notificationCount}</span>
//                         )}
//                     </button>
//                     <button type="button" onClick={handleSubmit}>Log out</button>
//                 </div>
//             </div>
//             <div className="sidebaradmin">
//                 <button type ="button" onClick={Handleuserlist}>เช็คการส่งงาน</button>
//                 <button type="button" onClick={Handlechecktest}>ตรวจผลทดสอบเครื่องวัด</button>
//                 <button type="button" onClick={Handlecheckreport}>ตรวจสอบ/อนุมัติ คำร้อง</button>
//                 <button type="button" onClick={HandleRecyclebin} >คลัง</button>
//                 <button type="button" onClick={HandleCheckstatus}>สถานะการส่ง/แจ้ง</button>
//                 <button type="button">ตรวจสอบ/แก้ไข <br />สถานะผู้ใช้งานทั้งหมด</button>
//             </div>
//             {showNotifications && (
//                 <NotificationModal
//                     notifications={notifications}
//                     onClose={closeNotifications}
//                 />
//             )}
//         </div>
//     );
// }  



// import React, { useContext, useEffect, useState } from 'react';
// import axios from 'axios'; // Add this import statement
// import { useNavigate } from 'react-router-dom';
// import "../css/adminhome.css";
// import { AdminContext } from './adminContext';
// import NotificationModal from './NotificationModal';

// export default function Admin() {
//     const navigate = useNavigate();
//     const { admin, setAdmin } = useContext(AdminContext);
//     const [notifications, setNotifications] = useState([]);
//     const [showNotifications, setShowNotifications] = useState(false);
//     const [notificationCount, setNotificationCount] = useState(0);

//     useEffect(() => {
//         if (!admin) {
//             const storedAdmin = localStorage.getItem('admin');
//             if (storedAdmin) {
//                 setAdmin(JSON.parse(storedAdmin));
//                 fetchNotifications();
//             } else {
//                 navigate('/login');
//             }
//         }
//         setupWebSocket();
//     }, [admin, navigate, setAdmin]);


//     const fetchNotifications = async () => {
//         try {
//             const response = await fetch('http://localhost:8081/notifications');
//             const data = await response.json();
//             setNotifications(data.notifications);
//             setNotificationCount(data.unreadCount);
//         } catch (error) {
//             console.error('Error fetching notifications:', error);
//         }
//     };

//     const setupWebSocket = () => {
//         const ws = new WebSocket('ws://localhost:8081');
        
//         ws.onmessage = (event) => {
//             const data = JSON.parse(event.data);
//             if (data.type === 'unreadCount') {
//                 setNotificationCount(data.count);
//             } else if (data.assignment || data.update || data.adevice || data.cdevice || data.ddevice) {
//                 setNotifications(prev => [data, ...prev]);
//                 setNotificationCount(prevCount => prevCount + 1);
//             }
//         };
    
//         ws.onclose = () => {
//             setTimeout(setupWebSocket, 1000);
//         };
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         setAdmin(null);
//         localStorage.removeItem('admin');
//         localStorage.removeItem('notificationCount');
//         navigate('/');
//     };

//     const Handleuserlist = (event) => {
//         event.preventDefault();
//         navigate('/admin');
//     };

//     const Handlechecktest = (event) => {
//         event.preventDefault();
//         navigate('/adminchecktest');
//     };

//     const Handlecheckreport = (event) => {
//         event.preventDefault();
//         navigate('/admincheckreport');
//     };

//     const HandleRecyclebin = (event) => {
//         event.preventDefault();
//         navigate('/adminrecyclebin');
//     }

//     const HandleCheckstatus = (event) => {
//         event.preventDefault();
//         navigate('/admincheckstatus')
//     }

//     const toggleNotifications = () => {
//         setShowNotifications(!showNotifications);
//         if (!showNotifications) {
//             setNotificationCount(0);
//             localStorage.setItem('notificationCount', 0); // Reset the notification count in localStorage
//             fetchNotifications(); // Fetch notifications to clear them from the server
//         }
//     };

//     const deleteNotification = async (id) => {
//         try {
//           await axios.delete(`http://localhost:8081/notifications/${id}`);
//           setNotifications(notifications.filter(notification => notification.id !== id));
//           setNotificationCount(prevCount => prevCount > 0 ? prevCount - 1 : 0);
//         } catch (error) {
//           console.error('Error deleting notification:', error);
//         }
//       };
    
//       const deleteAllNotifications = async () => {
//         try {
//           await axios.delete('http://localhost:8081/notifications');
//           setNotifications([]);
//           setNotificationCount(0);
//         } catch (error) {
//           console.error('Error deleting all notifications:', error);
//         }
//       };


//     const closeNotifications = () => {
//         setShowNotifications(false);
//     };

//     if (!admin) {
//         return null;
//     }

//     return (
//         <div className="Home">
//             <div className="adminheader">
//                 <h2>ยินดีต้อนรับคุณ {admin.name}</h2>
//                 <div className="logout">
//                     <button type="button" onClick={toggleNotifications} className="notification-button">
//                         การแจ้งเตือน
//                         {notificationCount > 0 && (
//                             <span className="notification-badge">{notificationCount}</span>
//                         )}
//                     </button>
//                     <button type="button" onClick={handleSubmit}>Log out</button>
//                 </div>
//             </div>
//             <div className="sidebaradmin">
//                 <button type ="button" onClick={Handleuserlist}>เช็คการส่งงาน</button>
//                 <button type="button" onClick={Handlechecktest}>ตรวจผลทดสอบเครื่องวัด</button>
//                 <button type="button" onClick={Handlecheckreport}>ตรวจสอบ/อนุมัติ คำร้อง</button>
//                 <button type="button" onClick={HandleRecyclebin} >คลัง</button>
//                 <button type="button" onClick={HandleCheckstatus}>สถานะการส่ง/แจ้ง</button>
//                 <button type="button">ตรวจสอบ/แก้ไข <br />สถานะผู้ใช้งานทั้งหมด</button>
//             </div>
//             {showNotifications && (
//                 <NotificationModal
//                     notifications={notifications}
//                     onClose={closeNotifications}
//                 />
//             )}
//         </div>
//     );
// }
//v2


// import React, { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import "../css/adminhome.css";
// import { AdminContext } from './adminContext';
// import NotificationModal from './NotificationModal';

// export default function Admin() {
//     const navigate = useNavigate();
//     const { admin, setAdmin } = useContext(AdminContext);
//     const [notifications, setNotifications] = useState([]);
//     const [showNotifications, setShowNotifications] = useState(false);
//     const [notificationCount, setNotificationCount] = useState(0);

//     useEffect(() => {
//         if (!admin) {
//             const storedAdmin = localStorage.getItem('admin');
//             if (storedAdmin) {
//                 setAdmin(JSON.parse(storedAdmin));
//                 fetchNotifications();
//             } else {
//                 navigate('/login');
//             }
//         }
//         setupWebSocket();
//     }, [admin, navigate, setAdmin]);

//     const fetchNotifications = async () => {
//         try {
//             const response = await fetch('http://localhost:8081/notifications');
//             const data = await response.json();
//             setNotifications(data.notifications);
//             setNotificationCount(data.unreadCount);
//         } catch (error) {
//             console.error('Error fetching notifications:', error);
//         }
//     };

//     const setupWebSocket = () => {
//         const ws = new WebSocket('ws://localhost:8081');

//         ws.onmessage = (event) => {
//             const data = JSON.parse(event.data);
//             setNotifications(prev => [data, ...prev]);
//             setNotificationCount(data.unreadCount); // Set the correct unread count from the server
//         };

//         ws.onclose = () => {
//             setTimeout(setupWebSocket, 1000);
//         };
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         setAdmin(null);
//         localStorage.removeItem('admin');
//         navigate('/');
//     };

//     const Handleuserlist = (event) => {
//         event.preventDefault();
//         navigate('/admin');
//     };

//     const Handlechecktest = (event) => {
//         event.preventDefault();
//         navigate('/adminchecktest');
//     };

//     const Handlecheckreport = (event) => {
//         event.preventDefault();
//         navigate('/admincheckreport');
//     };

//     const HandleRecyclebin = (event) => {
//         event.preventDefault();
//         navigate('/adminrecyclebin');
//     };

//     const HandleCheckstatus = (event) => {
//         event.preventDefault();
//         navigate('/admincheckstatus');
//     };

//     const toggleNotifications = () => {
//         setShowNotifications(!showNotifications);
//         if (!showNotifications) {
//             setNotificationCount(0);
//             localStorage.setItem('notificationCount', 0);
//             fetchNotifications();
//         }
//     };

//     const deleteNotification = async (id) => {
//         try {
//             await axios.delete(`http://localhost:8081/notifications/${id}`);
//             setNotifications(notifications.filter(notification => notification.id !== id));
//             setNotificationCount(prevCount => prevCount > 0 ? prevCount - 1 : 0);
//         } catch (error) {
//             console.error('Error deleting notification:', error);
//         }
//     };

//     const deleteAllNotifications = async () => {
//         try {
//             await axios.delete('http://localhost:8081/notifications');
//             setNotifications([]);
//             setNotificationCount(0);
//         } catch (error) {
//             console.error('Error deleting all notifications:', error);
//         }
//     };

//     const closeNotifications = () => {
//         setShowNotifications(false);
//     };

//     if (!admin) {
//         return null;
//     }

//     return (
//         <div className="Home">
//             <div className="adminheader">
//                 <h2>ยินดีต้อนรับคุณ {admin.name}</h2>
//                 <div className="logout">
//                     <button type="button" onClick={toggleNotifications} className="notification-button">
//                         การแจ้งเตือน
//                         {notificationCount > 0 && (
//                             <span className="notification-badge">{notificationCount}</span>
//                         )}
//                     </button>
//                     <button type="button" onClick={handleSubmit}>Log out</button>
//                 </div>
//             </div>
//             <div className="sidebaradmin">
//                 <button type ="button" onClick={Handleuserlist}>เช็คการส่งงาน</button>
//                 <button type="button" onClick={Handlechecktest}>ตรวจผลทดสอบเครื่องวัด</button>
//                 <button type="button" onClick={Handlecheckreport}>ตรวจสอบ/อนุมัติ คำร้อง</button>
//                 <button type="button" onClick={HandleRecyclebin} >คลัง</button>
//                 <button type="button" onClick={HandleCheckstatus}>สถานะการส่ง/แจ้ง</button>
//                 <button type="button">ตรวจสอบ/แก้ไข <br />สถานะผู้ใช้งานทั้งหมด</button>
//             </div>
//             {showNotifications && (
//                 <NotificationModal
//                     notifications={notifications}
//                     onClose={closeNotifications}
//                     deleteNotification={deleteNotification}
//                     deleteAllNotifications={deleteAllNotifications}
//                 />
//             )}
//         </div>
//     );
// }

//v3 ใช้ได้จริง






// import React, { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import "../css/adminhome.css";
// import { AdminContext } from './adminContext';
// import NotificationModal from './NotificationModal';

// export default function Admin() {
//     const navigate = useNavigate();
//     const { admin, setAdmin } = useContext(AdminContext);
//     const [notifications, setNotifications] = useState([]);
//     const [showNotifications, setShowNotifications] = useState(false);
//     const [notificationCount, setNotificationCount] = useState(0);

//     useEffect(() => {
//         if (!admin) {
//             const storedAdmin = localStorage.getItem('admin');
//             if (storedAdmin) {
//                 setAdmin(JSON.parse(storedAdmin));
//                 fetchNotifications();
//             } else {
//                 navigate('/login');
//             }
//         } else {
//             const storedCount = parseInt(localStorage.getItem('adminNotificationCount')) || 0;
//             setNotificationCount(storedCount);
//             fetchNotifications();
//         }
//         setupWebSocket();
//     }, [admin, navigate, setAdmin]);

//     const fetchNotifications = async () => {
//         try {
//             const response = await fetch('http://localhost:8081/notifications');
//             const data = await response.json();
//             setNotifications(data.notifications);
//             setNotificationCount(prevCount => {
//                 const totalUnread = prevCount + data.unreadCount;
//                 localStorage.setItem('adminNotificationCount', totalUnread);
//                 return totalUnread;
//             });
//         } catch (error) {
//             console.error('Error fetching notifications:', error);
//         }
//     };

//     const setupWebSocket = () => {
//         const ws = new WebSocket('ws://localhost:8081/admin');

//         ws.onmessage = (event) => {
//             const data = JSON.parse(event.data);
//             setNotifications(prev => [data, ...prev]);
//             setNotificationCount(prevCount => {
//                 const newCount = prevCount + 1;
//                 localStorage.setItem('adminNotificationCount', newCount);
//                 return newCount;
//             });
//         };

//         ws.onclose = () => {
//             setTimeout(setupWebSocket, 1000);
//         };
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         setAdmin(null);
//         localStorage.removeItem('admin');
//         localStorage.removeItem('adminNotificationCount'); // Remove notification count from localStorage on logout
//         navigate('/');
//     };

//     const Handleuserlist = (event) => {
//         event.preventDefault();
//         navigate('/admin');
//     };

//     const Handlechecktest = (event) => {
//         event.preventDefault();
//         navigate('/adminchecktest');
//     };

//     const Handlecheckreport = (event) => {
//         event.preventDefault();
//         navigate('/admincheckreport');
//     };

//     const HandleRecyclebin = (event) => {
//         event.preventDefault();
//         navigate('/adminrecyclebin');
//     };

//     const HandleCheckstatus = (event) => {
//         event.preventDefault();
//         navigate('/admincheckstatus');
//     };

//     const toggleNotifications = () => {
//         setShowNotifications(!showNotifications);
//         if (!showNotifications) {
//             setNotificationCount(0);
//             localStorage.setItem('adminNotificationCount', 0);
//             fetchNotifications();
//             // Reset unread notifications on server
//             axios.post('http://localhost:8081/reset-notifications');
//         }
//     };

//     const deleteNotification = async (id) => {
//         try {
//             await axios.delete(`http://localhost:8081/notifications/${id}`);
//             setNotifications(notifications.filter(notification => notification.id !== id));
//             setNotificationCount(prevCount => {
//                 const newCount = prevCount > 0 ? prevCount - 1 : 0;
//                 localStorage.setItem('adminNotificationCount', newCount);
//                 return newCount;
//             });
//         } catch (error) {
//             console.error('Error deleting notification:', error);
//         }
//     };

//     const deleteAllNotifications = async () => {
//         try {
//             await axios.delete('http://localhost:8081/notifications');
//             setNotifications([]);
//             setNotificationCount(0);
//             localStorage.setItem('adminNotificationCount', 0);
//         } catch (error) {
//             console.error('Error deleting all notifications:', error);
//         }
//     };

//     const closeNotifications = () => {
//         setShowNotifications(false);
//     };

//     if (!admin) {
//         return null;
//     }

//     return (
//         <div className="Home">
//             <div className="adminheader">
//                 <h2>ยินดีต้อนรับคุณ {admin.name}</h2>
//                 <div className="logout">
//                     {/* <button type="button" onClick={toggleNotifications} className="notification-button">
//                         การแจ้งเตือน
//                         {notificationCount > 0 && (
//                             <span className="notification-badge">{notificationCount}</span>
//                         )}
//                     </button> */}
//                     <button type="button" onClick={handleSubmit}>Log out</button>
//                 </div>
//             </div>
//             <div className="sidebaradmin">
//                 <button type="button" onClick={Handleuserlist}>เช็คการส่งงาน</button>
//                 <button type="button" onClick={Handlechecktest}>ตรวจผลทดสอบเครื่องวัด</button>
//                 <button type="button" onClick={Handlecheckreport}>ตรวจสอบ/อนุมัติ คำร้อง</button>
//                 <button type="button" onClick={HandleRecyclebin}>คลัง</button>
//                 <button type="button" onClick={HandleCheckstatus}>สถานะการส่ง/แจ้ง</button>
//                 <button type="button">ตรวจสอบ/แก้ไข <br />สถานะผู้ใช้งานทั้งหมด</button>
//             </div>
//             {showNotifications && (
//                 <NotificationModal
//                     notifications={notifications}
//                     onClose={closeNotifications}
//                     deleteNotification={deleteNotification}
//                     deleteAllNotifications={deleteAllNotifications}
//                 />
//             )}
//         </div>
//     );
// }


import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/adminhome.css";
import { AdminContext } from './adminContext';
import background from '../adminbackground.mp4'

export default function Admin() {
    const navigate = useNavigate();
    const { admin, setAdmin } = useContext(AdminContext);

    useEffect(() => {
        if (!admin) {
            const storedAdmin = localStorage.getItem('admin');
            if (storedAdmin) {
                setAdmin(JSON.parse(storedAdmin));
            } else {
                navigate('/login');
            }
        }
    }, [admin, navigate, setAdmin]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setAdmin(null);
        localStorage.removeItem('admin');
        navigate('/');
    };

    const Handleuserlist = (event) => {
        event.preventDefault();
        navigate('/admin');
    };

    const Handlechecktest = (event) => {
        event.preventDefault();
        navigate('/adminchecktest');
    };

    const Handlecheckreport = (event) => {
        event.preventDefault();
        navigate('/admincheckreport');
    };

    const HandleRecyclebin = (event) => {
        event.preventDefault();
        navigate('/adminrecyclebin');
    };

    const HandleCheckstatus = (event) => {
        event.preventDefault();
        navigate('/admincheckstatus');
    };

    const Handleregister = (event) =>{
        event.preventDefault();
        navigate('/register');
    }

    if (!admin) {
        return null;
    }

    return (
        <div className="Home">
             <video autoPlay loop muted className="video-background">
        <source src={background} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
            <div className="adminheader">
                <h2>ยินดีต้อนรับคุณ {admin.name}</h2>
                <div className="logout">
                    <button type="button" onClick={handleSubmit}>Log out</button>
                </div>
            </div>
            <div className="sidebaradmin">
                <button type="button" onClick={Handleuserlist}>เช็คการส่งงาน</button>
                <button type="button" onClick={Handlechecktest}>ตรวจผลทดสอบเครื่องวัด</button>
                <button type="button" onClick={Handlecheckreport}>ตรวจสอบ/อนุมัติ คำร้อง</button>
                <button type="button" onClick={HandleRecyclebin}>คลัง</button>
                <button type="button" onClick={HandleCheckstatus}>สถานะการส่ง/แจ้ง</button>
                <button type="button" onClick={Handleregister}> <br />สร้างบัญชี user</button>
            </div>
        </div>
    );
}