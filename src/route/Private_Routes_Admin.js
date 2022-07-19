
import { Navigate, Outlet } from 'react-router-dom'
import SideBar from '../admin/component/SideBar'
import Footer from '../admin/component/Footer'
import { ajouter_boutique, information } from '../store/boutiqueSlice';
import { useDispatch } from 'react-redux';
import { useContext, useEffect, useState } from 'react'


export const Private_Routes_Admin = (props) => {

  const token = localStorage.getItem("token")
  const dispatch = useDispatch()
  const [boutique, setBoutique] = useState()

  useEffect(() => {
    dispatch(information()).then((action) => {
      console.log(action);
      if (!action.payload.boutique[0]) {
        const boutique = {
          email: "Dépot@mail.com",
          telephone: "00000000",
          adress: "rue ***************",
          nom: "Dépot",
          taux: 20,
        }
        dispatch(ajouter_boutique(boutique)).then(action => console.log(action))
      }
      setBoutique(action.payload.boutique[0])
    })
  }
    , [])

  return (

    <div>
      <div className='container-fluid'>
        <div className="row">
          <div className="col-2">
            <SideBar  boutique={boutique}/>
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