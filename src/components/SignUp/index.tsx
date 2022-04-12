import { useState } from "react"
import { useHistory } from "react-router-dom"

const SignUp=()=>{
    const [username,setUsername]=useState("")
    const [password1,setPassword1]=useState("")
    const [err,setErr]=useState("")
    const [req,setReq]=useState("")
    const [password2,setPassword2]=useState("")
    
    const history=useHistory()

    const validate=async(e:any)=>{
        e.preventDefault()

        const det={
            username,
            password1
        }

        if(username!=="" && password1!=="" && password2===password1)
        {
            setReq("")
            const res=await fetch("http://localhost:3001/signup/",{
                method: 'POST',
                headers: {
                'content-type': 'application/json',
                'accept':'application/json',
                'Access-Control-Allow-Origin':"*"
                },
                body:JSON.stringify(det)}
            )
            if(res.status===200)
            {
                setTimeout(() => {
                    history.replace("/")
                    window.location.reload()
                }, 100);
            }
            else 
            {
                setErr("UserName Already Exists")
            }
        }
        else if(password1!==password2)
        {
            setReq("")
            setErr("passwords doesn't match")
        }
        else 
        {
            setReq("*Please enter all the fields")
            setErr("")
        }
    }

    return (
        <div className="login-bg-container">
            <form className="login-container" onSubmit={validate}>
                <label htmlFor='username'>User Name</label>
                
                <input type="text" id="username" className='input-field-login' value={username} onChange={(e)=>setUsername(e.target.value)}/>
                
                <label htmlFor='password1'>Password</label>
                
                <input type="password" id="password1" className='input-field-login' value={password1} onChange={(e)=>setPassword1(e.target.value)}/>
                
                <label htmlFor="password2">Confirm Password</label>

                <input type="password" id="password2" className='input-field-login' value={password2} onChange={(e)=>setPassword2(e.target.value)}/>
                
                <button type="submit" className='login-btn'>SignUp</button> 
                {
                    err!=="" && <p className='err-msg'>{err}</p>
                }
                {
                    req!=="" && <p className='err-msg'>{req}</p>
                }
            </form>
        </div>
    )
}

export default SignUp