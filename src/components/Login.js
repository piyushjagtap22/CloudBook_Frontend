import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import {} from 'react-router'

import { verify, login } from '../api/authApi';

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate()
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login({ email: credentials.email })
                .then((res) => {
                    if (res.status === 200) {
                        console.log(res)
                        // console.log(json.payload.id)
                        navigate('/verify', { state: { userId: res.data.payload.id, email: credentials.email } })

                    }
                    else {
                        props.showAlert("Invalid Credentials", "danger")
                    }
                })
        } catch (err) {
            console.log(err)
            console.log(err?.data?.message || err.error);

        }









    }
    return (
        <div><form onSubmit={handleSubmit}>
            {/* <!-- Email input --> */}
            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="email" >Email address</label>
                <input type="email" id="email" className="form-control" name="email" onChange={onChange} value={credentials.email} />

            </div>

            {/* <!-- Password input --> */}


            {/* <!-- 2 column grid layout for inline styling --> */}
            <div className="row mb-4">
                <div className="col d-flex justify-content-center">
                    {/* <!-- Checkbox --> */}
                    {/* <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="form2Example31" checked />
                        <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
                    </div> */}
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