import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { AllTransactionByUser } from '../store/action';
import TableComponent from '../component/TableComponent';

const UserDetailsPage = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const {userTrasaction, userDetails} = useSelector((store) => store);
  
  useEffect(()=>{
    dispatch(AllTransactionByUser(userDetails?.accessToken, id, userDetails?.userId))
  }, []);

  return (
    <div>
      <TableComponent heading={'All Transactions'} headerArr={['Transaction ID', 'Transaction Type', 'Amount', 'Timestamp']} list={userTrasaction}/>
    </div>
  )
}

export default UserDetailsPage