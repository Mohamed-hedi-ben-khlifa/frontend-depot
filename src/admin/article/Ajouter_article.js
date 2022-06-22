import { ajouter_article, supprimer_article } from '../../store/articleSlice'
import { useDispatch } from 'react-redux'
import React, { useState } from 'react'
import Barcode from 'react-barcode';
import axios from 'axios'

export default function Ajouter_article() {

    const dispatch = useDispatch()
    const d = new Date()
    const [images, setImages] = useState([])
    const [articles, setArticles] = useState([])
    const [article, setArticle] = useState({
        user_id: null,
        description: null,
        lib: null,
        etat: "Bon etat",
        prix_vente_ttc: null,
        prix_achat: null,
        montant_reverser: null,
        date_vente: null,
        date_reversement: null,
        date_depot: new Date(d.getFullYear(), d.getMonth(), d.getUTCDate()),
        status_reversement: null,
        status_acceptation: "boutique",
        status_vendu: null,
        image: []
    })

    const handleChange = e => {

        if (e.code === "Enter") {
            ajouter()
            const input = document.getElementById('lib');
            input.focus();
            input.select();
        };
        const { name } = e.target
        setArticle(prevState => ({
            ...prevState,
            [name]: e.target.value
        }));
    };

    const retirer = (id) => {

        setArticles(articles.filter(function (article) { return article._id !== id }))
        dispatch(supprimer_article(id))
    }

   

    async function save() { setArticles([]) }

    async function ajouter() {

       

        dispatch(ajouter_article(article)).then((action) => {
            const art = action.payload.article
            setArticles(articles => [...articles, art])
           
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

        return [year, month, day].join('/');
    }

    return (
        <div>
            <div className="container-fluid ">
                <div className="card  text-start">
                    <form role="form" id="contact-form" method="post" autoComplete="off">
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
                                <div className="col-md-2 ps-2">
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
                                <div className="col-md-2">
                                    <div className="input-group input-group-static mb-4">
                                        <h6 style={{ marginBottom: '-3%' }}>Prix d'achat </h6>
                                        <input className="form-control" placeholder="$ 20,000" name="prix_achat" onKeyDown={handleChange} onChange={handleChange} value={article.prix_achat} type="number" />
                                    </div>
                                </div>
                                <div className="col-md-2">
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
                                    <button className="btn bg-gradient-dark btn-icon col-12 m-2 mt-0 " type="button" onClick={() => save()}>
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
                    </form>
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
                                            $ {(article.prix_achat)?.toFixed(3)}
                                        </td>
                                        <td className="text-xm font-weight-bold" style={{ width: '10%' }}>
                                            $ {(article.prix_vente_ttc)?.toFixed(3)}
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
         
        </div>
    )
}
