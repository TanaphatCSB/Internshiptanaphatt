import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import User from './userhome';
import { UserContext } from './userContext';
import { useParams } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:8081';

function Report() {
  const { user } = useContext(UserContext);
  const [action, setAction] = useState('');
  const [devices, setDevices] = useState([]);
  const [userDevices, setUserDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState('');
  const [newDevice, setNewDevice] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [serial, setSerial] = useState('');
  const [serials, setSerials] = useState([]);
  const [selectedSerial, setSelectedSerial] = useState('');
  const [sticker, setSticker] = useState('');
  const [durable, setDurable] = useState('');
  const [selectedSticker, setSelectedSticker] = useState('');
  const [stickers, setStickers] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/getDevices`)
      .then(response => {
        console.log('Devices fetched:', response.data);
        setDevices(response.data);
      })
      .catch(error => {
        console.error('Error fetching devices:', error);
      });

    if (user?.userid) {
      axios.get(`${API_BASE_URL}/getUserDevices/${user?.userid}`)
        .then(response => {
          console.log(`User devices fetched for userId ${user.userid}:`, response.data);
          const uniqueDevices = Array.from(new Set(response.data.map(device => device.id)))
                                    .map(id => response.data.find(device => device.id === id));
          setUserDevices(uniqueDevices);
        })
        .catch(error => {
          console.error('Error fetching user devices:', error);
        });
    }
  }, [user]);

  const handleAddDevice = () => {
    if (user && user.userid && newDevice) {
      axios.post(`${API_BASE_URL}/addUserDeviceRequest`, { userId: user.userid, newDevice, brand, model, serial, sticker, durable })
        .then(response => {
          console.log(response.data);

          // Send data to changedevicestatus table
          axios.post(`${API_BASE_URL}/addChangeDeviceStatus`, {
            userId: user.userid,
            changeId: response.data.changeId // Make sure changeId is passed from pendingacceptchange
          })
          .then(response => {
            console.log(response.data);
            alert('Device add request sent successfully');
            setNewDevice('');
            setBrand('');
            setModel('');
            setSerial('');
            setSticker('');
            setDurable('');
          })
          .catch(error => {
            console.error('Error sending device change status:', error);
          });
        })
        .catch(error => {
          console.error('Error sending device add request:', error);
        });
    }
  };

  const handleChangeDevice = () => {
    if (user?.userid && selectedDevice && newDevice && selectedSerial&&selectedSticker) {
      console.log({
        userId: user.userid,
        selectedDevice,
        newDevice,
        brand,
        model,
        selectedSerial,
        serial,
        sticker,
        durable,
        selectedSticker
      });

      axios.post(`${API_BASE_URL}/changeUserDeviceRequest`, {
        userId: user.userid,
        selectedDevice,
        newDevice,
        brand,
        model,
        selectedSerial,
        serial,
        sticker,
        durable,
        selectedSticker
      })
      .then(response => {
        console.log(response.data);

        // Send data to changedevicestatus table
        axios.post(`${API_BASE_URL}/addChangeDeviceStatus`, {
          userId: user.userid,
          changeId: response.data.changeId // Make sure changeId is passed from pendingacceptchange
        })
        .then(response => {
          console.log(response.data);
          alert('Device change request sent successfully');
          setSelectedDevice('');
          setNewDevice('');
          setBrand('');
          setModel('');
          setSerial('');
          setSelectedSerial('');
          setSticker('');
          setDurable('');
        })
        .catch(error => {
          console.error('Error sending device change status:', error);
        });
      })
      .catch(error => {
        console.error('Error sending device change request:', error);
      });
    } else {
      console.log("Missing required fields");
    }
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
  };

  const handleModelChange = (e) => {
    setModel(e.target.value);
  };

  const handleSerialChange = (e) => {
    setSerial(e.target.value);
  };

  const handleStickerChange = (e) => {
    setSticker(e.target.value);
  };

  const handleDurableChange = (e) => {
    setDurable(e.target.value);
  };

  const handleDeleteDevice = () => {
    if (user?.userid && selectedDevice && selectedSerial && selectedSticker) {
      console.log({
        userId: user.userid,
        selectedDevice,
        selectedSerial,
        selectedSticker
      });

      axios.post(`${API_BASE_URL}/deleteUserDeviceRequest`, {
        userId: user.userid,
        selectedDevice,
        selectedSerial,
        selectedSticker
      })
      .then(response => {
        console.log(response.data);

        // Assuming response.data contains the changeId
        const changeId = response.data.changeId;

        // Send data to addChangeDeviceStatus endpoint
        axios.post(`${API_BASE_URL}/addChangeDeviceStatus`, {
          userId: user.userid,
          changeId: changeId
        })
        .then(statusResponse => {
          console.log('Device delete status added:', statusResponse.data);
          // Handle success if needed
        })
        .catch(error => {
          console.error('Error adding device delete status:', error);
        });
      })
      .catch(error => {
        console.error('Error deleting user device:', error);
      });
    } else {
      console.log("Missing required fields");
    }
  };

  const handleStickerSelect = (e) => {
    const selectedSticker = e.target.value;
    setSelectedSticker(selectedSticker);

    if (selectedSticker) {
      axios.get(`${API_BASE_URL}/getDevicesBySticker/${selectedSticker}`)
        .then(response => {
          setUserDevices(response.data);
        })
        .catch(error => {
          console.error('Error fetching devices by sticker:', error);
        });
    } else {
      setUserDevices([]);
    }
  };

  const handleDeviceSelect = (e) => {
    const deviceId = e.target.value;
    setSelectedDevice(deviceId);

    if (deviceId && user && user.userid) {
      axios.get(`${API_BASE_URL}/getSerialsByDevice/${deviceId}/${user.userid}/${selectedSticker}`)
        .then(response => {
          setSerials(response.data);
        })
        .catch(error => {
          console.error('Error fetching serials:', error);
        });
    } else {
      setSerials([]);
    }
  };

  const handleSelectedSerialChange = (e) => {
    setSelectedSerial(e.target.value);
  };

  useEffect(() => {
    if (user?.userid) {
      fetchStickers(user.userid);
    }
  }, [user]);

  const fetchStickers = (userId) => {
    axios.get(`${API_BASE_URL}/getUserStickers/${userId}`)
      .then(response => {
        setStickers(response.data);
      })
      .catch(error => {
        console.error('Error fetching stickers:', error);
      });
  };

  return (
    <div>
      <User />
      <div className='center-table'>
              <div className="report">
              <h1 className="report-title">แจ้งขอเปลี่ยน/เพิ่ม/อุปกรณ์</h1>
        {user && user.userid && <div>Current User ID: {user.userid}</div>}

        <form className="submit-form">
        <div className="form-group">
        <label htmlFor="action">เลือกหัวข้อ:</label>
        <select id="action" value={action} onChange={e => setAction(e.target.value)}>
          <option value="">--กรุณาเลือก--</option>
          <option value="add">เพิ่มอุปกรณ์</option>
          <option value="change">เปลี่ยนอุปกรณ์</option>
          <option value="deletedevice">ลบอุปกรณ์</option>
        </select>
      </div>

      {action === 'add' && (
        <>
          <h2 className="section-title">แจ้งเพิ่มอุปกรณ์</h2>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="newDevice">เลือกอุปกรณ์:</label>
              <select id="newDevice" value={newDevice} onChange={e => setNewDevice(e.target.value)}>
                <option value="">--กรุณาเลือก--</option>
                {devices.map(device => (
                  <option key={device.id} value={device.id}>{device.name}</option>
                ))}
              </select>
            </div>
            {newDevice === '1' && (
              <>
                <select name="brand" onChange={handleBrandChange} value={brand} required>
                  <option value="">เลือกยี่ห้อ</option>
                  <option value="hioki">Hioki</option>
                </select>
                {brand === 'hioki' && (
                  <select name="model" onChange={handleModelChange} value={model} required>
                    <option value="">เลือกรุ่น</option>
                    <option value="3286-20">3286-20</option>
                  </select>
                )}
              </>
            )}
            {newDevice === '2' && (
              <>
                <select name="brand" onChange={handleBrandChange} value={brand} required>
                  <option value="">เลือกยี่ห้อ</option>
                  <option value="digicion">Digicion</option>
                  <option value="kyoritsu">Kyoritsu</option>
                </select>
                {brand === 'kyoritsu' && (
                  <select name="model" onChange={handleModelChange} value={model} required>
                    <option value="">เลือกรุ่น</option>
                    <option value="DM-632">DM-632</option>
                    <option value="2006">2006</option>
                  </select>
                )}
              </>
            )}
             </div>
           <div className="form-row">
            <div className="form-group">
              <label htmlFor="durable">คุรภัณฑ์:</label>
              <input type="text" id="durable" name="durable" value={durable} onChange={handleDurableChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="sticker">Sticker:</label>
              <input type="text" id="sticker" name="sticker" value={sticker} onChange={handleStickerChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="serial">Serial:</label>
              <input type="text" id="serial" name="serial" value={serial} onChange={handleSerialChange} required />
            </div>
          </div>
          <button type="button" onClick={handleAddDevice} className="submit-button">กดเพื่อแจ้งขอเพิ่มอุปกรณ์</button>
        </>
        )}

        {action === 'change' && (
          <div>
            <h2>เปลี่ยนอุปกรณ์</h2>
            <label htmlFor="selectedSticker">เลือกสติกเกอร์:</label>
            <select id="selectedSticker" value={selectedSticker} onChange={handleStickerSelect}>
              <option value="">--กรุณาเลือก--</option>
              {stickers.map(sticker => (
                <option key={sticker.sticker} value={sticker.sticker}>{sticker.sticker}</option>
              ))}
            </select>
            <br />

            <label htmlFor="selectedDevice">เลือกอุปกรณ์:</label>
            <select id="selectedDevice" value={selectedDevice} onChange={handleDeviceSelect}>
              <option value="">--กรุณาเลือก--</option>
              {userDevices.map(device => (
                <option key={device.device_id} value={device.device_id}>{device.device_name}</option>
              ))}
            </select>
            <br />

            <label htmlFor="selectedSerial">เลือก Serial:</label>
            <select id="selectedSerial" value={selectedSerial} onChange={handleSelectedSerialChange}>
              <option value="">--กรุณาเลือก--</option>
              {serials.map(serial => (
                <option key={serial.serial_number} value={serial.serial_number}>{serial.serial_number}</option>
              ))}
            </select>
            <br />

            <label htmlFor="newDevice">เลือกอุปกรณ์ที่ของจะเปลี่ยน:</label>
            <select id="newDevice" value={newDevice} onChange={e => setNewDevice(e.target.value)}>
              <option value="">--กรุณาเลือก--</option>
              {devices.map(device => (
                <option key={device.id} value={device.id}>{device.name}</option>
              ))}
            </select>
            <br />
            <div className="form-row">
            <div className="form-group">
              <label htmlFor="durable">คุรภัณฑ์:</label>
              <input type="text" id="durable" name="durable" value={durable} onChange={handleDurableChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="sticker">Sticker:</label>
              <input type="text" id="sticker" name="sticker" value={sticker} onChange={handleStickerChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="serial">Serial:</label>
              <input type="text" id="serial" name="serial" value={serial} onChange={handleSerialChange} required />
            </div>
          </div>
            <button onClick={handleChangeDevice}>กดเพื่อแจ้งขอเปลี่ยนอุปกรณ์</button>
          </div>
        )}

        {action === 'deletedevice' && (
          <div>
            <h2>ลบอุปกรณ์</h2>
            <label htmlFor="selectedSticker">เลือกสติกเกอร์:</label>
            <select id="selectedSticker" value={selectedSticker} onChange={handleStickerSelect}>
              <option value="">--กรุณาเลือก--</option>
              {stickers.map(sticker => (
                <option key={sticker.sticker} value={sticker.sticker}>{sticker.sticker}</option>
              ))}
            </select>
            <br />

            <label htmlFor="selectedDevice">เลือกอุปกรณ์:</label>
            <select id="selectedDevice" value={selectedDevice} onChange={handleDeviceSelect}>
              <option value="">--กรุณาเลือก--</option>
              {userDevices.map(device => (
                <option key={device.device_id} value={device.device_id}>{device.device_name}</option>
              ))}
            </select>
            <br />

            <label htmlFor="selectedSerial">เลือก Serial:</label>
            <select id="selectedSerial" value={selectedSerial} onChange={handleSelectedSerialChange}>
              <option value="">--กรุณาเลือก--</option>
              {serials.map(serial => (
                <option key={serial.serial_number} value={serial.serial_number}>{serial.serial_number}</option>
              ))}
            </select>
            <br />
            <button onClick={handleDeleteDevice}>กดเพื่อแจ้งขอลบอุปกรณ์</button>
          </div>
        )}
         </form>
      </div>
    </div>
    </div>
  );
}

export default Report;
