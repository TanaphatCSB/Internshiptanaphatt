// // Admin.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import UserList from './UserList'; // Ensure the path is correct
// import AdminHome from './adminhome'; // Make sure this path is correct
// import UserModal from './usermodal'; // Import the modal component
// import "../css/adminhome.css"; // Make sure this path is correct
// import "../css/modal.css"; // Ensure the path for modal CSS

// const Admin = () => {
//     const [users, setUsers] = useState([]);
//     const [selectedUser, setSelectedUser] = useState(null);
//     const [userInfo, setUserInfo] = useState([]);
//     const [selectedSticker, setSelectedSticker] = useState(null);
//     const [stickerDetails, setStickerDetails] = useState(null);
//     const [modalIsOpen, setModalIsOpen] = useState(false);
//     const [modalContent, setModalContent] = useState(null);

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
//                 const sortedData = response.data.sort((a, b) => {
//                     if (a.sticker < b.sticker) return -1;
//                     if (a.sticker > b.sticker) return 1;
//                     return 0;
//                 });
//                 setUserInfo(sortedData);
//                 setModalContent(
//                     <div className="ggg">
//                         <h3>User Information</h3>
//                         <div className="table-container">
//                             <table>
//                                 <thead>
//                                     <tr>
//                                         <th>Username</th>
//                                         <th>Sticker</th>
//                                         <th>Device Name</th>
//                                         <th>Brand</th>
//                                         <th>Model</th>
//                                         <th>Serial Number</th>
//                                         <th>Round</th>
//                                         <th>Status</th>
//                                         <th>Test_status</th>
//                                         <th>วันครบกำหนด</th>
//                                         <th>วันที่ส่ง</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {response.data.map((info, index) => (
//                                        <tr 
//                                        key={index} 
//                                        onClick={() => handleStickerClick(info.sticker)}
//                                        className={
//                                            info.status === 'ส่งแล้ว' 
//                                            ? (info.teststatus === 'ผ่าน' ? 'green-row' : info.teststatus === 'ไม่ผ่าน' ? 'red-row' : '')
//                                            : ''
//                                        }
//                                    >
//                                             <td>{info.username}</td>
//                                             <td>{info.sticker}</td>
//                                             <td>{info.device_name}</td>
//                                             <td>{info.brand}</td>
//                                             <td>{info.model}</td>
//                                             <td>{info.serial_number}</td>
//                                             <td>{info.round}</td>
//                                             <td>{info.status}</td>
//                                             <td>{info.teststatus}</td>
//                                             <td>{info.due_date}</td>
//                                             <td>{info.submission_date}</td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 );
//                 setModalIsOpen(true);
//             })
//             .catch(error => {
//                 console.error('There was an error fetching the user info!', error);
//             });
//     };

//     const fetchStickerDetails = (sticker) => {
//         axios.get(`http://localhost:8081/getStickerDetails/${sticker}/`)
//             .then(response => {
//                 console.log('Sticker details fetched successfully:', response.data);
//                 setStickerDetails(response.data);
//                 setModalContent(
//                     <div>
//                         <h3>Sticker Details</h3>
//                         <p>Sticker: {response.data.sticker}</p>
//                         <p>Device ID: {response.data.device_id}</p>
//                         <p>Device Name: {response.data.device_name}</p>
//                         <p>Brand: {response.data.brand}</p>
//                         <p>Model: {response.data.model}</p>
//                         <p>Serial Number: {response.data.serial_number}</p>
//                         <p>Round: {response.data.round}</p>
//                         <p>Status: {response.data.status}</p>
//                     </div>
//                 );
//                 setModalIsOpen(true);
//             })
//             .catch(error => {
//                 console.error('There was an error fetching the sticker details!', error);
//             });
//     };

//     useEffect(() => {
//         if (selectedUser) {
//             fetchUserInfo(selectedUser);
//         }
//     }, [selectedUser]);

//     useEffect(() => {
//         if (selectedSticker) {
//             fetchStickerDetails(selectedSticker);
//         }
//     }, [selectedSticker]);

//     const handleUserClick = (userId) => {
//         console.log('User ID:', userId);
//         setSelectedUser(userId);
//         setSelectedSticker(null); // Reset the sticker selection when a new user is selected
//         setStickerDetails(null); // Reset the sticker details
//     };

//     const handleStickerClick = (sticker) => {
//         console.log('Sticker:', sticker);
//         setSelectedSticker(sticker);
//     };

//     const closeModal = () => {
//         setModalIsOpen(false);
//         setModalContent(null);
//     };

//     return (
//         <div>
//             <AdminHome />
//             <div className="condiv">
//                 <UserList users={users} onUserClick={handleUserClick} />
//             </div>
//             <UserModal
//                 isOpen={modalIsOpen}
//                 onRequestClose={closeModal}
//                 content={modalContent}
//             />
//         </div>
//     );
// };

// export default Admin;

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
        // axios.get('http://localhost:8081/getUsers')
        axios.get(`${process.env.REACT_APP_API_URL}/getUsers`)
            .then(response => {
                console.log('Users fetched successfully:', response.data);
                setUsers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the users!', error);
            });
    }, []);

    const fetchUserInfo = (userId) => {
        // axios.get(`http://localhost:8081/getUserDevicesByStickerAdmin/${userId}`)
        axios.get(`${process.env.REACT_APP_API_URL}/getUserDevicesByStickerAdmin/${userId}`)
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
                                        <th>Sticker</th>
                                        <th>Device Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {response.data.map((info, index) => (
                                        <tr 
                                            key={index} 
                                            onClick={() => handleStickerClick(userId,info.sticker, info.device_id)}
                                            className={
                                                info.status === 'ส่งแล้ว' 
                                                ? (info.teststatus === 'ผ่าน' ? 'green-row' : info.teststatus === 'ไม่ผ่าน' ? 'red-row' : '')
                                                : ''
                                            }
                                        >
                                            <td>{info.sticker}</td>
                                            <td>{info.device_name}</td>
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
    const fetchStickerDetails = (userId, sticker, deviceId) => {
        console.log('Fetching details for:', userId, sticker, deviceId); // Add console log for debugging
        // axios.get(`http://localhost:8081/getStickerDetails/${userId}/${sticker}/${deviceId}`)
        axios.get(`${process.env.REACT_APP_API_URL}/getStickerDetails/${userId}/${sticker}/${deviceId}`)
            .then(response => {
                console.log('Sticker details fetched successfully:', response.data);
                setStickerDetails(response.data);
                setModalContent(
                    <div>
                       
                        <h3>Device Information</h3>
                        <table>
                            <tbody>
                               
                                <tr><td>Sticker</td><td>{response.data[0].sticker}</td></tr>
                                <tr><td>Username</td><td>{response.data[0].username} {response.data[0].surname}</td></tr>
                                <tr><td>คุรภัณฑ์</td><td>{response.data[0].durable}</td></tr>
                                <tr><td>อุปกรณ์</td><td>{response.data[0].device_name}</td></tr>
                                <tr><td>ยี่ห้อ</td><td>{response.data[0].brand}</td></tr>
                                <tr><td>รุ่น</td><td>{response.data[0].model}</td></tr>
                                <tr><td>Serial Number</td><td>{response.data[0].serial_number}</td></tr>
                            </tbody>
                        </table>

                        <h3>Sticker Details</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Round</th>
                                    <th>Status</th>
                                    <th>Test Status</th>
                                    <th>Test_report</th>
                                    <th>Due Date</th>
                                    <th>Submission Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {response.data.map((detail, index) => (
                                    <tr key={index}>
                                        <td>{detail.round}</td>
                                        <td>{detail.status}</td>
                                        <td>{detail.teststatus}</td>
                                        <td>{detail.test_report}</td>
                                        <td>{new Date(detail.due_date).toLocaleDateString()}</td>
                                        <td>{detail.submission_date ? new Date(detail.submission_date).toLocaleDateString() : 'N/A'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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

    const handleUserClick = (userId) => {
        console.log('User ID:', userId);
        setSelectedUser(userId);
        setSelectedSticker(null); // Reset the sticker selection when a new user is selected
        setStickerDetails(null); // Reset the sticker details
    };

    const handleStickerClick = (userId, sticker, deviceId) => {
        console.log('Sticker:', sticker, 'User ID:', userId, 'Device ID:', deviceId);
        setSelectedSticker(sticker);
        fetchStickerDetails(userId, sticker, deviceId); // Use userId here
    };
    const handleUsernameClick = (username) => {
        // Add logic to fetch and display stickers for the user
        const user = users.find(user => user.username === username);
        if (user) {
            fetchUserInfo(user.user_id);
        }
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setModalContent(null);
    };

    return (
        <div>
            <AdminHome />
            <div className="condiv">
                <UserList 
                    users={users} 
                    onUserClick={handleUserClick} 
                    userInfo={userInfo} 
                    onUsernameClick={handleUsernameClick} 
                />
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
