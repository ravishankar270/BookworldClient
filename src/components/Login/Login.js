import { useContext } from 'react'
import { GoogleLogin } from 'react-google-login'
import AuthApi from '../../AuthApi'
import Cookies from 'js-cookie'
import './Login.css'

export default function Login(props){
    const Auth=useContext(AuthApi)
    const responseGoogle=(response)=>{
        console.log(response)
        Auth.setAuth(true)
        Cookies.set("Username",response.profileObj.givenName)
        Cookies.set("Email",response.profileObj.email)
        window.location.href='/'
    }
    return(
        <div className='page'>
        <div className="LoginArea">
            <h2>Login</h2>
            <GoogleLogin
                className="google"
                clientId="416340651319-vm5kphguqdbbbpl1tspt8l060l4akqhp.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                />
        </div>
        </div>
    )
}



