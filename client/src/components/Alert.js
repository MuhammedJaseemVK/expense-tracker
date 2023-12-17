import React from 'react'

function Alert({ alert }) {
    return (
        <div style={{ height: '70px' }}>
            {alert && (
                <div>
                    <div className={`alert alert-${alert.type}`} role="alert">
                        {alert.message}
                    </div>
                </div>)
            }
        </div>
    )
}

export default Alert