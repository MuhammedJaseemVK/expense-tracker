import React, { useContext, useState } from 'react'
import TransactionContext from "./TransactionContext";
import axios from 'axios';
import UserContext from './UserContext';


function TransactionState(props) {
    const [transactions, setTransactions] = useState([]);
    const BASE_URL = 'https://expense-tracker-ashy-theta.vercel.app/api/v1';
    const { getUserInfo } = useContext(UserContext);

    const getAllTransactions = async () => {
        try {
            await getUserInfo()
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
            await getUserInfo();
            const token =localStorage.getItem('token')
            if(!token){
                return
            }
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
            if (error.response && error.response.status === 401 && error.response.data.message === "Unauthorized.Token not found") {
                props.showAlert(error.response.data.message, 'danger');
            }
        }

    }

    const deleteTransaction = async (id) => {
        try {
            await getUserInfo()
            const token =localStorage.getItem('token')
            if(!token){
                return
            }
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
            await getUserInfo()
            const token =localStorage.getItem('token')
            if(!token){
                return
            }
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