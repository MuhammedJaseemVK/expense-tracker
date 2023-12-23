import React, { useState } from 'react';
import UserContext from './UserContext';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function UserState(props) {
  const [user, setUser] = useState(null);
  const BASE_URL = 'https://expense-tracker-ashy-theta.vercel.app//api/v1/auth';
  const navigate = useNavigate();
  const location = useLocation();

  const getUserInfo = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        setUser(null);
        if (location.pathname === '/signup') {
          return navigate('/signup')
        }
        else {
          return navigate('/login');
        }
      }
      const response = await axios.get(`${BASE_URL}/getUserInfo/`, {
        headers: {
          "authToken": localStorage.getItem('token')
        }
      })
      console.log(response.data);
      setUser(
        {
          email:response?.data?.message.email,
          name:response?.data?.message.name
        });
      navigate('/');
    }
    catch (error) {
      if (error.response && error.response.status === 401 && error.response.data.message === "token expired") {
        console.log("token expired");
        setUser(null);
        navigate('/login');
        localStorage.removeItem('token');
      }
      console.log(error);
    }
  }
  return (
    <UserContext.Provider value={{ user,setUser, getUserInfo }} >
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState