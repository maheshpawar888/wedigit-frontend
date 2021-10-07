import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Redirect, useHistory} from "react-router";
import { Link } from 'react-router-dom'
import Navbar from './Navbar';

const Login = props => {

    let history = useHistory();

    useEffect( () =>{
        if( !localStorage.getItem('token') ){
            <Redirect to = "/" />
        }
    }, [])

    const [ formData, setFormData ] = useState({
        username:'',
        password:'',
    })

    const { username, password } = formData;

    const onChange = e => setFormData({ ...formData,[e.target.name] : e.target.value })

    const onSubmit = async(e) =>{
        e.preventDefault();
        
        try {

            const config = {
                headers: {
                    'Content-Type':'application/json'
                }
            }

            const body = JSON.stringify({
                username,password
            })
            const res = await axios.post('https://wedigit-backend.herokuapp.com/user/login',body,config);

            var isAdmin = res.data.user.isAdmin
            localStorage.setItem('isAuthenticated',true);
            localStorage.setItem('token',res.data.token);
            localStorage.setItem('isAdmin',isAdmin);
            
         
            history.push("/products");
        } 
        catch (err) {
            if(err.response.status === 400) {
                alert('Please enter a valid username or password')
                setFormData({
                    username:'',
                    password:''
               })
            }
        }
    }

    return (
        <div>
          <Navbar />
            <form onSubmit = { onSubmit }>
                <div class="form-group mt-5">
                    <label for="username">Username:</label>
                    <input type="text" class="form-control" 
                    placeholder="Enter Username" name="username"
                    onChange = { e => onChange(e) } />
                </div>
                <div class="form-group">
                    <label for="pwd">Password:</label>
                    <input type="password" class="form-control" 
                    placeholder="Enter password" name="password"
                    onChange = { e => onChange(e) } />
                </div>       
            <button type="submit" class="btn btn-primary">Submit</button>
            <p className = "m-2"> New User? <Link to = "/register" className = "btn btn-success m-2"> Register here </Link> </p>
        </form>           
        </div>
    )
}

export default Login
