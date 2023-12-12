import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Transaction from './Transaction';
import TransactionContext from '../context/TransactionContext';
import AddTransaction from './AddTransaction';

function Ledger() {
    const navigate = useNavigate();
    const { transactions, getAllTransactions } = useContext(TransactionContext);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
        else {
            getAllTransactions();
        }
        // eslint-disable-next-line
    }, []);



    return (
        <div className='container d-flex flex-column align-items-center'>
            <AddTransaction />
            <div className=' d-flex flex-column align-items-center my-5'>
                {transactions.length > 0 ? transactions.map((transaction) =>
                    <Transaction key={transaction._id} transaction={transaction} />
                ) :
                    (<div>No transactions</div>)
                }
            </div>
        </div>
    )
}

export default Ledger