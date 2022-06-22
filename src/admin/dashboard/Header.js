import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { liste_des_articles, liste_des_articles_boutique_vendu, liste_des_articles_des_deposants_vendus_et_verves } from '../../store/articleSlice'
import { get_deposants } from '../../store/deposantSlice'

export default function Header() {

    const dispatch = useDispatch()
    const [nombre_des_deposants, setNombre_deposant] = useState(0)
    const [nombres_des_articles, setNombre_des_articles] = useState(0)
    const [chiffre_d_affaire, setChiffre_d_affaire] = useState(0)
    const [bénéfice, setBénéfice] = useState(0)

    useEffect(() => {
        dispatch(get_deposants()).then(action => {
            setNombre_deposant(action.payload.deposant.length)
        })
    })

    useEffect(() => {
        dispatch(liste_des_articles()).then(action => {
            setNombre_des_articles(action.payload.article.length)
        })
    })

    useEffect(() => {
        dispatch(liste_des_articles()).then(action => {
            setChiffre_d_affaire(action.payload.article?.map(article => article.prix_vente_ttc).reduce((prev, curr) => prev + curr, 0))
        })
    })

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

    return (
        <div>
            <div className="row">
                <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                    <div className="card">
                        <div className="card-header p-3 pt-2 text-start">
                            <div className="icon icon-lg icon-shape bg-gradient-dark shadow-dark text-center border-radius-xl mt-n4 position-absolute">
                                <i className="material-icons opacity-10">person</i>
                            </div>
                            <div className="text-end pt-1">
                                <p className="text-sm mb-0 text-capitalize">Nombre De Deposants</p>
                                <h4 className="mb-0">{nombre_des_deposants}</h4>
                            </div>
                        </div>
                        <hr className="dark horizontal my-0 text-start" />
                        <div className="card-footer p-3">
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6">
                    <div className="card">
                        <div className="card-header p-3 pt-2 text-start">
                            <div className="icon icon-lg icon-shape  shadow-info text-center border-radius-xl mt-n4 position-absolute" style={{ backgroundColor: '#6d6d6d' }}>
                                <i className="material-icons opacity-10">shopping_cart</i>
                            </div>
                            <div className="text-end pt-1">
                                <p className="text-sm mb-0 text-capitalize">Nombre Des articles</p>
                                <h4 className="mb-0">{nombres_des_articles}</h4>
                            </div>
                        </div>
                        <hr className="dark horizontal my-0" />
                        <div className="card-footer p-3">
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                    <div className="card">
                        <div className="card-header p-3 pt-2 text-start">
                            <div className="icon icon-lg icon-shape bg-gradient-secondary shadow-secondary text-center border-radius-xl mt-n4 position-absolute">
                                <i className="material-icons opacity-10">account_balance_wallet</i>
                            </div>
                            <div className="text-end pt-1">
                                <p className="text-sm mb-0 text-capitalize">Bénéfice</p>
                                <h4 className="mb-0"> $ {(bénéfice)?.toFixed(3)} </h4>
                            </div>
                        </div>
                        <hr className="dark horizontal my-0" />
                        <div className="card-footer p-3">
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                    <div className="card">
                        <div className="card-header p-3 pt-2 text-start">
                            <div className="icon icon-lg icon-shape  shadow-secondary text-center border-radius-xl mt-n4 position-absolute" style={{ backgroundColor: '#484848' }}>
                                <i className="material-icons opacity-10">attach_money</i>
                            </div>
                            <div className="text-end pt-1">
                                <p className="text-sm mb-0 text-capitalize">Chiffre d'affaires</p>
                                <h4 className="mb-0">$ {(chiffre_d_affaire)?.toFixed(3)} </h4>
                            </div>
                        </div>
                        <hr className="dark horizontal my-0" />
                        <div className="card-footer p-3">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
