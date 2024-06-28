import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import "../css/adminhome.css";
import Homeadmin from './adminhome';

export default function Adminchecktest() {
    const [assignments, setAssignments] = useState([]);
    const [rounds, setRounds] = useState([]);
    const [selectedRound, setSelectedRound] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const { remarkId } = useParams(); // Get the remark ID from the URL

    useEffect(() => {
        // axios.get('http://localhost:8081/getAssignments')
         axios.get(`${process.env.REACT_APP_API_URL}/getAssignments`)
            .then(response => {
                const fetchedAssignments = response.data;
                if (remarkId) {
                    setAssignments(fetchedAssignments.filter(a => a.id === remarkId));
                } else {
                    setAssignments(fetchedAssignments);
                }
                // Extract unique rounds
                const uniqueRounds = [...new Set(fetchedAssignments.map(a => a.round))];
                setRounds(uniqueRounds);
            })
            .catch(error => {
                console.error('There was an error fetching the assignments!', error);
            });
    }, [remarkId]);

    const handleDelete = (assignmentId) => {
        // axios.delete(`http://localhost:8081/deleteAssignment/${assignmentId}`)
        axios.delete(`${process.env.REACT_APP_API_URL}/deleteAssignment/${assignmentId}`)
            .then(response => {
                setAssignments(assignments.filter(assignment => assignment.id !== assignmentId));
                alert('Assignment deleted successfully');
            })
            .catch(error => {
                alert('Failed to delete assignment');
            });
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredAssignments);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Assignments');

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(data, 'assignments.xlsx');
    };

    function formatDateTime(dateTime) {
        const date = new Date(dateTime);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const filteredAssignments = assignments.filter(a => {
        const roundMatch = selectedRound ? String(a.round) === selectedRound : true;
        const searchMatch = Object.values(a).some(value =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        );
        return roundMatch && searchMatch;
    });

    return (
        <div>
            <Homeadmin />
            <div className="center-table">
                <div className="table-container">
                    <h3>ตรวจสอบรายงาน</h3>
                    <div className="filters">
                        <div className="filter-item">
                            <label>กรองตามรอบ: </label>
                            <select onChange={(e) => setSelectedRound(e.target.value)} value={selectedRound}>
                                <option value=''>ทุกรอบ</option>
                                {rounds.map((round, index) => (
                                    <option key={index} value={round}>{round}</option>
                                ))}
                            </select>
                        </div>
                        <div className="filter-item">
                            <input
                                type="text"
                                placeholder="ค้นหา..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <button onClick={exportToExcel} className='excel'>Export to Excel</button>
                    <table>
                        <thead>
                            <tr>
                                <th>ชื่อผู้ใช้</th>
                                <th></th>
                                <th>คุรภัณฑ์</th>
                                <th>อุปกรณ์</th>
                                <th>ยี่ห้อ</th>
                                <th>รุ่น</th>
                                <th>Serial, ซ้าย-ขวา</th>
                                <th>สถานะ</th>
                                <th>ซ้าย</th>
                                <th>ขวา</th>
                                <th>Test report</th>
                                <th>หมายเหตุ</th>
                                <th>เวลาที่ส่ง</th>
                                <th>รอบ</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAssignments.map((assignment, index) => (
                                <tr key={index}>
                                    <td>{assignment.name}</td>
                                    <td>{assignment.sticker}</td>
                                    <td>{assignment.durable}</td>
                                    <td>{assignment.device_name}</td>
                                    <td>{assignment.brand}</td>
                                    <td>{assignment.model}</td>
                                    <td>{assignment.serial}</td>
                                    <td>{assignment.status}</td>
                                    <td>{assignment.left_side}</td>
                                    <td>{assignment.right_side}</td>
                                    <td>{assignment.test_report}</td>
                                    <td>{assignment.note}</td>
                                    <td>{formatDateTime(assignment.submission_date)}</td>
                                    <td>{assignment.round}</td>
                                    <td>
                                        <button className="deletereport" onClick={() => handleDelete(assignment.id)}>ลบ</button>
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
