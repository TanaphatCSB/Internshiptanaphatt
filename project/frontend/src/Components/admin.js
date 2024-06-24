// // Admin.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import UserList from './UserList'; // Ensure the path is correct
// import AdminHome from './adminhome'; // Make sure this path is correct
// import "../css/adminhome.css";

// const Admin = () => {
//     const [users, setUsers] = useState([]);
//     const [selectedUser, setSelectedUser] = useState(null);
//     const [userInfo, setUserInfo] = useState(null);

//     useEffect(() => {
//         axios.get('http://localhost:8081/getUsers')
//             .then(response => {
//                 console.log('Users fetched successfully:', response.data);
//                 setUsers(response.data);
//             })
//             .catch(error => {
//                 console.error('There was an error fetching the users!', error);
//             });
//     }, []);

//     const fetchUserInfo = (userId) => {
//         axios.get(`http://localhost:8081/getUserInfo/${userId}`)
//             .then(response => {
//                 console.log('User info fetched successfully:', response.data);
//                 // Sort the userInfo array by sticker value
//                 const sortedData = response.data.sort((a, b) => {
//                     if (a.sticker < b.sticker) return -1;
//                     if (a.sticker > b.sticker) return 1;
//                     return 0;
//                 });
//                 setUserInfo(sortedData);
//             })
//             .catch(error => {
//                 console.error('There was an error fetching the user info!', error);
//             });
//     };

//     useEffect(() => {
//         if (selectedUser) {
//             fetchUserInfo(selectedUser);
//         }
//     }, [selectedUser]);

//     const handleUserClick = (userId) => {
//         console.log('User ID:', userId);
//         setSelectedUser(userId);
//     };

//     return (
//         <div>
//             <AdminHome />
//             <div className="condiv">
//                 <UserList users={users} onUserClick={handleUserClick} />
//                 {selectedUser && userInfo && (
//                     <div>
//                         <h3>User Information</h3>
//                         <table>
//                             <thead>
//                                 <tr>
//                                     <th>Username</th>
//                                     <th>Device ID</th>
//                                     <th>Sticker</th>
//                                     <th>Device Name</th>
//                                     <th>Brand</th>
//                                     <th>Model</th>
//                                     <th>Serial Number</th>
//                                     <th>Round</th>
//                                     <th>Status</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {userInfo.map((info, index) => (
//                                     <tr key={index}>
//                                         <td>{info.username}</td>
//                                         <td>{info.device_id}</td>
//                                         <td>{info.sticker}</td>
//                                         <td>{info.device_name}</td>
//                                         <td>{info.brand}</td>
//                                         <td>{info.model}</td>
//                                         <td>{info.serial_number}</td>
//                                         <td>{info.round}</td>
//                                         <td>{info.status}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Admin;
//ห้ามลบสำคัญมาก



// Admin.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './UserList'; // Ensure the path is correct
import AdminHome from './adminhome'; // Make sure this path is correct
import UserModal from './usermodal'; // Import the modal component
import "../css/adminhome.css"; // Make sure this path is correct
import "../css/modal.css"; // Ensure the path for modal CSS

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userInfo, setUserInfo] = useState([]);
    const [selectedSticker, setSelectedSticker] = useState(null);
    const [stickerDetails, setStickerDetails] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8081/getUsers')
            .then(response => {
                console.log('Users fetched successfully:', response.data);
                setUsers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the users!', error);
            });
    }, []);

    const fetchUserInfo = (userId) => {
        axios.get(`http://localhost:8081/getUserInfo/${userId}`)
            .then(response => {
                console.log('User info fetched successfully:', response.data);
                const sortedData = response.data.sort((a, b) => {
                    if (a.sticker < b.sticker) return -1;
                    if (a.sticker > b.sticker) return 1;
                    return 0;
                });
                setUserInfo(sortedData);
                setModalContent(
                    <div className="ggg">
                        <h3>User Information</h3>
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Username</th>
                                        <th>Sticker</th>
                                        <th>Device Name</th>
                                        <th>Brand</th>
                                        <th>Model</th>
                                        <th>Serial Number</th>
                                        <th>Round</th>
                                        <th>Status</th>
                                        <th>Test_status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {response.data.map((info, index) => (
                                       <tr 
                                       key={index} 
                                       onClick={() => handleStickerClick(info.sticker)}
                                       className={
                                           info.status === 'ส่งแล้ว' 
                                           ? (info.teststatus === 'ผ่าน' ? 'green-row' : info.teststatus === 'ไม่ผ่าน' ? 'red-row' : '')
                                           : ''
                                       }
                                   >
                                            <td>{info.username}</td>
                                            <td>{info.sticker}</td>
                                            <td>{info.device_name}</td>
                                            <td>{info.brand}</td>
                                            <td>{info.model}</td>
                                            <td>{info.serial_number}</td>
                                            <td>{info.round}</td>
                                            <td>{info.status}</td>
                                            <td>{info.teststatus}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
                setModalIsOpen(true);
            })
            .catch(error => {
                console.error('There was an error fetching the user info!', error);
            });
    };

    const fetchStickerDetails = (sticker) => {
        axios.get(`http://localhost:8081/getStickerDetails/${sticker}`)
            .then(response => {
                console.log('Sticker details fetched successfully:', response.data);
                setStickerDetails(response.data);
                setModalContent(
                    <div>
                        <h3>Sticker Details</h3>
                        <p>Sticker: {response.data.sticker}</p>
                        <p>Device ID: {response.data.device_id}</p>
                        <p>Device Name: {response.data.device_name}</p>
                        <p>Brand: {response.data.brand}</p>
                        <p>Model: {response.data.model}</p>
                        <p>Serial Number: {response.data.serial_number}</p>
                        <p>Round: {response.data.round}</p>
                        <p>Status: {response.data.status}</p>
                    </div>
                );
                setModalIsOpen(true);
            })
            .catch(error => {
                console.error('There was an error fetching the sticker details!', error);
            });
    };

    useEffect(() => {
        if (selectedUser) {
            fetchUserInfo(selectedUser);
        }
    }, [selectedUser]);

    useEffect(() => {
        if (selectedSticker) {
            fetchStickerDetails(selectedSticker);
        }
    }, [selectedSticker]);

    const handleUserClick = (userId) => {
        console.log('User ID:', userId);
        setSelectedUser(userId);
        setSelectedSticker(null); // Reset the sticker selection when a new user is selected
        setStickerDetails(null); // Reset the sticker details
    };

    const handleStickerClick = (sticker) => {
        console.log('Sticker:', sticker);
        setSelectedSticker(sticker);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setModalContent(null);
    };

    return (
        <div>
            <AdminHome />
            <div className="condiv">
                <UserList users={users} onUserClick={handleUserClick} />
            </div>
            <UserModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                content={modalContent}
            />
        </div>
    );
};

export default Admin;
