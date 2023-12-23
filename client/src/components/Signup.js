import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import UserContext from '../context/UserContext';

function Signup(props) {

    const [data, setData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const navigate = useNavigate();
    const {getUserInfo} =useContext(UserContext);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        const verifyToken = async () => {
            await getUserInfo();
        }
        verifyToken();
        // eslint-disable-next-line
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (data.password !== data.confirmPassword) {
            props.showAlert('Passwords do not match', 'danger')
            return
        }
        try {
            const response = await axios.post('expense-tracker-server-9cwqshmgd-jaseems-projects.vercel.app/api/v1/auth/register', data)
            console.log(response);
            const success = response.data.success;
            if (success) {
                setData({ name: '', email: '', password: '', confirmPassword: '' });
                props.showAlert('Account created successfully', 'success')
                navigate('/login');
            }
        }
        catch (error) {
            if (error.response) {
                const message = error.response.data.message;
                props.showAlert(message, 'danger');
            } else {
                console.error(error);
            }
        }
    }

    return (
        <div className='px-3 bg-dark-subtle'>
            <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control border border-1 border-black" id="name" name="name" onChange={handleChange} minLength={3} required value={data.name} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control border border-1 border-black" id="email" name="email" aria-describedby="emailHelp" onChange={handleChange} required value={data.email} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control border border-1 border-black" id="password" name='password' onChange={handleChange} minLength={8} required value={data.password} />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm password</label>
                    <input type="password" className="form-control border border-1 border-black" id="confirmPassword" name='confirmPassword' onChange={handleChange} minLength={8} required value={data.confirmPassword} />
                </div>
                <button type="submit" className="btn btn-dark">Signup</button>
            </form>
            <div className='mt-2'>
                <Link to='/login' className='text-center'>
                    <p>Already have an account? Login</p>
                </Link>
            </div>
        </div>
    )
}

export default Signup