import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import Navbar from './Navbar';
import axios from 'axios';

const Assignproduct = () => {

    const { id } = useParams();

    const [ products, setProducts ] = useState({
        productsdata:[]
    })

    const [ user, setUser] = useState({
        userdata:[]
    })

    const config = {
        headers: {
            'Content-Type':'application/json',
            'x-auth-token':localStorage.getItem('token')
        }
    }

    const getProducts = async() => {
        try{
            const res = await axios.get("https://wedigit-backend.herokuapp.com/product/getProducts",config)
            setProducts({productsdata: res.data});
        }catch( err ){
            alert( err )
        }        
    }

    const getUser = async() =>{
        try {
            const res = await axios.get(`https://wedigit-backend.herokuapp.com/user/getUser/${id}`,config);
            setUser({ userdata: res.data.products })
            // console.log( res.data.products );
        } catch (err) {
            console.log( err );            
        }
    }

    useEffect( () =>{
        getProducts();
    },[])

    useEffect( () =>{
        getUser();
    },[id])

    const isAssigned = (key) =>{

        for( var i = 0; i < user.userdata.length; i++ ){
            if( user.userdata[i].id == key ){
                return true
            }
        }
        
    }

    const assignProduct = async(e,productId) =>{

        const body = {
            productId
        }
        try {
            await axios.put(`https://wedigit-backend.herokuapp.com/product/assignProduct/${ id }`,body,config);
            alert( "Product assigned successfully..!!" )
        } catch (err) {
            if(err.response.status === 400) {
                alert('Product Already Assigned')
                
            }
        }
    }


    return (
        <Fragment>
            <Navbar />
            <table class="table table-hover mt-5">
            <thead>
            <tr>
                <th>Title</th>
                <th>cover pic</th>
                <th>Assign</th>
            </tr>
            </thead>
            <tbody>
                {
                    products.productsdata.map( product => (
                        <tr key = {product._id}>
                            <td> { product.title } </td>
                            <td> <img src={product.cover} /> </td>
                            <td> 
                            { isAssigned(product._id) ? <button className = "btn btn-success disabled"> Product Assigned </button> :
                                <button onClick = { (e) => { assignProduct(e,product._id)} }
                                className="btn btn-success"> Assign </button>
                            }
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        </Fragment>
    )
}

export default Assignproduct;
