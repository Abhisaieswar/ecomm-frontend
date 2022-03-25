import './index.css'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'

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

const ProductsSection=()=>{
    const [state,setState]=useState(status.initial)
    const [data1,setData]=useState<obj[]>([])
    const [cart,setCart]=useState<obj[] | []>([])
    
    const history=useHistory()

    useEffect(()=>{
        setState(status.loading)
        fetch("http://localhost:3001/").then((res)=>{
        return res.json()
    })
    .then((resData)=>{
        setData(resData)
        setState(status.success)

    })

    const getData=async()=>{
        fetch("http://localhost:3001/").then((res)=>{
        return res.json()
        })
        .then((resData)=>{
            setData(resData)
        })
    }

    getData()

    fetch("http://localhost:3001/getcart").then((res)=>{
        return res.json()
    }).then(data=>{
        setCart(data)
    })

    },[])

    const renderProducts=()=>{
        console.log(data1)
        return(
            <>
            <div className='products-container'>

                <div>
                    <button type='button' className='add-btn' onClick={()=>{
                        history.push(`/newproduct/`)
                    }}>Add a new Item</button>
                </div>

                <div className='items-container'>
                {
                    data1.map(each=>{
                        const inStock=each.quantity>0?true:false
                        return(
                        <li key={each.id} className="img-list">
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
                                    <button type="button" className='add-cart-btn' onClick={()=>history.push(`/update/${each.id}`)}>Update</button>
                                    <button type="button" className='add-cart-btn' onClick={async()=>{
                                        await axios(`http://localhost:3001/products/${each.id}`,{
                                            method: 'DELETE',
                                            headers: {
                                            'content-type': 'application/json',
                                            'accept':'application/json',

                                            'Access-Control-Allow-Origin':"*",
                                            }  
                                        })
                                        fetch("http://localhost:3001/").then((res)=>{
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
                                            !inStock && <button type='button' className='add-cart-btn' disabled={true}>Add to cart</button>
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
        <ul className="item-container">
            {   
                state==="SUCCESS"?renderProducts():<p>not yet</p>
            }
        </ul>
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