import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AllUsers } from '../store/action';
import TableComponent from '../component/TableComponent';

const AccountPage = () => {
  const dispatch = useDispatch();
  const {allUsers, userDetails} = useSelector((store) => store);

  useEffect(()=>{
    dispatch(AllUsers(userDetails?.accessToken, userDetails?.userId))
  }, [])
  return (
    <div>
      <TableComponent heading={"Users"} headerArr={["Users ID", "Email", "Username", "Amount"]} list={allUsers} show={'user'}/>
    </div>
  )
}

export default AccountPage