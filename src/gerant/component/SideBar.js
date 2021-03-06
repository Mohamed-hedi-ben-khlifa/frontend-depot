import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { SocketContext } from '../../context/socket';
import { liste_des_articles_en_attente } from '../../store/articleSlice';
import { liste_des_notifications_non_vu } from '../../store/notificationSlice';

export default function SideBar(props) {


    const [dashboard, setdashboard] = useState(false)
    const [deposant, setdeposant] = useState(false)
    const [article, setarticle] = useState(false)
    const [rendez_vous, setrendez_vous] = useState(false)
    const [ajouter_deposant, setajouter_deposant] = useState(false)
    const [recu, setrecu] = useState(false)
    const [ajouter_article, setajouter_article] = useState(false)
    const [caisse, setcaisse] = useState(false)
    const [payment, setpayment] = useState(false)
    const [store, setstore] = useState(false)
    const [notification, setnotification] = useState(false)
    const [profile, setprofile] = useState(false)

    let navigate = useNavigate();
    const { boutique } = useSelector((state) => state.boutique)
    const socket = useContext(SocketContext);
    const dispatch = useDispatch()
    
    
    const logout = () => {

        localStorage.removeItem('token')
        socket.emit("disconnected")
        return navigate('/connexion', { replace: true })
    }

    const [nombre_article_en_attente, setNombre_article_en_attente] = useState(0)
    const [nombre_des_notifications, setnombre_des_notifications] = useState(0)
    useEffect(() => {
        socket.on("mettre_a_jour_liste_des_articles_en_attente", () => {
            dispatch(liste_des_articles_en_attente()).then(action => { setNombre_article_en_attente(action.payload.article.length) })
            dispatch(liste_des_notifications_non_vu()).then(action => setnombre_des_notifications(action.payload.notification.length))
        })
        dispatch(liste_des_notifications_non_vu()).then(action => setnombre_des_notifications(action.payload.notification.length))
        dispatch(liste_des_articles_en_attente()).then(action => { setNombre_article_en_attente(action.payload.article.length) })
    }, [dispatch,socket])


    



        function dashboards() {
            setdashboard(true)
            setdeposant(false)
            setpayment(false)
            setarticle(false)
            setrendez_vous(false)
            setajouter_deposant(false)
            setrecu(false)
            setajouter_article(false)
            setcaisse(false)
            setstore(false)
            setnotification(false)
            setprofile(false)
        }

        function deposants() {
            setdashboard(false)
            setdeposant(true)
            setpayment(false)
            setarticle(false)
            setrendez_vous(false)
            setajouter_deposant(false)
            setrecu(false)
            setajouter_article(false)
            setcaisse(false)
            setstore(false)
            setnotification(false)
            setprofile(false)
        }

        function articles() {
            setdashboard(false)
            setdeposant(false)
            setpayment(false)
            setarticle(true)
            setrendez_vous(false)
            setajouter_deposant(false)
            setrecu(false)
            setajouter_article(false)
            setcaisse(false)
            setstore(false)
            setnotification(false)
            setprofile(false)
        }

        function rendez_vouss() {
            setdashboard(false)
            setdeposant(false)
            setpayment(false)
            setarticle(false)
            setrendez_vous(true)
            setajouter_deposant(false)
            setrecu(false)
            setajouter_article(false)
            setcaisse(false)
            setstore(false)
            setnotification(false)
            setprofile(false)
        }


        function ajouter_deposants() {
            setdashboard(false)
            setdeposant(false)
            setpayment(false)
            setarticle(false)
            setrendez_vous(false)
            setajouter_deposant(true)
            setrecu(false)
            setajouter_article(false)
            setcaisse(false)
            setstore(false)
            setnotification(false)
            setprofile(false)
        }


        function recus() {
            setdashboard(false)
            setdeposant(false)
            setpayment(false)
            setarticle(false)
            setrendez_vous(false)
            setajouter_deposant(false)
            setrecu(true)
            setajouter_article(false)
            setcaisse(false)
            setstore(false)
            setnotification(false)
            setprofile(false)
        }

        function ajouter_articles() {
            setdashboard(false)
            setdeposant(false)
            setpayment(false)
            setarticle(false)
            setrendez_vous(false)
            setajouter_deposant(false)
            setrecu(false)
            setajouter_article(true)
            setcaisse(false)
            setstore(false)
            setnotification(false)
            setprofile(false)
        }

        function caisses() {
            setdashboard(false)
            setdeposant(false)
            setpayment(false)
            setarticle(false)
            setrendez_vous(false)
            setajouter_deposant(false)
            setrecu(false)
            setajouter_article(false)
            setcaisse(true)
            setstore(false)
            setnotification(false)
            setprofile(false)
        }

        function payments() {
            setdashboard(false)
            setdeposant(false)
            setpayment(true)
            setarticle(false)
            setrendez_vous(false)
            setajouter_deposant(false)
            setrecu(false)
            setajouter_article(false)
            setcaisse(false)
            setstore(false)
            setnotification(false)
            setprofile(false)
        }

        function stores() {
            setdashboard(false)
            setdeposant(false)
            setpayment(false)
            setarticle(false)
            setrendez_vous(false)
            setajouter_deposant(false)
            setrecu(false)
            setajouter_article(false)
            setcaisse(false)
            setstore(true)
            setnotification(false)
            setprofile(false)
        }

        function notifications() {
            setdashboard(false)
            setdeposant(false)
            setpayment(false)
            setarticle(false)
            setrendez_vous(false)
            setajouter_deposant(false)
            setrecu(false)
            setajouter_article(false)
            setcaisse(false)
            setstore(false)
            setnotification(true)
            setprofile(false)
            setnombre_des_notifications(0)
        }

        function profiles() {
            setdashboard(false)
            setdeposant(false)
            setpayment(false)
            setarticle(false)
            setrendez_vous(false)
            setajouter_deposant(false)
            setrecu(false)
            setajouter_article(false)
            setcaisse(false)
            setstore(false)
            setnotification(false)
            setprofile(true)
        }

        return (
            <div >
                <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 bg-gradient-white ps bg-white" id="sidenav-main" >
                    <div className="sidenav-header">
                        <i className="fas fa-times p-3 cursor-pointer text-dark opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav" />
                        <a className="navbar-brand m-0"  >
                            <img src={boutique?.logo} className="navbar-brand-img h-100" alt="main_logo" style={{ marginTop: "-8%", marginRight: "6%" ,marginLeft: "-8%" }} />
    
                            <span className="ms-1 font-weight-bold " style={{ color: "#111", fontFamily: 'Indie Flower', fontweight: '700', fontSize: "200%" }}>{boutique?.nom} </span>
                        </a>
                    </div>
                    <hr className="horizontal dark mt-0 mb-0" />
                    <div className="collapse navbar-collapse  w-auto  " id="sidenav-collapse-main" style={{ height: '100%' }}>
                        <hr className="horizontal dark mt-0 px-1 mb-2" />
                        <ul className="navbar-nav">
    
                        <li className="nav-item mt-2 " style={{ marginBottom: '-3%', marginLeft: '8%' }}>
                                <h6 className=" text-dark text-start text-xs font-weight-bolder opacity-10">Parametres Des Articles</h6>
                            </li>
                            <li className="nav-item">
                                <Link className={!ajouter_article ? 'nav-link text-dark' : 'nav-link text-white active bg-gradient-dark'} to="/gerant/article/ajouter" onClick={() => { ajouter_articles() }}>
                                    <div className="text-dark text-center me-2 d-flex align-items-center justify-content-center">
                                        <i className="material-icons opacity-10">add_shopping_cart</i>
                                    </div>
                                    <span className="nav-link-text ms-1">Ajouter acticle</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={!article ? 'nav-link text-dark' : 'nav-link text-white active bg-gradient-dark'} to="/gerant/article/list" onClick={() => { articles() }}>
                                    <div className="text-dark text-center me-2 d-flex align-items-center justify-content-center">
                                        <i className="material-icons opacity-10">list_alt</i>
                                    </div>
                                    <span className="nav-link-text ms-1">Liste des articles</span>
                                </Link>
                            </li>
    
                            <li className="nav-item">
                                <Link className={!rendez_vous ? 'nav-link text-dark' : 'nav-link text-white active bg-gradient-dark'} to="/gerant/article/enAttente" onClick={() => { rendez_vouss() }}>
                                    <div className="text-dark text-center me-2 d-flex align-items-center justify-content-center">
                                        <i className="material-icons opacity-10">update</i>
                                    </div>
                                    <span className="nav-link-text ms-1">Article en attente</span>
                                </Link>
                            </li>
                            <li className="nav-item mt-2 " style={{ marginBottom: '-3%', marginLeft: '8%' }}>
                                <h6 className=" text-dark text-xs text-start font-weight-bolder opacity-10">Parametres Des D??posants</h6>
                            </li>
                            <li className="nav-item">
                                <Link className={!ajouter_deposant ? 'nav-link text-dark' : 'nav-link text-white active bg-gradient-dark'} to="/gerant/deposant/ajouter" onClick={() => { ajouter_deposants() }}>
                                    <div className="text-dark text-center me-2 d-flex align-items-center justify-content-center">
                                        <i className="material-icons opacity-10">person_add</i>
                                    </div>
    
                                    <span className="nav-link-text ms-1" >Ajouter d??posant</span>
                                </Link>
                            </li>
     
                            <li className="nav-item">
                                <Link className={!deposant ? 'nav-link text-dark' : 'nav-link text-white active bg-gradient-dark'} to="/gerant/deposant/list" onClick={() => { deposants() }}>
                                    <div className="text-dark text-center me-2 d-flex align-items-center justify-content-center">
                                        <i className="material-icons opacity-10">people</i>
                                    </div>
    
                                    <span className="nav-link-text ms-1" >Liste des d??posant</span>
                                </Link>
                            </li>
                          
                            
                            <li className="nav-item mt-2 " style={{ marginBottom: '-3%', marginLeft: '8%' }}>
                                <h6 className=" text-dark text-start text-xs font-weight-bolder opacity-10">Parametres Des Notifications</h6>
                            </li>
                            <li className="nav-item">
                                <Link className={!notification ? 'nav-link text-dark' : 'nav-link text-white active bg-gradient-dark'} to="/gerant/notification/liste" onClick={() => { notifications() }}>
                                    <div className="text-dark text-center me-2 d-flex align-items-center justify-content-center">
                                        <i className="material-icons opacity-10">notifications</i>
                                    </div>
                                    <span className="nav-link-text ms-1">Liste Des Notifications</span>
                                </Link>
                            </li>
                           
                            
    
                           
                            <li className="nav-item mt-2 " style={{ marginBottom: '-3%', marginLeft: '8%' }}>
                                <h6 className=" text-dark text-start text-xs font-weight-bolder opacity-10">Parametres Des Re??us</h6>
                            </li>
                            <li className="nav-item">
                                <Link className={!recu ? 'nav-link text-dark' : 'nav-link text-white active bg-gradient-dark'} to="/gerant/recu" onClick={() => { recus() }}>
                                    <div className="text-dark text-center me-2 d-flex align-items-center justify-content-center">
                                        <i className="material-icons opacity-10">description</i>
                                    </div>
                                    <span className="nav-link-text ms-1">Liste des re??us</span>
                                </Link>
                            </li>
    
                            <li className="nav-item  mt-2 " style={{ marginBottom: '-3%', marginLeft: '8%' }}>
                                <h6 className="text-start text-xs font-weight-bolder opacity-10">Parametres De Profile</h6>
                            </li>
    
                            <li className="nav-item">
                                <Link className={!profile ? 'nav-link text-dark' : 'nav-link text-white active bg-gradient-dark'} to="/gerant/boutique" onClick={() => { profiles() }}>
                                    <div className="text-dark text-center me-2 d-flex align-items-center justify-content-center">
                                        <i className="material-icons opacity-10">storefront</i>
                                    </div>
                                    <span className="nav-link-text ms-1">Profile de boutique</span>
                                </Link>
                            </li>
                            <li className="nav-item " style={{ marginBottom: '-3%', marginLeft: '8%' }}>
                                <h6 className=" text-dark text-start text-xs font-weight-bolder opacity-10">Parametres De Caisse</h6>
                            </li>
    
    
                            <li className="nav-item">
                                <Link className={!caisse ? 'nav-link text-dark' : 'nav-link text-white active bg-gradient-dark'} to="/gerant/caisse" onClick={() => { caisses() }}>
                                    <div className="text-dark text-start me-2 d-flex align-items-start justify-content-start">
                                        <i className="material-icons opacity-10">point_of_sale</i>
                                    </div>
                                    <span className="nav-link-text ms-1" >Caisse de vente</span>
                                </Link>
    
                            </li>
    
                            
                        </ul>
                        <div className="sidenav-footer position-absolute w-auto bottom-0 ">
                            <Link className="nav-link text-dark m-4" to="/connexion" onClick={() => logout()}>
                                <div className="text-dark text-center  d-flex align-items-center justify-content-center">
                                    <i className="material-icons opacity-10">logout</i>
                                    <span className="nav-link-text ms-1">d??connexion</span>
                                </div>
                            </Link>
                        </div>
    
                    </div>
                </aside>
    
    
            </div>
        )
    }

