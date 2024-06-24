import React, { useState } from 'react';
import Validation from './registervalid';
import axios from 'axios';
import '../css/register.css'
import Adminhome from './adminhome'

export default function Register() {

    const [values, setValues] = useState({
        name: "",
        surname: "",
        email: "",
        password: ""
    });

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    }

    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).every(key => validationErrors[key] === "")) {
            axios.post('http://localhost:8081/register', values)
                .then(res => {
                    if (res.data.error) {
                        setServerError(res.data.error);
                    } else {
                        setServerError("");
                        console.log(res.data);
                        // Handle successful registration, e.g., redirect to login
                    }
                })
                .catch(err => {
                    setServerError("An error occurred. Please try again.");
                    console.log(err);
                });
        }
    }

    return (
        <><div>
             <Adminhome/>
             <div class ="center-table">
        <div className='Registerhead'>
           
            <div className="Registerform">
                <div className="registerbox">
                    <h2>สมัครสมาชิก</h2>

                    <form onSubmit={handleSubmit}>
                        <div className='form-groupregister'>
                            <label>ชื่อ</label>
                            <input type="text" onChange={handleInput} name='name' className="form-control" id="name"></input>
                            {errors.name && <span>{errors.name}</span>}
                        </div>

                        <div className='form-groupregister'>
                            <label>นามสกุล</label>
                            <input type="text" onChange={handleInput} name='surname' className="form-control" id="surname"></input>
                            {errors.surname && <span>{errors.surname}</span>}
                        </div>

                        <div className='form-groupregister'>
                            <label>Email</label>
                            <input type="email" onChange={handleInput} name="email" className="form-control" id="email"></input>
                            {errors.email && <span>{errors.email}</span>}
                            {serverError && <div className="error">{serverError}</div>}
                        </div>

                        <div className='form-groupregister'>
                            <label>รหัสผ่าน</label>
                            <input type="password" onChange={handleInput} name="password" className="form-control" id="password"></input>
                            {errors.password && <span>{errors.password}</span>}
                        </div>
                        <br/>
                        <button type="submit" className="btn btn-primary">ลงทะเบียน</button>
                    </form>
                </div>
            </div>
            </div>
            </div>
            </div>
        </>
    );
}
