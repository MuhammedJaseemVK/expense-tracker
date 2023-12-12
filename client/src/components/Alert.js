import React from 'react'

function Alert({ alert }) {
    return (
        <>
            {alert && (
                <div style={{ height: '100px' }}>
                    <div className={`alert alert-${alert.type}`} role="alert">
                        {alert.message}
                    </div>
                </div>)
            }
        </>
    )
}

export default Alert