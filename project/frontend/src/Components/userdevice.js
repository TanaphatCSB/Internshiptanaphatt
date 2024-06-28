
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import User from './userhome';

// export default function UserDevices() {
//   const { sticker } = useParams();
//   const [devices, setDevices] = useState([]);

//   useEffect(() => {
//     // const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8081';
   
    
//     // console.log('Fetching devices for sticker:', sticker);
//     // axios.get(`${apiUrl}/getUserDevicesBySticker/${sticker}`)
    
   
//     axios.get(`http://localhost:8081/getUserDevicesBySticker/${sticker}`)
//       .then(response => {
//         setDevices(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching devices:', error);
//       });
//   }, [sticker]);

//   return (
//     <div>
//       <User />
//       <div className="condiv user-devices">
//         <h3>อุปกรณ์ในสติ๊กเกอร์ {sticker}:</h3>
//         {devices.length > 0 ? (
//           <ul className="listassign">
//             {devices.map(device => (
//               <li key={device.user_device_id}>
//                 <a href={`/userassign/${sticker}/${device.device_id}`}>{device.device_name}</a>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>ไม่มีอุปกรณ์ในสติ๊กเกอร์นี้ </p>
//         )}
//       </div>
//     </div>
//   );
// }



import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import User from './userhome';
import { UserContext } from './userContext';

export default function UserDevices() {
  const { sticker } = useParams();
  const [devices, setDevices] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      if (!user) {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          fetchDevices(parsedUser.userid);
        } else {
          navigate('/login');
        }
      } else {
        fetchDevices(user.userid);
      }
    };

    checkUser();
  }, [user, setUser, sticker, navigate]);

  const fetchDevices = (userId) => {
    if (userId && sticker) {
      // axios.get(`http://localhost:8081/getUserDevicesBySticker/${userId}/${sticker}`)
      axios.get(`${process.env.REACT_APP_API_URL}/getUserDevicesBySticker/${userId}/${sticker}`)
        .then(response => {
          setDevices(response.data);
        })
        .catch(error => {
          console.error('Error fetching devices:', error);
        });
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <User />
      <div className="condiv user-devices">
        <h3>อุปกรณ์ในสติ๊กเกอร์ {sticker} สำหรับผู้ใช้ {user.userid}</h3>
        {devices.length > 0 ? (
          <ul className="listassign">
            {devices.map(device => (
              <li key={device.user_device_id}>
                <a href={`/userassign/${sticker}/${device.device_id}`}>{device.device_name}</a>
              </li>
            ))}
          </ul>
        ) : (
          <p>ไม่มีอุปกรณ์ในสติ๊กเกอร์นี้ </p>
        )}
      </div>
    </div>
  );
}

// import React, { useContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import "../css/home.css";
// import axios from 'axios';
// import User from './userhome';
// import { UserContext } from './userContext';

// export default function MyUsers() {
//   const navigate = useNavigate();
//   const { user, setUser } = useContext(UserContext);
//   const [userStickers, setUserStickers] = useState([]);
//   const apiUrl = process.env.REACT_APP_API_URL;

//   useEffect(() => {
//     if (user) {
//       axios.get(`${apiUrl}/getUserStickers/${user.userid}`)
//         .then(response => {
//           setUserStickers(response.data);
//         })
//         .catch(error => {
//           console.error('Error fetching user stickers:', error);
//         });
//     }
//   }, [user, apiUrl]);

//   useEffect(() => {
//     if (!user) {
//       const storedUser = localStorage.getItem('user');
//       if (storedUser) {
//         setUser(JSON.parse(storedUser));
//       } else {
//         navigate('/login');
//       }
//     }
//   }, [user, navigate, setUser]);

//   if (!user) {
//     return null;
//   }

//   // Filter out duplicate stickers
//   const uniqueUserStickers = [...new Set(userStickers.map(sticker => sticker.sticker))];

//   return (
//     <div>
//       <User />
//       <div className="condiv user-stickers">
//         <h3>สติ๊กเกอร์ของคุณ:</h3>
//         {uniqueUserStickers.length > 0 ? (
//           <ul className="listassign">
//             {uniqueUserStickers.map(sticker => (
//               <li key={sticker}>
//                 <a href={`/userdevices/${sticker}`}>{sticker}</a>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>คุณยังไม่มีสติ๊กเกอร์</p>
//         )}
//       </div>
//     </div>
//   );
// }
