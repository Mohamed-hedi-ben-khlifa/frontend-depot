
import { Navigate, Outlet } from 'react-router-dom'
import SideBar from '../admin/component/SideBar'
import Footer from '../admin/component/Footer'

export const Private_Routes_Admin = (props) => {

  const token = localStorage.getItem("token")

  return (

    <div>
      <div className='container-fluid'>
        <div className="row">
          <div className="col-2">
            <SideBar />
          </div>
          <div className="col-10" style={{ marginLeft: '13%', width: '85%' }}>
            {(token && props.role === 'admin') ? <Outlet /> : <Navigate to='/connexion' />}
            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}