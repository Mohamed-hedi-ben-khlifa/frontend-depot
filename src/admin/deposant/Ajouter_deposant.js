
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ajouter_deposant } from '../../store/deposantSlice'
import { useDispatch } from 'react-redux'

export default function Ajouter_deposant() {

    const dispatch = useDispatch()
    const d = new Date()
    const [deposant, setDeposant] = useState({
        nom: "",
        prenom: "",
        email: "",
        pasword: "depot2022",
        telephone: "",
        adress: "",
        cin: "",
        role: "deposant",
        dateN: null,
        codepostal: "",
        dateCreation: new Date(d.getDay(), d.getMonth(), d.getFullYear()),
        image: ""
    })

    const ajouter = () => { dispatch(ajouter_deposant(deposant)) }

    const handleChange = e => {
        const { name, value } = e.target;
        setDeposant(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    return (
        <div>
            <div className="container-fluid mb-4 ">
                <div className="card text-start">
                    <div className="card-header pb-0">
                        <div className="row  mb-4">
                            <div className="col-lg-11 col-7">
                                <h4>Information personelle </h4>
                            </div>
                            <div className="col-1">
                            </div>
                        </div>
                    </div>
                    <form role="form" id="contact-form" method="post" autoComplete="off">
                        <div className="card-body" style={{ marginLeft: '6%' }}>
                            <div className="row">
                                <div className="col-1" />
                                <div className="col-md-3">
                                    <div className="input-group input-group-static mb-4">
                                        <h6 style={{ marginBottom: '-3%' }}>Nom</h6>
                                        <input className="form-control" placeholder="Ben khalifa" type="text" name="nom" value={deposant.nom} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="col-md-3 ps-2">
                                    <div className="input-group input-group-static mb-4">
                                        <h6 style={{ marginBottom: '-3%' }}>Prénom</h6>
                                        <input className="form-control" placeholder="mohamed" type="text" name="prenom" value={deposant.prenom} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="col-md-3 ps-3">
                                    <div className="input-group input-group-static mb-4">
                                        <h6 style={{ marginBottom: '-3%' }}>Telephone</h6>
                                        <input className="form-control" placeholder="+216345***" type="text" name="telephone" value={deposant.telephone} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-1" />
                                <div className="col-md-4">
                                    <div className="input-group input-group-static mb-4">
                                        <h6 style={{ marginBottom: '-3%' }}>Adress mail</h6>
                                        <input className="form-control" placeholder="exemple@gmail.com" type="text" name="email" value={deposant.email} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="col-1" />
                                <div className="col-md-4 ps-2">
                                    <div className="input-group input-group-static mb-4">
                                        <h6 style={{ marginBottom: '-3%' }}>C.I.N</h6>
                                        <input className="form-control" placeholder={12873609} type="text" name="cin" value={deposant.cin} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-1" />
                                <div className="col-md-3">
                                    <div className="input-group input-group-static mb-4">
                                        <h6 style={{ marginBottom: '-3%' }}>Code postal</h6>
                                        <input className="form-control" placeholder={4070} type="text" name="codepostal" value={deposant.codepostal} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="input-group input-group-static mb-4">
                                        <h6 style={{ marginBottom: '-3%' }}>Adress</h6>
                                        <input className="form-control" placeholder="Rue cheneb, sahloul" type="text" name="adress" value={deposant.adress} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="col-md-3 ps-2 ">
                                    <div className="input-group input-group-static mb-4">
                                        <h6 style={{ marginBottom: '-3%' }}>Date de naissance </h6>
                                        <input className="form-control" placeholder="+216345***" type="date" name="dateN" value={deposant.dateN} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="row  m-4">
                        <div className="col-lg-6 col-7">
                        </div>
                        <div className="col-2">
                        </div>
                        <div className="col-2 ml-4">
                            <Link to="/deposant/list" className="btn bg-gradient-dark btn-icon col-12 " type="button" onClick={() => ajouter()}>
                                <div className="d-flex align-items-center" style={{ marginLeft: '30%' }}  >
                                    Ajouter
                                    <span className="material-icons">
                                        done
                                    </span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
