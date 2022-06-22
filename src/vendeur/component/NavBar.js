import React ,{ useContext } from 'react'
import { useSelector } from 'react-redux';
import { SocketContext } from '../../context/socket';

import { Link, useNavigate } from 'react-router-dom'


function NavBar(props) {

    const { boutique } = useSelector((state) => state.boutique)
    const socket = useContext(SocketContext);
    let navigate = useNavigate();

    const logOut = () => {

        localStorage.removeItem('user')
        props.setUser(null)
        socket.emit("disconnected")
        return navigate('/connexion', { replace: true })
    }



    return (
        <div>
            <nav className="navbar  navbar-expand-lg   px-0 mx-4 mt-0 border-radius-xl z-index-sticky blur opacity-9   " style={{ position: 'fixed', width: '80%', left: '9%' }}>

                <a className="navbar-brand m-0"  >
                    <img src={boutique?.logo} className="navbar-brand-img w-10" alt="main_logo" style={{ marginRight: "2%" }} />

                    <span className="ms-1 font-weight-bold " style={{ color: "#111", fontFamily: 'Indie Flower', fontweight: '700', fontSize: "120%" }}>{boutique?.nom} </span>
                </a>


                <ul className="pro nav justify-content-center " style={{ marginLeft: "26%" }}>
                    <li className="nav-item">
                        <Link to={'/vendeur/caisse'} className="nav-link " href="#">Caisse</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={'/vendeur/articles'} className="nav-link " href="#">Articles</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={'/vendeur/recu/caisse'} className="nav-link " href="#">Reçus</Link>
                    </li>



                </ul>

                <span className="text-end " style={{ marginLeft: "32%" }}> <a className="nav-link" href="" onClick={() => logOut()}>deconnexion</a></span>


            </nav>



        </div>

    )
}

export default NavBar


