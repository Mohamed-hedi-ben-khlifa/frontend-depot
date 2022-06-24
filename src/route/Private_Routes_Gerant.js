
import { Navigate, Outlet } from 'react-router-dom'
import SideBar from '../gerant/component/SideBar'
import Footer from '../gerant/component/Footer'

export const Private_Routes_Gerant = (props) => {

  const token = localStorage.getItem("token")

  return (

    <div>
      <div className='container-fluid'>
        <div className="row">
          <div className="col-2">
            <SideBar />
          </div>
          <div className="col-10" style={{ marginLeft: '13%', width: '85%' }}>
            {(token.length > 0 && props?.role === 'Gérant') ? <Outlet /> : <Navigate to='/connexion' />}
            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}