// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Homeadmin from './adminhome';

// export default function Admincheckstatus() {
//     const [actionLog, setActionLog] = useState([]);
//     const [actionLog2, setActionLog2] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [action, setAction] = useState("historyapprovetest");

//     useEffect(() => {
//         fetchActionLog();
//         fetchActionLog2();
//     }, []);

//     const fetchActionLog = async () => {
//         try {
//             const response = await axios.get('http://localhost:8081/getActionLog');
//             setActionLog(response.data);
//         } catch (error) {
//             console.error('Error fetching action Log', error);
//         }
//     };

//     const fetchActionLog2 = async () => {
//         try {
//             const response = await axios.get('http://localhost:8081/getActionLog2');
//             setActionLog2(response.data);
//         } catch (error) {
//             console.error('Error fetching action Log', error);
//         }
//     };

//     const handleSearch = (log) => {
//         const lowerCaseSearchTerm = searchTerm.toLowerCase();
//         return Object.values(log).some(value =>
//             String(value).toLowerCase().includes(lowerCaseSearchTerm)
//         );
//     };

//     return (
//         <div>
//             <Homeadmin />

//             <div className='report check'>
//                 <select id="action" value={action} onChange={e => setAction(e.target.value)}>
//                     <option value="historyapprovetest">ประวัติการอนุมัติผลตรวจ</option>
//                     <option value="checkDeviceRequest">ประวัติการอนุมัติการเพิ่ม/เปลี่ยน อุปกรณ์</option>
//                 </select>

               
//                 {action === "historyapprovetest" && (
//                     <div>
//                         <h2>ประวัติการอนุมัติผลตรวจ</h2>
//                         <input
//                     type="text"
//                     placeholder="Search..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                 />

//                         <table>
//                             <thead>
//                                 <tr>
//                                     <th>ชื่อผู้ใช้</th>
//                                     <th></th>
//                                     <th>คุรภัณฑ์</th>
//                                     <th>ชื่ออุปกรณ์</th>
//                                     <th>serial อุปกรณ์</th>
//                                     <th>test_report</th>
//                                     <th>รอบ</th>
//                                     <th>action</th>
//                                     <th>เวลา</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {actionLog.filter(handleSearch).map((log, index) => (
//                                     <tr key={index}>
//                                         <td>{log.name}</td>
//                                         <td>{log.sticker}</td>
//                                         <td>{log.durable}</td>
//                                         <td>{log.device_name}</td>
//                                         <td>{log.serial}</td>
//                                         <td>{log.test_report}</td>
//                                         <td>{log.round}</td>
//                                         <td>{log.action}</td>
//                                         <td>{log.time}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}

//                 {action === "checkDeviceRequest" && (
//                     <div>
//                         <h2>ประวัติการอนุมัติการเพิ่ม/เปลี่ยน</h2>
//                         <input
//                     type="text"
//                     placeholder="Search..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//                         <table>
//                             <thead>
//                                 <tr>
//                                     <th>ชื่อผู้ใช้</th>
//                                     <th>Stickerที่เลือก</th>
//                                     <th>อุปกรณ์ที่เลือก</th>
//                                     <th>serial ที่เลือก</th>
//                                     <th></th>
                                    
//                                     <th>Sticker ใหม่</th>
//                                     <th>คุรภัณฑ์</th>
//                                     <th>อุปกรณ์ใหม่</th>
//                                     <th>ยี่ห้อ</th>
//                                     <th>รุ่น</th>
//                                     <th>serial ใหม่</th>
//                                     <th>action</th>
//                                     <th>เวลา</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {actionLog2.filter(handleSearch).map((log, index) => (
//                                     <tr key={index}>
//                                         <td>{log.username}</td>
//                                         <td>{log.selectedSticker}</td>
//                                         <td>{log.selecteddevice}</td>
//                                         <td>{log.selecteddeviceserial}</td>
//                                         <td></td>
//                                         <td>{log.sticker}</td>
//                                         <td>{log.durable}</td>
//                                         <td>{log.newdevices}</td>
//                                         <td>{log.brand}</td>
//                                         <td>{log.model}</td>
//                                         <td>{log.serial_number}</td>
//                                         <td>{log.action}</td>
//                                         <td>{log.time}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Homeadmin from './adminhome';
import '../css/admincheckstatus.css'

export default function Admincheckstatus() {
    const [actionLog, setActionLog] = useState([]);
    const [actionLog2, setActionLog2] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [action, setAction] = useState("historyapprovetest");

    useEffect(() => {
        fetchActionLog();
        fetchActionLog2();
    }, []);

    const fetchActionLog = async () => {
        try {
            const response = await axios.get('http://localhost:8081/getActionLog');
            setActionLog(response.data);
        } catch (error) {
            console.error('Error fetching action Log', error);
        }
    };

    const fetchActionLog2 = async () => {
        try {
            const response = await axios.get('http://localhost:8081/getActionLog2');
            setActionLog2(response.data);
        } catch (error) {
            console.error('Error fetching action Log', error);
        }
    };

    const handleSearch = (log) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return Object.values(log).some(value =>
            String(value).toLowerCase().includes(lowerCaseSearchTerm)
        );
    };

    return (
        <div>
            <Homeadmin />
            
            <div className='center-table'>
            <div className='report'>
                <select id="action" value={action} onChange={e => setAction(e.target.value)}>
                    <option value="historyapprovetest">ประวัติการอนุมัติผลตรวจ</option>
                    <option value="checkDeviceRequest">ประวัติการอนุมัติการเพิ่ม/เปลี่ยน อุปกรณ์</option>
                </select>

                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                {action === "historyapprovetest" && (
                    <div>
                        <h2>ประวัติการอนุมัติผลตรวจ</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>ชื่อผู้ใช้</th>
                                    <th></th>
                                    <th>คุรภัณฑ์</th>
                                    <th>ชื่ออุปกรณ์</th>
                                    <th>serial อุปกรณ์</th>
                                    <th>test_report</th>
                                    <th>รอบ</th>
                                    <th>action</th>
                                    <th>เวลา</th>
                                </tr>
                            </thead>
                            <tbody>
                                {actionLog.filter(handleSearch).map((log, index) => (
                                    <tr key={index}>
                                        <td>{log.name}</td>
                                        <td>{log.sticker}</td>
                                        <td>{log.durable}</td>
                                        <td>{log.device_name}</td>
                                        <td>{log.serial}</td>
                                        <td>{log.test_report}</td>
                                        <td>{log.round}</td>
                                        <td>{log.action}</td>
                                        <td>{log.time}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {action === "checkDeviceRequest" && (
                    <div>
                        <h2>ประวัติการอนุมัติการเพิ่ม/เปลี่ยน</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>ชื่อผู้ใช้</th>
                                    <th>Stickerที่เลือก</th>
                                    <th>อุปกรณ์ที่เลือก</th>
                                    <th>serial ที่เลือก</th>
                                    <th></th>
                                    <th>Sticker ใหม่</th>
                                    <th>คุรภัณฑ์</th>
                                    <th>อุปกรณ์ใหม่</th>
                                    <th>ยี่ห้อ</th>
                                    <th>รุ่น</th>
                                    <th>serial ใหม่</th>
                                    <th>action</th>
                                    <th>เวลา</th>
                                </tr>
                            </thead>
                            <tbody>
                                {actionLog2.filter(handleSearch).map((log, index) => (
                                    <tr key={index}>
                                        <td>{log.username}</td>
                                        <td>{log.selectedSticker}</td>
                                        <td>{log.selecteddevice}</td>
                                        <td>{log.selecteddeviceserial}</td>
                                        <td></td>
                                        <td>{log.sticker}</td>
                                        <td>{log.durable}</td>
                                        <td>{log.newdevices}</td>
                                        <td>{log.brand}</td>
                                        <td>{log.model}</td>
                                        <td>{log.serial_number}</td>
                                        <td>{log.action}</td>
                                        <td>{log.time}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
        </div>
    );
}


