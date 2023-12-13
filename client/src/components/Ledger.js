import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Transaction from './Transaction';
import TransactionContext from '../context/TransactionContext';
import AddTransaction from './AddTransaction';

function Ledger({ showAlert }) {
    const navigate = useNavigate();
    const openRef = useRef(null);
    const closeRef = useRef(null);

    const [transaction, setTransaction] = useState({
        amount: '',
        type: '',
        category: ''
    })

    const { transactions, getAllTransactions, updateTransaction } = useContext(TransactionContext);

    const editTransaction = (currentTransaction) => {
        openRef.current.click();
        setTransaction(currentTransaction);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        updateTransaction(transaction._id,transaction);
        closeRef.current.click();
    }

    const handleChange = (e) => {
        setTransaction({ ...transaction, [e.target.name]: e.target.value });
    }

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
            <AddTransaction showAlert={showAlert} />
            <form onSubmit={handleSubmit}>
                <button ref={openRef} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                </button>
                <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Update transaction</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="amount" className="form-label">amount</label>
                                    <input type="number" className="form-control" id="amount" name="amount" value={transaction.amount} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="type" className="form-label">transaction type</label>
                                    <input type="text" className="form-control" id="type" name="type" value={transaction.type} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="category" className="form-label">Category</label>
                                    <input type="text" className="form-control" id="category" name="category" value={transaction.category} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button ref={closeRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <div className=' d-flex flex-column align-items-center my-5'>
                {transactions.length > 0 ? transactions.map((transaction) =>
                    <Transaction key={transaction._id} transaction={transaction} showAlert={showAlert} editTransaction={editTransaction}  />
                ) :
                    (<div>No transactions</div>)
                }
            </div>
        </div>
    )
}

export default Ledger