import React from 'react';
import { BrowserRouter as  Router, Routes, Route } from 'react-router-dom';
import Beforelogin from "./Components/beforelogin";
import Register from "./Components/register";
import Login from "./Components/login";
import Admin from "./Components/admin";
import MyUsers from './Components/user'; // Adjust the path if necessary
import Userassign from './Components/userassign';
import Userreport from './Components/userreport';
import Userstatus from './Components/usersendstatus';
import Submit from './Components/usersubmit';
import Submit2 from './Components/usersubmit2'
import Submit3 from './Components/usersubmit3';
import Checktest from './Components/adminchecktest';
import Checkreport from './Components/admincheckreport';
import AdminRecycleBin from './Components/adminrecyclebin';
import Acheckstatus from './Components/admincheckstatus';
import UserDevices from './Components/userdevice';
import Uhome from './Components/userhome';
import Ulist from './Components/UserList';
import Ahome from './Components/adminhome';
import Uinformation from './Components/userinformation';
import { useNotificationContext } from './Components/notificationContext'
export default function App() {
  const { highlightedDetails, setHighlightedDetails } = useNotificationContext();
  
  return (
      <Routes>
        <Route path="/" element={<Beforelogin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/user" element={<MyUsers />} />
        <Route path="/userhome" element={<Uhome />} />
        {/* <Route path="/uDevices" element={<UserDevices/>} /> */}
        <Route path="/userdevices/:sticker" element={<UserDevices />} />
        <Route path="/userassign"  element={<Userassign />} />
        <Route path="/userreport" element={<Userreport/>} />
        <Route path="/usersubmit" element={<Submit/>} />
        <Route path="/usersubmit2" element={<Submit2/>} />
        <Route path="/usersubmit3" element={<Submit3/>} />
        <Route path="/usersendstatus" element={<Userstatus/>}/>
        <Route path="/adminchecktest" element={<Checktest/>} />
        <Route path="/admincheckreport" element={<Checkreport/>} /> 
        <Route path="/adminrecyclebin" element={<AdminRecycleBin/>} />
        <Route path="/userassign/:sticker/:deviceId" element={<Userassign />} />
        {/* <Route path="/usersubmit/:deviceId/:scheduleId" element={<Submit />} /> */}
        <Route path="/usersubmit/:sticker/:deviceId/:scheduleId/" element={<Submit />} />
        <Route path="admincheckstatus" element={<Acheckstatus/>} />
        <Route path="/Userlist" element={<Ulist/>}/>
        <Route path="/adminhome" element={<Ahome/>}/>
        <Route path="/userinformation" element={<Uinformation/>}/>.
      </Routes>
  );
}
