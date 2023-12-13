import React, { useContext, useState } from 'react'
import TransactionContext from '../context/TransactionContext';

function AddTransaction(props) {

    const {addTransaction} =useContext(TransactionContext);

    const [data, setData] = useState({
        amount: '',
        type: '',
        category: ''
    })


    const handleChange = (e) => {
        setData({...data,[e.target.name]:e.target.value});
    }

    const handleSubmit =(e)=>{
        e.preventDefault();
        addTransaction(data);
        props.showAlert('Transaction added successfully','success');
    }

    return (
        <form style={{ maxWidth: '400px' }} onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="amount" className="form-label">amount</label>
                <input type="number" className="form-control" id="amount" name="amount" onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="type" className="form-label">transaction type</label>
                <input type="text" className="form-control" id="type" name="type" onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <input type="text" className="form-control" id="category" name="category" onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-primary">Add</button>
        </form>
    )
}

export default AddTransaction