import axios from 'axios'
import { useEffect, useState } from 'react'
import './index.css'


type obj={
        id:number,
        brand:string,
        imageurl:string,
        price:number,
        rating:number,
        title:string,
        quantity:number,
        cartquantity:number
}


const status={
    initial:"INITIAL",
    success:'SUCCESS',
    failure:'FAILURE',
    loading:"LOADING"
}


const Cart=()=>{

    const [state,setState]=useState(status.initial)

    const [name,setName]=useState("")

    const [address,setAddress]=useState("")

    const [phone,setPhone]=useState("")

    const [errorMsg,setErrorMsg]=useState(false)

    const [cart,setCart]=useState<obj[]>([])

    

    useEffect(()=>{
        setState(status.loading)
        fetch("http://localhost:3001/getcart/").then((res)=>{
            return res.json()
        }).then((data)=>{
            //console.log(data)
            setCart(data)
            setState(status.success)
        })
    },[])

    


    const isEmpty=cart.length===0?true:false
    
    let len:number=0;
    let cartVal:number=0;

    cart.map(each=>{
        if(each.quantity>=each.cartquantity){
            len+=1
            cartVal+=each.price*each.cartquantity
        }
        return each
    })

    const disc:number=cartVal*0.05;

    const renderCart=()=>{
        //console.log(cart,"updated")
        return (
            <>
            <div className='cart-bg-container'>
            {
                isEmpty && 
                <div className='empty-cart-container'>
                    <img src="https://th.bing.com/th/id/R.afa6a28d0ee0b5e7d55b7a5aecdfedec?rik=eOl3Z%2bU0XvmYlw&riu=http%3a%2f%2fiticsystem.com%2fimg%2fempty-cart.png&ehk=0omil1zRH7T3Pb5iTzvueamUQLSSb55vgY7dLFF8Bl8%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1" alt="empty" className='empty-cart'/>
                </div>
            }

            <ul className="cart-img-list">
            {

                !isEmpty &&
                cart.map(each=>{
                    const inStock=each.quantity===0?false:true
                    //console.log(each,"//////////////////////////")
                    //console.log(each.id)

                    return(
                        <li key={`${each.id}${each.id}a`}>
                            <div className='cart-img-det-container'>
                                <img src={each.imageurl} alt="img" className="cart-prod-img"/>
                                <div>
                                    <p className='brand-name'>by {each.brand}</p>
                                    <p className='title'>{each.title}</p>
                                    <div className='rating-container'>
                                        <p className='rating'>{each.rating}</p>
                                        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMiI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTYuNSA5LjQzOWwtMy42NzQgMi4yMy45NC00LjI2LTMuMjEtMi44ODMgNC4yNTQtLjQwNEw2LjUuMTEybDEuNjkgNC4wMSA0LjI1NC40MDQtMy4yMSAyLjg4Mi45NCA0LjI2eiIvPjwvc3ZnPg==" alt="stars" className='star-img'/>
                                    </div>
                                    <div className='price-availability'>
                                        <p className='price'>₹{each.price}</p>
                                    </div>
                                    {
                                        inStock && <div className='stock-qty'> 
                                                        <p className="in-stock">IN STOCK</p>
                                                        <p>{each.quantity} qty left</p>
                                                    </div>
                                    }

                                    {
                                        !inStock &&
                                                <p className='out-stock'>OUT OF STOCK</p>
                                                
                                    }
                                </div>
                            </div>

                            <div className='cart-qty-container'>
                                <button type='button' className='inc-dec-qty' onClick={async()=>{
                                    if(each.cartquantity>1)
                                    {
                                        const data = {
                                            qty:each.cartquantity-1
                                        }

                                        await axios(`http://localhost:3001/updatecart/${each.id}`,{
                                            method: 'PUT',
                                            headers: {
                                                'content-type': 'application/json',
                                                'accept':'application/json',
                                                'Access-Control-Allow-Origin':"*",
                                            },
                                            data:JSON.stringify(data)}).then((res)=>console.log(res)).catch((err)=>console.log(err))
                                                    
                                        // console.log(eachItem,"+++++")
                                        
                                    
                                        await fetch("http://localhost:3001/getcart").then((res)=>{
                                            return res.json()
                                        }).then((data)=>{
                                            setCart(data)
                                        })
                                    }
                                }}>-</button>

                                <input type="text" className='qty-input' value={each.cartquantity} onChange={async(event)=>{
                                    if(event.target.value==="")
                                        console.log(event.target.value,"empty")


                                    if(event.target.value==="")
                                    {
                                        const data={
                                            qty:1
                                        }
                                        await axios(`http://localhost:3001/updatecart/${each.id}`,{
                                            method: 'PUT',
                                            headers: {
                                                'content-type': 'application/json',
                                                'accept':'application/json',
                                                'Access-Control-Allow-Origin':"*",
                                            },
                                            data:JSON.stringify(data)}).then((res)=>console.log(res)).catch((err)=>console.log(err))                                        
                                    }
                                    else if(parseInt(event.target.value)<=each.quantity)
                                    {
                                        
                                        const data = {
                                            qty:parseInt(event.target.value)
                                        }
                                        await axios(`http://localhost:3001/updatecart/${each.id}`,{
                                                method: 'PUT',
                                                headers: {
                                                'content-type': 'application/json',
                                                'accept':'application/json',
                                                'Access-Control-Allow-Origin':"*",
                                            },
                                        data:JSON.stringify(data)}).then((res)=>console.log(res)).catch((err)=>console.log(err))    
                                    }  
                                    else{
                                        const data = {
                                            qty:each.quantity
                                        }
                                        await axios(`http://localhost:3001/updatecart/${each.id}`,{
                                                method: 'PUT',
                                                headers: {
                                                'content-type': 'application/json',
                                                'accept':'application/json',
                                                'Access-Control-Allow-Origin':"*",
                                            },
                                        data:JSON.stringify(data)}).then((res)=>console.log(res)).catch((err)=>console.log(err))    
                                    }
                                        
                                    await fetch("http://localhost:3001/getcart").then((res)=>{
                                        return res.json()
                                        }).then((data)=>{
                                            setCart(data)
                                    })
                                }}
                                />
                                
                                <button type='button' className='inc-dec-qty' onClick={async()=>{

                                    if(each.cartquantity<each.quantity)
                                    {
                                        const data = {
                                            qty:each.cartquantity+1
                                        }

                                        await axios(`http://localhost:3001/updatecart/${each.id}`,{
                                            method: 'PUT',
                                            headers: {
                                                'content-type': 'application/json',
                                                'accept':'application/json',
                                                'Access-Control-Allow-Origin':"*",
                                            },
                                            data:JSON.stringify(data)}).then((res)=>console.log(res)).catch((err)=>console.log(err))
                                                    
                                        // console.log(eachItem,"+++++")
                                        
                                    
                                        await fetch("http://localhost:3001/getcart").then((res)=>{
                                            return res.json()
                                        }).then((data)=>{
                                            setCart(data)
                                        })
                                    }
                                }}>+</button>
                                <div className='remove-container'>
                                    <button type='button' className='remove-btn' onClick={async()=>{
                                        
                                        const newObj=cart.filter((eachItem)=>{
                                            
                                            return each.id!==eachItem.id
                                        })

                                        console.log("hi")
                                        console.log(newObj)

                                        setCart(newObj)

                                        await axios(`http://localhost:3001/deletecartitem/${each.id}`,{
                                            method: 'DELETE',
                                            headers: {
                                                'content-type': 'application/json',
                                                'accept':'application/json',
                                                'Access-Control-Allow-Origin':"*",
                                            }
                                            }).then((res)=>{
                                                console.log(res)
                                            }).catch((err)=>console.log(err))
                                            
                                        
                                        
                                    }}>REMOVE</button>
                                </div>
                            </div>
                        </li>)
                })
            }
            </ul>
            <div className='buy-container'>
            {
                !isEmpty && 
                <div className='order-container'> 
                    <div className='card'>
                        <p className='price-details'>PRICE DETAILS</p>
                        <div className='calc-price-container'>
                            <p className='price-final'>Price ({len} items)</p>
                            <p>₹{cartVal}</p>
                        </div>
                        <div className='disc-container'>
                            <p>Discount</p>
                            <p className='price-color'>-₹{disc}</p>
                        </div>
                        <div className='del-charges'>
                            <p>Delivery Charges</p>
                            <p className='price-color del-charge'>FREE</p>
                        </div>
                        <div className='tot-amt'>
                            <p>Total Amount</p>
                            <p>₹{cartVal-disc}</p>
                        </div>
                    </div>
                </div>

            }

            {
                !isEmpty &&
                <div className='check-out-container'>
                    <p className='check-out-heading'>Checkout Details</p>
                    <div className='container'>
                        <label htmlFor='name' className='name-lebel'>Name</label>
                        <input type="text" id="name" placeholder='Enter user name' className='input-field' onChange={(e)=>{
                            setName(e.target.value)
                        }}/>
                    </div>
                    <br/>
                    <div className='container'>
                        <label htmlFor='address' className='name-label'>Address</label>
                        <input type="text" id="address" placeholder='Enter address' className='input-field' onChange={(e)=>{
                            setAddress(e.target.value)
                        }}/>
                    </div>
                    <br/>
                    <div className='container'>
                        <label htmlFor='phone'>Phone No</label>
                        <input type="text" id="phone" placeholder='Enter Phone Number' className='input-field' onChange={(e)=>{
                            setPhone(e.target.value)
                        }}/>
                    </div>
                    <br/>
                </div>
            }

            {
                !isEmpty && <button type='button' className='buy-btn' onClick={async()=>{
                    if(name==="" || address==="" || phone==="")
                        setErrorMsg(true)   
                    else 
                    {
                        

                        setErrorMsg(false)


                        const newOrders=cart.map(each=>{
                            return {...each,ordereddate:new Date(),totalamt:each.cartquantity*each.price}
                        })

                        
                        cart.map(async(eachItem)=>{
                            console.log(eachItem.quantity,eachItem.cartquantity)
                            const data1={
                                qty:(eachItem.quantity - eachItem.cartquantity)
                            }
                            console.log(data1,"**********")
                            await axios(`http://localhost:3001/updateitem/${eachItem.title}`,{
                                method:"PUT",
                                headers: {
                                    'content-type': 'application/json',
                                    'accept':'application/json',
                                    'Access-Control-Allow-Origin':"*",
                                },
                                data:JSON.stringify(data1)
                            })
                            return eachItem
                        })

                        
                        console.log(newOrders,"newly added")    

                        newOrders.map(async(eachItem)=>{
                            await axios("http://localhost:3001/ordersdata/",{
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json',
                                'accept':'application/json',
                                'Access-Control-Allow-Origin':"*",
                            },
                            data:JSON.stringify(eachItem)
                            }).then(()=>console.log("it's done")).catch((err)=>console.log("err"))
                        })
                        
                        

                        await axios("http://localhost:3001/deletecart/",{
                                    method: 'DELETE',
                                    headers: {
                                    'content-type': 'application/json',
                                    'accept':'application/json',
                                    'Access-Control-Allow-Origin':"*",                                        }
                        }).then((res)=>console.log(res)).catch((err)=>console.log(err)) 
                        
                        const userData={
                            name,
                            address,
                            phone
                        }

                        await axios("http://localhost:3001/adduser/",{
                                    method: 'POST',
                                    headers: {
                                    'content-type': 'application/json',
                                    'accept':'application/json',
                                    'Access-Control-Allow-Origin':"*", 
                                data:JSON.stringify(userData)                                       }
                        })
                        

                        setCart([])
                    }
                }}>PLACE ORDER</button>
            }
        	<p>{errorMsg}</p>
            {
                errorMsg && <p className="error-msg">* Please enter all the details</p>
            }
            </div>
        </div>
        </>
        )
    }

    return(
        <div>
        {
            state==="SUCCESS"?renderCart():<div className='empty-cart-container'>
            <img src="https://th.bing.com/th/id/R.afa6a28d0ee0b5e7d55b7a5aecdfedec?rik=eOl3Z%2bU0XvmYlw&riu=http%3a%2f%2fiticsystem.com%2fimg%2fempty-cart.png&ehk=0omil1zRH7T3Pb5iTzvueamUQLSSb55vgY7dLFF8Bl8%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1" alt="empty" className='empty-cart'/>
        </div>
        }
        </div>
    )
}

export default Cart