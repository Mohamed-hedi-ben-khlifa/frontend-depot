import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../store/userSlice'
import { useNavigate } from 'react-router-dom'

const Connexion = () => {

    let navigate = useNavigate();
    const dispatch = useDispatch()
    const [valid, setvalid] = useState(true)
    const [user, setUser] = useState({
        email: "",
        pasword: "",
    })

    const handleChange = e => {
        setvalid(true)
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const connexion = () => {

        dispatch(auth(user)).then(action => {
            localStorage.setItem("token", action.payload.token)
            window.location.reload()
        })
    }


    return (
        <div style={{ marginTop: '-1.05%' }}>
            <div className="container position-sticky z-index-sticky top-0">
                <div className="row">
                    <div className="col-12">
                        {/* Navbar */}
                        {/* End Navbar */}
                    </div>
                </div>
            </div>
            <main className="main-content  mt-0">
                <div className="page-header align-items-start min-vh-100" style={{ backgroundImage: 'url("../assets/img/meeting.jpg")' }}>
                    <span className="mask bg-gradient-dark opacity-6" />
                    <div className="container my-auto">
                        <div className="row">
                            <div className="col-lg-4 col-md-8 col-12 mx-auto m-4">
                                <div className="card z-index-0 fadeIn3 fadeInBottom">
                                    <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                        <div className="bg-gradient-dark shadow-dark border-radius-lg py-3 pe-1 ">
                                            <img src="../assets/img/logo-ct-dark.png" className="navbar-brand-img " alt="main_logo" style={{ width: '20%', height: '1200%', backgroundImage: 'azure', marginLeft: '0%' }} />
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <form role="form" className="text-start">
                                            <div className="input-group input-group-dynamic my-3">
                                                <input type="email" className=" form-control  " placeholder='Email' name="email" value={user.email} onChange={handleChange} />
                                            </div>
                                            <div className="input-group input-group-dynamic mb-3">
                                                <label className="form-label">Password</label>
                                                <input type="password" className="form-control" name="pasword" value={user.pasword} onChange={handleChange} />
                                            </div>
                                            {!valid ? <p className='text-primary text_start'> Adresse email ou mot de passe inncorrect !! </p> : <p></p>}
                                            <div className=" text-md-right text-dark">
                                                <a href="#">Mot de passe oublié</a>
                                            </div>
                                            <div className="text-center">
                                                <button type="button" className="btn bg-gradient-dark w-100 my-4 mb-2" onClick={() => connexion()}>Connexion</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer className="footer position-absolute bottom-2 py-2 w-100">
                        <div className="container">
                            <div className="row align-items-center justify-content-lg-between">
                                <div className="col-12 col-md-6 my-auto">
                                    <div className="copyright text-center text-sm text-white text-lg-start">
                                        © ,
                                        made with <i className="fa fa-heart" aria-hidden="true" /> by
                                        <a href="https://www.creative-tim.com" className="font-weight-bold text-white" target="_blank">Creative Tim</a>
                                        for a better web.
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <ul className="nav nav-footer justify-content-center justify-content-lg-end">
                                        <li className="nav-item">
                                            <a href="https://www.creative-tim.com" className="nav-link text-white" target="_blank">Creative Tim</a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="https://www.creative-tim.com/presentation" className="nav-link text-white" target="_blank">About Us</a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="https://www.creative-tim.com/blog" className="nav-link text-white" target="_blank">Blog</a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="https://www.creative-tim.com/license" className="nav-link pe-0 text-white" target="_blank">License</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </main>
        </div>
    )
}

export default Connexion 