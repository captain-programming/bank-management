import React, { useEffect, useState } from 'react'
import PopupModel from '../component/PopupModal'
import { useDispatch, useSelector } from 'react-redux';
import { AllTransaction } from '../store/action';

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
    <div className='display-data'>
      <h1>Transactions</h1>
      <table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Amount</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {transaction.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction._id}</td>
              <td>{transaction.transactionType}</td>
              <td>{transaction.amount}</td>
              <td>{new Date(transaction.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  )
}

export default TransactionPage