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


import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/home.css"
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

export default function BeforeLogin() {
  const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior, if any
        navigate('/login');
    };

  const Handleassign = (event) => {
    event.preventDefault();
    navigate('/userassign');
  }

  const handlereport = (event) => {
    event.preventDefault();
    navigate('/userreport');
  }

  console.log('Rendering MyUsers component...');

  return (
    <div>
      <div className="headerbefore">
        <h2>ยินดีต้อนรับคุณ ...</h2>
        <div className="logout">
        <NotificationsNoneIcon className="white-icon" />
          <button type="button" onClick={handleSubmit}>เข้าสู่ระบบ</button>
        </div>
      </div>

      {/* { mainListItems } */}
      <div className="sidebar">
        <button type="button">ส่งผลทดสอบเครื่องวัด</button>
        <button type="button">แจ้งขอเปลี่ยน/เพิ่ม/ลบ เครื่องวัด</button>
        <button type="button">สถานะ/อุปกรณ์ของคุณ</button>
        <button type="button">สถานะการส่ง/แจ้ง</button>
      </div>
    </div>
  );
}
