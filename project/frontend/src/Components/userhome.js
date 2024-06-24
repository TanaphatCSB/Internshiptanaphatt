// import React, { useContext, useEffect,useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import "../css/home.css";
// import axios from 'axios';
// import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
// import { UserContext } from './userContext';
// import background from '../background.mp4';
// import NotificationModal from './NotificationModaluser';
// import { previousDay } from 'date-fns';

// export default function MyUsers() {
//   const navigate = useNavigate();
//   const { user, setUser } = useContext(UserContext);
//   const [notifications, setNotifications] = useState([]);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [notificationCount, setNotificationCount] = useState(0);


//     useEffect(() => {
//     if (!user) {
//       const storedUser = localStorage.getItem('user');
//       if (storedUser) {
//         setUser(JSON.parse(storedUser));
//       } else {
//         navigate('/login');
//       }
//     }
//   }, [user, navigate, setUser]);


//   useEffect(()=>{
//     const ws = new WebSocket('ws://localhost:8081');
        
//         ws.onmessage = (event) => {
//             const data = JSON.parse(event.data);
//             // if (data.assignment || data.update || data.adevice ||data.cdevice||data.ddevice) {
//             //     setNotifications(prev => [data, ...prev]);
//             //     setNotificationCount(prevCount => prevCount + 1);
//             // }
//             if(data.acceptadevice || data.changedevice ||data.deletedevice|| data.acceptsubmit ||data.acceptupdate || data.rejectsubmit ||data.repair ||data.rejectaddchange){
//                  setNotifications(prev => [data, ...prev]);
//                 setNotificationCount(prevCount => prevCount + 1);
//             }
//         };
    
//         return () => {
//             ws.close();
//         };
//     }, []);


//   const handleSubmit = (event) => {
//     event.preventDefault();
//     setUser(null);
//     localStorage.removeItem('user');
//     navigate('/');
//   };

//   const Handleassign = (event) => {
//     event.preventDefault();
//     navigate('/user');
//   };

//   const handlereport = (event) => {
//     event.preventDefault();
//     navigate('/userreport');
//   };

//   const handlesendstatus = (event) =>{
//     event.preventDefault();
//     navigate('/usersendstatus');
//   }

//   const toggleNotifications = () => {
//     setShowNotifications(!showNotifications);
//     setNotificationCount(0);  // Reset the notification count when the modal is opened
// };

// const closeNotifications = () => {
//     setShowNotifications(false);
// };

//   if (!user) {
//     return null;
//   }

//   return (
//     <div className="Home">
//       <video autoPlay loop muted className="video-background">
//         <source src={background} type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>
//       <div className="userheader">
//         <h2>ยินดีต้อนรับคุณ {user.name}</h2>
//         <div className="logout">
//         <button type="button" onClick={toggleNotifications} className="notification-button">
//                         การแจ้งเตือน
//                         {notificationCount > 0 && (
//                             <span className="notification-badge">{notificationCount}</span>
//                         )}
//                     </button>
//           <button type="button" onClick={handleSubmit}>Log out</button>
//         </div>
//       </div>
//       <div className="sidebar">
//         <button type="button" onClick={Handleassign}>อุปกรณ์ของคุณ</button><br />
//         <button type="button" onClick={handlereport}>แจ้งขอเปลี่ยน/เพิ่ม/ลบ เครื่องวัด</button><br />
//         <button type="button">สถานะของคุณ</button><br />
//         <button type="button" onClick={handlesendstatus}>สถานะการส่ง/แจ้ง</button>
//       </div>
      
//       {showNotifications && (
//                 <NotificationModal
//                     notifications={notifications}
//                     onClose={closeNotifications}
//                 />
//             )}

     
//     </div>
//   );
// }







// import React, { useContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import "../css/home.css";
// import axios from 'axios';
// import { UserContext } from './userContext';
// import background from '../background.mp4';
// import NotificationModal from './NotificationModaluser';

// export default function MyUsers() {
//   const navigate = useNavigate();
//   const { user, setUser } = useContext(UserContext);
//   const [notifications, setNotifications] = useState([]);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [notificationCount, setNotificationCount] = useState(0);

//   useEffect(() => {
//     if (!user) {
//       const storedUser = localStorage.getItem('user');
//       if (storedUser) {
//         setUser(JSON.parse(storedUser));
//       } else {
//         navigate('/login');
//       }
//     } else {
//       const storedCount = parseInt(localStorage.getItem('userNotificationCount')) || 0;
//       setNotificationCount(storedCount);
//       fetchNotifications();
//     }
//     setupWebSocket();
//   }, [user, navigate, setUser]);

//   const fetchNotifications = async () => {
//     try {
//       const response = await fetch('http://localhost:8081/notificationsv2');
//       const data = await response.json();
//       setNotifications(data.notificationv2);
//       setNotificationCount(prevCount => {
//         const totalUnread = prevCount + data.unreadCountv2;
//         localStorage.setItem('userNotificationCount', totalUnread);
//         return totalUnread;
//       });
//     } catch (error) {
//       console.error('Error fetching notifications:', error);
//     }
//   };

//   const setupWebSocket = () => {
//     const ws = new WebSocket('ws://localhost:8081/user');

//     ws.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       setNotifications(prev => [data, ...prev]);
//       setNotificationCount(prevCount => {
//         const newCount = prevCount + 1;
//         localStorage.setItem('userNotificationCount', newCount);
//         return newCount;
//       });
//     };

//     ws.onclose = () => {
//       setTimeout(setupWebSocket, 1000);
//     };
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     setUser(null);
//     localStorage.removeItem('user');
//     localStorage.removeItem('userNotificationCount'); // Remove notification count from localStorage on logout
//     navigate('/');
//   };

//   const Handleassign = (event) => {
//     event.preventDefault();
//     navigate('/user');
//   };

//   const handlereport = (event) => {
//     event.preventDefault();
//     navigate('/userreport');
//   };

//   const handlesendstatus = (event) => {
//     event.preventDefault();
//     navigate('/usersendstatus');
//   };

//   const toggleNotifications = () => {
//     setShowNotifications(!showNotifications);
//     if (!showNotifications) {
//       setNotificationCount(0);
//       localStorage.setItem('userNotificationCount', 0);
//       fetchNotifications();
//       // Reset unread notifications on server
//       axios.post('http://localhost:8081/reset-notificationsv2');
//     }
//   };

//   const closeNotifications = () => {
//     setShowNotifications(false);
//   };

//   if (!user) {
//     return null;
//   }

//   return (
//     <div className="Home">
//       <video autoPlay loop muted className="video-background">
//         <source src={background} type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>
//       <div className="userheader">
//         <h2>ยินดีต้อนรับคุณ {user.name}</h2>
//         <div className="logout">
//           {/* <button type="button" onClick={toggleNotifications} className="notification-button">
//             การแจ้งเตือน
//             {notificationCount > 0 && (
//               <span className="notification-badge">{notificationCount}</span>
//             )}
//           </button> */}
//           <button type="button" onClick={handleSubmit}>Log out</button>
//         </div>
//       </div>
//       <div className="sidebar">
//         <button type="button" onClick={Handleassign}>อุปกรณ์ของคุณ</button><br />
//         <button type="button" onClick={handlereport}>แจ้งขอเปลี่ยน/เพิ่ม/ลบ เครื่องวัด</button><br />
//         <button type="button">สถานะของคุณ</button><br />
//         <button type="button" onClick={handlesendstatus}>สถานะการส่ง/แจ้ง</button>
//       </div>
//       {showNotifications && (
//         <NotificationModal
//           notifications={notifications}
//           onClose={closeNotifications}
//         />
//       )}
//     </div>
//   );
// }

import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/home.css";
import { UserContext } from './userContext';
import background from '../background.mp4';

export default function MyUsers() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        navigate('/login');
      }
    }
  }, [user, navigate, setUser]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  const Handleassign = (event) => {
    event.preventDefault();
    navigate('/user');
  };

  const handlereport = (event) => {
    event.preventDefault();
    navigate('/userreport');
  };

  const handlesendstatus = (event) => {
    event.preventDefault();
    navigate('/usersendstatus');
  };

  const handleinformation = (event) =>{
    event.preventDefault();
    navigate('/userinformation');
  }
  if (!user) {
    return null;
  }

  return (
    <div className="Home">
      <video autoPlay loop muted className="video-background">
        <source src={background} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="userheader">
        <h2>ยินดีต้อนรับคุณ {user.name}</h2>
        <div className="logout">
          <button type="button" onClick={handleSubmit}>Log out</button>
        </div>
      </div>
      <div className="sidebar">
        <button type="button" onClick={Handleassign}>อุปกรณ์ของคุณ</button><br />
        <button type="button" onClick={handlereport}>แจ้งขอเปลี่ยน/เพิ่ม/ลบ เครื่องวัด</button><br />
        <button type="button" onClick={handleinformation}>สถานะของคุณ</button><br />
        <button type="button" onClick={handlesendstatus}>สถานะการส่ง/แจ้ง</button>
      </div>
    </div>
  );
}