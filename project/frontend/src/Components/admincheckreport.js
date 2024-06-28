// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import "../css/adminhome.css";
// import Homeadmin from './adminhome';

// export default function Admincheckreport() {
//     const [pendingApprovals, setPendingApprovals] = useState([]);
//     const [action, setAction] = useState('checktest');
//     const [requestaddchangedevice, setRequestAddChangeDevice] = useState([]);

//     useEffect(() => {
//         axios.get('http://localhost:8081/getPendingApprovals')
//             .then(response => {
//                 console.log(response.data);
//                 setPendingApprovals(response.data);
//             })
//             .catch(error => {
//                 console.error('There was an error fetching the pending approvals!', error);
//             });
//     }, []);

//     useEffect(() => {
//         axios.get('http://localhost:8081/getrequestaddchangedevice')
//             .then(response => {
//                 console.log(response.data);
//                 setRequestAddChangeDevice(response.data);
//             })
//             .catch(error => {
//                 console.error('There was an error fetching the request add/change device!', error);
//             });
//     }, []);

//     useEffect(() => {
//         console.log('Current action:', action);
//     }, [action]);

//     const handleApprove = async (approval) => {
//         try {
//           await axios.put(`http://localhost:8081/approveAssignment/${approval.id}`, { note: approval.note, status: approval.status });
//           setPendingApprovals(pendingApprovals.filter(a => a.id !== approval.id));
//           insertActionLog('approve', approval.id, approval.note, approval.status, approval.submission_id);
//           alert('Assignment approved and updated successfully');
//         } catch (error) {
//           alert('Failed to approve and update assignment');
//         }
//       };

//     const handleApprove2 = async (approval2) => {
//         try {
//             const { id, user_id, selected_device_id, new_device_id, brand, model, serial_number, action, selecteddevice, selecteddeviceserial,sticker,durable} = approval2;
    
//             if (action === 'add') {
//                 await axios.post('http://localhost:8081/addUserDevice', {
//                     userId: user_id,
//                     newDevice: new_device_id,
//                     brand,
//                     model,
//                     serial_number,
//                     sticker,
//                     durable
                
//                 });
//             } else if (action === 'change') {
//                 await axios.post('http://localhost:8081/changeUserDevice', {
//                     userId: user_id,
//                     selectedDevice: selected_device_id,
//                     newDevice: new_device_id,
//                     brand,
//                     model,
//                     serial: serial_number,
//                     selectedSerial: selecteddeviceserial,
//                     sticker,
//                     durable
//                 });
//             }
    
//             await axios.put(`http://localhost:8081/rejectaddchange/${id}`);
//             setRequestAddChangeDevice(requestaddchangedevice.filter(req => req.id !== id));
//              insertActionLog2('approve', approval2.id, approval2.note, approval2.status,approval2.id);
//             alert("update เรียบร้อยแล้ว");
//         } catch (error) {
//             alert('update ไม่สำเร็จ');
//         }
//     };

//     const handleReject = async (approval) => {
//         try {
//           await axios.put(`http://localhost:8081/rejectAssignment/${approval.id}`);
//           setPendingApprovals(pendingApprovals.filter(a => a.id !== approval.id));
//           insertActionLog('reject', approval.id, null, null, approval.submission_id);
//           alert('Assignment rejected successfully');
//         } catch (error) {
//           alert('Failed to reject assignment');
//         }
//       };

//       const handleReject2 = async (approval) => {
//         try {
//             await axios.put(`http://localhost:8081/rejectaddchange/${approval.id}`);
//             setRequestAddChangeDevice(requestaddchangedevice.filter(req => req.id !== approval.id));
//             insertActionLog2('reject', approval.id, approval.note, approval.status);
//             alert("Rejected successfully");
//         } catch (error) {
//             alert('Failed to reject');
//         }
//     };
    
//     const handleSendToRepair = async (approval) => {
//         try {
//           const { submission_id, user_id, device_id, name, brand, model, serial } = approval;
      
//           // เพิ่มข้อมูลลงในตาราง devices_in_repair
//           await axios.post('http://localhost:8081/add-to-repair', {
//             userId: user_id,
//             deviceId: device_id,
//             username: name,
//             brand,
//             model,
//             serial,
//             submissionId: submission_id,
//           });
      
//           // ลบออกจาก user_devices
//           await axios.delete(`http://localhost:8081/remove-user-device/${user_id}/${device_id}/${serial}`);
      
//           // ลบออกจาก pendingapprovals
//           await axios.put(`http://localhost:8081/sendToRepair/${approval.id}`);
//           setPendingApprovals(pendingApprovals.filter(a => a.id !== approval.id));
      
//           insertActionLog('ส่งซ่อม', approval.id, null, null, approval.submission_id);
//           alert('Assignment sent to repair successfully');
//         } catch (error) {
//           alert('Failed to send assignment to repair');
//         }
//       };

//     const insertActionLog = async (action, assignmentId, note, status, submissionId) => {
//         try {
//           await axios.post('http://localhost:8081/insertActionLog', {
//             action,
//             assignmentId,
//             note,
//             status,
//             submissionId,
//           });
//         } catch (error) {
//           console.error('Error inserting action log:', error);
//         }
//       };
//       const insertActionLog2 = async (action, assignmentId, note, status) => {
//         try {
//           await axios.post('http://localhost:8081/insertActionLog2', {
//             action,
//             note,
//             status,
//             assignmentId,
//           });
//         } catch (error) {
//           console.error('Error inserting action log:', error);
//         }
//       };
//     return (
//         <div>
//             <Homeadmin />
//             <div className='report check'>
//                 <div>
//                     <select id="action" value={action} onChange={e => setAction(e.target.value)}>
//                         <option value="checktest">ตรวจผลทดสอบ</option>
//                         <option value="checkrequest">ตรวจคำร้อง เพิ่ม/เปลี่ยน อุปกรณ์</option>
//                     </select>
//                 </div>
//                 {action === "checktest" && (
//                     <div>
//                         <h3>Pending Approvals</h3>
//                         <table>
//                             <thead>
//                                 <tr>
//                                     <th>ชื่อผู้ใช้</th>
//                                     <th></th>
//                                     <th>คุรภัณฑ์</th>
//                                     <th>อุปกรณ์</th>
//                                     <th>ยี่ห้อ</th>
//                                     <th>รุ่น</th>
//                                     <th>Serial</th>
//                                     <th>สถานะ</th>
//                                     <th>ซ้าย</th>
//                                     <th>ขวา</th>
//                                     <th>Testreport</th>
//                                     <th>หมายเหตุ</th>
//                                     <th>Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {pendingApprovals.map((approval) => (
//                                     <tr key={approval.id}>
//                                         <td>{approval.name}</td>
//                                         <td>{approval.sticker}</td>
//                                         <td>{approval.durable}</td>
//                                         <td>{approval.device_name}</td>
//                                         <td>{approval.brand}</td>
//                                         <td>{approval.model}</td>
//                                         <td>{approval.serial}</td>
//                                         <td>{approval.status}</td>
//                                         <td>{approval.left_side}</td>
//                                         <td>{approval.right_side}</td>
//                                         <td>{approval.test_report}</td>
//                                         <td>{approval.note}</td>
//                                         <td>
//                                             <button onClick={() => handleApprove(approval)}>Approve</button>
//                                             <button onClick={() => handleReject(approval)}>Reject</button>
//                                             <button onClick={() => handleSendToRepair(approval)}>Send to Repair</button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//                 {action === "checkrequest" && (
//                     <div>
//                         <h3>ตรวจคำร้องขอเพิ่ม/เปลี่ยนอุปกรณ์</h3>
//                         <table>
//                             <thead>
//                                 <tr>
//                                     <th>ชื่อผู้ใช้</th>
//                                     <th>อุปกรณ์ที่เลือก</th>
//                                     <th>serialที่เลือก</th>
//                                     <th>อุปกรณ์ใหม่</th>
//                                     <th>ยี่ห้อ</th>
//                                     <th>รุ่น</th>
//                                     <th>Serialnumber</th>
//                                     <th>Action</th>
//                                     <th></th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {requestaddchangedevice.map((approval2) => (
//                                     <tr key={approval2.id}>
//                                         <td>{approval2.username}</td>
//                                         <td>{approval2.selecteddevice}</td>
//                                         <td>{approval2.selecteddeviceserial}</td>
//                                         <td>{approval2.newdevices}</td>
//                                         <td>{approval2.brand}</td>
//                                         <td>{approval2.model}</td>
//                                         <td>{approval2.serial_number}</td>
//                                         <td>{approval2.action}</td>
//                                         <td>
//                                             <button onClick={() => handleApprove2(approval2)}>ตกลง</button>
//                                             <button onClick={() => handleReject2(approval2)}>ปฏิเสธ</button>
//                                         </td>
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
import { useLocation } from 'react-router-dom';
import "../css/adminhome.css";
import Homeadmin from './adminhome';
import ConfirmModal from './confirmmodal';

export default function Admincheckreport() {
    const location = useLocation();
    const { submissionId, userId,historyId } = location.state || {};
    const [pendingApprovals, setPendingApprovals] = useState([]);
    const [oldData, setOldData] = useState({});
    const [action, setAction] = useState('checktest');
    const [requestAddChangeDevice, setRequestAddChangeDevice] = useState([]);
    const [selectedApproval, setSelectedApproval] = useState(null);
    const [showComparison, setShowComparison] = useState(false);


    useEffect(() => {
        if (location.state && location.state.action) {
            setAction(location.state.action);
        }
    }, [location.state]);

    useEffect(() => {
        // axios.get('http://localhost:8081/getPendingApprovals')
        axios.get(`${process.env.REACT_APP_API_URL}/getPendingApprovals`)
            .then(response => {
                const data = response.data;
                if (submissionId && userId) {
                    const matchedApproval = data.find(approval => approval.submission_id === submissionId && approval.user_id === userId);
                    if (matchedApproval) {
                        setSelectedApproval(matchedApproval);
                    }
                }
                setPendingApprovals(data);
            })
            .catch(error => {
                console.error('There was an error fetching the pending approvals!', error);
            });
    }, [submissionId, userId]);

    // useEffect(() => {
    //     axios.get('http://localhost:8081/getrequestaddchangedevice')
    //         .then(response => {
    //             console.log(response.data);
    //             setRequestAddChangeDevice(response.data);
    //         })
    //         .catch(error => {
    //             console.error('There was an error fetching the request add/change device!', error);
    //         });
    // }, []);

    useEffect(() => {
        // axios.get('http://localhost:8081/getrequestaddchangedevice')
        axios.get(`${process.env.REACT_APP_API_URL}/getrequestaddchangedevice`)
            .then(response => {
                const data = response.data;
                if (historyId && userId) {
                    const matchedApproval = data.find(approval2 => approval2.historyId === historyId && approval2.user_id === userId);
                    if (matchedApproval) {
                        setSelectedApproval(matchedApproval);
                    }
                }
                setRequestAddChangeDevice(data);
            })
            .catch(error => {
                console.error('There was an error fetching the request add/change device!', error);
            });
    }, [historyId, userId]);

    useEffect(() => {
        console.log('Current action:', action);
    }, [action]);

    const handleApprove = async (approval) => {
        try {
            // const response = await axios.put(`http://localhost:8081/approveAssignment/${approval.id}`, { note: approval.note, status: approval.status });
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/approveAssignment/${approval.id}`, { note: approval.note, status: approval.status });
            if (response.data.oldData) {
                setOldData(response.data.oldData);
                setSelectedApproval(approval);
                setShowComparison(true);
            } else {
                // Proceed with normal approval process if no old data exists
                setPendingApprovals(pendingApprovals.filter(a => a.id !== approval.id));
                insertActionLog('approve', approval.id, approval.note, approval.status, approval.submission_id);
                alert('Assignment approved and updated successfully');
            }
        } catch (error) {
            alert('Failed to approve and update assignment');
        }
    };

    const handleApproveFinal = async () => {
        try {
            // await axios.put(`http://localhost:8081/approveAssignmentFinal/${selectedApproval.id}`, { note: selectedApproval.note, status: selectedApproval.status });
            await axios.put(`${process.env.REACT_APP_API_URL}/approveAssignmentFinal/${selectedApproval.id}`, { note: selectedApproval.note, status: selectedApproval.status });
            setPendingApprovals(pendingApprovals.filter(a => a.id !== selectedApproval.id));
            insertActionLog('approve', selectedApproval.id, selectedApproval.note, selectedApproval.status, selectedApproval.submission_id);
            setShowComparison(false);
            alert('Assignment approved and updated successfully');
        } catch (error) {
            alert('Failed to approve and update assignment');
        }
    };

    const handleReject = async (approval) => {
        try {
            // await axios.put(`http://localhost:8081/rejectAssignment/${approval.id}`);
            await axios.put(`${process.env.REACT_APP_API_URL}/rejectAssignment/${approval.id}`);
            setPendingApprovals(pendingApprovals.filter(a => a.id !== approval.id));
            insertActionLog('reject', approval.id, null, null, approval.submission_id);
            alert('Assignment rejected successfully');
        } catch (error) {
            alert('Failed to reject assignment');
        }
    };

    const handleSendToRepair = async (approval) => {
        try {
            const { submission_id, user_id, device_id, name, brand, model, serial ,sticker,durable} = approval;

            // เพิ่มข้อมูลลงในตาราง devices_in_repair
            // await axios.post('http://localhost:8081/add-to-repair', {
            await axios.post(`${process.env.REACT_APP_API_URL}/add-to-repair`, {
                userId: user_id,
                deviceId: device_id,
                username: name,
                brand,
                model,
                serial,
                submissionId: submission_id,
                sticker,
                durable
            });


            // ลบออกจาก user_devices
            // await axios.delete(`http://localhost:8081/remove-user-device/${user_id}/${sticker}/${device_id}`);
            await axios.delete(`${process.env.REACT_APP_API_URL}/remove-user-device/${user_id}/${sticker}/${device_id}`);

            // ลบออกจาก pendingapprovals
            // await axios.put(`http://localhost:8081/sendToRepair/${approval.id}`);
            await axios.put(`${process.env.REACT_APP_API_URL}/sendToRepair/${approval.id}`);
            setPendingApprovals(pendingApprovals.filter(a => a.id !== approval.id));

            insertActionLog('ส่งซ่อม', approval.id, null, null, approval.submission_id);
            alert('Assignment sent to repair successfully');
        } catch (error) {
            alert('Failed to send assignment to repair');
        }
    };

    const insertActionLog = async (action, assignmentId, note, status, submissionId) => {
        try {
            // await axios.post('http://localhost:8081/insertActionLog', {
            await axios.post(`${process.env.REACT_APP_API_URL}/insertActionLog`, {
                action,
                assignmentId,
                note,
                status,
                submissionId,
            });
        } catch (error) {
            console.error('Error inserting action log:', error);
        }
    };

        const handleApprove2 = async (approval2) => {
        try {
            const { id, user_id, selected_device_id, new_device_id, brand, model, serial_number, action, selecteddevice, selecteddeviceserial,sticker,durable} = approval2;
    
            if (action === 'add') {
                // await axios.post('http://localhost:8081/addUserDevice', {
                await axios.post(`${process.env.REACT_APP_API_URL}/addUserDevice`, {
                    userId: user_id,
                    newDevice: new_device_id,
                    brand,
                    model,
                    serial_number,
                    sticker,
                    durable
                
                });
            } else if (action === 'change') {
                // await axios.post('http://localhost:8081/changeUserDevice', {
                await axios.post(`${process.env.REACT_APP_API_URL}/changeUserDevice`, {
                    userId: user_id,
                    selectedDevice: selected_device_id,
                    newDevice: new_device_id,
                    brand,
                    model,
                    serial: serial_number,
                    selectedSerial: selecteddeviceserial,
                    sticker,
                    durable
                });
            }
            else if (action === 'deletedevice') {
                // await axios.post('http://localhost:8081/DeleteUserDevice', {
                await axios.post(`${process.env.REACT_APP_API_URL}/DeleteUserDevice`, {
                    userId: user_id,
                    selectedDevice: selected_device_id,
                    selectedSerial: selecteddeviceserial
                });
            }
    
            // await axios.put(`http://localhost:8081/rejectaddchange/${id}`);
            await axios.put(`${process.env.REACT_APP_API_URL}/rejectaddchange/${id}`);
            setRequestAddChangeDevice(requestAddChangeDevice.filter(req => req.id !== id));
             insertActionLog2('approve', approval2.id, approval2.note, approval2.status,approval2.id);
            alert("update เรียบร้อยแล้ว");
        } catch (error) {
            alert('update ไม่สำเร็จ');
        }
    };

          const handleReject2 = async (approval) => {
        try {
            // await axios.put(`http://localhost:8081/rejectaddchange/${approval.id}`);
            await axios.put(`${process.env.REACT_APP_API_URL}/rejectaddchange/${approval.id}`);
            setRequestAddChangeDevice(requestAddChangeDevice.filter(req => req.id !== approval.id));
            insertActionLog2('reject', approval.id, approval.note, approval.status);
            alert("Rejected successfully");
        } catch (error) {
            alert('Failed to reject');
        }
    };

          const insertActionLog2 = async (action, assignmentId, note, status) => {
        try {
        //   await axios.post('http://localhost:8081/insertActionLog2', {
          await axios.post(`${process.env.REACT_APP_API_URL}/insertActionLog2`, {
            action,
            note,
            status,
            assignmentId,
          });
        } catch (error) {
          console.error('Error inserting action log:', error);
        }
      };

    return (
        <div>
            <Homeadmin />
            <div className ="center-table">
            <div className='report check'>
                <div>
                    <select id="action" value={action} onChange={e => setAction(e.target.value)}>
                        <option value="checktest">ตรวจผลทดสอบ</option>
                        <option value="checkrequest">ตรวจคำร้อง เพิ่ม/เปลี่ยน อุปกรณ์</option>
                    </select>
                </div>
                {action === "checktest" && (
                    <div>
                        <h3>Pending Approvals</h3>
                        <table className='table1'>
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
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingApprovals.map((approval) => (
                                    <tr key={approval.id}>
                           
                                        <td>{approval.name}</td>
                                        <td>{approval.sticker}</td>
                                        <td>{approval.durable}</td>
                                        <td>{approval.device_name}</td>
                                        <td>{approval.brand}</td>
                                        <td>{approval.model}</td>
                                        <td>{approval.serial}</td>
                                        <td>{approval.status}</td>
                                        <td>{approval.left_side}</td>
                                        <td>{approval.right_side}</td>
                                        <td>{approval.test_report}</td>
                                        <td>{approval.note}</td>
                                        <td>{approval.submission_id}</td>
                                        <td>
                                            <button onClick={() => handleApprove(approval)}>Approve</button>
                                            <button onClick={() => handleReject(approval)}>Reject</button>
                                            <button onClick={() => handleSendToRepair(approval)}>Send to Repair</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {action === "checkrequest" && (
                    <div>
                        <h3>ตรวจคำร้องขอเพิ่ม/เปลี่ยนอุปกรณ์</h3>
                        <table className='table1'>
                            <thead>
                                <tr>
                                    <th>ชื่อผู้ใช้</th>
                                    <th>Sticker ที่เลือก</th>
                                    <th>อุปกรณ์ที่เลือก</th>
                                    <th>serialที่เลือก</th>
                                    <th>Sticker ใหม่</th>
                                    <th>อุปกรณ์ใหม่</th>
                                    <th>ยี่ห้อ</th>
                                    <th>รุ่น</th>
                                    <th>Serialnumber</th>
                                    <th>Action</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {requestAddChangeDevice.map((approval2) => (
                                    <tr key={approval2.id}>
                                        <td>{approval2.username}</td>
                                        <td>{approval2.selectedSticker}</td>
                                        <td>{approval2.selecteddevice}</td>
                                        <td>{approval2.selecteddeviceserial}</td>
                                        <td>{approval2.sticker}</td>
                                        <td>{approval2.newdevices}</td>
                                        <td>{approval2.brand}</td>
                                        <td>{approval2.model}</td>
                                        <td>{approval2.serial_number}</td>
                                        <td>{approval2.action}</td>
                                        <td>
                                            <button onClick={() => handleApprove2(approval2)}>ตกลง</button>
                                            <button onClick={() => handleReject2(approval2)}>ปฏิเสธ</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                
                {/* {showComparison && (
                    <div className="modal-content">
                        <h3>Compare Changes</h3>
                        <div className= "olddata">
                            <h4>Old Data (accepttable)</h4>
                            <pre>{JSON.stringify(oldData, null, 2)}</pre>
                            <h5>{oldData.sticker}</h5>
                            <p>คุรภัณฑ์: {oldData.durable}</p>
                            <p>อุปกรณ์: {oldData.device_name}</p>
                            <p>ยี่ห้อ: {oldData.brand}</p>
                            <p>รุ่น: {oldData.model}</p>
                            <p>Serial: {oldData.serial}</p>
                            <p>Test-report: {oldData.test_report}</p>
                            <p>status: {oldData.status}</p>
                            <p>left: {oldData.left_side}    right: {oldData.right_side}</p>
                            <p>หมายเหตุ:{oldData.note}</p>
                        </div>
                        <div className= "newdata">
                            <h4>New Data (pendingapprovals)</h4>
                            <pre>{JSON.stringify(selectedApproval, null, 2)}</pre>
                            <p>status: {selectedApproval.status}</p>
                            <p>ซ้าย: {selectedApproval.left_side} ขวา: {selectedApproval.right_side}</p>
                            <p>หมายเหตุ{selectedApproval.note}</p>

                        </div>
                        <button onClick={handleApproveFinal}>Approve Changes</button>
                        <button onClick={() => setShowComparison(false)}>Cancel</button>
                    </div>
                )} */}

 <ConfirmModal
      isOpen={showComparison}
      onRequestClose={() => setShowComparison(false)}
      oldData={oldData}
      selectedApproval={selectedApproval}
      handleApproveFinal={handleApproveFinal}
    /> 
            </div>
        </div>
        </div>
    );
}



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';
// import "../css/adminhome.css";
// import Homeadmin from './adminhome';
// import ConfirmModal from './confirmmodal';

// export default function Admincheckreport() {
//     const location = useLocation();
//     const { submissionId, userId, historyId } = location.state || {};
//     const [pendingApprovals, setPendingApprovals] = useState([]);
//     const [oldData, setOldData] = useState({});
//     const [action, setAction] = useState('checktest');
//     const [requestAddChangeDevice, setRequestAddChangeDevice] = useState([]);
//     const [selectedApproval, setSelectedApproval] = useState(null);
//     const [showComparison, setShowComparison] = useState(false);

//     useEffect(() => {
//         if (location.state && location.state.action) {
//             setAction(location.state.action);
//         }
//     }, [location.state]);

//     useEffect(() => {
//         axios.get('http://localhost:8081/getPendingApprovals')
//             .then(response => {
//                 const data = response.data;
//                 if (submissionId && userId) {
//                     const matchedApproval = data.find(approval => approval.submission_id === submissionId && approval.user_id === userId);
//                     if (matchedApproval) {
//                         setSelectedApproval(matchedApproval);
//                     }
//                 }
//                 setPendingApprovals(data);
//             })
//             .catch(error => {
//                 console.error('There was an error fetching the pending approvals!', error);
//             });
//     }, [submissionId, userId]);

//     useEffect(() => {
//         axios.get('http://localhost:8081/getrequestaddchangedevice')
//             .then(response => {
//                 const data = response.data;
//                 if (historyId && userId) {
//                     const matchedApproval = data.find(approval2 => approval2.historyId === historyId && approval2.user_id === userId);
//                     if (matchedApproval) {
//                         setSelectedApproval(matchedApproval);
//                     }
//                 }
//                 setRequestAddChangeDevice(data);
//             })
//             .catch(error => {
//                 console.error('There was an error fetching the request add/change device!', error);
//             });
//     }, [historyId, userId]);

//     useEffect(() => {
//         console.log('Current action:', action);
//     }, [action]);

//     const handleApprove = async (approval) => {
//         try {
//             const response = await axios.put(`http://localhost:8081/approveAssignment/${approval.id}`, { note: approval.note, status: approval.status });
//             if (response.data.oldData) {
//                 setOldData(response.data.oldData);
//                 setSelectedApproval(approval);
//                 setShowComparison(true);
//             } else {
//                 setPendingApprovals(pendingApprovals.filter(a => a.id !== approval.id));
//                 insertActionLog('approve', approval.id, approval.note, approval.status, approval.submission_id);
//                 alert('Assignment approved and updated successfully');
//             }
//         } catch (error) {
//             alert('Failed to approve and update assignment');
//         }
//     };

//     const handleApproveFinal = async () => {
//         try {
//             await axios.put(`http://localhost:8081/approveAssignmentFinal/${selectedApproval.id}`, { note: selectedApproval.note, status: selectedApproval.status });
//             setPendingApprovals(pendingApprovals.filter(a => a.id !== selectedApproval.id));
//             insertActionLog('approve', selectedApproval.id, selectedApproval.note, selectedApproval.status, selectedApproval.submission_id);
//             setShowComparison(false);
//             alert('Assignment approved and updated successfully');
//         } catch (error) {
//             alert('Failed to approve and update assignment');
//         }
//     };

//     const handleReject = async (approval) => {
//         try {
//             await axios.put(`http://localhost:8081/rejectAssignment/${approval.id}`);
//             setPendingApprovals(pendingApprovals.filter(a => a.id !== approval.id));
//             insertActionLog('reject', approval.id, null, null, approval.submission_id);
//             alert('Assignment rejected successfully');
//         } catch (error) {
//             alert('Failed to reject assignment');
//         }
//     };

//     const handleSendToRepair = async (approval) => {
//         try {
//             const { submission_id, user_id, device_id, name, brand, model, serial, sticker, durable } = approval;
//             await axios.post('http://localhost:8081/add-to-repair', {
//                 userId: user_id,
//                 deviceId: device_id,
//                 username: name,
//                 brand,
//                 model,
//                 serial,
//                 submissionId: submission_id,
//                 sticker,
//                 durable
//             });
//             await axios.delete(`http://localhost:8081/remove-user-device/${user_id}/${sticker}/${device_id}`);
//             await axios.put(`http://localhost:8081/sendToRepair/${approval.id}`);
//             setPendingApprovals(pendingApprovals.filter(a => a.id !== approval.id));
//             insertActionLog('ส่งซ่อม', approval.id, null, null, approval.submission_id);
//             alert('Assignment sent to repair successfully');
//         } catch (error) {
//             alert('Failed to send assignment to repair');
//         }
//     };

//     const insertActionLog = async (action, assignmentId, note, status, submissionId) => {
//         try {
//             await axios.post('http://localhost:8081/insertActionLog', {
//                 action,
//                 assignmentId,
//                 note,
//                 status,
//                 submissionId,
//             });
//         } catch (error) {
//             console.error('Error inserting action log:', error);
//         }
//     };

//     const handleApprove2 = async (approval2) => {
//         try {
//             const { id, user_id, selected_device_id, new_device_id, brand, model, serial_number, action, selecteddevice, selecteddeviceserial, sticker, durable } = approval2;
//             if (action === 'add') {
//                 await axios.post('http://localhost:8081/addUserDevice', {
//                     userId: user_id,
//                     newDevice: new_device_id,
//                     brand,
//                     model,
//                     serial_number,
//                     sticker,
//                     durable
//                 });
//             } else if (action === 'change') {
//                 await axios.post('http://localhost:8081/changeUserDevice', {
//                     userId: user_id,
//                     selectedDevice: selected_device_id,
//                     newDevice: new_device_id,
//                     brand,
//                     model,
//                     serial: serial_number,
//                     selectedSerial: selecteddeviceserial,
//                     sticker,
//                     durable
//                 });
//             } else if (action === 'deletedevice') {
//                 await axios.post('http://localhost:8081/DeleteUserDevice', {
//                     userId: user_id,
//                     selectedDevice: selected_device_id,
//                     selectedSerial: selecteddeviceserial
//                 });
//             }
//             await axios.put(`http://localhost:8081/rejectaddchange/${id}`);
//             setRequestAddChangeDevice(requestAddChangeDevice.filter(req => req.id !== id));
//             insertActionLog2('approve', approval2.id, approval2.note, approval2.status, approval2.id);
//             alert("update เรียบร้อยแล้ว");
//         } catch (error) {
//             alert('update ไม่สำเร็จ');
//         }
//     };

//     const handleReject2 = async (approval) => {
//         try {
//             await axios.put(`http://localhost:8081/rejectaddchange/${approval.id}`);
//             setRequestAddChangeDevice(requestAddChangeDevice.filter(req => req.id !== approval.id));
//             insertActionLog2('reject', approval.id, approval.note, approval.status);
//             alert("Rejected successfully");
//         } catch (error) {
//             alert('Failed to reject');
//         }
//     };

//     const insertActionLog2 = async (action, assignmentId, note, status) => {
//         try {
//             await axios.post('http://localhost:8081/insertActionLog2', {
//                 action,
//                 note,
//                 status,
//                 assignmentId,
//             });
//         } catch (error) {
//             console.error('Error inserting action log:', error);
//         }
//     };

//     return (
//         <div>
//             <Homeadmin />
//             <div className='report check'>
//                 <div>
//                     <select id="action" value={action} onChange={e => setAction(e.target.value)}>
//                         <option value="checktest">ตรวจผลทดสอบ</option>
//                         <option value="checkrequest">ตรวจคำร้อง เพิ่ม/เปลี่ยน อุปกรณ์</option>
//                     </select>
//                 </div>
//                 {action === "checktest" && (
//                     <div>
//                         <h3>Pending Approvals</h3>
//                         <table>
//                             <thead>
//                                 <tr>
//                                     <th>ชื่อผู้ใช้</th>
//                                     <th></th>
//                                     <th>คุรภัณฑ์</th>
//                                     <th>อุปกรณ์</th>
//                                     <th>ยี่ห้อ</th>
//                                     <th>รุ่น</th>
//                                     <th>Serial</th>
//                                     <th>สถานะ</th>
//                                     <th>ซ้าย</th>
//                                     <th>ขวา</th>
//                                     <th>Testreport</th>
//                                     <th>หมายเหตุ</th>
//                                     <th>Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {pendingApprovals.map((approval) => (
//                                     <tr key={approval.submissionid} className={selectedApproval && approval.submission_id === selectedApproval.submission_id && approval.user_id === selectedApproval.user_id ? 'highlight' : ''}>
//                                         <td>{approval.name}</td>
//                                         <td>{approval.sticker}</td>
//                                         <td>{approval.durable}</td>
//                                         <td>{approval.device_name}</td>
//                                         <td>{approval.brand}</td>
//                                         <td>{approval.model}</td>
//                                         <td>{approval.serial}</td>
//                                         <td>{approval.status}</td>
//                                         <td>{approval.left_side}</td>
//                                         <td>{approval.right_side}</td>
//                                         <td>{approval.test_report}</td>
//                                         <td>{approval.note}</td>
//                                         <td>
//                                             <button onClick={() => handleApprove(approval)}>Approve</button>
//                                             <button onClick={() => handleReject(approval)}>Reject</button>
//                                             <button onClick={() => handleSendToRepair(approval)}>Send to Repair</button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//                 {action === "checkrequest" && (
//                     <div>
//                         <h3>ตรวจคำร้องขอเพิ่ม/เปลี่ยนอุปกรณ์</h3>
//                         <table>
//                             <thead>
//                                 <tr>
//                                     <th>ชื่อผู้ใช้</th>
//                                     <th>Sticker ที่เลือก</th>
//                                     <th>อุปกรณ์ที่เลือก</th>
//                                     <th>serialที่เลือก</th>
//                                     <th>Sticker ใหม่</th>
//                                     <th>อุปกรณ์ใหม่</th>
//                                     <th>ยี่ห้อ</th>
//                                     <th>รุ่น</th>
//                                     <th>Serialnumber</th>
//                                     <th>Action</th>
//                                     <th></th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {requestAddChangeDevice.map((approval2) => (
//                                     <tr key={approval2.id}>
//                                         <td>{approval2.username}</td>
//                                         <td>{approval2.selectedSticker}</td>
//                                         <td>{approval2.selecteddevice}</td>
//                                         <td>{approval2.selecteddeviceserial}</td>
//                                         <td>{approval2.sticker}</td>
//                                         <td>{approval2.newdevices}</td>
//                                         <td>{approval2.brand}</td>
//                                         <td>{approval2.model}</td>
//                                         <td>{approval2.serial_number}</td>
//                                         <td>{approval2.action}</td>
//                                         <td>
//                                             <button onClick={() => handleApprove2(approval2)}>ตกลง</button>
//                                             <button onClick={() => handleReject2(approval2)}>ปฏิเสธ</button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//                 <ConfirmModal
//                     isOpen={showComparison}
//                     onRequestClose={() => setShowComparison(false)}
//                     oldData={oldData}
//                     selectedApproval={selectedApproval}
//                     handleApproveFinal={handleApproveFinal}
//                 /> 
//             </div>
//         </div>
//     );
// }
