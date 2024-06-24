// import React, { useContext } from 'react';
// import User from './user';
// import "../css/home.css"
// import { useNavigate } from 'react-router-dom';
// import { UserContext } from './userContext';


// export default function Userassign() {
//   const navigate = useNavigate();
//   const { user } = useContext(UserContext);

//   const handleSubmit = (event) => {
  
//     event.preventDefault();
//     navigate('/usersubmit');
//   }

//   const handleSubmit2 = (event) => {
  
//     event.preventDefault();
//     navigate('/usersubmit2');
//   }
  
//   const handleSubmit3 = (event) => {
  
//     event.preventDefault();
//     navigate('/usersubmit3');
//   }
  
  
//   if (!user) {
//     return <div>Please log in to access this page.</div>;
//   }
//   return (
//     <div>
//         <User/>
//         <div class ="condiv">
//             <h1>ส่งผลทดสอบเครื่องวัด</h1>
//               <ul>
//                 <li>
//                  ส่งผลตรวจเครื่องวัด<br/>
//               <p>รอบที่2</p>
//               <button type ="submit" onClick={handleSubmit}>คลิ๊กเพื่อดูรายละเอียด</button>
//               </li>

//               <li>
//                  ส่งผลตรวจเครื่องวัด<br/>
//               <p>รอบที่3</p>
//               <button type ="submit" onClick={handleSubmit2}>คลิ๊กเพื่อดูรายละเอียด</button>
//               </li>

//               <li>
//                  ส่งผลตรวจเครื่องวัด<br/>
//               <p>รอบที่4</p>
//               <button type ="submit" onClick={handleSubmit3}>คลิ๊กเพื่อดูรายละเอียด</button>
//               </li>
              
//               </ul>
//             </div>
//     </div>
//   );
// }

import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../css/home.css"
import { UserContext } from './userContext';
import User from './userhome';
import axios from 'axios';


export default function Userassign() {
    const { deviceId ,sticker} = useParams();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8081/getDeviceSchedules/${deviceId}`)
            .then(response => {
                setSchedules(response.data);
            })
            .catch(error => {
                console.error('Error fetching device schedules:', error);
            });
    }, [deviceId]);

    // ...

    return (
        <div>
            {/* ... */}
            <User/>
            <div className="condiv">
                <h1>ตารางการตรวจสอบอุปกรณ์</h1>
                {schedules.length > 0 ? (
                    <ul className='listassign'>
                        {schedules.map(schedule => (
                            <li key={schedule.id}>
                                ส่งผลตรวจ {schedule.device_name} <br/>
                                <p>รอบที่ {schedule.round}</p>
                                <p>วันที่ครบกำหนด: {schedule.due_date}</p>
                                <button type="submit" onClick={() => navigate(`/usersubmit/${sticker}/${deviceId}/${schedule.id}`)}>
    คลิ๊กเพื่อดูรายละเอียด
</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>ไม่มีกำหนดการตรวจสอบ</p>
                )}
            </div>
        </div>
    );
}
