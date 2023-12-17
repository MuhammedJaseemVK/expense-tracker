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

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            await addTransaction(data);
            const token=localStorage.getItem('token');
            if (!token) {
                return props.showAlert('Cannot perform action - Login again', 'warning');
            }
            props.showAlert('Transaction added successfully', 'success');
            setData({
                amount: '',
                type: '',
                category: ''
            })
        }
        catch (error) {
            console.error(error);
            if (error.response && error.response.status === 401 && error.response.data.message === "Unauthorized.Token not found") {
                props.showAlert(error.response.data.message, 'danger');
            }

        }
    }

    return (
        <form style={{ maxWidth: '400px' }} onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="amount" className="form-label">Amount</label>
                <input type="number" className="form-control border border-1 border-black" id="amount" name="amount" value={data.amount} onChange={handleChange} required />
            </div>
            <select className="form-select mb-3 border border-1 border-black" aria-label="Default select example" value={data.type} required onChange={handleType}>
                <option value="" disabled>Select transaction type</option>
                <option value='income'>Income</option>
                <option value='expense'>Expense</option>
            </select>
            <div className="mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <input type="text" className="form-control border border-1 border-black" id="category" name="category" value={data.category} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-dark">Add</button>
        </form>
    )
}

export default AddTransaction