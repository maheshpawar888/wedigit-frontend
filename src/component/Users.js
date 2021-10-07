import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Spinner from './spinner/Spinner';

const Users = () => { 

    const [ data, setData ] = useState({
        users:[]
    })

    const [isAdmin,setisAdmin] = useState(localStorage.getItem('isAdmin'));

    const config = {
        headers: {
            'Content-Type':'application/json',
            'x-auth-token':localStorage.getItem('token')
        }
    }

    const getAllUsers = async() =>{
        try {
            const res = await axios.get("https://wedigit-backend.herokuapp.com/user/getAllUsers",config);
            setData({ users: res.data  });
        } catch (err) {
            alert( err );
        }
    }

    const setAdmin = () =>{
        setisAdmin(localStorage.getItem('isAdmin'));
    }

    useEffect( () =>{
        getAllUsers();
        setAdmin();
    },[ ])
    return (
        <div>
          <Navbar />

            <table id="topm" className="table table-hover mt-5">
            <thead>
          <tr>
            <th>Username</th>
            <th>Email</th> 
            {
                isAdmin == "true" && <th> Operations </th>
            }
          </tr>
            </thead>
            <tbody>
                {
                    data.users.length === 0 ? <Spinner /> :  data.users.map( user => (
                        <tr>
                            <td> { user.username } </td>
                            <td> { user.email } </td>
                            {
                                isAdmin == "true" && <td> <Link to = { `/assignproduct/${ user._id }` } className = "btn btn-secondary"> Assign Product </Link></td>
                            }
                        </tr>
                    ))
                }
            </tbody>
        </table>
        </div>
    )
}
export default Users;