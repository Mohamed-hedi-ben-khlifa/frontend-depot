import React, {  useContext,useEffect } from 'react'

import SideBar from '../gerant/component/SideBar'
import Footer from '../gerant/component/Footer'


import Ajouter_deposant from '../gerant/deposant/Ajouter_deposant'
import Deposants from '../gerant/deposant/Deposants'
import Profile from '../gerant/deposant/profile'
import Caisse from '../gerant/caisse/Caisse'
import Articles from '../gerant/article/Articles'
import Main from '../gerant/dashboard/Main'
import Liste_des_articles_en_attente from '../gerant/rendez_vous/Liste_des_articles_en_attente'
import Liste_des_reçus_deposer from '../gerant/reçu/Liste_des_reçus_deposer'
import Liste_des_reçus_verser from '../gerant/reçu/Liste_des_reçus_verser'
import Liste_des_reçus_caisse from '../gerant/reçu/Liste_des_reçus_caisse'
import Ajouter_article from '../gerant/article/Ajouter_article'




import { Routes, Route } from 'react-router-dom'
import Notifications from '../admin/notification/Notifications'
import Boutique from '../admin/profile/Boutique'
import Liste_des_reçus from '../gerant/reçu/Liste_des_reçus'

import { SocketContext } from '../context/socket';


export default function Gerant(props) {

    const socket = useContext(SocketContext);
    useEffect(()=>{
        socket.emit("newUser", props.user)
    },[])


    return (
        <div>

            <div className='container-fluid'>
                <div className="row">
                   
                    <div className="col-2">
                        <SideBar setUser={props.setUser} />
                    </div>

                    <div className="col-10" style={{ marginLeft: '13%', width: '85%' }}>
                        
                        <Routes>
                            
                            <Route path="/gerant/deposant/ajouter" element={<Ajouter_deposant></Ajouter_deposant>} />
                            <Route path="/gerant/deposant/list" exact element={<Deposants></Deposants> } />
                            <Route path="/gerant/deposant/profile/:id" exact element={ <Profile></Profile>} />

                            <Route path="/gerant/article/enAttente" exact element={<Liste_des_articles_en_attente   ></Liste_des_articles_en_attente>} />
                            <Route path="/gerant/article/list" exact element={<Articles></Articles>} />
                            <Route path="/gerant/article/ajouter" exact element={<Ajouter_article></Ajouter_article>} />

                            <Route path="/gerant/recu" exact element={<Liste_des_reçus></Liste_des_reçus>} />
                            <Route path="/gerant/recu/deposer" exact element={<Liste_des_reçus_deposer></Liste_des_reçus_deposer>} />
                            <Route path="/gerant/recu/verser" exact element={<Liste_des_reçus_verser></Liste_des_reçus_verser>} />
                            <Route path="/gerant/recu/caisse" exact element={<Liste_des_reçus_caisse></Liste_des_reçus_caisse>} />

                            <Route path="/gerant/boutique" exact element={<Boutique></Boutique>} />
                            <Route path="/gerant/caisse" exact element={<Caisse></Caisse>} />
                            <Route path="/gerant/dashboard" exact element={<Main></Main>} />
                            <Route path="/gerant/notification/liste" exact element={<Notifications></Notifications>} />

                        </Routes>

                        <Footer />
                    </div>
                </div>

            </div>


        </div>
    )

}
