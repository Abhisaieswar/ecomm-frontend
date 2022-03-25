import { useState } from 'react'
import './index.css'
import axios from 'axios'
import { useHistory } from 'react-router-dom'


const UpdateItem=(props:any)=>{
    const id=props.match.params.id
    console.log(id)
    const history=useHistory()

    const [brand,setBrand]=useState("")
    const [title,setTitle]=useState("")
    const [rating,setRating]=useState("")
    const [price,setPrice]=useState("")
    const [quantity,setQuantity]=useState("")
    const [imageurl,setUrl]=useState("")

    const updateDb=async()=>{
        const p=parseInt(price)
        const r=parseFloat(rating)
        const data={
            brand,
            title,
            rating:r,
            price:p,
            quantity,
            imageurl
        }

        console.log(history)
        axios(`http://localhost:3001/products/${id}`,{
            method: 'PUT',
            headers: {
              'content-type': 'application/json',
              'accept':'application/json',

              'Access-Control-Allow-Origin':"*",
              
            },
            data:JSON.stringify(data)}).then((res)=>{
                console.log(res)
            }).catch((err)=>console.log(err));
        history.push("/")
        // const options={
        //     method:"POST",
        //     body: JSON.stringify(data)
        // }
    }

    
    return (
        <div>
            <form onSubmit={updateDb} className="update-form">
                <label htmlFor='brand'>BRAND</label>
                <br/>
                <input type="text" id="brand" value={brand} onChange={(e)=>setBrand(e.target.value)}/>
                <br/>
                <label htmlFor='title'>TITLE</label>
                <br/>
                <input type="text" id="title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                <br/>
                <label htmlFor='rating'>RATING</label>
                <br/>
                <input type="text" id="rating" value={rating} onChange={(e)=>{
                    setRating(e.target.value)}}/>
                <br/>
                <label htmlFor='price'>PRICE</label>
                <br/>
                <input type="text" id="price" value={price} onChange={(e)=>{
                    setPrice(e.target.value)
                }}/>
                <br/>
                <label htmlFor='quantity'>QUANTITY</label>
                <br/>
                <input type="text" id="quantity" value={quantity} onChange={(e)=>setQuantity(e.target.value)}/>
                <br/>
                <label htmlFor='url'>IMAGE URL</label>
                <br/>
                <input type="text" id="url" value={imageurl} onChange={(e)=>setUrl(e.target.value)}/>
                <br/>
                <button type='submit' className='update-btn'>Update</button>
                <br/>
            </form>
        </div>
    )
}

export default UpdateItem