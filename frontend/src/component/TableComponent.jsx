import React from 'react'
import { useNavigate } from 'react-router-dom'

const TableComponent = ({heading, headerArr, list, show}) => {
  const navigate = useNavigate();

  const handleNextPage = (id) =>{
    navigate(`/account/user/${id}`);
  }

  return (
    <div className='display-data'>
      <h1>{heading}</h1>
      <table className='table'>
        <thead>
          <tr>
            {headerArr?.map((title, i) => (
              <th key={i}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {show==="user" ? 
            list?.map((user) => (
              <tr key={user._id} style={{cursor: "pointer"}} onClick={()=>handleNextPage(user._id)}>
                <td>{user._id}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>{user.amount}</td>
              </tr>
            )) : 
            list?.map((transaction) => (
              <tr key={transaction._id}>
                <td>{transaction._id}</td>
                <td>{transaction.transactionType}</td>
                <td>{transaction.amount}</td>
                <td>{new Date(transaction.timestamp).toLocaleString()}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default TableComponent