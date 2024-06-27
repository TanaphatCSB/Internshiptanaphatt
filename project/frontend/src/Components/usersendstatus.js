import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './userContext';
import '../css/home.css';
import User from './userhome';

const steps = ["ส่งแล้ว", "อนุมัติแล้ว", "ปฏิเสธแล้ว", "ส่งซ่อมแล้ว"];

const Userstatus = () => {
  const [submissions, setSubmissions] = useState([]);
  const [changeDeviceStatus, setChangeDeviceStatus] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('usersendstatus');
  const { user } = useContext(UserContext);

  const [editSubmission, setEditSubmission] = useState(null);

  useEffect(() => {
    if (user) {
      const fetchUserSubmissions = async () => {
        try {
       
          // const apiUrl =  'http://localhost:8081';
          // axios.get(`${apiUrl}/getUserDevicesBySticker/${sticker}`)
         
          const response = await axios.get(`http://localhost:8081/user-submissions?userId=${user.userid}`);
          console.log('User Submissions:', response.data);
          setSubmissions(response.data);
        } catch (error) {
          console.error('Error fetching user submissions:', error);
        }
      };

      const fetchChangeDeviceStatus = async () => {
        try {
          const response = await axios.get(`http://localhost:8081/change-device-status?userId=${user.userid}`);
          console.log('Change Device Status:', response.data);
          setChangeDeviceStatus(response.data);
        } catch (error) {
          console.error('Error fetching change device status:', error);
        }
      };

      fetchUserSubmissions();
      fetchChangeDeviceStatus();
    }
  }, [user]);

  const getStatusIndex = (status) => {
    switch (status.toLowerCase()) {
      case 'ส่งแล้ว':
        return 0;
      case 'อนุมัติแล้ว':
        return 1;
      case 'ปฏิเสธแล้ว':
        return 2;
      case 'ส่งซ่อมแล้ว':
        return 3;
      default:
        return 0;
    }
  };

  const getStepToRender = (status) => {
    if (status.toLowerCase() === 'ปฏิเสธแล้ว') {
      return ["ส่งแล้ว", "ถูกปฏิเสธ"];
    } else if (status.toLowerCase() === 'ส่งแล้ว') {
      return ["ส่งแล้ว", "อนุมัติแล้ว"];
    } else if (status.toLowerCase() === 'อนุมัติแล้ว') {
      return ["ส่งแล้ว", "อนุมัติแล้ว"];
    } else if (status.toLowerCase() === 'ส่งซ่อมแล้ว') {
      return ["ส่งแล้ว", "ส่งซ่อมแล้ว"];
    }
    return steps;
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditSubmission({ ...editSubmission, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    console.log('Edit Submission:', editSubmission); // Debugging log

    try {
      // Set status to "ส่งแล้ว" before submitting
      const updatedSubmission = { ...editSubmission, status: 'ส่งแล้ว' };
      const response = await axios.put('http://localhost:8081/update-submission-pending', updatedSubmission);

      if (response.data.success) {
        setSubmissions(submissions.map(sub => (sub.id === editSubmission.id ? updatedSubmission : sub)));
        setEditSubmission(null);
        alert('คำขอแก้ไขข้อมูลของคุณถูกส่งเรียบร้อยแล้ว');
      }
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.error) {
        // Display specific error message to the user
        alert('คำขอแก้ไขข้อมูลของคุณต้องรอการอนุมัติก่อนถึงจะส่งใหม่ได้');
      } else {
        console.error('Error updating submission:', error);
        alert('เกิดข้อผิดพลาดในการอัปเดตข้อมูล');
      }
    }
  };

  const renderStatusList = () => {
    const statusList = selectedStatus === 'usersendstatus' ? submissions : changeDeviceStatus;
    console.log('Status List:', statusList);

    return (
      <div className="submissions-list">
        {statusList.map((item) => (
          <div className="submission-item" key={item.id}>
            <div className="submission-details">
              <div className="submission-id">
                {selectedStatus === 'usersendstatus' ? ` ${item.sticker}` : `ChangeDevice ID: ${item.id}`}
              </div>

              <div className="submission-info">
                {selectedStatus === 'usersendstatus' ? (
                  editSubmission && editSubmission.id === item.id ? (
                    <form onSubmit={handleEditSubmit}>
                      <div>
                        <label>Status:</label>
                        <input
                          type="text"
                          name="status2"
                          value={editSubmission.status2}
                          onChange={handleEditChange}
                        />
                      </div>
                      <div>
                        <label>Note:</label>
                        <input
                          type="text"
                          name="note"
                          value={editSubmission.note}
                          onChange={handleEditChange}
                        />
                      </div>
                      <div>
                        <label>Left Side:</label>
                        <input
                          type="text"
                          name="left_side"
                          value={editSubmission.left_side}
                          onChange={handleEditChange}
                        />
                      </div>
                      <div>
                        <label>Right Side:</label>
                        <input
                          type="text"
                          name="right_side"
                          value={editSubmission.right_side}
                          onChange={handleEditChange}
                        />
                      </div>
                      <div>
                        <label>Test Report:</label>
                        <input
                          type="text"
                          name="test_report"
                          value={editSubmission.test_report}
                          onChange={handleEditChange}
                        />
                      </div>
                      <button type="submit">ส่งคำขอแก้ไขข้อมูล</button>
                      <button type="button" onClick={() => setEditSubmission(null)}>Cancel</button>
                    </form>
                  ) : (
                    <>
                      <div>คุรภัณฑ์: {item.durable}</div>
                      <div>Device: {item.device_name}</div>
                      <div>Brand: {item.brand}</div>
                      <div>Model: {item.model}</div>
                      <div>Serial: {item.serial}</div>
                      <div>status: {item.status2}</div>
                      <div>left: {item.left_side} right: {item.right_side}</div>
                      <div>หมายเหตุ: {item.note}</div>
                      <div>Test Report: {item.test_report}</div>
                      <div>รอบ: {item.round}</div>
                      <button onClick={() => setEditSubmission(item)}>Edit</button>
                    </>
                  )
                ) : (
                  <>
                    <div>User ID: {item.user_id}</div>
                    <div>Status: {item.status}</div>
                    {item.action === 'change' && (
                      <>
                        <div>Selected Device: {item.selecteddevice}</div>
                        <div>New Device: {item.newdevices}</div>
                      </>
                    )}
                    {item.action === 'add' && <div>New Device: {item.newdevices}</div>}
                    
                    <div>SelectedSticker: {item.selectedSticker}</div>
                    <div>Selected Device: {item.selecteddevice}</div>
                    <div>Selecteddevice serial: {item.selecteddeviceserial}</div>
                    <br />
                    <div><h2>อุปกรณ์ใหม่</h2>
                      <div>{item.sticker}</div>
                      <div>{item.durable}</div>
                      <div>New Device: {item.newdevices}</div>
                      <div>Brand: {item.brand}</div>
                      <div>Model: {item.model}</div>
                      <div>New Serial: {item.serial_number}</div>
                    </div>
                  </>
                )}
              </div>
              <div className="submission-time">
                <div>Submitted At: {new Date(item.submitted_at).toLocaleString()}</div>
                <div>Admin action At: {item.at ? new Date(item.at).toLocaleString() : '-'}</div>
              </div>
            </div>
            <div className="step-tracker">
              {getStepToRender(item.status).map((step, index) => (
                <div
                  key={index}
                  className={`step ${index <= getStatusIndex(item.status) ? 'completed' : ''} ${item.status.toLowerCase() === 'ปฏิเสธแล้ว' && index === 1 ? 'rejected' : ''}
                  ${item.status.toLowerCase() === 'ส่งซ่อมแล้ว' && index === 1 ? 'repaired' : ''}`}
                >
                  <div className="step-label">{step}</div>
                  {index < getStepToRender(item.status).length - 1 && <div className="step-line"></div>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <User />
      <div className="condiv user-status-container">
        <h2>User Status</h2>
        <div>
          <label htmlFor="statusSelect">เลือกสถานะที่ต้องการดู:</label>
          <select id="statusSelect" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
            <option value="usersendstatus">สถานะการส่งข้อมูล</option>
            <option value="changedevicestatus">สถานะการแจ้งขอเปลี่ยน/เพิ่มอุปกรณ์</option>
          </select>
        </div>
        {renderStatusList()}
      </div>
    </div>
  );
};

export default Userstatus;
