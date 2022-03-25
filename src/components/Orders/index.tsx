
import { useEffect, useState } from 'react'
import './index.css'



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

const Orders=()=>{

    const [orders,setOrders]=useState<[] | ordersType[]>([])

    useEffect(()=>{
        fetch("http://localhost:3001/getorders/").then((res)=>{
            return res.json()
        }).then((data)=>setOrders(data))
    },[])

    const returnMonth=(num:number)=>{
        switch(num)
        {
            case 1:return "Jan"
            case 2:return "Feb"
            case 3:return "March"
            case 4:return "Apr"
            case 5:return "May"
            case 6:return "Jun"
            case 7:return "Jul"
            case 8:return "Aug"
            case 9:return "Sep"
            case 10:return "Oct"
            case 11:return "Nov"
            case 12:return "Dec"
        }
    }

    const len=orders.length===0
    return(
        <div className="orders-bg-container">
            {
                len && <h1>No Orders here</h1>
            }
            <ul>
            {
                !len && orders.map(each=>{
                    //console.log(typeof (each.ordereddate))
                     const year=each.ordereddate.slice(0,4)
                     const date=each.ordereddate.slice(8,10)
                     const month=returnMonth(parseInt(each.ordereddate.slice(6,8)))
                     
                    return(
                        <li key={`each.id ${each.id}`} className="li-item">
                            <div className='order-item-container'>
                                <div className='display-type'>
                                    <div className='above-section'>
                                        <img src={each.imageurl} alt="img" className='orders-img'/>
                                        <div className='ordered-item-details'>
                                            <p>{each.title}</p>
                                            <p>{each.brand}</p>
                                            <p>₹{each.price}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <button type='button' className='status-btn' onClick={()=>{
                                            if(each.status==="Order placed")
                                            {
                                                
                                            }
                                            else if(each.status==="ready for shipping")
                                            {
                                                
                                            }
                                            else if(each.status==="shipped")
                                            {
                                                
                                            }
                                        }}>Change Status</button>
                                        <p>{each.status}</p>
                                    </div>
                                </div>
                                <div className='below-section'>
                                    <p>Ordered on {date} {month} {year}</p>
                                    <p>Order Total: {each.totalamt}</p>
                                </div>
                            </div>
                        </li>
                    )
                })
            }
            </ul>
        </div>
    )
}

export default Orders