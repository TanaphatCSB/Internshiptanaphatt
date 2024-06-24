import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from './userContext';
import User from './user';


function Submit2() {
  const [device,setDevice] = useState("");
  const [brand,setBrand] = useState("");
  const [model, setModel] = useState('');
  const[serial,setSerial] = useState("");
  const [assignment, setAssignment] = useState("");
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");
  const [testreport,settestreport] = useState("");
  const [remark,setRemark] = useState("");
  const { user } = useContext(UserContext);
  

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   if (!assignment || assignment === "") {
  //     alert("Please select an assignment.");
  //     return;
  //   }
  //   if (!left || left === "") {
  //     alert("Please select an option for ซ้าย.");
  //     return;
  //   }
  //   if (!right || right === "") {
  //     alert("Please select an option for ขวา.");
  //     return;
  //   }
  //   if (user) {
  //     try {
  //       await axios.post('http://localhost:8081/submitAssignment', {
  //         device,
  //         brand,
  //         model,
  //         serial,
  //         assignment,
  //         left,
  //         right,
  //         remark,
  //         name: user.name,
  //         userId: user.userId
  //       });
  //       alert('Assignment submitted successfully');
  //     } catch (error) {
  //       console.error('There was an error submitting the assignment!', error);
  //       alert('There was an error submitting the assignment.');
  //     }
  //   } else {
  //     alert('Please log in to submit an assignment.');
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!assignment || assignment === "") {
      alert("Please select an assignment.");
      return;
    }
    if (!left || left === "") {
      alert("Please select an option for ซ้าย.");
      return;
    }
    if (!right || right === "") {
      alert("Please select an option for ขวา.");
      return;
    }
    if (user) {
      try {
        await axios.post('http://localhost:8081/submitForApproval1', {
          device,
          brand,
          model,
          serial,
          assignment,
          left,
          right,
          testreport,
          remark,
          name: user.name,
        });
        alert('Assignment submitted successfully');
      } catch (error) {
        console.error('There was an error submitting the assignment!', error);
        alert('There was an error submitting the assignment.');
      }
    } else {
      alert('Please log in to submit an assignment.');
    }
  };

  const handleReset = () => {
    setDevice("");
    setBrand("");
    setModel("");
    setSerial("");
    setAssignment("");
    setLeft("");
    setRight("");
    settestreport("");
    setRemark("");
  };

  return (
    <div>
      <User />
      <div className="condiv">
        <div>
          <p>Currently logged in as: {user ? user.name : 'Guest'}</p>
        </div>
        <form onSubmit={handleSubmit} className="submitfrom">
          <h1>ส่งตรวจเครื่องมือรอบ3</h1>
          <label>
            อุปกรณ์:
            <select value={device} onChange={(e) => setDevice(e.target.value)}>
            <option value="">---</option>
            <option value="CLAMP ON POWER METER">CLAMP ON POWER METER</option>
            <option value="CLIP ON VOLT AMMETER 1mA.200A.500V.">CLIP ON VOLT AMMETER 1mA.200A.500V.</option>
            <option value="CLIP ON VOLD AMMETER 400A.600V">CLIP ON VOLD AMMETER 400A.600V</option>
            <option value="CLIP ON VOLD AMMETER 600A.600V">CLIP ON VOLD AMMETER 600A.600V</option>
            <option value="CLIP ON VOLD AMMETER 1000A.600V">CLIP ON VOLD AMMETER 1000A.600V</option>
            <option value= "HV.DETECTOR (กระบอกเหลือง)">HV.DETECTOR (กระบอกเหลือง)</option>
            <option value="CLAMP STICK 8'">CLAMP STICK 8'</option>
            <option value="INSULATING BLANKET">INSULATING BLANKET (ผ้าห่มยาง)</option>
            <option value="PHASE ROTATION METER">PHASE ROTATION METER</option>
            <option value="PHASE ROTATION METER PD3129-10">PHASE ROTATION METER PD3129-10</option>
            <option value="TELESCOPIC UNIVERSAL POLE">TELESCOPIC UNIVERSAL POLE</option>
            <option value="UNIVERSAL POLE 8'">UNIVERSAL POLE 8'</option>
            <option value="WIRELESS CURRENT METER">WIRELESS CURRENT METER</option>
            <option value="CLIP ON VOLT AMP.(จ้าง)">CLIP ON VOLT AMP.(จ้าง)</option>
            <option value="PHASE ROTATION METER(จ้าง)">PHASE ROTATION METER(จ้าง)</option>
            <option value="RUBBER GLOVES 1000V.(จ้าง)">RUBBER GLOVES 1000V.(จ้าง)</option>
            <option value="RUBBER GLOVES 1000V.(ถุงแดง)">RUBBER GLOVES 1000V.(ถุงแดง)</option>
            </select>

           
          </label>
          <br/>
          <label>
            ยี่ห้อ
            <select value={brand} onChange={(e) => setBrand(e.target.value)}>
               <option value="">---</option>
              <option value = "Kyoritsu">KYORITSU</option>
              <option value= "Novax">NOVAX</option>
              <option value= "Hioki">HIOKI</option>
              <option value= "Etcr">ETCR</option>
              <option value= "Sanwa">SANWA</option>
              <option value = "uni-t">UNI-T</option>
              <option value ="9Novax">9 NOVAX</option>
              <option value ="Sibille safe">SIBILLE SAFE</option>
              <option value ="Hasting">HASTING</option>
              <option value ="Sensorlink">SENSORLINK</option> 
           
            </select>

            <br/>
        

         
            {brand === 'Kyoritsu' && (
        <select value={model} onChange={(e) => setModel(e.target.value)}>
          <option value="">เลือกรุ่น/เบอร์</option>
          <option value="KEW 2117R">KEW 2117R</option>
          <option value="2006">2006</option>
          <option value="DM-632">DM-632</option>
          <option value="2017">2017</option>
          <option value="2608A แบบเข็ม">2608A แบบเข็ม</option>
          <option value="200">200</option>
          <option value="SNAP 200">SNAP 200</option>
          <option value="8031">8031</option>
        </select>
      )}

          {brand === 'Hioki' && (
              <select value={model} onChange={(e) => setModel(e.target.value)}>
              <option value="">เลือกรุ่น/เบอร์</option>
              <option value="3286-20">3266-20</option>
              <option value= "3126-01">3126-01</option>
              <option value="PD3126-10">PD3126-10</option>
              <option value="3122">3122</option>
            </select>
          )}



          {brand === 'Etcr' && (
              <select value={model} onChange={(e) => setModel(e.target.value)}>
              <option value="">เลือกรุ่น/เบอร์</option>
              <option value="1000C">1000C</option>
            </select>
          )}
          {brand === 'Sanwa' && (
              <select value={model} onChange={(e) => setModel(e.target.value)}>
              <option value="">เลือกรุ่น/เบอร์</option>
              <option value="1000C">KS1</option>
            </select>
          )}

          {brand === 'uni-t' && (
             <select value={model} onChange={(e) => setModel(e.target.value)}>
             <option value="">เลือกรุ่น/เบอร์</option>
             <option value="Ut202">Ut202</option>
             <option value= "Ut202A">Ut202A</option>
             <option value="Ut203">Ut203</option>
             <option value="Ut262A">Ut262A</option>
           </select>
          )}

          {brand === '9Novax' && (
              <select value={model} onChange={(e) => setModel(e.target.value)}>
              <option value="">เลือกรุ่น/เบอร์</option>
              <option value="D120แดง">D120แดง</option>
              <option value="D120ดำ">D120ดำ</option>
            </select>
          )}

          {brand === 'Sibille safe' && (
              <select value={model} onChange={(e) => setModel(e.target.value)}>
              <option value="">เลือกรุ่น/เบอร์</option>
              <option value="GLB 0">GLB 0</option>
            </select>
          )}

          {brand === 'Hasting' && (
             <select value={model} onChange={(e) => setModel(e.target.value)}>
             <option value="">เลือกรุ่น/เบอร์</option>
             <option value="HV-235">HV-235</option>
             <option value="567-8">567-8</option>
           </select>
          )}

          {brand === "Sensorlink" && (
            <select value={model} onChange={(e) => setModel(e.target.value)}>
            <option value="">เลือกรุ่น/เบอร์</option>
            <option value="221265">221265</option>
            <option value="OPENED LOOP">567-8</option>
            <option value="6-120">6-120</option>
          </select>
          )}
          </label>
          <br/>
          <label>
            Serial, ซ้าย-ขวา
            <input type ="text" value={serial} onChange={(e)=>setSerial(e.target.value)}></input>
          </label>
          <br/>
          <label>
            สถานะ : 
            <select value={assignment} onChange={(e) => setAssignment(e.target.value)}>
              <option value="">---</option>
              <option value="ผ่าน">ผ่าน</option>
              <option value="ไม่ผ่าน">ไม่ผ่าน</option>
              <option value="เสีย">เสีย</option>
            </select>
          </label>
          <br/>
          <label>
            ซ้าย
            <select value={left} onChange={(e) => setLeft(e.target.value)}>
              <option value="">---</option>
              <option value="ผ่าน">ผ่าน</option>
              <option value="ไม่ผ่าน">ไม่ผ่าน</option>
              <option value="เสีย">เสีย</option>
            </select>

            ค่า <input type ="text"></input>
          </label>
          <br/>
          <label>
            ขวา
            <select value={right} onChange={(e) => setRight(e.target.value)}>
              <option value="">---</option>
              <option value="ผ่าน">ผ่าน</option>
              <option value="ไม่ผ่าน">ไม่ผ่าน</option>
              <option value="เสีย">เสีย</option>
            </select>
            ค่า <input type ="text"></input>
          </label>
          
          <br/>
          <label>
            Test report <input type ="text" value={testreport} onChange={(e)=>settestreport(e.target.value)}></input>
          </label>
        
        <br/>
          <label>
          หมายเหตุ(ถ้ามี) <input type ="text" value={remark} onChange={(e)=>setRemark(e.target.value)}></input>
          </label>
          <br/>
          <button type="submit" onChange={handleSubmit}>ส่ง</button>
          <button type="reset" onChange={handleReset} className="resetbutton">รีเซ็ต</button>
        </form>
      </div>
    </div>
  );
}

export default Submit2;
