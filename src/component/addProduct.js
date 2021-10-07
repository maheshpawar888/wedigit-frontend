import React,{useState} from 'react';
import {useHistory } from 'react-router-dom';

import axios from 'axios';
import Navbar from './Navbar';

const AddProduct=()=> { 
    let history = useHistory();

    const [formData,setFormData] = useState({
        title:'',
        type:'',
        desc:'',
        cover:'',
        price:'',
        rating:'',
    })
    const { title,type,desc,cover,price,rating} = formData;
    const onChange = e => setFormData({...formData,[e.target.name]:e.target.value})
    
    const onFileChange = (e) =>{
        // console.log(e.target.files[0])
        setFormData({...formData,cover:e.target.files[0]})
    }


    const onsubmit=async (e) => {
        try {
            e.preventDefault();

            const config = {
                headers: {
                    'Content-Type':'application/json',
                    'x-auth-token':localStorage.getItem('token')
                }
            }

            var bodyFormData = new FormData();

            bodyFormData.append("title",title)
            bodyFormData.append("type",type)
            bodyFormData.append("description",desc)
            bodyFormData.append("files",cover)
            bodyFormData.append("price",price)
            bodyFormData.append("rating",rating)

            await axios.post('https://wedigit-backend.herokuapp.com/product/addProduct',bodyFormData , config)

            history.push('/products')
            
        } catch(err) {
            if(err.response.status === 400) {
                alert('server error')
            }
        }
    }

    return (
        <div>
          <Navbar />

            <div class="container">
                <form class="form-container" >

                    <div class="form-group">
                    <label>Title</label>
                    <input type="text"
                     required 
                     class="form-control"
                     name='title'
                     value={title}
                     onChange={e=>onChange(e)}
                     />
                    
                    </div>
                    <div class="form-group">
                        <label>Type</label>
                        <input type="text"   
                            required class="form-control" 
                            name='type' value={type}
                            onChange={e=>onChange(e)}
                        />
                    </div>

                     <div class="form-group">
                        <label>Description</label>
                        <textarea   
                            required class="form-control" 
                            name='desc' value={desc}
                            onChange={e=>onChange(e)}
                            >
                        </textarea>
                      </div>
                    
                        <label for="img">Select image:</label>
                        <input 
                            type="file" 
                            id="img" 
                            name="itemImage"
                            onChange = {e => onFileChange(e)}
                            accept="image/*"
                        />                       
                        <div class="form-group">
                            <label>Price</label>
                            <input type="text"   
                                required class="form-control" 
                                name='price' value={price}
                                onChange={e=>onChange(e)}
                            />
                        </div>

                        <div class="form-group">
                            <label >Rating</label>
                            <input type="text"   
                                required class="form-control" 
                                name='rating' value={rating   }
                                onChange={e=>onChange(e)}
                            />
                        </div>
                  <hr></hr>
                  <button type="submit" className="btn btn-success" onClick={(e) => onsubmit(e)}>Add Product</button>

                  </form>  
            </div>
        </div>
    )
}

export default AddProduct;