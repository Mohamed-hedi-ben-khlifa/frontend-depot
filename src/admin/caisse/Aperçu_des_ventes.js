import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { liste_des_articles_vendu_ce_jour, liste_des_article_en_attente_ce_jour, liste_des_nouvels_articles, montant_a_reverser_ce_jour } from '../../store/articleSlice'
import { liste_des_recu_caisse_ce_jour } from '../../store/reçuSlice'

export default function Aperçu_des_ventes() {

    const dispatch = useDispatch()
    const [nombre_article_en_attente, setNombre_article_en_attente] = useState(0)
    const [nombre_article_vendu, setNombre_article_vendu] = useState(0)
    const [nombre_nouvel_article, setNombre_nouvel_article] = useState(0)
    const [nombre_des_client, setNombre_des_client] = useState(0)
    const [montant_a_reverser, setMontant_a_reverser] = useState(0)

    useEffect(() => {
        dispatch(liste_des_article_en_attente_ce_jour()).then(action => {
            setNombre_article_en_attente(action.payload.article.length)
        })
    })

    useEffect(() => {
        dispatch(liste_des_articles_vendu_ce_jour()).then(action => {
            setNombre_article_vendu(action.payload.article.length)
        })
    })

    useEffect(() => {
        dispatch(liste_des_nouvels_articles()).then(action => {
            setNombre_nouvel_article(action.payload.article.length)
        })
    })

    useEffect(() => {
        dispatch(liste_des_recu_caisse_ce_jour()).then(action => {
            setNombre_des_client(action.payload.reçu.length)
        })
    })

    useEffect(() => {
        dispatch(montant_a_reverser_ce_jour()).then(action => {
            setMontant_a_reverser(action.payload.article?.map(article => article.montant_reverser).reduce((prev, curr) => prev + curr, 0))
        })
    })

    return (
        <div>
            <div className="card mt-3  text-start ">
                <div className="card-header pb-0" >
                    <h6>Aperçu des ventes</h6>
                    <p className="text-sm">
                        <i className="fa fa-arrow-up text-success" aria-hidden="true" />
                        <span className="font-weight-bold">24%</span> ce jour
                    </p>
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
                                        <h6 className="text-dark text-sm font-weight-bold mb-0">{nombre_article_en_attente}</h6>
                                        <p className="text-secondary font-weight-bold text-xs mt-1 mb-0">Rendez-vous</p>
                                    </div>
                                </div>
                                <div className="timeline-block mb-3">
                                    <span className="timeline-step">
                                        <i className="material-icons text-danger text-gradient">code</i>
                                    </span>
                                    <div className="timeline-content">
                                        <h6 className="text-dark text-sm font-weight-bold mb-0">{nombre_article_vendu}</h6>
                                        <p className="text-secondary font-weight-bold text-xs mt-1 mb-0">Article vendu</p>
                                    </div>
                                </div>
                                <div className="timeline-block mb-3">
                                    <span className="timeline-step">
                                        <i className="material-icons text-info text-gradient">credit_card</i>
                                    </span>
                                    <div className="timeline-content">
                                        <h6 className="text-dark text-sm font-weight-bold mb-0">{nombre_nouvel_article}</h6>
                                        <p className="text-secondary font-weight-bold text-xs mt-1 mb-0">Nouvel article</p>
                                    </div>
                                </div>
                                <div className="timeline-block mb-3">
                                    <span className="timeline-step">
                                        <i className="material-icons text-primary text-gradient">key</i>
                                    </span>
                                    <div className="timeline-content">
                                        <h6 className="text-dark text-sm font-weight-bold mb-0"> $ {(montant_a_reverser)?.toFixed(3)} </h6>
                                        <p className="text-secondary font-weight-bold text-xs mt-1 mb-0">Montant à verser</p>
                                    </div>
                                </div>
                                <div className="timeline-block">
                                    <span className="timeline-step">
                                        <i className="material-icons text-dark text-gradient">person</i>
                                    </span>
                                    <div className="timeline-content">
                                        <h6 className="text-dark text-sm font-weight-bold mb-0">{nombre_des_client}</h6>
                                        <p className="text-secondary font-weight-bold text-xs mt-1 mb-0">Client</p>
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
    )

}
