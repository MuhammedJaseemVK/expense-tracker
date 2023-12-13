import React from 'react';
import Ledger from './Ledger';

function Home({showAlert}) {

  return (
    <div className='my-5'>
      <Ledger showAlert={showAlert} />
    </div>
  )
}

export default Home