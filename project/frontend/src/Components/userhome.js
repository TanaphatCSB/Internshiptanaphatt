
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/home.css";
import { UserContext } from './userContext';
import background from '../background.mp4';

export default function MyUsers() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [sidebarActive, setSidebarActive] = useState(false);

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

  const handleinformation = (event) => {
    event.preventDefault();
    navigate('/userinformation');
  };

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

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
        <button className="toggle-sidebar" onClick={toggleSidebar}>☰</button>
        <h2>ยินดีต้อนรับคุณ {user.name}</h2>
        <div className="logout">
          <button type="button" onClick={handleSubmit}>Log out</button>
        </div>
      </div>
      <div className={`sidebar ${sidebarActive ? 'active' : ''}`}>
        <button type="button" onClick={Handleassign}>อุปกรณ์ของคุณ</button><br />
        <button type="button" onClick={handlereport}>แจ้งขอเปลี่ยน/เพิ่ม/ลบ เครื่องวัด</button><br />
        <button type="button" onClick={handleinformation}>สถานะของคุณ</button><br />
        <button type="button" onClick={handlesendstatus}>สถานะการส่ง/แจ้ง</button>
      </div>
    </div>
  );
}
