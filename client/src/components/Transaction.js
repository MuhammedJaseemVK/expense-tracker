import React, { useContext } from 'react';
import { FaRegTrashAlt } from "react-icons/fa";
import TransactionContext from '../context/TransactionContext';
import { MdEdit } from "react-icons/md";

function Transaction({ transaction, showAlert, editTransaction,setTransaction }) {

    const { deleteTransaction } = useContext(TransactionContext);

    const handleDelete = (id) => {
        deleteTransaction(id);
        const token=localStorage.getItem('token');
        if (!token) {
            return showAlert('Cannot perform action - Login again', 'warning');
        }
        showAlert('Transaction deleted', 'danger');
    }

    return (
        <div style={{ minWidth: '400px', backgroundColor: 'yellow' }} className='d-flex flex-row align-items-center justify-content-between my-2 fs-3 p-3 rounded'>
            <div className='d-block'>{transaction.category}</div>
            <div className='d-flex gap-3 align-items-center'>
                <div className='fs-5'>{transaction.type}</div>
                <div>{transaction.amount}</div>
                <FaRegTrashAlt onClick={() => handleDelete(transaction._id)} />
                <MdEdit onClick={() => {editTransaction(transaction)}} />
            </div>
        </div>
    )
}

export default Transaction