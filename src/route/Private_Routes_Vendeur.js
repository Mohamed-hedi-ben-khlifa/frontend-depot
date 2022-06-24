
import { Navigate, Outlet } from 'react-router-dom'
import NavBar from '../vendeur/component/NavBar'
import Footer from '../vendeur/component/Footer'

export const Private_Routes_Vendeur= (props) => {

    const token = localStorage.getItem("token")

    return (

        <div>
            <div style={{ width: '80%', marginLeft: '10%' }}>
                <NavBar setUser={props.setUser} />
                <div style={{ position: 'relative', top: '80px', marginLeft: '0.2%' }}>
                    {(token && props.role === 'Vendeur') ? <Outlet /> : <Navigate to='/connexion' />}
                </div>
                <Footer />
            </div>
        </div>
    )
}