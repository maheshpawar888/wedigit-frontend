import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {


    const [ isAuthenticated, setisAuthenticated ] = useState(localStorage.getItem('isAuthenticated')) 

    const setAuthenticat = () =>{
        setisAuthenticated(localStorage.getItem('isAuthenticated'))
    }
    useEffect( () =>{
        setAuthenticat();
    },[localStorage.getItem('isAuthenticate')])

    const logout = () =>{
        localStorage.removeItem('token');
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('isAuthenticated');
    }


    const authLink = (
        <div class="navbar-nav">
            <Link class="nav-item nav-link" to = "/users">Users</Link>
            <Link class="nav-item nav-link" to="/products">Products</Link>
            <a class="nav-item nav-link btn btn-danger ml-5" href = "/" onClick = { logout }>
            Logout<span class="sr-only">(current)</span></a>
        </div>
    )
    const guestLink = (
        <div class="navbar-nav">
            <Link class="nav-item nav-link active" to="/">Login<span class="sr-only">(current)</span></Link>
            <Link class="nav-item nav-link active" to="/register">Register<span class="sr-only">(current)</span></Link>
        </div>
    )

    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                { isAuthenticated ? <Fragment> {authLink} </Fragment> : 
                    <Fragment> {guestLink} </Fragment> }
            </div>
        </nav>
        </div>
    )
}

export default Navbar;