import React, { useEffect } from 'react'
import { Link,useLocation, useNavigate } from "react-router-dom"

const Navbar = () => {


    let location = useLocation();
    let navigate = useNavigate();
    const handleLogout = () =>{
        localStorage.removeItem('token')
        navigate('/login')
    }

    useEffect(() => {
    }, [location])

    return (
        <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">CloudBook</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className={`nav-item ${location.pathname==='/'?'active':''}`}>
                        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className={`nav-item ${location.pathname==='/about'?'active':''}`}>
                        <Link className="nav-link" to="/about">About</Link>
                    </li>

                    {/* <li className="nav-item">
                        <Link className="nav-link disabled" to="#">Disabled</Link>
                    </li> */}
                </ul>

                {!localStorage.getItem('token') ?
                <form className="form-inline my-2 my-lg-0">
                    <Link className="btn btn-primary my-2 mx-2 my-sm-0" to="/login" role="button">Login</Link>
                    <Link className="btn btn-primary my-2 mx-2 my-sm-0" to="/signup" role="button">SignUp</Link>
                </form>
                :<button onClick={handleLogout} className='btn btn-primary my-2 mx-2 my-sm-0' >Logout</button>
                }
            </div>
        </nav>)
}

export default Navbar