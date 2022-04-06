import { useState } from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"
import { Cookies } from "typescript-cookie"

const NewProduct=()=>{
    const [brand,setBrand]=useState("")
    const [title,setTitle]=useState("")
    const [rating,setRating]=useState("")
    const [price,setPrice]=useState("")
    const [quantity,setQuantity]=useState("")
    const [imageurl,setUrl]=useState("")

    const [valid,setValid]=useState<boolean>(false)

    
    

    const history=useHistory()

    const updateDb=async(event:any)=>{
        event.preventDefault()
        
        const data={
            brand,
            title,
            rating,
            price,
            quantity,
            imageurl
        }
        

        
        
            //await axios.post("http://localhost:3001/products/",JSON.stringify(data)).then((res)=>console.log(res)).catch((err)=>console.log(err))
        
        if(brand!=="" && title!=="" && rating!=="" && price!=="" && quantity!=="" && imageurl!=="")
        {
            console.log(data,"//////")

            await axios("http://localhost:3001/products/",{
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              'accept':'application/json',

              'Access-Control-Allow-Origin':"*",
              'Authorization':`bearer ${Cookies.get("jwt_token")}`

            },
            data:JSON.stringify(data)}).then((res)=>{
                setBrand("")
                setPrice("")
                setTitle("")
                setRating("")
                setQuantity("")
                setUrl("")
                setValid(false)
                console.log(res)
                history.push("/")
            }).catch((err)=>console.log(err))
        }
        else 
        {
            //console.log("here")
            setValid(true)
        }
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
                <input type="text" id="rating" value={rating} onChange={(e)=>setRating(e.target.value)}/>
                <br/>
                <label htmlFor='price'>PRICE</label>
                <br/>
                <input type="text" id="price" value={price} onChange={(e)=>setPrice(e.target.value)}/>
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
                {
                    valid && <p>* Please enter all details</p>
                }
            </form>
        </div>
    )
}

export default NewProduct