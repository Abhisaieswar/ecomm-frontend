
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Cookies } from 'typescript-cookie'
import { Timestamp } from 'typeorm'
import Header from '../Header'
import './index.css'
import { v4 } from 'uuid'

type ordersType={
    id:number,
    brand:string,
    imageurl:string,
    price:number,
    rating:number,
    title:string,
    quantity:number,
    cartQty:number,
    ordereddate:Timestamp,
    totalamt:number,
    status:String
}

const Orders=()=>{

    
    const options={
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'accept':'application/json',
            'Access-Control-Allow-Origin':"*",
            'Authorization':`bearer ${Cookies.get("jwt_token")}`
        }
    } 

    const history=useHistory()

    const [orders,setOrders]=useState<[] | ordersType[]>([])

    useEffect(()=>{
        fetch("http://localhost:3001/getorders/",options).then((res)=>{
            return res.json()
        }).then((data)=>setOrders(data))
    },[])

    const len=orders.length===0
    return(
        <>
        <Header/>
        <div className="orders-bg-container">
            {
                len && <h1>No Orders here</h1>
            }
            <ul className='order-cards'>
            {
                !len && orders.map(each=>{
                    return(
                        <li key={v4()} className="li-item">
                            <div className='order-item-container' onClick={()=>history.push(`/orders/${each.id}`)}>
                                <img src={each.imageurl} alt="img" className='orders-img'/>
                                <div>
                                    <p>{each.brand}</p>
                                    <p>{each.title}</p>
                                    <p className='status-order'>{each.status}</p>
                                </div>
                            </div>
                        </li>
                    )
                })
            }
            </ul>
        </div>
        </>
    )
}

export default Orders 