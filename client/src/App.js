import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  return (
    <div>
      <Router>
      <Navbar />
        <Routes>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/login' element={<Login />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
