import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import User from './userhome';
import axios from 'axios';
import { UserContext } from './userContext';

export default function UserSubmit() {
    const { deviceId, scheduleId, sticker } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [serialData, setSerialData] = useState([]);
    const [serial, setSerial] = useState('');
    const [formData, setFormData] = useState({
        durable: '',
        brand: '',
        model: '',
        serial: '',
        status: '',
        leftSide: '',
        rightSide: '',
        testReport: '',
        note: '',
        deviceId: deviceId,
        scheduleId: scheduleId,
        sticker:sticker
    });
    const [leftSideOrder, setLeftSideOrder] = useState('');
    const [rightSideOrder, setRightSideOrder] = useState('');

    useEffect(() => {
        if (deviceId && user?.userid && sticker) {
          fetchSerialNumbers(deviceId, user.userid, sticker);
        }
      }, [deviceId, user, sticker]);

    const fetchSerialNumbers = (deviceId, userId, sticker) => {
        axios.get(`http://localhost:8081/getSerialsNumbers/${deviceId}/${userId}/${sticker}`)
          .then(response => {
            setSerialData(response.data);
          })
          .catch(error => {
            console.error('Error fetching serial numbers:', error);
          });
      };

    const handleSerialChange = (event) => {
        const selectedSerial = event.target.value;
        setSerial(selectedSerial);

        const selectedData = serialData.find(item => item.serial_number === selectedSerial);
        if (selectedData) {
            setFormData(prevFormData => ({
                ...prevFormData,
                brand: selectedData.brand,
                model: selectedData.model,
                durable: selectedData.durable,
                serial: selectedSerial
            }));
        } else {
            setFormData(prevFormData => ({
                ...prevFormData,
                brand: '',
                model: '',
                serial: selectedSerial
            }));
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const checkExistingSubmission = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/getSerialsNumbers/${deviceId}/${user.userid}/${sticker}`);
            const existingSubmissions = response.data;
    
            // Check if there's an existing submission in accepttable
            const existingSubmission = existingSubmissions.find(
                (item) =>
                    item.device_id === parseInt(deviceId) &&
                    item.schedule_id === parseInt(scheduleId) &&
                    item.serial_number === serial
            );
    
            if (existingSubmission) {
                alert('This submission already exists in the accepttable. You cannot submit it again.');
                return true; // Submission already exists
            }
    
            return false; // Submission doesn't exist
        } catch (error) {
            console.error('Error checking existing submissions:', error);
            return true; // Assume submission exists to prevent new submission
        }
    };
    
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     if (isSubmitting) return; // Prevent multiple submissions
    
    //     const submissionExists = await checkExistingSubmission();
    //     if (submissionExists) {
    //         return; // Exit if submission already exists
    //     }
    
    //     setIsSubmitting(true);
    
    //     try {
    //                 if (user?.userid) {
    //                     const payload = {
    //                         ...formData,
    //                         userId: user.userid,
    //                         name: user.name, // Ensure name is included if needed
    //                         leftSide: formData.leftSide === "อื่นๆ" ? leftSideOrder : formData.leftSide,
    //                         rightSide: formData.rightSide === "อื่นๆ" ? rightSideOrder : formData.rightSide
    //                     };
        
    //                     console.log("User object:", user);
    //                     console.log("Submitting payload:", payload);
        
    //                     await axios.post('http://localhost:8081/submitUserSubmission', payload);
    //                     alert('Assignment submitted successfully');
    //                     navigate('/user');
    //                 } else {
    //                     alert('Please log in to submit an assignment.');
    //                 }
    //     } catch (error) {
    //         console.error('Error saving submission:', error);
    //         alert('There was an error submitting the assignment.');
    //     } finally {
    //         setIsSubmitting(false);
    //     }
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     if (isSubmitting) return; // Prevent multiple submissions
    
    //     setIsSubmitting(true);
    
    //     try {
    //         if (user?.userid) {
    //             const payload = {
    //                 ...formData,
    //                 userId: user.userid,
    //                 name: user.name, // Ensure name is included if needed
    //                 leftSide: formData.leftSide === "อื่นๆ" ? leftSideOrder : formData.leftSide,
    //                 rightSide: formData.rightSide === "อื่นๆ" ? rightSideOrder : formData.rightSide,
    //                 sticker: formData.sticker, // Ensure sticker is included
    //                 scheduleId: formData.scheduleId // Ensure scheduleId is included
    //             };
    
    //             const response = await axios.post('http://localhost:8081/submitUserSubmission', payload);
    
    //             if (response.data.success) {
    //                 alert('Assignment submitted successfully');
    //                 navigate('/user');
    //             } else if (response.data.error) {
    //                 if (response.data.error.includes('pending approval')) {
    //                     alert('คุณส่งไปแล้วกรุณารอยืนยัน'); // Display the message in Thai
    //                 } else {
    //                     alert(response.data.error); // Display other error messages
    //                 }
    //             }
    //         } else {
    //             alert('Please log in to submit an assignment.');
    //         }
    //     } catch (error) {
    //         console.error('Error saving submission:', error);
    //         alert('There was an error submitting the assignment.');
    //     } finally {
    //         setIsSubmitting(false);
    //     }
    // };
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return; // Prevent multiple submissions
    
        setIsSubmitting(true);
    
        try {
            if (user?.userid) {
                const payload = {
                    ...formData,
                    userId: user.userid,
                    name: user.name, // Ensure name is included if needed
                    leftSide: formData.leftSide === "อื่นๆ" ? leftSideOrder : formData.leftSide,
                    rightSide: formData.rightSide === "อื่นๆ" ? rightSideOrder : formData.rightSide,
                    sticker: formData.sticker, // Ensure sticker is included
                    scheduleId: formData.scheduleId // Ensure scheduleId is included
                };
    
                const response = await axios.post('http://localhost:8081/submitUserSubmission', payload);
    
                if (response.data.success) {
                    alert('Assignment submitted successfully');
                    navigate('/user');
                } else if (response.data.error) {
                    if (response.data.error === 'A submission with the same device, serial, sticker, and schedule ID is already pending approval.') {
                        alert('คุณส่งไปแล้ว'); // Display the message in Thai
                    } else {
                        alert(response.data.error); // Display other error messages
                    }
                }
            } else {
                alert('Please log in to submit an assignment.');
            }
        } catch (error) {
            console.error('Error saving submission:', error);
            if (error.response && error.response.data && error.response.data.error === 'A submission with the same device, serial, sticker, and schedule ID is already pending approval.') {
                alert('คุณส่งไปแล้ว'); // Display the message in Thai
            } else {
                alert('There was an error submitting the assignment.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <div>
            <User />
            <div className="user-submit-container">
            <div className="condiv user-submit-form">
            <h2 className="user-submit-title">ส่งผลการตรวจสอบ</h2>
                {/* {user && user.userid && <div>Current User Id: {user.userid}</div>} */}
                {/* <div className="schedule-info">schduleId: {scheduleId}</div> */}
        <div className="sticker-info">sticker: {sticker}</div> 
        <form onSubmit={handleSubmit} className="submit-form">
    <div className="form-row">
        <div className="form-group">
            <label htmlFor="serial">Serial Number</label>
            <select id="serial" value={serial} onChange={handleSerialChange} required>
                <option value="">เลือก Serial</option>
                {serialData.map(item => (
                    <option key={item.serial_number} value={item.serial_number}>{item.serial_number}</option>
                ))}
            </select>
        </div>
        <div className="form-group">
            <label htmlFor="durable">คุรภัณฑ์</label>
            <input type="text" id="durable" name="durable" value={formData.durable} readOnly />
        </div>
    </div>

    <div className="form-row">
        <div className="form-group">
            <label htmlFor="brand">Brand</label>
            <input type="text" id="brand" name="brand" value={formData.brand} readOnly />
        </div>
        <div className="form-group">
            <label htmlFor="model">Model</label>
            <input type="text" id="model" name="model" value={formData.model} readOnly />
        </div>
    </div>

    <div className="form-row">
        <div className="form-group">
            <label htmlFor="status">สถานะ</label>
            <select id="status" name="status" onChange={handleChange} value={formData.status} required>
                <option value="">เลือกสถานะ</option>
                <option value="ผ่าน">ผ่าน</option>
                <option value="ไม่ผ่าน">ไม่ผ่าน</option>
            </select>
        </div>
        <div className="form-group">
            <label htmlFor="leftSide">ด้านซ้าย</label>
            <select id="leftSide" name="leftSide" onChange={handleChange} value={formData.leftSide} required>
                <option value="">เลือกด้านซ้าย</option>
                <option value="ผ่าน">ผ่าน</option>
                <option value="ไม่ผ่าน">ไม่ผ่าน</option>
                <option value="อื่นๆ">อื่นๆ</option>
            </select>
            {formData.leftSide === "อื่นๆ" && (
                <input type="text" placeholder="กรอกค่า" value={leftSideOrder} onChange={(e) => setLeftSideOrder(e.target.value)} />
            )}
        </div>
        <div className="form-group">
            <label htmlFor="rightSide">ด้านขวา</label>
            <select id="rightSide" name="rightSide" onChange={handleChange} value={formData.rightSide} required>
                <option value="">เลือกด้านขวา</option>
                <option value="ผ่าน">ผ่าน</option>
                <option value="ไม่ผ่าน">ไม่ผ่าน</option>
                <option value="อื่นๆ">อื่นๆ</option>
            </select>
            {formData.rightSide === "อื่นๆ" && (
                <input type="text" placeholder="กรอกค่า" value={rightSideOrder} onChange={(e) => setRightSideOrder(e.target.value)} />
            )}
        </div>
    </div>

    <div className="form-group">
        <label htmlFor="testReport">รายงานการทดสอบ</label>
        <input type="text" id="testReport" name="testReport" onChange={handleChange} value={formData.testReport} required />
    </div>

    <div className="form-group">
        <label htmlFor="note">หมายเหตุ</label>
        <textarea id="note" name="note" onChange={handleChange} value={formData.note}></textarea>
    </div>

    <button type="submit" disabled={isSubmitting}>ส่งผลการตรวจสอบ</button>
</form>
            </div>
            </div>
        </div>
    );
}
