import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Navbar from './Navbar';

const Register = () => {

    const [ formData, setFormData ] = useState({
        username:"",
        email:"",
        password:"",
        password2 : ""
    })

    const { username, email, password, password2 } = formData;

    let history = useHistory();

    const onChange = e => setFormData({ ...formData,[ e.target.name ]: e.target.value})

    const onSubmit = async(e) =>{
        e.preventDefault();
        if( password !== password2) {
            alert("passwords do not match..!!")
        }else{
          try {
          
            e.preventDefault();
            const config = {
              headers: {
                  'Content-Type':'application/json'
              }
            }

            const body = JSON.stringify({
              email,password,username
            });

            await axios.post('https://wedigit-backend.herokuapp.com/user/register',body , config)

            alert('Registered Succcesfully')

            history.push('/')
            
          } catch (err) {
            
            if(err.response.status === 400) {
              alert(err.response.statusText)
              setFormData({
                  email:'',
                  password:'',
                  username:''
             })
          }
          }
        }
    }


    return (
        <div>
        <Navbar />

        <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

        <form class="mx-1 mx-md-4">

          <div class="d-flex flex-row align-items-center mb-4">
            <i class="fas fa-user fa-lg me-3 fa-fw"></i>
            <div class="form-outline flex-fill mb-0">
              <input type="text" name = "username" value = {username} class="form-control" 
              onChange = { e => onChange(e) }/>
              <label class="form-label">UserName</label>
            </div>
          </div>

          <div class="d-flex flex-row align-items-center mb-4">
            <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
            <div class="form-outline flex-fill mb-0">
              <input type="email" name = "email" value = {email} class="form-control" 
              onChange = { e => onChange(e) }/>
              <label class="form-label">Your Email</label>
            </div>
          </div>

          <div class="d-flex flex-row align-items-center mb-4">
            <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
            <div class="form-outline flex-fill mb-0">
              <input type="password" name= "password" class="form-control" 
              onChange = { e => onChange(e) }/>
              <label class="form-label">Password</label>
            </div>
          </div>

          <div class="d-flex flex-row align-items-center mb-4">
            <i class="fas fa-key fa-lg me-3 fa-fw"></i>
            <div class="form-outline flex-fill mb-0">
              <input type="password" name= "password2" 
              class="form-control" onChange = { e => onChange(e)} />
              <label class="form-label">Repeat your password</label>
            </div>
          </div>

            <button type="button" class="btn btn-primary btn-lg" onClick = { onSubmit }>Register</button>
            <p> Already a User? <Link to = "/" className = "btn btn-success m-2"> Login here </Link> </p>
        </form>
        </div>
    )
}

export default Register
