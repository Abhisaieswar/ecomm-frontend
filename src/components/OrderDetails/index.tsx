import axios from "axios"
import { useEffect, useState } from "react"
import { Cookies } from "typescript-cookie"
import './index.css'
type ordersType={
    id:number,
    brand:string,
    imageurl:string,
    price:number,
    rating:number,
    title:string,
    quantity:number,
    cartQty:number,
    ordereddate:string,
    totalamt:number,
    status:String
}

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const status={
    initial:"INITIAL",
    loading:"LOADING",
    success:"SUCCESS",
}

const OrderDetails=(props:any)=>{

    const options={
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'accept':'application/json',
            'Access-Control-Allow-Origin':"*",
            'Authorization':`bearer ${Cookies.get("jwt_token")}`
        }
    } 

    const id=props.match.params.id

    const [order,setOrder]=useState<ordersType[]>([])

    const [Status,setStatus]=useState(status.initial)
    

    useEffect(()=>{
        fetch(`http://localhost:3001/getorder/${id}`,options).then((res)=>res.json()).then((data)=>{
            setOrder(data)
            console.log(new Date(data[0].ordereddate))
            setStatus(status.success)
        }).catch((err)=>console.log(err))
    },[])


    return (
        <div className="order-bg-container">
            {
                Status==="SUCCESS" && 
                <div className='order-item-container'>
                    <div className='display-type'>
                        <div className='above-section'>
                            <img src={order[0].imageurl} alt="img" className='orders-img'/>
                            <div className='ordered-item-details'>
                                <p>{order[0].title}</p>
                                <p>{order[0].brand}</p>
                                <p>₹{order[0].price}</p>
                                <p>Quantity: {order[0].quantity}</p>
                            </div>
                        </div>
                        <div>
                        {
                            order[0].status!=="Delivered" &&
                            <button type='button' className='status-btn' onClick={async()=>{
                            if(order[0].status==="Order placed")
                            {
                                const data={st:"ready for shipping"}
                                await axios(`http://localhost:3001/updatestatus/${order[0].id}`,{
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
                            }

                            else if(order[0].status==="ready for shipping")
                            {
                                const data={st:"Shipped"}
                                await axios(`http://localhost:3001/updatestatus/${order[0].id}`,{
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
                            }
                            else if(order[0].status==="Shipped")
                            {
                                const data={st:"Delivered"}
                                await axios(`http://localhost:3001/updatestatus/${order[0].id}`,{
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
                            }
                            await fetch(`http://localhost:3001/getorder/${order[0].id}`,options).then((res)=>{
                                return res.json()
                            }).then((data)=>setOrder(data))
                            }}>Change Status</button>
                            }<p>{order[0].status}</p>
                        </div>
                    </div>
                    <div className='below-section'>
                        <p>Ordered on {new Date(order[0].ordereddate).getFullYear()} {months[new Date(order[0].ordereddate).getMonth()]} {new Date(order[0].ordereddate).getDate()} {new Date(order[0].ordereddate).getHours()}:{new Date(order[0].ordereddate).getMinutes()}:{new Date(order[0].ordereddate).getSeconds()}</p>
                        <p>Order Total: {order[0].totalamt}</p>
                    </div>
                </div>
            }
        </div>
    )
}

export default OrderDetails