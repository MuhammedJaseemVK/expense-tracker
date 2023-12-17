import React, { useContext, useEffect, useRef, useState } from 'react';
import Transaction from './Transaction';
import TransactionContext from '../context/TransactionContext';
import AddTransaction from './AddTransaction';

function Ledger({ showAlert, searchTerm }) {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateTransaction(transaction._id, transaction);
        closeRef.current.click();
        const token = localStorage.getItem('token');
        if (!token) {
            return showAlert('Cannot perform action - Login again', 'warning');
        }
        await getAllTransactions();
        showAlert('Transaction edited successfully', 'success');
    }

    const handleChange = (e) => {
        setTransaction({ ...transaction, [e.target.name]: e.target.value });
    }

    const handleType = (e) => {
        setTransaction({ ...transaction, type: e.target.value });
    }

    useEffect(() => {
        const verifyToken = async () => {
            await getAllTransactions();
        }
        verifyToken();
        // eslint-disable-next-line
    }, []);

    return (
        <div className='container d-flex flex-column align-items-center'>
            <AddTransaction showAlert={showAlert} />
            <form onSubmit={handleSubmit}>
                <button ref={openRef} type="button" className="btn btn-dark d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                </button>
                <div className="modal" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-dark-subtle">
                                <h5 className="modal-title">Update transaction</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body bg-dark-subtle">
                                <div className="mb-3">
                                    <label htmlFor="amount" className="form-label">Amount</label>
                                    <input type="number" className="form-control border border-1 border-black" id="amount" name="amount" value={transaction.amount} onChange={handleChange} required />
                                </div>
                                <select className="form-select mb-3 border border-1 border-black" aria-label="Default select example" value={transaction.type} required onChange={handleType}>
                                    <option value="" disabled>Select transaction type</option>
                                    <option value='income'>Income</option>
                                    <option value='expense'>Expense</option>
                                </select>
                                <div className="mb-3">
                                    <label htmlFor="category" className="form-label">Category</label>
                                    <input type="text" className="form-control border border-1 border-black" id="category" name="category" value={transaction.category} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="modal-footer bg-dark-subtle">
                                <button ref={closeRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-dark">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div className='rounded border border-1 bg-white p-2 mb-3 fw-bold'>
                Balance : {transactions.reduce((accu, transaction) => {
                    if (transaction.type === 'income') {
                        return accu + transaction.amount;
                    }
                    else if (transaction.type === 'expense') {
                        return accu - transaction.amount;
                    }
                    return accu;
                }, 0) || 0}
            </div>

            <div className=' d-flex flex-column align-items-center '>
                {transactions.length > 0 && (
                    <div className='d-flex gap-3'>
                        <div className='rounded border border-1 bg-white text-success fw-bold p-2 mb-3'>
                            Income : {transactions.reduce((accu, transaction) => {
                                if (transaction.type === 'income') {
                                    return accu + transaction.amount;
                                }
                                return accu;
                            }, 0) || 0}
                        </div>
                        <div className='rounded border border-1 bg-white text-danger fw-bold p-2 mb-3'>
                            Expense : {transactions.reduce((accu, transaction) => {
                                if (transaction.type === 'expense') {
                                    return accu + transaction.amount;
                                }
                                return accu;
                            }, 0) || 0}
                        </div>
                    </div>

                )
                }
                {transactions.length > 0 ? (
                    transactions
                        .filter((transaction) => transaction.category.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((filteredTransaction) => (
                            <Transaction
                                key={filteredTransaction._id}
                                transaction={filteredTransaction}
                                showAlert={showAlert}
                                editTransaction={editTransaction}
                            />
                        ))
                ) : (
                    <div>No transactions</div>
                )}

            </div>
        </div>
    )
}

export default Ledger