import React, { useEffect, useState } from 'react'
import PopupModel from '../component/PopupModal'
import { useDispatch, useSelector } from 'react-redux';
import { AllTransaction } from '../store/action';
import TableComponent from '../component/TableComponent';

const TransactionPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [popupData, setPopupData] = useState("");
  const {userDetails, transaction} = useSelector((store) => store);
  const dispatch = useDispatch();

  const openModal = (text) => {
    setIsOpen(true);
    setPopupData(text);
  };

  const closeModal = () => {
    setIsOpen(false);
    setPopupData("")
  };

  useEffect(() => {
    dispatch(AllTransaction(userDetails?.accessToken, userDetails?.userId));
  }, [])

  return (
    <>
    <div className='transaction-box'>
      <div className='transaction-btn'>
        <button onClick={() => openModal("deposit")}>Deposit</button>
        <button onClick={() => openModal("withdraw")}>Withdraw</button>
      </div>
    </div>
    <PopupModel isOpen={isOpen} onClose={closeModal} popupData={popupData} amount={userDetails?.amount}/>
    <TableComponent heading={'Transactions'} headerArr={['Transaction ID', 'Transaction Type', 'Amount', 'Timestamp']} list={transaction}/>
    </>
  )
}

export default TransactionPage;