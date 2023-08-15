import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
// import {} from 'react-router'

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate()
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
       try{
        console.log({ email: credentials.email, password: credentials.password })
        const response = await fetch(process.env.REACT_APP_NODE_BACKEND_API+`/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        })
        const res = await response.json()
        console.log(res)
        if ( res.status.code === 200) {
            // const json = await response.json()
            localStorage.setItem('token',res.payload.authToken)
            navigate('/')
            props.showAlert("Logged in Succesfully","success")

        }
        else{
            props.showAlert("Invalid Credentials","danger")
        }
    }
    catch(err){
        console.log(err)
        props.showAlert("Internal Server Error","danger")
    }

        
    }
    return (
        <div><form onSubmit={handleSubmit}>
            {/* <!-- Email input --> */}
            <div className="form-outline mb-4">
                <input type="email" id="email" className="form-control" name="email" onChange={onChange} value={credentials.email}/>
                <label className="form-label" htmlFor="email" >Email address</label>
            </div>

            {/* <!-- Password input --> */}
            <div className="form-outline mb-4">
                <input type="password" id="password" className="form-control" name="password" onChange={onChange} value={credentials.password} />
                <label className="form-label" htmlFor="password" >Password</label>
            </div>

            {/* <!-- 2 column grid layout for inline styling --> */}
            <div className="row mb-4">
                <div className="col d-flex justify-content-center">
                    {/* <!-- Checkbox --> */}
                    {/* <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="form2Example31" checked />
                        <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
                    </div> */}
                </div>

                <div className="col">

                    <a href="#!">Forgot password?</a>
                </div>
            </div>


            <button type="submit" className="btn btn-primary btn-block mb-4">Login</button>


            <div className="text-center">
                <p>Not a member? <Link to="/signup">Register</Link></p>
                {/* <p>or sign up with:</p>
                <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-facebook-f"></i>
                </button>

                <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-google"></i>
                </button>

                <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-twitter"></i>
                </button>

                <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-github"></i>
                </button> */}
            </div>
        </form></div>
    )
}

export default Login