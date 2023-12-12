import React from 'react'

function Transaction({transaction}) {
    return (
        <div style={{ minWidth: '400px', backgroundColor: 'yellow' }} className='d-flex flex-row align-items-center justify-content-between my-2 fs-3 p-3 rounded'>
            <div className='d-block'>{transaction.category}</div>
            <div className='d-flex gap-3 align-items-center'>
                <div className='fs-5'>{transaction.type}</div>
                <div>{transaction.amount}</div>
            </div>
        </div>
    )
}

export default Transaction