import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login';
import AccountPage from './AccountPage';
import TransactionPage from './TransactionPage';
import PrivateRooute from '../component/PrivateRooute';

const AllRoutes = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Login />}/>
      <Route path='/account' element={<PrivateRooute><AccountPage /> </PrivateRooute>}/>
      <Route path='/transaction' element={<PrivateRooute><TransactionPage /></PrivateRooute>}/>
    </Routes>
    </>
  )
}

export default AllRoutes