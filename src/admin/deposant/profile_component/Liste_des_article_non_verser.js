import React, { useState, useEffect,useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { liste_des_article_non_verser, update_status_reversement } from '../../../store/articleSlice'
import { ajouter_reçu } from '../../../store/reçuSlice'
import { SocketContext } from '../../../context/socket';

export default function Liste_des_article_non_verser(props) {

    const { boutique } = useSelector((state) => state.boutique)
    const [etat, setEtat] = useState(0)
    const [total, setTotal] = useState(0)
    const dispatch = useDispatch()
    const socket = useContext(SocketContext);



    const afficher = () => { if (etat === 0) { setEtat(1) } else { setEtat(0) } }

    useEffect(() => {
        setTotal(props.article_non_verser?.map(article => article.montant_reverser).reduce((prev, curr) => prev + curr, 0))
    })

    async function payer() {

        props.article_non_verser.map?.(article => dispatch(update_status_reversement(article)))
        const t = (props.article_non_verser?.map(article => article.prix_vente_ttc).reduce((prev, curr) => prev + curr, 0))

        const reçu = {
            status: "Payment",
            user: props.deposant,
            articles: props.article_non_verser,
            nombre_articles: props.article_non_verser.length,
            total: t,
            total_a_verser: t - ((t * boutique?.taux) / 100),
            date_reçu: new Date(Date.now())
           
        }

        dispatch(liste_des_article_non_verser(props.deposant._id)).then(action => props.setArticles_non_verser(action.payload.article))
        dispatch(ajouter_reçu(reçu))
        setEtat(0)
        print()
        socket.emit("mettre_a_jour_liste_des_reçus")
    }

    async function print() {

        var pri = window.open('', 'PRINT', 'height=800,width=600,left=400,top=50');
        pri.document.open();
        pri.document.write('<html><head><title>' + document.title + '</title>');
        pri.document.write(' <link id="pagestyle" href="/assets/css/material-dashboard.min.css?v=3.0.2" rel="stylesheet" ');
        pri.document.write('</head><body >');
        pri.document.write('<h1>' + document.title + '</h1>');
        pri.document.write(document.getElementById("payer").innerHTML);
        pri.document.write('</body></html>');
        pri.focus();
        setTimeout(function () { pri.print() }, 5000)
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

    return (
        <div>
            <div className="container-fluid mt-4 ">
                <div className="card  text-start">
                    <a onClick={() => afficher()}>
                        <div className="card-header pb-0">
                            <div className="row  mb-4">
                                <div className="col-lg-3 col-7">
                                    <h4>Liste Des Articles Non Payer</h4>
                                </div>
                                <div className="col-1">
                                    {
                                        etat === 0 ? <img src="../../assets/img/plus.png" alt="team5" style={{ width: '30%', marginLeft: '-60%', marginTop: '4%' }} />
                                            : <img src="../../assets/img/moin.jpg" alt="team5" style={{ width: '30%', marginLeft: '-60%', marginTop: '4%' }} />
                                    }
                                </div>
                            </div>
                        </div>
                    </a>
                    {etat !== 0 ?
                        <div>
                            <div className="card-body">
                            </div>
                            <div className="table" style={{ marginLeft: '10%', width: '80%' }}>
                                <table className="table align-items-end " >
                                    <thead>
                                        <tr>
                                            <th className=" text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Réf.article</th>
                                            <th className=" text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Lib.article</th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Prix</th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Date dépot article</th>
                                            <th className=" text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Date vente</th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Montant a versé</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.article_non_verser?.map((article, index) =>
                                            <tr key={index}>
                                                <td className="align-middle text-center text-sm " style={{ marginLeft: '-10%' }}>
                                                    <span className="text-xm text-primary font-weight-bold"> {article.ref}</span>
                                                </td>
                                                <td className="align-middle text-center text-sm " style={{ marginLeft: '-10%' }}>
                                                    {article.lib !== "" ? <span className="text-sm   font-weight-bold">{article.lib}</span> : <span className="text-sm  font-weight-bold">Article  </span>}
                                                </td>
                                                <td className="align-middle text-center text-sm">
                                                    <span className="text-xm  text-dark font-weight-bold">$ { article.prix_vente_ttc? (article.prix_vente_ttc)?.toFixed(3) : "0.000"}</span>
                                                </td>
                                                <td className="align-middle text-center text-sm " style={{ marginLeft: '-10%' }}>
                                                    <span className="text-xs font-weight-bold">{formatDate(article.date_depot)} </span>
                                                </td>
                                                <td className="align-middle text-center text-sm">
                                                    {article.status_vendu === "Oui" ? <span className="text-sm text-success font-weight-bold">{article.status_vendu}</span> : <span></span>}
                                                    {article.status_vendu === "Non" ? <span className="text-sm text-primary font-weight-bold">{article.status_vendu}</span> : <span></span>}
                                                </td>
                                                <td className="align-middle text-center text-sm">
                                                    <span className="text-xm text-dark font-weight-bold">$  {(article.montant_reverser)?.toFixed(3)} </span>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="row  m-4">
                                <div className="col-lg-4 col-7">
                                </div>
                                <div className="col-4">
                                </div>
                                <div className="col-2 ml-4" style={{ marginLeft: '5%', marginTop: '2%' }}>
                                    <button className="btn bg-gradient-dark btn-icon col-10  m-2 mt-0  " type="button" onClick={() => payer()} >
                                        <div className="d-flex align-items-center" style={{ marginLeft: '30%' }}  >
                                            payer
                                            <span className="material-icons">
                                                done
                                            </span>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                        : <div></div>}
                </div>
            </div>
            <div className="modal fade" id="payer" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content text-center  ">
                        <h4 className="text-center mt-4" style={{ fontWeight: '700' }}>{boutique.nom} </h4>
                        <p style={{ marginTop: '2%' }}>Email: {boutique.email}</p>
                        <p style={{ marginTop: '-4%' }}>Adress: {boutique.adress}</p>
                        <p style={{ marginTop: '-4%' }}>Tél: +216{boutique.telephone}</p>
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
                                    {props.article_non_verser?.map((article, index) =>
                                        <tr key={index} >
                                            <td className="align-middle text-center text-sm " style={{ marginLeft: '-10%', border: '0px solid' }}>
                                                <span className="text-xm  text-primary font-weight-bold"> {article.ref}</span>
                                            </td>
                                            <td className="align-middle text-start p-4 pt-0 pb-0 text-sm  " style={{ border: '0 px solid' }}>
                                                {article.lib !== "" ? <span className="text-sm font-weight-bold"  >{article.lib}</span> : <span>Article  </span>}
                                            </td>
                                            <td className="align-middle text-center text-sm" style={{ border: '0 px solid' }}>
                                                <span className="text-xm  text-dark font-weight-bold">$ {(article.montant_reverser)?.toFixed(3)} </span>
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
                                    <h4 className="text-start " style={{ fontWeight: '700' }}>Total: {(total)?.toFixed(3)} </h4>
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

