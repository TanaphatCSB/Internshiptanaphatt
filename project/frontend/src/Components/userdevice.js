// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const UserDevices = ({ id }) => {
//     const [devices, setDevices] = useState([]);
//     const [newDevice, setNewDevice] = useState({ name: '', type: '' });

//     useEffect(() => {
//         fetchUserDevices();
//     }, [id]);

//     const fetchUserDevices = async () => {
//         try {
//             const response = await axios.get(`/api/devices/${id}`);
//             setDevices(response.data);
//         } catch (error) {
//             console.error('Error fetching user devices:', error);
//         }
//     };

//     const handleInputChange = (e) => {
//         setNewDevice({ ...newDevice, [e.target.name]: e.target.value });
//     };

//     const handleAddDevice = async () => {
//         try {
//             await axios.post('/api/devices', { id, ...newDevice });
//             setNewDevice({ name: '', type: '' });
//             fetchUserDevices();
//         } catch (error) {
//             console.error('Error adding device:', error);
//         }
//     };

//     return (
//         <div>
//             <h2>Your Devices</h2>
//             <ul>
//                 {devices.map((device) => (
//                     <li key={device.id}>{device.device_name} ({device.device_type})</li>
//                 ))}
//             </ul>
//             <h3>Add New Device</h3>
//             <input
//                 type="text"
//                 name="name"
//                 value={newDevice.name}
//                 onChange={handleInputChange}
//                 placeholder="Device Name"
//             />
//             <input
//                 type="text"
//                 name="type"
//                 value={newDevice.type}
//                 onChange={handleInputChange}
//                 placeholder="Device Type"
//             />
//             <button onClick={handleAddDevice}>Add Device</button>
//         </div>
//     );
// };

// export default UserDevices;


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import User from './userhome';

export default function UserDevices() {
  const { sticker } = useParams();
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8081/getUserDevicesBySticker/${sticker}`)
      .then(response => {
        setDevices(response.data);
      })
      .catch(error => {
        console.error('Error fetching devices:', error);
      });
  }, [sticker]);

  return (
    <div>
      <User />
      <div className="condiv user-devices">
        <h3>อุปกรณ์ในสติ๊กเกอร์ {sticker}:</h3>
        {devices.length > 0 ? (
          <ul className="listassign">
            {devices.map(device => (
              <li key={device.user_device_id}>
                <a href={`/userassign/${sticker}/${device.device_id}`}>{device.device_name}</a>
              </li>
            ))}
          </ul>
        ) : (
          <p>ไม่มีอุปกรณ์ในสติ๊กเกอร์นี้</p>
        )}
      </div>
    </div>
  );
}