import React from 'react'
import Aperçu_des_ventes from './Aperçu_des_ventes'
import Header from './Header'
import Statistique from './Statistique'

export default function Main() {

    return (
        <div>
            <div className="container-fluid ">
                <Header />
                <div className="row mt-4 text-start">
                    <Statistique />
                    <Aperçu_des_ventes />
                </div>
            </div>
        </div>
    )

}
