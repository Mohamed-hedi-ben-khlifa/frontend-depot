import React, { useContext, useState, useEffect } from 'react'
import { SocketContext } from '../../context/socket';
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { get_deposants, supprimer_deposant, rechercher_deposant_par_telephone } from '../../store/deposantSlice'

export default function Deposants() {

  const dispatch = useDispatch()
  const [deposants, setDeposants] = useState([])
  const [is_deleteted, setIs_deleted] = useState(0)
  const [message, setMessage] = useState()
  const socket = useContext(SocketContext);

  useEffect(() => { dispatch(get_deposants()).then(action => setDeposants(action.payload.deposant)) }, [dispatch, is_deleteted])

  useEffect(() => {
    socket.on("mettre_a_jour_photo_de_profile", () => {
      dispatch(get_deposants()).then(action => setDeposants(action.payload.deposant))
    })
  }, [dispatch,socket])

  const retirer = (deposant) => {
    dispatch(supprimer_deposant(deposant)).then(() => get_deposants())
    setIs_deleted(is_deleteted + 1)
  }

  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('/');
  }

  const handleChange = e => {if (e.code === "Enter") { onKeyDown(e)}; }

  const onKeyDown = async (e) => {

    function myGreeting() { setMessage("")}

    dispatch(rechercher_deposant_par_telephone(e.target.value)).then(async (action) => {
      if (action.payload.deposant.length > 0) {
        setDeposants(action.payload.deposant)
        setMessage("")
      }
      else {
        dispatch(get_deposants()).then(async (action) => { setDeposants(action.payload.deposant) })
        setTimeout(setMessage("Déposant n'est pas trouver !"), 1000)
        setTimeout(myGreeting, 5000);
      }
    })
  }

  return (
    <div>
      <div className="container-fluid ">
        <div className="card text-start ">
          <div className="card-header pb-0">
            <div className="row  mb-4">
              <div className="col-lg-2 col-7">
                <h4>List Des Déposants</h4>
              </div>
              <div className="col-lg-1 col-7"></div>
              <div className="col-lg-2 col-7">
                <div className="input-group input-group-dynamic">
                  <input className="form-control" placeholder="Rechercher déposant par telephone " type="text" name="telephone" onKeyDown={handleChange} />
                </div>
              </div>
              <div className="col-lg-5 col-7">
                <p className="text-start text-primary mt-3">{message}</p>
              </div>
              <div className="col-2">
                <Link to={`/deposant/ajouter_deposant`}>
                  <button className="btn bg-gradient-dark btn-icon col-12 text-center" type="button">
                    <div className="d-flex align-items-center" style={{ marginLeft: '22%' }}>
                      Ajouter
                      <i className="material-icons ms-2" aria-hidden="true">add</i>
                    </div>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="card mt-4">
          <div className="card-body px-0  m-4 mt-0">
            <div className="table">
              <table className="table align-items-center ">
                <thead>
                  <tr>
                    <th className=" text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">déposantnt</th>
                    <th className=" text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Ref</th>
                    <th className=" text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Email</th>
                    <th className=" text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Telephone</th>
                    <th className=" text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Adress</th>
                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Code postal</th>
                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Date naissance</th>
                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {deposants?.map((deposant, index) =>
                  <tr key={index}>
                      <td>
                        <Link to={`/deposant/profile/${deposant._id}`}>
                          <div className="d-flex px-2 py-1">
                            <div>
                              <div className="avatar avatar-xs rounded-circle me-3" key={index} data-bs-toggle="tooltip" data-bs-placement="bottom" title="Romina Hadid">
                                {
                                  deposant.image ?
                                    <img src={process.env.REACT_APP_BASE_URL+"/"+deposant.image} alt="team5" />
                                    : <img src="../assets/img/marie.jpg" alt="team5" />
                                }
                              </div>
                            </div>
                            <div className="d-flex ">
                              <h6 className="mb-0 text-sm ">{!deposant.prenom && !deposant.nom ? "Flen Ben Foulen " : deposant.prenom + " " + deposant.nom}</h6>
                            </div>
                          </div>
                        </Link>
                      </td>
                      <td className="align-middle text-center text-sm " style={{ marginLeft: '-10%' }}>
                        <span className="text-xm text-primary font-weight-bold"> {deposant.ref}</span>
                      </td>
                      <td className="align-middle text-center text-sm " style={{ marginLeft: '-10%' }}>
                        <span className="text-sm font-weight-bold"> {deposant.email ? deposant.email : "flenbenfoulen@mail.com"}</span>
                      </td>
                      <td className="align-middle text-center text-sm " style={{ marginLeft: '-10%' }}>
                        <span className="text-xm text-success font-weight-bold"> +216 {deposant.telephone ? deposant.telephone : "** *** ***"}</span>
                      </td>
                      <td className="align-middle text-center text-sm " style={{ marginLeft: '-10%' }}>
                        <span className="text-sm  font-weight-bold">{deposant.adress ? deposant.adress : "Rue foulen, adress"} </span>
                      </td>
                      <td className="align-middle text-center text-sm">
                        <span className="text-xm text-dark  font-weight-bold"> {deposant.codepostal ? deposant.codepostal : "****"}  </span>
                      </td>
                      <td className="align-middle text-center text-sm " style={{ marginLeft: '-10%' }}>
                        <span className="text-sm font-weight-bold"> { deposant.dateN?formatDate(deposant.dateN): "--/--/----"} </span>
                      </td>
                      <td className="align-middle text-center text-sm " style={{ marginLeft: '-10%' }}>
                        <span className="text-xs font-weight-bold">
                          <a className="avatar avatar-xs rounded-circle me-3" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Romina Hadid" onClick={() => retirer(deposant)}>
                            <img src="../assets/img/refuser.jpg" alt="team5" />
                          </a>
                        </span>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
