import React, { useEffect,useContext } from 'react'

import SideBar from '../admin/component/SideBar'
import Footer from '../admin/component/Footer'


import Ajouter_deposant from '../admin/deposant/Ajouter_deposant'
import Deposants from '../admin/deposant/Deposants'
import Profile from '../admin/deposant/profile'
import Caisse from '../admin/caisse/Caisse'
import Articles from '../admin/article/Articles'
import Main from '../admin/dashboard/Main'
import Liste_des_articles_en_attente from '../admin/rendez_vous/Liste_des_articles_en_attente'
import Liste_des_reçus_deposer from '../admin/reçu/Liste_des_reçus_deposer'
import Liste_des_reçus_verser from '../admin/reçu/Liste_des_reçus_verser'
import Liste_des_reçus_caisse from '../admin/reçu/Liste_des_reçus_caisse'
import Ajouter_article from '../admin/article/Ajouter_article'




import { Routes, Route, useNavigate } from 'react-router-dom'
import Notifications from '../admin/notification/Notifications'
import Boutique from '../admin/profile/Boutique'
import { SocketContext } from '../context/socket';




export default function Admin(props) {

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
                            <Route path="/deposant/ajouter_deposant" element={
                                <Ajouter_deposant></Ajouter_deposant>
                            } />
                            <Route path="/deposant/list" exact element={
                                <Deposants></Deposants>
                            } />
                            <Route path="/deposant/profile/:id" exact element={
                                <Profile></Profile>
                            } />


                            <Route path="/boutique" exact element={<Boutique></Boutique>} />
                            <Route path="/caisse" exact element={<Caisse></Caisse>} />
                            <Route path="/dashboard" exact element={<Main></Main>} />
                            <Route path="/notification/liste" exact element={<Notifications></Notifications>} />

                            <Route path="/admin/article/enAttente" exact element={<Liste_des_articles_en_attente   ></Liste_des_articles_en_attente>} />
                            <Route path="/article/list" exact element={<Articles></Articles>} />
                            <Route path="/article/ajouter" exact element={<Ajouter_article></Ajouter_article>} />


                            <Route path="/recu/deposer" exact element={<Liste_des_reçus_deposer></Liste_des_reçus_deposer>} />
                            <Route path="/recu/verser" exact element={<Liste_des_reçus_verser></Liste_des_reçus_verser>} />
                            <Route path="/recu/caisse" exact element={<Liste_des_reçus_caisse></Liste_des_reçus_caisse>} />



                        </Routes>

                        <Footer />
                    </div>
                </div>

            </div>


        </div>
    )

}
