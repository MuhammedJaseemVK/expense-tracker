import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login(props) {
  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/login', data);
      console.log(response.data);
      const token = response.data.token
      if(!token){
        props.showAlert(response.data.message,'danger')
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
    <div className='my-5'>
      <form style={{ maxWidth: '400px', margin: 'auto' }} onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' value={data.email} aria-describedby="emailHelp" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" value={data.password} name='password' onChange={handleChange} minLength={8} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Login