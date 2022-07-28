import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { liste_des_reçus_payer, rechercher_recu_verser_par_reference } from '../../../store/reçuSlice'


export default function Liste_des_reçus_payer(props) {

    const { boutique } = useSelector((state) => state.boutique)
    const [etat, setEtat] = useState(0)
    const [message, setMessage] = useState()
    const dispatch = useDispatch()
    const [reçu, setReçu] = useState(0)

    const afficher = () => { if (etat === 0) { setEtat(1) } else { setEtat(0) } }

    const modal = (reçu) => { setReçu(reçu) }

    const handleChange = e => { if (e.code === "Enter") { onKeyDown(e) }; }

    const onKeyDown = async (e) => {

        function myGreeting() { setMessage("") }

        if (e.target.value === "") { (liste_des_reçus_payer(props.deposant._id)).then(async (action) => { props.setReçus_payer(action.payload.reçu) }) }
        else {
            dispatch(rechercher_recu_verser_par_reference(e.target.value)).then(async (action) => {
                if (action.payload.reçu.length > 0) {
                    props.setReçus_payer(action.payload.reçu)
                    setMessage("")
                }
                else {
                    dispatch(liste_des_reçus_payer(props.deposant._id)).then(async (action) => { props.setReçus_payer(action.payload.reçu) })
                    setTimeout(setMessage("Reçu n'est pas trouver !"), 1000)
                    setTimeout(myGreeting, 5000);
                }
            })
        }
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

    function formatTime(date) {
        var d = new Date(date),
            h = d.getHours(),
            m = d.getMinutes()
        if (h.length < 2)
            h = '0' + h;
        if (m.length < 2)
            m = '0' + m;
        return [h, m].join(':');
    }

    return (
        <div>
            <div className="container-fluid mt-4 ">
                <div className="card  text-start">
                    <div className="card-header pb-0">
                        <div className="row  mb-4">
                            <div className="col-lg-3 col-7">
                                <a onClick={() => afficher()}>
                                    <h4>Liste Des Reçus Verser</h4>
                                </a>
                            </div>
                            <div className="col-1">
                                <a onClick={() => afficher()}>
                                    {
                                        etat === 0 ? <img src="../../assets/img/plus.png" alt="team5" style={{ width: '30%', marginLeft: '-60%', marginTop: '4%' }} />
                                            : <img src="../../assets/img/moin.jpg" alt="team5" style={{ width: '30%', marginLeft: '-60%', marginTop: '4%' }} />
                                    }
                                </a>
                            </div>
                            <div className="col-md-3">
                                <div className="input-group input-group-static">

                                    <input className="form-control" placeholder="Rechercher reçu par réference ..." onKeyDown={handleChange} />
                                </div>
                            </div>
                            <div className="col-md-5">
                                <p className="text-start text-primary mt-3">{message}</p>
                            </div>
                        </div>
                    </div>
                    {etat !== 0 ?
                        <div>
                            <div className="table" style={{ marginLeft: '10%', width: '80%' }}>
                                <table className="table align-items-end " >
                                    <thead>
                                        <tr>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" width="10%" >Réference</th>
                                            <th className=" text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Date dépot</th>
                                            <th className=" text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Heure ddepot</th>
                                            <th className=" text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" >Total Prix</th>
                                            <th className=" text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"  >Nbr D'article</th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Montant à versé</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.reçus?.map((reçu, index) =>
                                            <tr key={index} >
                                                <td className="text-sm text-primary text-center font-weight-bold" >
                                                    <a data-bs-toggle="modal" data-bs-target="#recu" type="button" onClick={() => modal(reçu)}>
                                                        {reçu.ref}
                                                    </a>
                                                </td>
                                                {
                                                    reçu.date_reçu !== null ?
                                                        <td className="text-sm text-dark text-center font-weight-bold" >
                                                            {formatDate(reçu.date_reçu)}
                                                        </td> :
                                                        <td className="text-sm text-dark text-center font-weight-bold" >
                                                            --/--/----
                                                        </td>
                                                }
                                                {
                                                    reçu.date_reçu !== null ?
                                                        <td className="text-sm text-dark text-center font-weight-bold" >
                                                            {formatTime(reçu.date_reçu)}
                                                        </td> :
                                                        <td className="text-sm text-dark text-center font-weight-bold" >
                                                            --:--
                                                        </td>
                                                }
                                                <td className="text-sm text-primary text-center font-weight-bold" >
                                                    $ {(reçu.total).toFixed(3)}
                                                </td>
                                                <td className="text-xm text-center font-weight-bold" >
                                                    {reçu.nombre_articles}
                                                </td>

                                                <td className="text-xm text-dark text-center font-weight-bold" >
                                                    $  {(reçu.total_a_verser).toFixed(3)}
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        : <div></div>}
                </div>
            </div>
            <div className="modal fade" id="recu" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content text-center  ">
                        <h4 className="text-center mt-4" style={{ fontWeight: '700' }}>{boutique.nom} </h4>
                        <p style={{ marginTop: '2%' }}>Email: {boutique.email}</p>
                        <p style={{ marginTop: '-4%' }}>Adress: {boutique.adress}</p>
                        <p style={{ marginTop: '-4%' }}>Tél: +216 {boutique.telephone}</p>
                        <img className="w-40  " src="../../assets/img/Barcode-PNG-Image.png" alt="ladydady" loading="lazy" style={{ marginLeft: '31%' }} />
                        <p className=" text-dark">Sahloul le 21/02/2022</p>
                        <div className="row w-100 " style={{ marginLeft: '5%' }}>
                            <div className="col-9">
                                <span><h6 className="text-start " style={{ fontWeight: '700' }}> Deposant :</h6></span>
                                <span><p style={{ marginTop: '-9.5%', marginLeft: '6%' }}>{props.deposant.prenom} {props.deposant.nom}</p></span>
                            </div>
                            <div className="col-3">
                                <span><h6 className="text-start " style={{ fontWeight: '700', marginLeft: '-30%' }}>Réf: </h6></span>
                                <span><p style={{ marginTop: '-33%', marginLeft: '-36%' }}>{props.deposant.ref}</p></span>
                            </div>
                        </div>
                        <div className="table w-90 ">
                            <table className="table align-items-center m-4 mt-2" style={{ border: '0 px solid' }}>
                                <thead>
                                    <tr>
                                        <th className=" text-start text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" width="10%">Réf</th>
                                        <th className=" text-start text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" width="80%">Lib.article</th>
                                        <th className=" text-start text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" width="10%">Prix</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {reçu.articles?.map((article, index) =>
                                        <tr key={index} >
                                            <td className="align-middle text-center text-sm " style={{ marginLeft: '-10%', border: '0px solid' }}>
                                                <span className="text-xm  text-primary font-weight-bold"> {article.ref}</span>
                                            </td>
                                            <td className="align-middle text-start p-4 pt-0 pb-0 text-sm  " style={{ border: '0 px solid' }}>
                                                {article.lib !== "" ? <span className="text-sm font-weight-bold"  >{article.lib}</span> : <span>Article  </span>}
                                            </td>
                                            <td className="align-middle text-center text-sm" style={{ border: '0 px solid' }}>
                                                <span className="text-xm  text-dark font-weight-bold">$ {(article.montant_reverser).toFixed(3)}</span>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <div className="row w-100 " style={{ border: '0px ', marginLeft: '15%' }}>
                                <div className="col-6">
                                    <h4 className="text-start " style={{ fontWeight: '700' }}>  </h4>
                                </div>
                                <div className="col-6">
                                    <h4 className="text-start " style={{ fontWeight: '700' }}>Total:{(reçu.total_a_verser)?.toFixed(3)}  </h4>
                                </div>
                            </div>
                            <p style={{ marginTop: '2%', border: '0px solid', marginLeft: '12%' }}>Merci de votre visite</p>
                            <p style={{ marginTop: '-4%', border: '0px solid', marginLeft: '12%' }}>Merci à bientot</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
