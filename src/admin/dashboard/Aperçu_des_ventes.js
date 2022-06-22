import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { liste_des_articles, liste_des_articles_accepter, liste_des_articles_boutique_vendu, liste_des_articles_des_deposants_vendus_et_verves, liste_des_articles_des_deposants_vendus_non_verves, liste_des_articles_en_attente, liste_des_articles_non_vendu, liste_des_articles_refuser, liste_des_articles_vendu } from '../../store/articleSlice'
import { get_deposants } from '../../store/deposantSlice'

export default function Aperçu_des_ventes() {

    const dispatch = useDispatch()
    const [nombre_articles, setNombre_articles] = useState(0)
    useEffect(() => {
        dispatch(liste_des_articles()).then(action => {
            setNombre_articles(action.payload.article.length)
        })
    })

    const [nombre_article_vendu, setNombre_article_vendu] = useState(0)
    useEffect(() => {
        dispatch(liste_des_articles_vendu()).then(action => {
            setNombre_article_vendu(action.payload.article.length)
        })
    })

    const [nombre_article_en_attente, setNombre_article_en_attente] = useState(0)
    useEffect(() => {
        dispatch(liste_des_articles_en_attente()).then(action => {
            setNombre_article_en_attente(action.payload.article.length)
        })
    })

    const [nombre_article_accepter, setNombre_article_accepter] = useState(0)
    useEffect(() => {
        dispatch(liste_des_articles_accepter()).then(action => {
            setNombre_article_accepter(action.payload.article.length)
        })
    })

    const [nombre_article_refuser, setNombre_article_refuser] = useState(0)
    useEffect(() => {
        dispatch(liste_des_articles_refuser()).then(action => {
            setNombre_article_refuser(action.payload.article.length)
        })
    })

    const [chiffre_d_affaire, setChiffre_d_affaire] = useState(0)
    useEffect(() => {
        dispatch(liste_des_articles()).then(action => {
            setChiffre_d_affaire(action.payload.article?.map(article => article.prix_vente_ttc).reduce((prev, curr) => prev + curr, 0))
        })

    })

    const [bénéfice, setBénéfice] = useState(0)
    useEffect(() => {
        dispatch(liste_des_articles_boutique_vendu()).then(action => {
            const prix_a = action.payload.article?.map(article => article.prix_achat).reduce((prev, curr) => prev + curr, 0)
            const prix_v = action.payload.article?.map(article => article.prix_vente_ttc).reduce((prev, curr) => prev + curr, 0)
            dispatch(liste_des_articles_des_deposants_vendus_et_verves()).then(action => {
                const prix_vente = action.payload.article?.map(article => article.prix_vente_ttc).reduce((prev, curr) => prev + curr, 0)
                const montant_reverser = action.payload.article?.map(article => article.montant_reverser).reduce((prev, curr) => prev + curr, 0)
                setBénéfice((prix_v - prix_a) + (prix_vente - montant_reverser))
            })
        })

    })

    const [bénéfice_deposants, setBénéfice_deposant] = useState(0)
    const [total_montant_verser, settotal_montant_verser] = useState(0)
    const [total_articles_vendu, settotal_articles_vendu] = useState(0)
    useEffect(() => {

        dispatch(liste_des_articles_des_deposants_vendus_et_verves()).then(action => {
            const prix_vente = action.payload.article?.map(article => article.prix_vente_ttc).reduce((prev, curr) => prev + curr, 0)
            const montant_reverser = action.payload.article?.map(article => article.montant_reverser).reduce((prev, curr) => prev + curr, 0)
            setBénéfice_deposant((prix_vente - montant_reverser))
            settotal_montant_verser(montant_reverser)
            settotal_articles_vendu(action.payload.article.length)
        })
    })

    const [bénéfice_boutique, setBénéfice_boutique] = useState(0)
    useEffect(() => {
        dispatch(liste_des_articles_boutique_vendu()).then(action => {
            const prix_a = action.payload.article?.map(article => article.prix_achat).reduce((prev, curr) => prev + curr, 0)
            const prix_v = action.payload.article?.map(article => article.prix_vente_ttc).reduce((prev, curr) => prev + curr, 0)
            setBénéfice_boutique((prix_v - prix_a))
        })
    })

    const [capital, setCapital] = useState(0)
    useEffect(() => {
        dispatch(liste_des_articles_non_vendu()).then(action => {
            setCapital(action.payload.article?.map(article => article.prix_achat).reduce((prev, curr) => prev + curr, 0))
        })
    })

    const [nombre_des_deposants, setNombre_des_deposants] = useState(0)
    useEffect(() => {
        dispatch(get_deposants()).then(action => {
            setNombre_des_deposants(action.payload.deposant?.length)
        })
    })

    const [montant_a_reverser, setMontant_a_reverser] = useState(0)
    useEffect(() => {
        dispatch(liste_des_articles_des_deposants_vendus_non_verves()).then(action => {
            setMontant_a_reverser(action.payload.article?.map(article => article.montant_reverser).reduce((prev, curr) => prev + curr, 0))
        })
    })

    const [nombre_article_non_verser, setNombre_article_non_verser] = useState(0)
    useEffect(() => {
        dispatch(liste_des_articles_des_deposants_vendus_non_verves()).then(action => {
            setNombre_article_non_verser(action.payload.article?.length)
        })
    })

    const formatDate = (date) => {
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
            <div className="row">
                <div className="col-4">
                    <div className="card mt-3  text-start " >
                        <div className="card-header pb-0" >
                            <h6>Aperçu des articles</h6>
                        </div>
                        <div className='row'>
                            <div className='col-6'>
                                <div className="card-body p-3">
                                    <div className="timeline timeline-one-side">
                                        <div className="timeline-block mb-3">
                                            <span className="timeline-step">
                                                <i className="material-icons text-success text-gradient">notifications</i>
                                            </span>
                                            <div className="timeline-content">
                                                <h6 className="text-dark text-sm font-weight-bold mb-0">{nombre_articles}, Articles</h6>
                                                <p className="text-secondary font-weight-bold text-xs mt-1 mb-0"> {formatDate(new Date())}</p>
                                            </div>
                                        </div>
                                        <div className="timeline-block mb-3">
                                            <span className="timeline-step">
                                                <i className="material-icons text-danger text-gradient">code</i>
                                            </span>
                                            <div className="timeline-content">
                                                <h6 className="text-dark text-sm font-weight-bold mb-0">{nombre_article_vendu}, article vendu</h6>
                                                <p className="text-secondary font-weight-bold text-xs mt-1 mb-0"> {formatDate(new Date())}</p>
                                            </div>
                                        </div>
                                        <div className="timeline-block mb-3">
                                            <span className="timeline-step">
                                                <i className="material-icons text-info text-gradient">credit_card</i>
                                            </span>
                                            <div className="timeline-content">
                                                <h6 className="text-dark text-sm font-weight-bold mb-0">{nombre_article_en_attente}, Article en attente</h6>
                                                <p className="text-secondary font-weight-bold text-xs mt-1 mb-0">{formatDate(new Date())}</p>
                                            </div>
                                        </div>
                                        <div className="timeline-block mb-3">
                                            <span className="timeline-step">
                                                <i className="material-icons text-primary text-gradient">key</i>
                                            </span>
                                            <div className="timeline-content">
                                                <h6 className="text-dark text-sm font-weight-bold mb-0">  {nombre_article_accepter} , Articles Accepter</h6>
                                                <p className="text-secondary font-weight-bold text-xs mt-1 mb-0"> {formatDate(new Date())}</p>
                                            </div>
                                        </div>
                                        <div className="timeline-block">
                                            <span className="timeline-step">
                                                <i className="material-icons text-dark text-gradient">person</i>
                                            </span>
                                            <div className="timeline-content">
                                                <h6 className="text-dark text-sm font-weight-bold mb-0">{nombre_article_refuser}, Articles refuser</h6>
                                                <p className="text-secondary font-weight-bold text-xs mt-1 mb-0">{formatDate(new Date())}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-6 mt-4'>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card mt-3  text-start " >
                        <div className="card-header pb-0" >
                            <h6>Aperçu des chiffre</h6>
                        </div>
                        <div className='row'>
                            <div className='col-6'>
                                <div className="card-body p-3">
                                    <div className="timeline timeline-one-side">
                                        <div className="timeline-block mb-3">
                                            <span className="timeline-step">
                                                <i className="material-icons text-success text-gradient">notifications</i>
                                            </span>
                                            <div className="timeline-content">
                                                <h6 className="text-dark text-sm font-weight-bold mb-0">$ {(chiffre_d_affaire)?.toFixed(3)} </h6>
                                                <p className="text-secondary font-weight-bold text-xs mt-1 mb-0"> Chiffre d'affaires</p>
                                            </div>
                                        </div>
                                        <div className="timeline-block mb-3">
                                            <span className="timeline-step">
                                                <i className="material-icons text-danger text-gradient">code</i>
                                            </span>
                                            <div className="timeline-content">
                                                <h6 className="text-dark text-sm font-weight-bold mb-0">$ {(bénéfice)?.toFixed(3)}</h6>
                                                <p className="text-secondary font-weight-bold text-xs mt-1 mb-0"> Total bénéfice</p>
                                            </div>
                                        </div>
                                        <div className="timeline-block mb-3">
                                            <span className="timeline-step">
                                                <i className="material-icons text-info text-gradient">credit_card</i>
                                            </span>
                                            <div className="timeline-content">
                                                <h6 className="text-dark text-sm font-weight-bold mb-0">$ {(bénéfice_deposants)?.toFixed(3)}</h6>
                                                <p className="text-secondary font-weight-bold text-xs mt-1 mb-0">Bénéfice depuis déposant </p>
                                            </div>
                                        </div>
                                        <div className="timeline-block mb-3">
                                            <span className="timeline-step">
                                                <i className="material-icons text-primary text-gradient">key</i>
                                            </span>
                                            <div className="timeline-content">
                                                <h6 className="text-dark text-sm font-weight-bold mb-0"> $ {(bénéfice_boutique)?.toFixed(3)}</h6>
                                                <p className="text-secondary font-weight-bold text-xs mt-1 mb-0"> Bénéfice depuis boutique</p>
                                            </div>
                                        </div>
                                        <div className="timeline-block">
                                            <span className="timeline-step">
                                                <i className="material-icons text-dark text-gradient">person</i>
                                            </span>
                                            <div className="timeline-content">
                                                <h6 className="text-dark text-sm font-weight-bold mb-0"> $ {(capital)?.toFixed(3)}</h6>
                                                <p className="text-secondary font-weight-bold text-xs mt-1 mb-0">Capital </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-6 mt-4'>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card mt-3  text-start " >
                        <div className="card-header pb-0" >
                            <h6>Aperçu des déposants</h6>
                        </div>
                        <div className='row'>
                            <div className='col-6'>
                                <div className="card-body p-3">
                                    <div className="timeline timeline-one-side">
                                        <div className="timeline-block mb-3">
                                            <span className="timeline-step">
                                                <i className="material-icons text-success text-gradient">notifications</i>
                                            </span>
                                            <div className="timeline-content">
                                                <h6 className="text-dark text-sm font-weight-bold mb-0"> {nombre_des_deposants}, Déposant </h6>
                                                <p className="text-secondary font-weight-bold text-xs mt-1 mb-0"> Déposants</p>
                                            </div>
                                        </div>
                                        <div className="timeline-block mb-3">
                                            <span className="timeline-step">
                                                <i className="material-icons text-danger text-gradient">code</i>
                                            </span>
                                            <div className="timeline-content">
                                                <h6 className="text-dark text-sm font-weight-bold mb-0">$ {(montant_a_reverser)?.toFixed(3)}</h6>
                                                <p className="text-secondary font-weight-bold text-xs mt-1 mb-0"> Montant a versé</p>
                                            </div>
                                        </div>
                                        <div className="timeline-block mb-3">
                                            <span className="timeline-step">
                                                <i className="material-icons text-info text-gradient">credit_card</i>
                                            </span>
                                            <div className="timeline-content">
                                                <h6 className="text-dark text-sm font-weight-bold mb-0"> {nombre_article_non_verser}, Articles</h6>
                                                <p className="text-secondary font-weight-bold text-xs mt-1 mb-0">Articles non verser </p>
                                            </div>
                                        </div>
                                        <div className="timeline-block mb-3">
                                            <span className="timeline-step">
                                                <i className="material-icons text-primary text-gradient">key</i>
                                            </span>
                                            <div className="timeline-content">
                                                <h6 className="text-dark text-sm font-weight-bold mb-0"> $ {(total_montant_verser)?.toFixed(3)}</h6>
                                                <p className="text-secondary font-weight-bold text-xs mt-1 mb-0"> Total montant verser</p>
                                            </div>
                                        </div>
                                        <div className="timeline-block">
                                            <span className="timeline-step">
                                                <i className="material-icons text-dark text-gradient">person</i>
                                            </span>
                                            <div className="timeline-content">
                                                <h6 className="text-dark text-sm font-weight-bold mb-0">  {total_articles_vendu}, Articles</h6>
                                                <p className="text-secondary font-weight-bold text-xs mt-1 mb-0">Total articles vendu  </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-6 mt-4'>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
