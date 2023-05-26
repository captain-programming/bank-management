import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRooute = ({children}) => {
  const {accessToken} = useSelector((store) => store);

  if(!accessToken){
    return <Navigate to={'/'}/>
  }
  
  return children
}

export default PrivateRooute