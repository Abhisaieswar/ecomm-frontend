import {AiOutlineShoppingCart} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { Cookies } from 'typescript-cookie'
import { useHistory } from 'react-router-dom'

import './index.css'
import { useEffect, useState } from 'react'

const options={
    method: 'GET',
    headers: {
        'content-type': 'application/json',
        'accept':'application/json',
        'Access-Control-Allow-Origin':"*",
        'Authorization':`bearer ${Cookies.get("jwt_token")}`
    }
}

const Header=()=>{
    const history=useHistory()
    const [username,setUsername]=useState("")

    useEffect(()=>{
        fetch("http://localhost:3001/getusername",options)
        .then((res)=>{
            return res.json()
        })
        .then((uname)=>{
            setUsername(uname.uname)
            console.log(username)
        })
        .catch((err)=>{
            console.log(err)
        })
    })
    
    return (
        <div className='header'>
            <div className='header-options'>
                <h1>Welcome {username}</h1>
                <Link to="/">
                    <button type='button' className='products-btn'>PRODUCTS</button>
                </Link>
                <div className="header-container">
                    <Link to="/orders">
                        <button type='button' className='products-btn'>ORDERS</button>
                    </Link>
                    <div>
                        <button type='button' className='add-btn' onClick={()=>{
                            history.push(`/newproduct/`)
                        }}>Add a new Item</button>
                    </div>
                </div>
            </div>
            <div className='cart-logout'>
                <Link to="/cart">
                    <div className="cart-count-container">
                        <AiOutlineShoppingCart className='cart-icon'/>
                    </div>
                </Link>
                <button className='logout-btn' type='button' onClick={()=>{
                    Cookies.remove("jwt_token")
                    history.push("/login")
                }}>Logout</button>
            </div>
        </div>
    )
}

export default Header 