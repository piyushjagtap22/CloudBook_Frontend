import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = (props) => {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" ,vpassword:""})
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();


        const response = await fetch(process.env.REACT_APP_NODE_BACKEND_API+`/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        })
        const status =  response.status
        if (status === 200) {
            const json = await response.json()
            localStorage.setItem('token', json.authToken)
            navigate('/')
            props.showAlert("Account Created Succesfully","success")

        }
        else {
            props.showAlert("Invalid Details","danger")
        }

    }


    return (
        <div><section className="vh-100" style={{ backgroundColor: '#eee' }}>
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black" style={{ borderRadius: '25px' }}>
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                        <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="text" id="name" name="name" value={credentials.name} onChange={onChange} className="form-control" />
                                                    <label className="form-label" for="name">Your Name</label>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="email" id="email" name="email" value={credentials.email} onChange={onChange} className="form-control" />
                                                    <label className="form-label" for="email">Your Email</label>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="password" id="password" name="password" value={credentials.password} onChange={onChange} className="form-control" minLength={5}/>
                                                    <label className="form-label" for="password">Password</label>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="password" id="vpassword" name="vpassword" value={credentials.vpassword} onChange={onChange} className="form-control" minLength={5}/>
                                                    <label className="form-label" for="vpassword">Repeat your password</label>
                                                </div>
                                            </div>

                                            <div className="form-check d-flex justify-content-center mb-5">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                                                <label className="form-check-label" for="form2Example3">
                                                    I agree all statements in <Link to="#!">Terms of service</Link>
                                                </label>
                                            </div>

                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="submit" className="btn btn-primary btn-lg">Register</button>
                                            </div>

                                        </form>

                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                            className="img-fluid" alt="Sample" />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section></div>
    )
}

export default Signup