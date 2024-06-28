// adminrecyclebin.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../css/adminhome.css";
import Homeadmin from './adminhome';

export default function AdminRecycleBin() {
    const [recycleBinData, setRecycleBinData] = useState([]);

    useEffect(() => {
        fetchRecycleBinData();
    }, []);

    const fetchRecycleBinData = () => {
        // axios.get('http://localhost:8081/getRecycleBinData')
        axios.get(`${process.env.REACT_APP_API_URL}/getRecycleBinData`)
            .then(response => {
                setRecycleBinData(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the recycle bin data!', error);
            });
    };

    const handleRepairCompleted = async (item) => {
        try {
            // await axios.put(`http://localhost:8081/repair-completed/${item.id}`, {
            await axios.put(`${process.env.REACT_APP_API_URL}/repair-completed/${item.id}`, {
                userId: item.user_id,
                deviceId: item.device_id,
                serial: item.serial,
            });
            console.log(item.id)
            fetchRecycleBinData(); // Refresh the recycle bin data
            alert('Device returned to user successfully');
        } catch (error) {
            alert('Failed to return device to user');
        }
    };

    return (
        <div>
            <Homeadmin />
            <div className='center-table'>
            <div className="report check">
                <h3>Recycle Bin</h3>
                <table>
                    <thead>
                        <tr>
                            <th>ชื่อผู้ใช้</th>
                            <th></th>
                            <th>คุรภัณฑ์</th>
                            <th>อุปกรณ์</th>
                            <th>ยี่ห้อ</th>
                            <th>รุ่น</th>
                            <th>Serial</th>
                            <th>สถานะ</th>
                            <th>ซ้าย</th>
                            <th>ขวา</th>
                            <th>Testreport</th>
                            <th>หมายเหตุ</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recycleBinData.map((item) => (
                            <tr key={item.id}>
                                <td>{item.username}</td>
                                <td>{item.sticker}</td>
                                <td>{item.durable}</td>
                                <td>{item.device_name}</td>
                                <td>{item.brand}</td>
                                <td>{item.model}</td>
                                <td>{item.serial_number}</td>
                                <td>{item.status}</td>
                                <td>{item.left_side}</td>
                                <td>{item.right_side}</td>
                                <td>{item.test_report}</td>
                                <td>{item.note}</td>
                                <td>
                                    <button onClick={() => handleRepairCompleted(item)}>ซ่อมเสร็จแล้ว</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    );
}