import React, { useContext, useState } from 'react'
import TransactionContext from '../context/TransactionContext';

function AddTransaction(props) {

    const { addTransaction } = useContext(TransactionContext);

    const [data, setData] = useState({
        amount: '',
        type: '',
        category: ''
    })


    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleType = (e) => {
        setData({ ...data, type: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addTransaction(data);
        props.showAlert('Transaction added successfully', 'success');
        setData({
            amount: '',
            type: '',
            category: ''
        })
    }

    return (
        <form style={{ maxWidth: '400px' }} onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="amount" className="form-label">amount</label>
                <input type="number" className="form-control" id="amount" name="amount" value={data.amount} onChange={handleChange} required />
            </div>
            <select className="form-select mb-3" aria-label="Default select example" value={data.type} required onChange={handleType}>
                <option value="" disabled>Select an option</option>
                <option value='income'>Income</option>
                <option value='expense'>Expense</option>
            </select>
            <div className="mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <input type="text" className="form-control" id="category" name="category" value={data.category} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-primary">Add</button>
        </form>
    )
}

export default AddTransaction