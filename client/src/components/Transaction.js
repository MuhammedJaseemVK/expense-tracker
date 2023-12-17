import React, { useContext } from 'react';
import { FaRegTrashAlt } from "react-icons/fa";
import TransactionContext from '../context/TransactionContext';
import { MdEdit } from "react-icons/md";

function Transaction({ transaction, showAlert, editTransaction, setTransaction }) {

    const { deleteTransaction } = useContext(TransactionContext);

    const handleDelete = (id) => {
        deleteTransaction(id);
        const token = localStorage.getItem('token');
        if (!token) {
            return showAlert('Cannot perform action - Login again', 'warning');
        }
        showAlert('Transaction deleted', 'danger');
    }

    return (
        <div style={{ minWidth: '400px', backgroundColor: 'white' }} className='d-flex align-items-center gap-2 w-full border border-1 border-black my-2 fs-4 p-3 rounded '>
            <div style={{width:'90%'}} className='d-flex justify-content-between'>
                <div style={{width:'100px'}}>{transaction.category}</div>
                <div >{transaction.type}</div>
                <div>{transaction.amount}</div>
            </div>
            <div className='d-flex gap-2 align-items-center' style={{width:'20%'}}>
                <FaRegTrashAlt onClick={() => handleDelete(transaction._id)} />
                <MdEdit onClick={() => editTransaction(transaction)} />
            </div>
        </div>

    )
}

export default Transaction