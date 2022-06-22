import React, { useContext, useEffect }  from 'react'
import NavBar from '../vendeur/component/NavBar'
import Footer from '../vendeur/component/Footer'
import Caisse from '../vendeur/caisse/Caisse'
import { Route, Routes } from 'react-router-dom'
import Articles from '../vendeur/article/Articles'
import Ajouter_article from '../vendeur/article/Ajouter_article'
import Liste_des_reçus_caisse from '../vendeur/reçu/Liste_des_reçus_caisse'

import { SocketContext } from '../context/socket';

export default function Vendeur(props) {

    
    const socket = useContext(SocketContext);
    useEffect(()=>{
        socket.emit("newUser", props.user)
    },[])


    return (
        <div>
            <div style={{ width: '80%', marginLeft: '10%' }}>

                <NavBar setUser={props.setUser}  />
                
                <div style={{  position:'relative', top: '80px', marginLeft: '0.2%' }}>
                <Routes>
                <Route path='/vendeur/caisse' element={
                        <Caisse >

                        </Caisse>} 
                    />
                    <Route path='/vendeur/articles' element={
                        <Articles >

                        </Articles>} 
                    />
                    <Route path='/vendeur/article/ajouter' element={
                        <Ajouter_article >

                        </Ajouter_article>} 
                    />
                    <Route path='/vendeur/recu/caisse' element={
                        <Liste_des_reçus_caisse >

                        </Liste_des_reçus_caisse>} 
                    />
                </Routes>
                </div>
                
            
                <Footer />

            </div>
        </div>
    )
}
