import React, { useState } from 'react'
import TransactionContext from "./TransactionContext";
import axios from 'axios';

function TransactionState(props) {
    const [transactions, setTransactions] = useState([]);
    const BASE_URL = 'http://localhost:8080/api/v1'

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
            const newTransaction =response.data.savedTransaction
            setTransactions([...transactions,newTransaction]);
        }
        catch (error) {
            console.error(error);
        }
    }
    return (
        <TransactionContext.Provider value={{ transactions, getAllTransactions, addTransaction }}>
            {props.children}
        </TransactionContext.Provider>
    )
}

export default TransactionState