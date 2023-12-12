import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup(props) {

    const [data, setData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const navigate = useNavigate();
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (data.password !== data.confirmPassword) {
            props.showAlert('Passwords do not match','danger')
            return
        }
        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/register', data)
            console.log(response);
            const success= response.data.success;
            if(success){
                setData({ name: '', email: '', password: '', confirmPassword: '' });
                props.showAlert('Account created successfully','success')
                navigate('/login');
            }
        }
        catch (error) {
            if(error.response){
                const message =error.response.data.message;
                props.showAlert(message,'danger');
            } else {
                console.error(error);
            }
        }
    }

    return (
        <div className='my-5'>
            <form  onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={handleChange} minLength={3} value={data.name} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={handleChange} value={data.email} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={handleChange} minLength={8} value={data.password} />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm password</label>
                    <input type="password" className="form-control" id="confirmPassword" name='confirmPassword' onChange={handleChange} minLength={8} value={data.confirmPassword} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>
    )
}

export default Signup