
import { useState } from 'react'
import './index.css'
import { Redirect, useHistory } from 'react-router-dom'
import { Cookies } from 'typescript-cookie'


const Login=()=>{
    const token=Cookies.get("jwt_token")
    console.log(".",token)
    let r=false;

    if(token!==undefined)
    {
        r=true;
    }

    const history=useHistory()
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const [err,setErr]=useState("")
    const [req,setReq]=useState("")

    const validate=async(e:any)=>{
        e.preventDefault()
        const det={
            username,
            password
        }
        if(username!=="" && password!=="")
        {
            setReq("")
            const res=await fetch("http://localhost:3001/login/",{
                method: 'POST',
                headers: {
                'content-type': 'application/json',
                'accept':'application/json',
                'Access-Control-Allow-Origin':"*"
                },
                body:JSON.stringify(det)}
            )
            console.log(res,"response")
            const data=await res.json()
            if(res.status===200)
            {
                Cookies.set("jwt_token",data.jwt_token)
                setTimeout(() => {
                    history.replace("/")
                    window.location.reload()
                }, 100);
            }
            else 
            {
                setErr("Invalid User")
            }
        }
        else 
        {
            setReq("*Please enter all the fields")
        }
    }

    return (
        <>
        {
            r && <Redirect to="/"/>
        }
        <div className='login-bg-container'>
            <form className="login-container" onSubmit={validate}>
                <label htmlFor='username'>User Name</label>
                
                <input type="text" id="username" className='input-field-login' value={username} onChange={(e)=>setUsername(e.target.value)}/>
                
                <label htmlFor='password'>Password</label>
                
                <input type="password" id="password" className='input-field-login' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button type="submit" className='login-btn'>Login</button> 
                {
                    err!=="" && <p className='err-msg'>{err}</p>
                }
                {
                    req!=="" && <p className='err-msg'>{req}</p>
                }
            </form>
        </div>
        </>
    )
}

export default Login