import React, { useContext, useEffect, useState } from 'react'
import { addNotifications } from '../../store/notificationSlice'
import { useDispatch, useSelector } from 'react-redux'
import Scan from './Scan'
import { modifier_status_vendu_d_un_article, recherche_article_par_id, recherche_article_par_reference } from '../../store/articleSlice'
import Aperçu_des_ventes from './Aperçu_des_ventes'
import { SocketContext } from '../../context/socket';
import { ajouter_reçu } from '../../store/reçuSlice'
import { rechercher_deposant_par_id } from '../../store/deposantSlice'


export default function Caisse() {

    const socket = useContext(SocketContext);
    const { boutique } = useSelector((state) => state.boutique)
    const [total, setTotal] = useState(0)
    const [articles, setArticles] = useState([])
    const enabled = articles.length > 0
    const d = new Date()
    const dispatch = useDispatch()


    const [id, setId] = useState("X")
    useEffect(() => {
        if (id !== "X") {
            dispatch(recherche_article_par_id(id)).then((action) => {
                if (action.payload.article.length !== 0) {
                    const art = action.payload.article[0]
                    setArticles(articles => [...articles, art]);
                }
            })
        }
    }, [dispatch,id])

    const handleChange = e => { if (e.code === "Enter") { onKeyDown(e) } }

    const onKeyDown = async (e) => {
        console.log(e.target.value);
        dispatch(recherche_article_par_reference(e.target.value)).then((action) => {
            if (action.payload.article.length !== 0) {
                const art = action.payload.article[0]
                setArticles(articles => [...articles, art]);
                e.target.value = ""
            }
        })
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
        return [day, month, year].join('/');
    }

    useEffect(() => {
        setTotal(articles?.map(article => article.prix_vente_ttc).reduce((prev, curr) => prev + curr, 0))
    }, [articles])

    function remove(id) {

        var array = [...articles];
        array.splice(id, 1)
        setArticles(array)
    }

    const payer = async () => {

        const t = (articles?.map(article => article.prix_vente_ttc).reduce((prev, curr) => prev + curr, 0))
        articles?.map((article) => { dispatch(modifier_status_vendu_d_un_article(article._id)) })

        const reçu = {
            user: null,
            total: t,
            nombre_articles: articles.length,
            articles: articles,
            status: "Caisse",
            date_reçu: new Date(d.getFullYear(), d.getMonth(), d.getUTCDate())
        }

        dispatch(ajouter_reçu(reçu))
        new_notification()
        print()
        setArticles([])
    }

    async function print() {

        var pri = window.open('', 'PRINT', 'height=400,width=600');
        pri.document.open();
        pri.document.write('<html><head><title>' + document.title + '</title>');
        pri.document.write(' <link id="pagestyle" href="/assets/css/material-dashboard.min.css?v=3.0.2" rel="stylesheet" ');
        pri.document.write('</head><body >');
        pri.document.write('<h1>' + document.title + '</h1>');
        pri.document.write(document.getElementById("payer").innerHTML);
        pri.document.write('</body></html>');
        pri.focus();
        setTimeout(function () { pri.print() }, 3500)
        setTimeout(function () { pri.close() }, 10000)

    }

    async function new_notification() {

        articles?.map((article) => {

            if (article.user_id !== null) {
                dispatch(rechercher_deposant_par_id(article.user_id)).then(action => {
                    socket.emit("new_notification", article.user_id)
                    let notification = {
                        article: article,
                        user: action.payload.deposant,
                        body: "Article impayée",
                        status: null
                    }
                    dispatch(addNotifications(notification))
                })
            }
        })
    }

    return (

        <div>
            <div className='container-fluid'>
                <Scan id={id} setId={setId} />
                <div className='row '>
                    <div className='col-8'>
                        <div className='row'>
                            <div className='col-12  mb-4'>
                                <div className="card ">
                                    <div className="row  text-start">
                                        <div className="col-lg-3 " style={{ marginLeft: '4%', marginTop: '2%' }}>
                                            <h4>Facture  n°  324325</h4>
                                            <p style={{ marginTop: '-1%', marginBottom: '-0.5%' }}> Date Creation : {formatDate(new Date())}</p>
                                            <p> {boutique?.adress}</p>
                                        </div>
                                        <div className="col-1">
                                            <div>
                                                <img src={boutique?.logo} className="navbar-brand-img h-100 mt-4 " alt="main_logo" style={{ width: '90%', height: '90%' }} />
                                            </div>
                                        </div>
                                        <div className="col-3" />
                                        <div className='col-4' >
                                            <div className="input-group input-group-static mb-4" style={{ top: '62%' }} >
                                                <span><h6 style={{ marginTop: '22%' }}>Réf.Article : </h6></span><span><input className="form-control" onKeyDown={handleChange} placeholder="652398" type="text" style={{ marginTop: '8%', marginLeft: '8%' }} /></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row m-4">
                                        <div className="card border-1" style={{ marginLeft: '2.5%', maxWidth: '96.5%' }}>
                                            <div className="card-body px-0 ">
                                                <div className="table-responsive " >
                                                    <table className=" x table  mb-0" height="170%">
                                                        <thead>
                                                            <tr>
                                                                <th className="  text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" align="left" width="10%">Réf.article</th>
                                                                <th className=" text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" width="10%">Lib.article</th>
                                                                <th className="text-uppercase text-start text-secondary text-xxs font-weight-bolder opacity-7" width="70%">Description</th>
                                                                <th className=" text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" width="10%" >Prix TTC</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {articles ? articles?.map((article, index) =>
                                                                <tr key={index}>
                                                                    <td className="align-middle text-start text-sm p-4 pt-2 pb-0">
                                                                        <span className="text-xm text-primary font-weight-bold"> {article.ref}</span>
                                                                    </td>
                                                                    <td className="align-middle text-start text-sm p-4 pt-2 pb-0 ">
                                                                        <span className="text-xs font-weight-bold">{article.lib}</span>
                                                                    </td>
                                                                    <td className="align-middle text-start text-sm  p-4 pt-2 pb-0">
                                                                        <span className="text-xs font-weight-bold">{article.description}</span>
                                                                    </td>
                                                                    <td className="align-middle text-start text-sm p-4 pt-2 pb-0">
                                                                        <span className="text-xm  text-dark font-weight-bold">$ {article.prix_vente_ttc}</span>
                                                                        <a href='#' onClick={() => remove(article._id)}><i className="material-icons opacity-10 text-primary me-4 align-middle" style={{ marginLeft: '11%' }}>close </i></a>

                                                                    </td>
                                                                </tr>
                                                            ) : <div></div>}
                                                        </tbody></table>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-9'></div>
                                        <div className='col-3'>
                                            <div>
                                                <button className="btn bg-gradient-dark btn-icon col-12 mt-4 " disabled={!enabled} onClick={() => payer()} >
                                                    <div className="d-flex align-items-center" style={{ marginLeft: '40%' }}   >
                                                        Payer
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
                        <div className='card  p-4'>
                            <div className='row'>
                                <div className='col-7'></div>
                                <div className='col-2'>
                                    <h3 style={{ marginLeft: '4%' }} >  Total :</h3>
                                </div>
                                <div className='col-3'>
                                    <h3 className='text-secondary text-end ' style={{ marginRight: '14%' }}  >  {total},000 $</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className='card p-4 text-center'>
                            <h6 > Sahloul le : 21/02/2022</h6>
                            <h4 > 10:56:12</h4>
                        </div>
                        <Aperçu_des_ventes />
                    </div>
                </div>
            </div>
            <div className="modal fade" id="payer" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content text-center  ">
                        <h4 className="text-center mt-4" style={{ fontWeight: '700' }}>Dépôt Shop  </h4>
                        <p style={{ marginTop: '2%' }}>Email: STE.Mohamed_benkhlifa@gmail.com</p>
                        <p style={{ marginTop: '-4%' }}>Adress: Rue cheneb,7090 sousse</p>
                        <p style={{ marginTop: '-4%' }}>Tél: +216 25300 612</p>
                        <img className="w-40  " src="../../assets/img/Barcode-PNG-Image.png" alt="ladydady" loading="lazy" style={{ marginLeft: '31%' }} />
                        <p className=" text-dark">Sahloul le {formatDate(new Date())}</p>
                        <div className="table w-90 ">
                            <div className="row w-100 " style={{ border: '0px ', marginLeft: '15%' }}>
                                <div className="col-3">
                                    <h5 className="text-start " style={{ fontWeight: '700' }}> Client :  </h5>
                                </div>
                                <div className="col-4">
                                    <p style={{ marginLeft: '-40%', marginTop: '2%' }}>Mohamed ben khlifa </p>
                                </div>
                                <div className="col-3">
                                    <h6 className="text-start " style={{ fontWeight: '700' }}>Réf:   </h6>
                                </div>
                                <div className="col-2">
                                    <p style={{ marginLeft: '-300%', marginTop: '2%' }}>23654 </p>
                                </div>
                            </div>
                            <table className="table align-items-center m-4 mt-2" style={{ border: '0 px solid' }}>
                                <thead>
                                    <tr>
                                        <th className=" text-start text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" width="10%">Réf</th>
                                        <th className=" text-start text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" width="80%">Lib.article</th>
                                        <th className=" text-start text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" width="10%">Prix</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {articles?.map((article, index) =>
                                        <tr key={index} >
                                            <td className="align-middle text-center text-sm " style={{ marginLeft: '-10%', border: '0px solid' }}>
                                                <span className="text-xm  text-primary font-weight-bold"> {article.ref}</span>
                                            </td>
                                            <td className="align-middle text-start p-4 pt-0 pb-0 text-sm  " style={{ border: '0 px solid' }}>
                                                {article.lib !== "" ? <span className="text-sm font-weight-bold"  >{article.lib}</span> : <span>Article  </span>}
                                            </td>
                                            <td className="align-middle text-center text-sm" style={{ border: '0 px solid' }}>
                                                <span className="text-xm  text-dark font-weight-bold"> {(article.prix_vente_ttc)?.toFixed(3)} </span>
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

