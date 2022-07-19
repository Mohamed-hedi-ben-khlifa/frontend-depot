import React, { useEffect, useState ,useContext} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ajouter_article, liste_des_article_de_deposant, supprimer_article } from '../../../store/articleSlice'
import { ajouter_reçu } from '../../../store/reçuSlice'
import Barcode from 'react-barcode';
import { SocketContext } from '../../../context/socket';

export default function Ajouter_article(props) {

    const dispatch = useDispatch()
    const { boutique } = useSelector((state) => state.boutique)
    const [total, setTotal] = useState()
    const socket = useContext(SocketContext);
    const d = new Date(Date.now())
    const [articles, setArticles] = useState([])
    const [article, setArticle] = useState({
        user_id: props.id,
        description: null,
        lib: null,
        etat: "Neuf",
        prix_vente_ttc: null,
        prix_achat: null,
        montant_reverser: null,
        date_vente: null,
        date_reversement: null,
        date_depot: new Date(d.getFullYear(), d.getMonth(), d.getDay()),
        status_reversement: null,
        status_acceptation: "Deposer",
        status_vendu: "Non",
        image: []
    })

    useEffect(() => {
        setArticle(prevState => ({
            ...prevState,
            montant_reverser: article.prix_vente_ttc - ((article.prix_vente_ttc * boutique?.taux) / 100)
        }));
    }, [dispatch, article.prix_vente_ttc,boutique.taux])


    const handleChange = e => {

        if (e.code === "Enter") {
            ajouter()
            const input = document.getElementById('lib');
            input.focus();
            input.select();
        };

        const { name, value } = e.target;
        setArticle(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const retirer = (id) => {
        setArticles(articles.filter(function (article) { return article._id !== id }));
        dispatch(supprimer_article(id))
    }

    async function ajouter() {

        dispatch(ajouter_article(article)).then((action) => {
            const art = action.payload.article
            setArticles(articles => [...articles, art])
        })
    }

    useEffect(() => {
        var s = 0
        articles === [] ? s = articles[0].montant_reverser : s = 0
        articles.map?.(article => { s = s + article.prix_vente_ttc })
        setTotal(s)
    }, [dispatch, articles])

    async function save() {
        var s = 0
         articles === [] ? s = articles[0].montant_reverser : s = 0 
        articles.map?.(article => { s = s + article.prix_vente_ttc })
        setTotal(s)

        const reçu = {
            status: "Article",
            user: props.deposant,
            articles: articles,
            nombre_articles: articles.length,
            total: s,
            total_a_verser: (total - ((total * boutique?.taux) / 100)),
            date_reçu: new Date(d.getFullYear(), d.getMonth(), d.getDay())
        }

        dispatch(liste_des_article_de_deposant(props.id)).then((action) => props.setArticles(action.payload.article))
        dispatch(ajouter_reçu(reçu))
        print()
        setArticles([])

        socket.emit("mettre_a_jour_liste_des_reçus")
    }

    async function print() {

        var pri = window.open('', 'PRINT', 'height=800,width=600,left=400,top=50');
        pri.document.open();
        pri.document.write('<html><head><title>' + document.title + '</title>');
        pri.document.write(' <link id="pagestyle" href="/assets/css/material-dashboard.min.css?v=3.0.2" rel="stylesheet" ');
        pri.document.write('</head><body >');
        pri.document.write('<h1>' + document.title + '</h1>');
        pri.document.write(document.getElementById("exampleModal").innerHTML);
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

        return [day, month, year].join('/');
    }

    return (
        <div>
            <div className="container-fluid ">
                <div className="card  text-start">
                        <div className="card-header pb-0">
                            <div className="row  mb-4">
                                <div className="col-lg-11 col-7">
                                    <h4>Nouveau article</h4>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-1" />
                                <div className="col-md-3">
                                    <div className="input-group input-group-static mb-4">
                                        <h6 style={{ marginBottom: '-3%' }}>libelle</h6>
                                        <input id="lib" className="form-control" placeholder="EX: pontalon, chemise, basquette" onKeyDown={handleChange} onChange={handleChange} value={article.lib} name="lib" />
                                    </div>
                                </div>
                                <div className="col-md-3 ps-2">
                                    <div className="input-group input-group-static mb-4">
                                        <h6 style={{ marginBottom: '-3%' }}>Etat </h6>
                                        <select className="form-control" placeholder="Neuf, Bon etat, Passablbe" name="etat" onKeyDown={handleChange} onChange={handleChange} value={article.etat}>
                                            <option value="" disabled>Neuf, Bon etat, Passablbe</option>
                                            <option value="Neuf">Neuf</option>
                                            <option value="Bon etat">Bon etat</option>
                                            <option value="Passable">Passable</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="input-group input-group-static mb-4">
                                        <h6 style={{ marginBottom: '-3%' }}>Prix de vente </h6>
                                        <input className="form-control" placeholder="$ 23,000" name="prix_vente_ttc" onKeyDown={handleChange} onChange={handleChange} value={article.prix_vente_ttc} type="number" />
                                    </div>
                                </div>
                                <div className="col-1" >
                                    <a type="button" onClick={() => ajouter()} >
                                        <img src="../../assets/img/plus.png" alt="team5" style={{ width: '40%', marginTop: '14%' }} />
                                    </a>
                                </div>
                            </div>
                            <div className="row  m-4">
                                <div className="col-lg-8"> </div>
                                <div className="col-2 ml-4" style={{ marginLeft: '5%' }}>
                                    <button className="btn bg-gradient-dark btn-icon col-10 m-2 mt-0 " type="button" onClick={() => save()}>
                                        <div className="d-flex align-items-center" style={{ marginLeft: '30%' }}  >
                                            Terminer
                                            <span className="material-icons">
                                                done
                                            </span>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    <div className="table" style={{ marginLeft: '20%', width: '60%' }}>
                        <table className="table align-items-end " >
                            <tbody>
                                {articles?.map((article, index) =>
                                    <tr key={index} style={{ marginLeft: '20%', width: '60%' }}>
                                        <td className="text-sm text-primary font-weight-bold" style={{ width: '2%' }}>
                                            {article.ref}
                                        </td>
                                        <td className="text-sm font-weight-bold " style={{ width: '10%' }}>

                                            {article.lib ? article.lib : "article"}
                                        </td>
                                        <td className="text-sm text-dark font-weight-bold" style={{ width: '5%' }}>
                                            {article.etat ? article.etat : "-------"}
                                        </td>
                                        <td className="text-sm font-weight-bold " style={{ width: '6%' }}>
                                            <Barcode value={article._id} width={0.5} displayValue={false} height={20} background={'none'} margin={0} />
                                        </td>
                                        <td className="text-sm text-dark font-weight-bold" style={{ width: '10%' }}>
                                            {formatDate(article.date_depot)}
                                        </td>
                                        <td className="text-xm font-weight-bold" style={{ width: '10%' }}>
                                            $ {(article.prix_vente_ttc)?.toFixed(3)}
                                        </td>
                                        <td className="text-xm font-weight-bold" style={{ width: '10%' }}>
                                            $ {(article.montant_reverser)?.toFixed(3)}
                                        </td>
                                        <td className="text-xs font-weight-bold" style={{ width: '5%' }}>
                                            <a className="avatar avatar-xs rounded-circle me-3" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Romina Hadid" onClick={() => retirer(article._id)}>
                                                <img src="../../assets/img/refuser.jpg" alt="team5" />
                                            </a>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content text-center  ">
                        <h4 className="text-center mt-4" style={{ fontWeight: '700' }}>{boutique.nom} </h4>
                        <p style={{ marginTop: '2%' }}>Email: {boutique.email}</p>
                        <p style={{ marginTop: '-4%' }}>Adress: {boutique.adress}</p>
                        <p style={{ marginTop: '-4%' }}>Tél: +216 {boutique.telephone}</p>
                        <img className="w-40  " src="../../assets/img/Barcode-PNG-Image.png" alt="ladydady" loading="lazy" style={{ marginLeft: '31%' }} />
                        <p className=" text-dark">Sahloul le {formatDate(new Date())}</p>
                        <div className="row w-100 " style={{ marginLeft: '5%' }}>
                            <div className="col-9">
                                <span><h6 className="text-start " style={{ fontWeight: '700' }}> Deposant :</h6></span>
                                <span><p style={{ marginTop: '-9.5%', marginLeft: '6%' }}>{props.deposant.prenom} {props.deposant.nom}</p></span>
                            </div>
                            <div className="col-3">
                                <span><h6 className="text-start " style={{ fontWeight: '700', marginLeft: '-30%' }}>Réf: </h6></span>
                                <span><p style={{ marginTop: '-33%', marginLeft: '-36%' }}>{props.deposant.ref} </p></span>
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
                                    {articles?.map((article, index) =>
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
                            <div className="row w-100 " style={{ border: '0px ', marginLeft: '20%' }}>
                                <div className="col-6">
                                    <h4 className="text-start " style={{ fontWeight: '700' }}>  </h4>
                                </div>
                                <div className="col-6">
                                    <h4 className="text-start " style={{ fontWeight: '700' }}>Total:  {(total - ((total * boutique?.taux) / 100))?.toFixed(3)}   </h4>
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