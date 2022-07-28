import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { get_deposants, supprimer_deposant } from '../../store/deposantSlice'
import { get_employées } from '../../store/userSlice'

export default function Liste_des_employées(props) {

    const dispatch = useDispatch()
    const [etat, setEtat] = useState(0)

    const afficher = () => { if (etat === 0) { setEtat(1) } else { setEtat(0) } }

    const retirer = (deposant) => {

        dispatch(supprimer_deposant(deposant)).then(() => get_deposants())
        dispatch(get_employées()).then(action => props.setDeposants(action.payload.deposant))
    }

    return (
        <div>
            <div className="container-fluid ">
                <div className="card text-start ">
                    <div className="card-header pb-0">
                        <div className="row  mb-4">
                            <div className="col-lg-3 col-7">
                                <a type="buttom" onClick={() => afficher()}>
                                    <h4>List Des employés</h4>
                                </a>
                            </div>
                            <div className="col-1">
                                <a type="buttom" onClick={() => afficher()}>
                                    {
                                        etat === 0 ? <img src="../../assets/img/plus.png" alt="team5" style={{ width: '30%', marginLeft: '-60%', marginTop: '4%' }} />
                                            : <img src="../../assets/img/moin.jpg" alt="team5" style={{ width: '30%', marginLeft: '-60%', marginTop: '4%' }} />
                                    }
                                </a>
                            </div>
                        </div>
                    </div>
                    {etat !== 0 ?
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
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Role</th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.employées?.map((deposant, index) =>
                                            <tr key={index}>
                                                <td>
                                                    <div className="d-flex px-2 py-1">
                                                        <div>
                                                            <div className="avatar avatar-xs rounded-circle me-3" key={index} data-bs-toggle="tooltip" data-bs-placement="bottom" title="Romina Hadid">
                                                                {
                                                                    deposant.image ?
                                                                        <img src={deposant.image} alt="team5" />
                                                                        : <img src="../assets/img/marie.jpg" alt="team5" />
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="d-flex flex-column justify-content-center">
                                                            <h6 className="mb-0 text-sm ">{deposant.prenom + " " + deposant.nom}</h6>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="align-middle text-center text-sm " style={{ marginLeft: '-10%' }}>
                                                    <span className="text-xm text-primary font-weight-bold"> {deposant.ref}</span>
                                                </td>
                                                <td className="align-middle text-center text-sm " style={{ marginLeft: '-10%' }}>
                                                    <span className="text-sm font-weight-bold"> {deposant.email? deposant.email: "*******@mail.com"}</span>
                                                </td>
                                                <td className="align-middle text-center text-sm " style={{ marginLeft: '-10%' }}>
                                                    <span className="text-xm text-success font-weight-bold"> +216 {deposant.telephone?deposant.telephone:"** *** ***"}</span>
                                                </td>
                                                <td className="align-middle text-center text-sm " style={{ marginLeft: '-10%' }}>
                                                    <span className="text-sm  font-weight-bold">{deposant.adress?deposant.adress:"Rue ******"} </span>
                                                </td>
                                                <td className="align-middle text-center text-sm">
                                                    <span className="text-xm text-dark  font-weight-bold"> {deposant.codepostal?deposant.codepostal:"****"}  </span>
                                                </td>
                                                <td className="align-middle text-center text-sm " style={{ marginLeft: '-10%' }}>
                                                    <span className="text-sm font-weight-bold"> {deposant.role} </span>
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
                        : <div></div>
                    }
                </div>
            </div>
        </div>
    )
}
