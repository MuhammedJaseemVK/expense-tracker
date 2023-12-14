import React, { useEffect, useContext } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import UserContext from '../context/UserContext';

function Login(props) {
  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const { getUserInfo } = useContext(UserContext);

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

    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/login', data);
      console.log(response.data);
      const token = response.data.token
      if (!token) {
        props.showAlert(response.data.message, 'danger')
        return
      }
      if (token) {
        localStorage.setItem('token', token);
        props.showAlert('Logged in successfully', 'success');
        navigate('/');
      }
    }
    catch (error) {
      if (error.response) {
        const message = error.response.data.message;
        props.showAlert(message, 'danger');
      }
      else {
        console.error(error);
      }
    }
  }

  return (
    <div className='my-5 '>
      <form style={{ maxWidth: '400px' }} className='mx-auto' onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' value={data.email} aria-describedby="emailHelp" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" value={data.password} name='password' onChange={handleChange} minLength={8} required />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      <div className='mt-2'>
        <Link to='/signup' className='text-center'>
          <p>Don't have an account? Signup</p>
        </Link>
      </div>
    </div>
  )
}

export default Login