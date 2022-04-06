import { getCookie } from 'typescript-cookie'
import { Route ,Redirect} from 'react-router-dom'

const ProtectedRoute=(props:any)=>{
    const token=getCookie("jwt_token")
    //console.log(token)
    if(token===undefined)
    {
        return <Redirect to="/login"/>
    }
    return <Route {...props}/>
}

export default ProtectedRoute