import './App.css';
import Connexion from './connexion/Connexion'


import Ajouter_deposant from './admin/deposant/Ajouter_deposant'
import Deposants from './admin/deposant/Deposants'
import Profile from './admin/deposant/profile'
import Caisse from './admin/caisse/Caisse'
import Articles from './admin/article/Articles'
import Main from './admin/dashboard/Main'
import Liste_des_articles_en_attente from './admin/rendez_vous/Liste_des_articles_en_attente'
import Liste_des_reçus_deposer from './admin/reçu/Liste_des_reçus_deposer'
import Liste_des_reçus_verser from './admin/reçu/Liste_des_reçus_verser'
import Liste_des_reçus_caisse from './admin/reçu/Liste_des_reçus_caisse'
import Ajouter_article from './admin/article/Ajouter_article'
import Notifications from './admin/notification/Notifications'
import Boutique from './admin/profile/Boutique'


import Caisse_vendeur from './vendeur/caisse/Caisse'
import Articles_vendeur from './vendeur/article/Articles'
import Ajouter_article_vendeur from './vendeur/article/Ajouter_article'
import Liste_des_reçus_caisse_vendeur from './vendeur/reçu/Liste_des_reçus_caisse'


import Ajouter_deposant_gerant from './gerant/deposant/Ajouter_deposant'
import Deposants_gerant from './gerant/deposant/Deposants'
import Profile_gerant from './gerant/deposant/profile'
import Caisse_gerant from './gerant/caisse/Caisse'
import Articles_gerant from './gerant/article/Articles'
import Main_gerant from './gerant/dashboard/Main'
import Liste_des_articles_en_attente_gerant from './gerant/rendez_vous/Liste_des_articles_en_attente'
import Liste_des_reçus_deposer_gerant from './gerant/reçu/Liste_des_reçus_deposer'
import Liste_des_reçus_verser_gerant from './gerant/reçu/Liste_des_reçus_verser'
import Liste_des_reçus_caisse_gerant from './gerant/reçu/Liste_des_reçus_caisse'
import Liste_des_reçus_gerant from './gerant/reçu/Liste_des_reçus'
import Ajouter_article_gerant from './gerant/article/Ajouter_article'
import Notifications_gerant from './gerant/notification/Notifications'
import Boutique_gerant from './gerant/profile/Boutique'


import { rechercher_user_par_token } from './store/userSlice';
import { information } from './store/boutiqueSlice';

import { Private_Routes_Admin } from './route/Private_Routes_Admin'
import { Private_Routes_Gerant } from './route/Private_Routes_Gerant'
import { Private_Routes_Vendeur } from './route/Private_Routes_Vendeur'

import { Route, Routes, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { SocketContext, socket } from './context/socket'
import { useDispatch } from 'react-redux';

function App() {
  let navigate = useNavigate()
  const dispatch = useDispatch()
  const [user, setUser] = useState()
  const socket = useContext(SocketContext)
  const token = localStorage.getItem("token")

  useEffect(() => { dispatch(information()) }, [dispatch])

  useEffect(() => {
    if (token?.length > 0) 
      dispatch(rechercher_user_par_token()).then(action => {
        setUser(action.payload.user)
      })
  }, [])

  useEffect(() => {

        console.log(user)
        if (user?.role === "Gérant"  && token?.length > 0) {navigate('/gerant/caisse')}
        if (user?.role === "admin" && token?.length > 0) { navigate('/caisse')}
        if (!user || !token) { navigate('/connexion')}

    
  }, [user,token,dispatch])


  useEffect(() => {
    socket.emit("newUser", user)
  })



  return (
    <div className="App">

      <Routes>



        <Route element={<Private_Routes_Admin role={user?.role} />}>
          <Route path="/deposant/ajouter_deposant" element={<Ajouter_deposant></Ajouter_deposant>} />
          <Route path="/deposant/list" exact element={<Deposants></Deposants>} />
          <Route path="/deposant/profile/:id" exact element={<Profile></Profile>} />

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
        </Route>




        <Route element={<Private_Routes_Gerant role={user?.role} />}>
          <Route path="/gerant/deposant/ajouter" element={<Ajouter_deposant_gerant></Ajouter_deposant_gerant>} />
          <Route path="/gerant/deposant/list" exact element={<Deposants_gerant></Deposants_gerant>} />
          <Route path="/gerant/deposant/profile/:id" exact element={<Profile_gerant></Profile_gerant>} />

          <Route path="/gerant/article/enAttente" exact element={<Liste_des_articles_en_attente_gerant   ></Liste_des_articles_en_attente_gerant>} />
          <Route path="/gerant/article/list" exact element={<Articles_gerant></Articles_gerant>} />
          <Route path="/gerant/article/ajouter" exact element={<Ajouter_article_gerant></Ajouter_article_gerant>} />

          <Route path="/gerant/recu" exact element={<Liste_des_reçus_gerant></Liste_des_reçus_gerant>} />
          <Route path="/gerant/recu/deposer" exact element={<Liste_des_reçus_deposer_gerant></Liste_des_reçus_deposer_gerant>} />
          <Route path="/gerant/recu/verser" exact element={<Liste_des_reçus_verser_gerant></Liste_des_reçus_verser_gerant>} />
          <Route path="/gerant/recu/caisse" exact element={<Liste_des_reçus_caisse_gerant></Liste_des_reçus_caisse_gerant>} />

          <Route path="/gerant/boutique" exact element={<Boutique_gerant></Boutique_gerant>} />
          <Route path="/gerant/caisse" exact element={<Caisse_gerant></Caisse_gerant>} />
          <Route path="/gerant/dashboard" exact element={<Main_gerant></Main_gerant>} />
          <Route path="/gerant/notification/liste" exact element={<Notifications_gerant></Notifications_gerant>} />
        </Route>


        <Route element={<Private_Routes_Vendeur role={user?.role}  />}>
          <Route path='/vendeur/caisse' element={<Caisse_vendeur ></Caisse_vendeur>} />
          <Route path='/vendeur/articles' element={<Articles_vendeur ></Articles_vendeur>} />
          <Route path='/vendeur/article/ajouter' element={<Ajouter_article_vendeur></Ajouter_article_vendeur>} />
          <Route path='/vendeur/recu/caisse' element={<Liste_des_reçus_caisse_vendeur ></Liste_des_reçus_caisse_vendeur>} />
        </Route>




        <Route path='/connexion' element={<Connexion />} />
      </Routes>

    </div>


  );
}

export default App;
