import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddAmount } from '../store/action';

const PopupModel = ({ isOpen, onClose, popupData, amount}) => {
  const [inputAmount, setInputAmount] = useState(0);
  const dispatch = useDispatch();
  const {userDetails} = useSelector((store) => store);

  const operationFun = () => {  
    dispatch(AddAmount(inputAmount, popupData, userDetails?.accessToken, userDetails?.userId));
    onClose();
    setInputAmount("");
  }

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <div className='information'>
          <p>Available Balance: {amount}</p>
          <input placeholder='Enter deposit amount' onChange={(e) => setInputAmount(e.target.value)} type='number' value={inputAmount}/>
          <button onClick={operationFun}>{popupData==="deposit" ? "Deposit" : "Withdraw"}</button>
        </div>
      </div>
    </div>
  );
};

export default PopupModel;
