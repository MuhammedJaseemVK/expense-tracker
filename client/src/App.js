import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import Alert from './components/Alert';
import Home from './components/Home';
import TransactionState from './context/TransactionState';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      message,
      type
    });

    setTimeout(() => {
      setAlert(null);
    }, 3000);

  }
  return (
    <div>
      <Router>
        <TransactionState>
        <Navbar />
        <Alert alert={alert} />
        <Routes>
          <Route path='/' element={<Home showAlert={showAlert} />} />
          <Route path='/signup' element={<Signup showAlert={showAlert} />} />
          <Route path='/login' element={<Login showAlert={showAlert} />} />
        </Routes>
        </TransactionState>
      </Router>
    </div>
  );
}

export default App;
