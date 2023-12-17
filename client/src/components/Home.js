import React from 'react';
import Ledger from './Ledger';

function Home({showAlert,searchTerm}) {
  return (
    <div>
      <Ledger showAlert={showAlert} searchTerm={searchTerm} />
    </div>
  )
}

export default Home