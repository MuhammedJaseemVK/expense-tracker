import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Signup() {

    const [data, setData] = useState({ name: '', email: '', password: '' });
    const navigate=useNavigate();
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/register', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log(response.data);
            setData({ name: '', email: '', password: '' });
            navigate('/login');
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='container'>
            <form className='my-3' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={handleChange} minLength={3} value={data.name} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={handleChange} value={data.email}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={handleChange} minLength={3} value={data.password} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>
    )
}

export default Signup