import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { userLogin } from '../store/action';

const Login = () => {
  const navigate = useNavigate();
  const [loginToggle, setLoginToggle] = useState('customer');
  const [loginData, setLoginData] = useState({email: "", password: ""});
  const dispatch = useDispatch();

  const adminLoginPage = () =>{
    if(loginToggle==="customer"){
      setLoginData({email: "admin@gmail.com", password: "admin@123"});
      setLoginToggle('admin');
    }else{
      setLoginData({email: "", password: ""});
      setLoginToggle('customer');
    }
  }

  const loginForm= (e) => {
    e.preventDefault();
    dispatch(userLogin(loginData, loginToggle, navigate));
  }

  const handleOnchange = (e) => {
    const {name, value} = e.target;
    setLoginData({...loginData, [name]: value})
  }
  return (
    <div className='login-box'>
      <div className='mainBox'>
        <h2 style={{textAlign: "center"}}>{loginToggle==="customer" ? "Customer" : 'Admin'} Login</h2>
        <form action="" onSubmit={loginForm}>
          <input type='email' placeholder='Enter your email' onChange={handleOnchange} name='email' value={loginData?.email}/>
          <input type='password' placeholder='Enter your Password' onChange={handleOnchange} name='password' value={loginData?.password}/>
          <button>Login</button>
          <p className='admin-login-btn' onClick={adminLoginPage}>{loginToggle==="customer" ? 'Admin Login': 'Customer Login'}</p>
        </form>
      </div>
    </div>
  )
}

export default Login
