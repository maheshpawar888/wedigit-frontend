import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Spinner from './spinner/Spinner';

const Products = () => { 

    const [data, setData] = useState({
        products: []
    })

    const [isAdmin,setisAdmin] = useState(localStorage.getItem('isAdmin'));

    const config = {
        headers: {
            'Content-Type':'application/json',
            'x-auth-token':localStorage.getItem('token')
        }
    }

    const getProducts = async() => {
        try{
            const res = await axios.get("https://wedigit-backend.herokuapp.com/product/getProducts",config);
            setData({products: res.data})        
        }catch(err){
            alert( err );
        }
        
    }

    const setAdmin = () =>{
        setisAdmin(localStorage.getItem('isAdmin'));
    }

    useEffect(() => {
        getProducts();
        setAdmin();
    },[])

    const deleteProduct = async(e,id) =>{
        try {
            if( window.confirm( "Are you sure you want to delete?" )){
                await axios.delete(`https://wedigit-backend.herokuapp.com/product/deleteProduct/${id}`,config)
                getProducts();
            }   
        } catch (err) {
            alert( err )
        }
    }

    return (

        <div className>
          <Navbar />

           {
             isAdmin == "true" && <Link to = "/addproduct" id="topm" className="btn btn-success mt-2 mb-2"> Add Product</Link>
           }
            <table id="topm" class="table table-hover">
            <thead>
          <tr>
            <th>Title</th>
            <th>cover pic</th>
            <th>Type</th>
            <th> Opertaions </th>
          </tr>
            </thead>
            <tbody>
            {
                data.products.length === 0 ? <Spinner /> : data.products.map( product => (
                    <tr>
                        <td> {product.title} </td>
                        <td> <img src = { product.cover } /> </td>
                        <td> { product.type } </td>
                        <td>  
                            <Link  to = {`/viewproduct/${product._id}   `} className = "btn btn-success m-2"
                                > View </Link>
                            {
                                isAdmin == "true" && <button className = "btn btn-danger" 
                                onClick = {e => deleteProduct( e,product._id )} > Delete </button>
                            } 
                             
                        </td>
                    </tr>
                ))
            }
            </tbody>
        </table>
        </div>
    )
}
export default Products;