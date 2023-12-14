import React, { useState } from 'react'
import TransactionContext from "./TransactionContext";
import axios from 'axios';

function TransactionState(props) {
    const [transactions, setTransactions] = useState([]);
    const BASE_URL = 'http://localhost:8080/api/v1';

    const getAllTransactions = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/transaction/`, {
                headers: {
                    "authToken": localStorage.getItem('token')
                }
            });
            console.log(response.data);
            setTransactions(response.data.transactions);
        }
        catch (error) {
            console.log(error);
        }
    }

    const addTransaction = async (data) => {
        try {
            const response = await axios.post(`${BASE_URL}/transaction/create`, data, {
                headers: {
                    "authToken": localStorage.getItem('token')
                }
            });
            console.log(response.data.savedTransaction);
            const newTransaction = response.data.savedTransaction
            setTransactions([...transactions, newTransaction]);
        }
        catch (error) {
            console.error(error);
        }

    }

    const deleteTransaction = async (id) => {
        try {
            const response = await axios.delete(`${BASE_URL}/transaction/delete/${id}`, {
                headers: {
                    "authToken": localStorage.getItem('token'),
                }
            })
            console.log(response.data);
            const updatedTransactions = transactions.filter((transaction, index, transactions) =>
                (transaction._id !== id))
            setTransactions(updatedTransactions);
        }
        catch (error) {
            console.error(error);
        }
    }

    const updateTransaction = async (id, data) => {
        try {
            const response = await axios.put(`${BASE_URL}/transaction/update/${id}`, data, {
                headers: {
                    "authToken": localStorage.getItem('token')
                }
            })
            console.log(response.data);
            const updatedTransactions = transactions.map((transaction, index, transactions) => {
                if (transaction._id === id) {
                    return data
                }
                else {
                    return transaction
                }
            })
            setTransactions(updatedTransactions);
        }
        catch (error) {
            console.error(error);
        }
    }


    return (
        <TransactionContext.Provider value={{ transactions, getAllTransactions, addTransaction, deleteTransaction, updateTransaction }}>
            {props.children}
        </TransactionContext.Provider>
    )
}

export default TransactionState