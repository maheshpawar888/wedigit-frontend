import React,{ Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import axios from 'axios';
import Navbar from './Navbar';
import Spinner from './spinner/Spinner'

const ViewProdct = (props) => {

    const {id} = useParams();

    const [product,setProduct] = useState({
        title:'',
        type:'',
        description:'',
        price:'',
        rating:'',
        cover:''
    } )

    const config = {
        headers: {
            'Content-Type':'application/json',
            'x-auth-token':localStorage.getItem('token')
        }
    }

    const getProduct = async(id) =>{
        try {
            const res = await axios.get(`https://wedigit-backend.herokuapp.com/product/getProductById/${id}`,config)
            console.log( res.data );
            setProduct({
                title: res.data.title,
                cover: res.data.cover,
                type:res.data.type,
                description:res.data.description,
                price:res.data.price,
                rating:res.data.rating
            })
        } catch (err) {
            alert( err );
        }
    }

    useEffect( () =>{
        getProduct(id)
    },[])

    return (
        <Fragment>
          <Navbar />

        { product.rating == '' ?  <Spinner /> : <div className="row mt-5">
                <div className="col-6">
                    <img className = "big" src={product.cover}/>                
                </div>

                <div id='leftside' className="col-6">
                    <b>Title : </b>{product.title} <br/>
                    <b>Type : </b> { product.type} <br/>
                    {product.description && <Fragment><b>Description : </b> { product.description} <br/></Fragment>}
                    <b>price : </b> { product.price} <br/>
                    {product.rating && <Fragment> <b>rating : </b>  {product.rating} </Fragment>}
                </div>
            </div>
        }
        </Fragment>
    )
}

export default ViewProdct;

