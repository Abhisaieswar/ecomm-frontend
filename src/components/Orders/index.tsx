
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Cookies } from 'typescript-cookie'
import { Timestamp } from 'typeorm'
import Header from '../Header'
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

    // const returnMonth=(num:number)=>{
    //     switch(num)
    //     {
    //         case 1:return "Jan"
    //         case 2:return "Feb"
    //         case 3:return "March"
    //         case 4:return "Apr"
    //         case 5:return "May"
    //         case 6:return "Jun"
    //         case 7:return "Jul"
    //         case 8:return "Aug"
    //         case 9:return "Sep"
    //         case 10:return "Oct"
    //         case 11:return "Nov"
    //         case 12:return "Dec"
    //     }
    // }

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
                    // console.log(each.ordereddate)
                    //  const year=each.ordereddate.slice(0,4)
                    //  const date=each.ordereddate.slice(8,10)
                    //  const month=returnMonth(parseInt(each.ordereddate.slice(6,8)))
                    
                    return(
                        <li key={`each.id ${each.id}`} className="li-item">
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