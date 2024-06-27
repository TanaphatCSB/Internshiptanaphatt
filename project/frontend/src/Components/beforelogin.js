// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function BeforeLogin() {
//     const navigate = useNavigate();

//     const handleSubmit = (event) => {
//         event.preventDefault(); // Prevent default form submission behavior, if any
//         navigate('/login');
//     };

//     return (
//         <div>
//             <button type="button" onClick={handleSubmit}>เข้าสู่ระบบ</button>
//         </div>
//     );
// }

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/home.css"
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import background from '../background.mp4';

export default function BeforeLogin() {
  const navigate = useNavigate();
  const [sidebarActive, setSidebarActive] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior, if any
    navigate('/login');
  };

  const Handleassign = (event) => {
    event.preventDefault();
    navigate('/userassign');
  };

  const handlereport = (event) => {
    event.preventDefault();
    navigate('/userreport');
  };

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  console.log('Rendering MyUsers component...');

  return (
    <div>
       <video autoPlay loop muted className="video-background">
        <source src={background} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="headerbefore">
        <button className="toggle-sidebar" onClick={toggleSidebar}>☰</button>
        <h2>ยินดีต้อนรับคุณ ...</h2>
        <div className="logout">
          <button type="button" onClick={handleSubmit}>เข้าสู่ระบบ</button>
        </div>
        
      </div>
      

      <div className={`sidebar ${sidebarActive ? 'active' : ''}`}>
        <button type="button" onClick={Handleassign}>ส่งผลทดสอบเครื่องวัด</button><br />
        <button type="button" onClick={handlereport}>แจ้งขอเปลี่ยน/เพิ่ม/ลบ เครื่องวัด</button><br />
        <button type="button">สถานะ/อุปกรณ์ของคุณ</button><br />
        <button type="button">สถานะการส่ง/แจ้ง</button>
      </div>
    
    </div>
    
  );
}
