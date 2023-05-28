import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { userCreate, userLogin } from '../store/action';
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [loginOption, setLoginOption] = useState('customer-login');
  const [loginData, setLoginData] = useState({email: "", password: ""});
  const dispatch = useDispatch();
  const {loading} = useSelector((store) => store);

  const handleDecideOption = (value) =>{
    setLoginOption(value)
    console.log(value)
    if(value==='customer-login' || value==='admin-login'){
      setLoginData({email: "", password: ""})
    }
    if(value==='create-customer' || value==='create-admin'){
      setLoginData({email: "", password: "", username: "", name: ""})
    }
  }
  

  const loginForm= (e) => {
    e.preventDefault();
    if(loginOption==="create-customer" || loginOption==="create-admin"){
      dispatch(userCreate(loginData, (loginOption==="create-customer") ? "customer" : "admin", setLoginOption, setLoginData, toast));
    }else{
      dispatch(userLogin(loginData, loginOption==="customer-login" ? "customer" : "admin", navigate, toast));
    }
  }

  const handleOnchange = (e) => {
    const {name, value} = e.target;
    setLoginData({...loginData, [name]: value})
  }

  return (
    <div className='login-box'>
      <div className='mainBox'>
        <h2 style={{textAlign: "center", paddingBottom: "20px"}}>{loginOption==="customer-login" ? "Customer Login" : loginOption==="create-customer" ? "Create Customer Account" :  loginOption==="create-admin" ? "Create Admin Account" : 'Admin Login' }</h2>
        <form action="" onSubmit={loginForm}>
          {
          (loginOption==="create-customer" || loginOption==="create-admin") &&
            <>
              <input type='text' placeholder='Enter your name' onChange={handleOnchange} name='name' value={loginData?.name}/>
              <input type='text' placeholder='Enter your username' onChange={handleOnchange} name='username' value={loginData?.username}/>
            </>
          }
          <input type='email' placeholder='Enter your email' onChange={handleOnchange} name='email' value={loginData?.email}/>
          <input type='password' placeholder='Enter your Password' onChange={handleOnchange} name='password' value={loginData?.password}/>
          <button disabled={loading}>{(loginOption==="customer-login" || loginOption==="admin-login") ? "Login" : "Create Account"}</button>
        </form>
        {
          loginOption==="customer-login" ?(
            <div className='login-option'>
              <p style={{fontWeight: 500}}>Create customer account:<span className='admin-login-btn' onClick={()=>handleDecideOption('create-customer')}> Click Now</span></p>
              <p className='admin-login-btn' onClick={()=>handleDecideOption('admin-login')}>Admin Login</p>
            </div>
          ) : loginOption==="create-admin" ? (
            <div className='login-option1'>
              <p className='admin-login-btn' onClick={()=>handleDecideOption('admin-login')}>Admin Login</p>
            </div>
          ) : loginOption==="create-customer" ? (
            <div className='login-option1'>
              <p className='admin-login-btn' onClick={()=>handleDecideOption('customer-login')}>Customer Login</p>
            </div>
          ) : (
            <div className='login-option'>
              <p style={{fontWeight: 500}}>Create admin account:<span className='admin-login-btn' onClick={()=>handleDecideOption('create-admin')}> Click Now</span></p>
              <p className='admin-login-btn' onClick={()=>handleDecideOption('customer-login')}>Customer Login</p>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Login
