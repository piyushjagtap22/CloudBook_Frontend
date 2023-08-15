import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import { verify, login } from '../api/authApi';

// import {} from 'react-router'

const Login = (props) => {
    const [otp, setOtp] = useState('');
    const location = useLocation();
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate()
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const { userId } = location.state;
    const handleSubmit = async (e) => {
        e.preventDefault();


        const response = await verify({ userId, otp }).then((res) => {
            console.log(res)
            if (res.status === 200) {

                localStorage.setItem('token', res.data.payload.authToken)
                console.log("Verified")

                navigate('/')
                props.showAlert("Verification Success", "success")

            }
            else {
                props.showAlert("Invalid Verification Code", "danger")
            }
        })

    }




return (
    <div><form onSubmit={handleSubmit}>
        {/* <!-- Code input --> */}
        <div className="form-outline mb-4">
            <label className="form-label" htmlFor="code" >Verification Code</label>
            <input type="text" id="code" className="form-control" name="code" onChange={(e) => setOtp(e.target.value)} value={otp} />

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


        <button type="submit" className="btn btn-primary btn-block mb-4">Verify Code</button>


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