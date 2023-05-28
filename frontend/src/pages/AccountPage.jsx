import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AllUsers, logout } from '../store/action';
import TableComponent from '../component/TableComponent';

const AccountPage = () => {
  const dispatch = useDispatch();
  const {allUsers, userDetails} = useSelector((store) => store);

  const logoutFun=()=>{
    dispatch(logout());
  }

  useEffect(()=>{
    dispatch(AllUsers(userDetails?.accessToken, userDetails?.userId))
  }, [])
  
  return (
    <>
      <div className='transaction-box'>
        <div className='user-details'>
          <p><span style={{fontWeight: "1000"}}>Admin Name:</span> {userDetails?.name}</p>
          <p><span style={{fontWeight: "1000"}}>Admin Id: </span>{userDetails?.userId}</p>
        </div>
        <button style={{alignSelf: "flex-start", padding: '10px', color: 'white', backgroundColor: "red", border: "none", borderRadius: "7px", fontWeight: "1000", cursor: "pointer"}} onClick={logoutFun}>Logout</button>
      </div>
      <div>
        <TableComponent heading={"Users"} headerArr={["Users ID", "Name", "Email", "Username", "Amount"]} list={allUsers} show={'user'}/>
      </div>
    </>
  )
}

export default AccountPage