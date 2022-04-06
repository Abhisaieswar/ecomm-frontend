import './index.css'
import { useHistory } from 'react-router-dom'
//import {SiChatbot} from 'react-icons/si'
import { Cookies } from 'typescript-cookie'
import {FiSend} from 'react-icons/fi'
import axios from 'axios'
import { useEffect, useState } from 'react'
import {BiArrowBack} from 'react-icons/bi'
import {BsFillChatLeftTextFill} from 'react-icons/bs'
import {v4 as uuid, v4} from 'uuid'


// const data=[
//     {id:1,brand:"Manyavar",imageurl:"https://assets.ccbp.in/frontend/react-js/ecommerce/cloths-long-fork.png",price:62990,rating:3.2,title:"Embroidered Net Gown",quantity:12},
//     {id:2,brand:"Samsung",imageurl:"https://assets.ccbp.in/frontend/react-js/ecommerce/appliances-washing-machine.png",price:22490,rating:4.5,title:"Front Load Machine",quantity:0},
//     {id:3,brand:"Fossil",imageurl:"https://assets.ccbp.in/frontend/react-js/ecommerce/electronics-simple-belt-watch.png",price:14995,rating:4.3,title:"Collider Black Dial Men's Watch",quantity:3},
//     {id:4,brand:"LG",imageurl:"https://assets.ccbp.in/frontend/react-js/ecommerce/appliances-ear-buds.png",price:13499,rating:4.4,title:"True Wireless Earbuds",quantity:5},
//     {id:5,brand:"Titan",imageurl:"https://assets.ccbp.in/frontend/react-js/ecommerce/electronics-tatar-watch.png",price:11999,rating:4.3,title:"Maritime Men's Watch",quantity:20},
//     {id:6,brand:"Fossil",imageurl:"https://assets.ccbp.in/frontend/react-js/ecommerce/electronics-simple-watch.png",price:10995,rating:4.1,title:"Neutra Analog Men's Watch",quantity:12},
//     {id:7,brand:"Trendytap",imageurl:"https://assets.ccbp.in/frontend/react-js/ecommerce/toys-minnos.png",price:8600,rating:4.2,title:"Monsters Charm Toy",quantity:13},
//     {id:8,brand:"Fossil",imageurl:"https://assets.ccbp.in/frontend/react-js/ecommerce/electronics-royal-black-watch.png",price:8122,rating:4.4,title:"Privateer Quartz Watch",quantity:23},
//     {id:9,brand:"Fossil",imageurl:"https://assets.ccbp.in/frontend/react-js/ecommerce/electronics-royal-watch.png",price:6395,rating:3.8,title:"Chronograph black Watch",quantity:3},
//     {id:10,brand:"MAONO",imageurl:"https://assets.ccbp.in/frontend/react-js/ecommerce/appliances-singing-mike.png",price:5555,rating:4.4,title:"Podcast Microphone",quantity:14},
// ]

type ordersType={
    id:number,
    brand:string,
    imageurl:string,
    price:number,
    rating:number,
    title:string,
    quantity:number,
    cartQty:number
    ordereddate:string,
    totalamt:number,
    status:String
}

type obj={
    id:number,
    brand:string,
    imageurl:string,
    price:number,
    rating:number,
    title:string,
    quantity:number,
    cartQty:number
}

const status={
    initial:"INITIAL",
    success:'SUCCESS',
    failure:'FAILURE',
    loading:"LOADING"
}

type userType={
    name:string,
    address:string,
    phone:string,
    id:number
}

type botMsg={
    msgType:string,
    end:string,
    msg:string
}

const jwt_token=Cookies.get("jwt_token")
console.log("token in home",jwt_token)

const ProductsSection=()=>{

    const options={
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'accept':'application/json',
            'Access-Control-Allow-Origin':"*",
            'Authorization':`bearer ${jwt_token}`
        }
    } 

    const optionsMsg={
        msgType:"options",
        end:"bot",
        msg:""
    }

    const [botArray,setBotArray]=useState<botMsg[]>([optionsMsg])

    const [botInput,setBotInput]=useState("")

    const [botInputOrder,setBotInputOrder]=useState("")
    const [orderId,setOrderId]=useState("")

    const [state,setState]=useState(status.initial)
    const [data1,setData]=useState<obj[]>([])
    const [cart,setCart]=useState<obj[] | []>([])

    const [brand,setBrand]=useState("")
    const [title,setTitle]=useState("")
    const [rating,setRating]=useState("")
    const [price,setPrice]=useState("")
    const [quantity,setQuantity]=useState("")
    const [imageurl,setUrl]=useState("")

    const [updateId,setUpadateId]=useState(0)

    const [bot,setBot]=useState(false)

    const [botpage,setBotpage]=useState("home")

    const [updatePopup,setUpdatePopup]=useState(false)

    const [allorders,setAllorders]=useState<[] | ordersType[]>([])

    const [userdet,setUserdet]=useState<[] | userType[]>([])

    const [name,setName]=useState("")
    const [address,setAddress]=useState("")
    const [phone,setPhone]=useState("")
    
    const history=useHistory()
    console.log(botArray,"*")

    const updateUser=async()=>{
        const d={
            name,
            address,
            phone,
            id:userdet[0].id
        }
        await axios(`http:localhost:3001/updateuser/`,{
            method: 'PUT',
            headers: {
            'content-type': 'application/json',
            'accept':'application/json',

            'Access-Control-Allow-Origin':"*",
            'Authorization':`bearer ${Cookies.get("jwt_token")}`
            },
            data:JSON.stringify(d)
        })
    }

    const fetchProducts=async()=>{
        const res=await fetch("http://localhost:3001/",options)
        if(res.status===200)
        {
            const data=await res.json()
            setData(data)
            setState(status.success)
        }
        else 
        {
            console.log("error")
        }   
    }

    useEffect(()=>{
        setState(status.loading)
        fetchProducts()
        
        fetch("http://localhost:3001/getcart",options).then((res)=>{
            return res.json()
        }).then(data=>{
            setCart(data)
        })

    },[])

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
        axios(`http://localhost:3001/products/${updateId}`,{
            method: 'PUT',
            headers: {
              'content-type': 'application/json',
              'accept':'application/json',

              'Access-Control-Allow-Origin':"*",
              'Authorization':`bearer ${Cookies.get("jwt_token")}`
              
            },
            data:JSON.stringify(data)}).then((res)=>{
                console.log(res)
        }).catch((err)=>console.log(err));
        setUpdatePopup(false)
    }

    const renderProducts=()=>{
        console.log(data1,"data1")
        return(
            <>
            <div className='products-container'>
                <div className='items-container'>
                {
                    data1.map(each=>{
                        const inStock=each.quantity>0?true:false
                        return(
                        <li key={v4()} className="img-list">
                            <img src={each.imageurl} alt="img" className="prod-img"/>
                            <div className='prod-details-container'>
                                <p className='brand-name'>{each.brand}</p>
                                <p className='title'>{each.title}</p>
                                <div className='rating-container'>
                                    <p className='rating'>{each.rating}</p>
                                    <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMiI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTYuNSA5LjQzOWwtMy42NzQgMi4yMy45NC00LjI2LTMuMjEtMi44ODMgNC4yNTQtLjQwNEw2LjUuMTEybDEuNjkgNC4wMSA0LjI1NC40MDQtMy4yMSAyLjg4Mi45NCA0LjI2eiIvPjwvc3ZnPg==" alt="stars" className='star-img'/>
                                </div>
                                <div className='price-availability'>
                                    <p className='price'>₹{each.price}</p>
                                    {
                                        inStock && <p className='availability'>IN STOCK</p>
                                    }
                                    {
                                        !inStock && <p className='availability out'>OUT OF STOCK</p>
                                    }
                                </div>
                                
                                <div className='cart'>
                                    <button type="button" className='add-cart-btn' onClick={()=>{
                                            setUpadateId(each.id)
                                            setUpdatePopup(true)
                                        }}>Update</button>
                                    <button type="button" className='add-cart-btn' onClick={async()=>{
                                        await axios(`http://localhost:3001/products/${each.id}`,{
                                            method: 'DELETE',
                                            headers: {
                                            'content-type': 'application/json',
                                            'accept':'application/json',

                                            'Access-Control-Allow-Origin':"*",
                                            'Authorization':`bearer ${Cookies.get("jwt_token")}`
                                            }  
                                        })
                                        fetch("http://localhost:3001/",options).then((res)=>{
                                            return res.json()
                                        })
                                        .then((resData)=>{
                                            setData(resData)
                                        })
                                    }
                                    }>Delete</button>
                                    {
                                        inStock && <button className='add-cart-btn' type='button'  
                                        onClick={()=>{
    
                                            let flag=0
                                            cart.map(eachItem=>{
                                                console.log(each.title,eachItem.title)
                                                if(each.title===eachItem.title)
                                                {
                                                    flag=1
                                                    //return {...eachItem,cartQty:eachItem.cartQty+=1}
                                                }
                                                return eachItem
                                            })
                                            
                                            const data={
                                                id:each.id,
                                                brand:each.brand,
                                                imageurl:each.imageurl,
                                                price:each.price,
                                                rating:each.rating,
                                                title:each.title,
                                                quantity:each.quantity,
                                                cartquantity:1
                                            }

                                            if(flag===0){
                                                
                                                console.log("inserting")
                                                axios("http://localhost:3001/cart/",{
                                                    method: 'POST',
                                                    headers: {
                                                    'content-type': 'application/json',
                                                    'accept':'application/json',

                                                    'Access-Control-Allow-Origin':"*",
                                                    'Authorization':`bearer ${Cookies.get("jwt_token")}`
                                                    
                                                    },
                                                    data:JSON.stringify(data)}).then((res)=>console.log(res)).catch((err)=>console.log(err))
                                                
                                                setCart([...cart,{
                                                    id:each.id,
                                                    brand:each.brand,
                                                    imageurl:each.imageurl,
                                                    price:each.price,
                                                    rating:each.rating,
                                                    title:each.title,
                                                    quantity:each.quantity,
                                                    cartQty:1
                                                }])
                                            }
                                        }
                                        }>Add to Cart</button> 
                                    }
                                    {
                                            !inStock && <button type='button' className='add-cart-btn-out-stock' disabled>Add to cart</button>
                                    }
                                </div>
                            </div>
                        </li>)
                    })
                }
                </div>
            </div>
            </>
        )
    }

    return (
        <>
            <ul className="item-container">
                {   
                    state==="SUCCESS"?renderProducts():<p>not yet</p>
                }
            </ul>
            {
                updatePopup && 
                <div className='update-container'>
                    <form onSubmit={updateDb} className="update-form">
                        <p className='close-popup' onClick={()=>setUpdatePopup(false)}>CLOSE</p>
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
                        <br/>
                        <button type='submit' className='update-btn'>Update</button>
                        <br/>
                    </form>
                </div>
            }

            {
                bot && <>{
                        botpage==="home" &&
                            <div className='bot-container'>
                                <div className='ul-container'>
                                    {
                                            botArray.map(each=>{
                                                if(each.end==="bot" && each.msgType==="options")
                                                {
                                                    return(
                                                        <li key={v4()} className="list-style-type">
                                                            <div className='bot-options-container'>
                                                                <button type="button" className='bot-option' onClick={async()=>{
                                                                    setBotpage("allorders")
                                                                    await fetch("http://localhost:3001/getorders/",options).then((res)=>{
                                                                        return res.json()
                                                                    }).then((data)=>setAllorders(data))
                                                                    }}>All orders placed</button>
                                                                <button className='bot-option' onClick={async()=>{
                                                                    setBotpage("orderdet")
                                                                    }}>order details</button>
                                                                <button className='bot-option' onClick={async()=>{
                                                                    setBotpage("userdet")
                                                                    await fetch("http://localhost:3001/getuser/",options).then(res=>res.json()).then(data=>{
                                                                    console.log(data,"ffff")    
                                                                    setUserdet(data)
                                                                })
                                                                    }}>user details</button>
                                                                <button className='bot-option' onClick={()=>{setBotpage("update")}}>update user details</button>
                                                            </div>
                                                            <p className='bot-options-container'>Please enter<br/> 1 for orders page<br/> 2 for cart page</p>
                                                        </li>
                                                    )
                                                }
                                                else if(each.end==="bot" && each.msgType==="link")
                                                {
                                                    return (<p className='bot-options-container'><a href={each.msg}>{each.msg}</a></p>)
                                                }
                                                else if(each.end==="user" && each.msgType==="inputnum")
                                                {
                                                    return(
                                                    <p className='user-msg'>{each.msg}</p>)
                                                }
                                                else 
                                                {
                                                    return(
                                                        <p className='bot-options-container'>{each.msg}</p>
                                                    )
                                                }
                                            })
                                    }
                                </div>

                                <div className='bot-bottom'>
                                    <input type="text" placeholder='Type your message here' value={botInput} onChange={(e)=>setBotInput(e.target.value)} className='bot-input'/>
                                    <div className='send-container' onClick={async()=>{
                                        if(botInput==="1" && botArray[botArray.length-1].msgType==="options")
                                        {
                                            let newObj1={msgType:"inputnum",end:"user",msg:"1"}
                                            let newObj2={msgType:"link",end:"bot",msg:`http://localhost:3000/orders`}
                                            
                                            let newObj3={msgType:"options",end:"bot",msg:""}
                                            await setBotArray([...botArray,newObj1,newObj2,newObj3])
                                            await setBotInput("")
                                        }
                                        else if(botInput==="2" && botArray[botArray.length-1].msgType==="options")
                                        {
                                            let newObj1={msgType:"inputnum",end:"user",msg:"2"}
                                            let newObj2={msgType:"link",end:"bot",msg:`http://localhost:3000/cart`}
                                            let newObj3={msgType:"options",end:"bot",msg:""}
                                            await setBotArray([...botArray,newObj1,newObj2,newObj3])
                                            await setBotInput("")
                                        }
                                        else 
                                        {
                                            let newObj1={msgType:"inputnum",end:"user",msg:botInput}
                                            let newObj2={msgType:"response",end:"bot",msg:"Please wait i'll connect you to an agent."}
                                            await setBotArray([...botArray,newObj1,newObj2])
                                            await setBotInput("")
                                        }
                                    }}>
                                        <FiSend/>
                                    </div>
                                </div>
                            </div>
                        }

                        {
                            botpage==="orderdet" && 
                            <div className='bot-container'>
                                <div onClick={()=>setBotpage("home")}>
                                    <BiArrowBack className='icon'/>
                                    <p>Please enter id of the order</p>
                                    <br/>
                                    {
                                        orderId!=="" && <a href={`http:/localhost:3000/orders/${orderId}`}>{`http:/localhost:3000/orders/${orderId}`}</a>
                                    }
                                </div>
                                <div className='bot-bottom'>
                                    <input type="text" placeholder='Type your message here' value={botInputOrder} onChange={(e)=>setBotInputOrder(e.target.value)} className='bot-input'/>
                                    <div className='send-container' onClick={()=>{
                                        setOrderId(botInputOrder)
                                        setBotInputOrder("")
                                    }}>
                                        <FiSend/>
                                    </div>
                                </div>
                            </div>
                        }

                        {
                            botpage==="allorders" && 
                            <div className='bot-container1 bot-container'>
                                <div onClick={()=>setBotpage("home")}>
                                    <BiArrowBack className='icon'/>

                                </div>
                                <ul className='orders-list'>
                                        {
                                            allorders.map(eachOrder=>{
                                                return(
                                                    <li className='list-item' key={v4()}>
                                                        <p>Brand: {eachOrder.brand}</p>
                                                        <p>Title: {eachOrder.title}</p>
                                                    </li>
                                                )
                                            })
                                        }
                                </ul>
                            </div>
                        }

                        {
                            botpage==="userdet" && 
                            <div className='bot-container1 bot-container'>
                                <div onClick={()=>setBotpage("home")}>
                                    <BiArrowBack className='icon'/>
                                </div>
                                <p>Name: {userdet[0].name}</p>
                                <p>Address: {userdet[0].address}</p>
                                <p>Phone: {userdet[0].phone}</p>
                            </div>
                        }

                        {
                            botpage==="update" && 
                            <div className='bot-container1 bot-container'>
                                <div onClick={()=>setBotpage("home")}>
                                    <BiArrowBack className='icon'/>
                                </div>
                                <form onSubmit={updateUser}>
                                    <label htmlFor='name'>Name</label>
                                    <br/>
                                    <input type="text" id="name" value={name} onChange={(e)=>{
                                        setName(e.target.value)
                                    }}/>
                                    <br/>
                                    <label htmlFor='text'>Address</label>
                                    <br/>
                                    <input type="text" id="text" value={address} onChange={(e)=>{
                                        setAddress(e.target.value)
                                    }}/>
                                    <br/>
                                    <label htmlFor='phone'>Phone</label>
                                    <br/>
                                    <input id="phone" type="text" value={phone} onChange={(e)=>{
                                        setPhone(e.target.value)
                                    }}/>
                                    <br/>
                                    <button type="submit">Update</button>
                                </form>
                            </div>
                        }
                    </>
            }

            <button type="button" onClick={()=>{
                setBot(!bot)
            }}><BsFillChatLeftTextFill className='bot'/></button>
        </>
    )
}

export default ProductsSection

// onClick={()=>props.setCartFun([...cart,{
//     id:each.id,
//     brand:each.brand,
//     url:each.url,
//     price:each.price,
//     rating:each.rating,
//     title:each.title,
//     quantity:each.quantity
// }])}