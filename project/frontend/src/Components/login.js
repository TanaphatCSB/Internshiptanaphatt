
// // login.js
// import React, { useState, useContext } from 'react';
// import Loginvalidation from './loginvalid';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { UserContext } from './userContext';
// import { AdminContext } from './adminContext';

// export default function Login() {
//   const [values, setValues] = useState({ email: '', password: '' });
//   const { setUser } = useContext(UserContext);
//   const navigate = useNavigate();
//   const [errors, setErrors] = useState({});

//   const handleInput = (event) => {
//     setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const validationErrors = Loginvalidation(values);
//     setErrors(validationErrors);

//     if (validationErrors.email === "" && validationErrors.password === "") {
//       axios.post('http://localhost:8081/login', values)
//         .then((res) => {
//           if (res.data.message === "Success") {
//             const role = res.data.role;
//             const name = res.data.name;
//             const email = res.data.email;
//             const user = { email, role, name };
//             setUser(user);
//             localStorage.setItem('user', JSON.stringify(user));
//             if (role === "users") {
//               navigate('/user');
//             } else if (role === "admin") {
//               navigate('/admin');
//             }
//           } else {
//             alert("ไม่มีข้อมูล");
//           }
//         })
//         .catch((err) => console.log(err));
//     }
//   };

//   return (
//     <div className="Login">
//       <div className="Loginbox">
//         <h2>Login</h2>
//         <form onSubmit={handleSubmit}>
//           <div className='form-group'>
//             <label>Email</label>
//             <input type="email" onChange={handleInput} name="email" className="form-control" id="email" />
//             {errors.email && <span>{errors.email}</span>}
//           </div>
//           <div className='form-group'>
//             <label>รหัสผ่าน</label>
//             <input type="password" onChange={handleInput} name="password" className="form-control" id="password" />
//             {errors.password && <span>{errors.password}</span>}
//           </div>
//           <button type="submit" className="btn btn-success">Login</button>
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useState, useContext } from 'react';
import Loginvalidation from './loginvalid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './userContext';
import { AdminContext } from './adminContext';
import '../css/login.css'

export default function Login() {
  const [values, setValues] = useState({ email: '', password: '' });
  const { setUser } = useContext(UserContext);
  const { setAdmin } = useContext(AdminContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = Loginvalidation(values);
    setErrors(validationErrors);

    if (validationErrors.email === "" && validationErrors.password === "") {
    //  axios.post('https://senddvice123.000webhostapp.com/login', values)
    //  axios.post(`https://internshiptanaphatt-production.up.railway.app/login`, values)
    axios.post(`${process.env.REACT_APP_API_URL}/login`, values)

      // axios.post('http://localhost:3000/login', values)
        .then((res) => {
          if (res.data.message === "Success") {
            //  localStorage.setItem('userId', res.data.userId); // เพิ่่มมาวันที่ 5/6/67
            const role = res.data.role;
            const name = res.data.name;
            const email = res.data.email;
            const userid = res.data.userid;//เพิ่มมา 5/6/67
            const user = { email, role, name ,userid};
            if (role === "users") {
              setUser(user);
              localStorage.setItem('user', JSON.stringify(user));
              navigate('/user');
            } else if (role === "admin") {
              setAdmin(user);
              localStorage.setItem('admin', JSON.stringify(user));
              navigate('/admin');
            }
          } else {
            alert("ไม่มีข้อมูล");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className='Loginhead'>
       <div className="Login">
      <div className="Loginbox">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>Email</label>
            <input type="email" onChange={handleInput} name="email" className="form-control" id="email" />
            {errors.email && <span>{errors.email}</span>}
          </div>
          <div className='form-group'>
            <label>รหัสผ่าน</label>
            <input type="password" onChange={handleInput} name="password" className="form-control" id="password" />
            {errors.password && <span>{errors.password}</span>}
          </div>
          <button type="submit" className="btn btn-success">Login</button>
        </form>
      </div>
    </div>
    </div>
  );
}
