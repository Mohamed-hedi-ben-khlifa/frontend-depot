import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { information, modifier_boutique, modifier_nom_boutique, modifier_pofit_des_articles_deposant, upload_logo_boutique } from '../../store/boutiqueSlice'
import { get_employées } from '../../store/userSlice'
import Ajouter_un_emplye from './Ajouter_un_emplye'
import Liste_des_employées from './Liste_des_employées'

export default function Boutique() {

    const dispatch = useDispatch()
    const [employées, setEmployeés] = useState([])
    const [deposants, setDeposants] = useState([])
    const [boutique, setBoutique] = useState({
        email: null,
        nom: null,
        taux: null,
        telephone: null,
        adress: null,
        logo: null,
    })

    useEffect(() => {
        dispatch(information()).then(action => {setBoutique(action.payload?.boutique[0])})
    }, [])

    const handleChange = e => {
        const { name } = e.target
        setBoutique(prevState => ({
            ...prevState,
            [name]: e.target.value
        }));
    };

    const modified_taux = () => {

        dispatch(modifier_pofit_des_articles_deposant(boutique))
        dispatch(information()).then(action => {setBoutique(action.payload?.boutique[0])})
    }

    const modified_nom = () => {

        dispatch(modifier_nom_boutique(boutique))
        dispatch(information()).then(action => {setBoutique(action.payload?.boutique[0])})
    }

    const modified_boutique = () => {

        dispatch(modifier_boutique(boutique))
        dispatch(information()).then(action => {setBoutique(action.payload?.boutique[0])})
    }

    const fileChange = e => {

        const image = new FormData()
        image.append('image', e.target.files[0])
        const b = {image:image,id:boutique._id}
        
        dispatch(upload_logo_boutique(b)).then(action => {
            dispatch(information()).then(action => {setBoutique(action.payload?.boutique[0]) })
        })
    }

    useEffect(() => {dispatch(get_employées()).then(action => setDeposants(action.payload.deposant))}, [dispatch,boutique])

    useEffect(() => {setEmployeés(deposants?.filter(deposant => deposant.role !== "deposant"))}, [deposants])

    return (
        <div>
            <div className="container-fluid text-start mb-4" >
                <div className="row">
                    <div className="col-3">
                        <div className="card text-center">
                            <div className="about-avatar p-3"  >
                                <a type="button" data-bs-toggle="modal" data-bs-target="#taux" >
                                    <h5 className="text-secondary  text-center mt-2 ">Profit des Article Déposant</h5>
                                    <h1 className="  text-center mb-3 " style={{ color: "#111", fontFamily: 'Indie Flower', fontweight: '400', marginBottom: '-2%' }}>{boutique?.taux} %</h1>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="card ">
                            <div className="about-avatar text-center " style={{ padding: '3%' }} >
                                <a type="button" data-bs-toggle="modal" data-bs-target="#logo" >
                                    <img className="img-center" src={boutique?.logo ?process.env.REACT_APP_BASE_URL+"/"+ boutique?.logo: '../../../assets/img/logo-ct-dark.png' } style={{ width: '90px', height: '90px' }} />
                                    <h5 className="text-secondary  text-center mt-1 ">Logo de Boutique</h5>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="card">
                            <div className="about-avatar text-center " style={{ padding: '5%' }} >
                                <a href="#" data-bs-toggle="modal" data-bs-target="#boutique" >
                                    <h5 className="text-secondary  text-center mt-2 ">Parametre de Boutique</h5>
                                    <img className="w-20  img-center mb-2" src="../../assets/img/params.png" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="card">
                            <div className="about-avatar text-center " style={{ padding: '5%' }} >
                                <a href="#" data-bs-toggle="modal" data-bs-target="#nom" >
                                    <h1 className="  text-center mt-3 " style={{ color: "#111", fontFamily: 'Indie Flower', fontweight: '400', marginBottom: '-2%' }}>{boutique?.nom}</h1>
                                    <h5 className="text-secondary  text-center mt-2 ">Nom du boutique</h5>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Ajouter_un_emplye setDeposants={setDeposants} />

            <Liste_des_employées employées={employées} setDeposants={setDeposants} />

            <div className="modal fade" id="taux" tabIndex={-1} role="dialog" aria-labelledby="taux" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="input-group input-group-static mb-4">
                                <h4 >Profit des Article Déposant : </h4>
                                <input className="form-control " type="number" style={{ maxWidth: "30%", marginLeft: "4%", marginTop: "-2%" }} placeholder="Exemple 30%" onChange={handleChange} name="taux" />
                            </div>
                            <div className="row ">
                                <div className="col-7"> </div>
                                <div className="col-5 ">
                                    <button className="btn bg-gradient-dark btn-icon col-12  " type="button" data-bs-dismiss="modal" onClick={() => modified_taux()}  >
                                        <div className="d-flex align-items-center" style={{ marginLeft: '30%' }}>
                                            Modifier
                                            <span className="material-icons">
                                                done
                                            </span>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="boutique" tabIndex={-1} role="dialog" aria-labelledby="taux" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="row mt-4" >
                                <div className="col-1" />
                                <div className="col-9">
                                    <div className="input-group input-group-static mb-4">
                                        <h6 style={{ marginBottom: '-3%' }}>Email</h6>
                                        <input className="form-control" placeholder="exemple@gmail.com" type="text" name="email" value={boutique?.email} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-1" />
                                <div className="col-md-4">
                                    <div className="input-group input-group-static mb-4">
                                        <h6 style={{ marginBottom: '-3%' }}>Adress </h6>
                                        <input className="form-control" placeholder="Rue *****, Sousse" type="text" name="adress" value={boutique?.adress} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="col-1" />
                                <div className="col-md-4 ps-2">
                                    <div className="input-group input-group-static mb-4">
                                        <h6 style={{ marginBottom: '-3%' }}>Telephone</h6>
                                        <input className="form-control" placeholder={"+216 ** *** ***"} type="text" name="telephone" value={boutique?.telephone} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="row ">
                                <div className="col-7"> </div>
                                <div className="col-5 ">
                                    <button className="btn bg-gradient-dark btn-icon col-12  " type="button" data-bs-dismiss="modal" onClick={() => modified_boutique()}  >
                                        <div className="d-flex align-items-center" style={{ marginLeft: '30%' }}>
                                            Modifier
                                            <span className="material-icons">
                                                done
                                            </span>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="nom" tabIndex={-1} role="dialog" aria-labelledby="taux" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                     <div className="modal-body">
                            <div className="input-group input-group-static mb-4">
                                <h4 >Nom de boutique : </h4>
                                <input className="form-control " type="text" style={{ maxWidth: "30%", marginLeft: "4%", marginTop: "-2%" }} placeholder="Exemple depot.tn" onChange={handleChange} name="nom" />
                            </div>
                            <div className="row ">
                                <div className="col-7"> </div>
                                <div className="col-5 ">
                                    <button className="btn bg-gradient-dark btn-icon col-12  " type="button" data-bs-dismiss="modal" onClick={() => modified_nom()}  >
                                        <div className="d-flex align-items-center" style={{ marginLeft: '30%' }}>
                                            Modifier
                                            <span className="material-icons">
                                                done
                                            </span>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="logo" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="exampleFormControlFile1">
                                    <a aria-label="Close">
                                        <h6 >Telecharger un logo depuis ce pc  </h6>
                                    </a>
                                    <input type="file" className="form-control-file" id="exampleFormControlFile1" style={{ display: 'none' }} data-bs-dismiss="modal" onChange={fileChange} />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
