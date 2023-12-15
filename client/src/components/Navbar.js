import React, { useContext } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';


function Navbar({showAlert}) {
    const { user } = useContext(UserContext);
    const navigate=useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
        showAlert('Logged out successfully','warning');
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link to='/' className="navbar-brand" >Expense tracker</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarSupportedContent">
                    {
                        user ?
                            (
                                <div className="mx-2">
                                    <div className="dropdown">
                                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {user.name}
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li className='mx-3'>{user.email}</li>
                                            <li className='dropdown-item' style={{cursor:'pointer'}} onClick={handleLogout}>Logout</li>
                                        </ul>
                                    </div>
                                </div>
                            )
                            :
                            (<ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link to='/signup' className="nav-link" >Signup</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/login' className="nav-link" >Login</Link>
                                </li>
                            </ul>)
                    }

                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>

    )
}

export default Navbar