import React, { useEffect, useState, useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { SocketContext } from '../../context/socket';

import { rechercher_reçu_deposant, liste_des_reçus_payer } from '../../store/reçuSlice'
import { liste_des_article_non_verser, nombre_total_article_deposant, nombre_total_article_vendu, liste_des_article_de_deposant } from '../../store/articleSlice'
import { rechercher_deposant_par_id } from '../../store/deposantSlice'

import Information from './profile_component/Information'
import Ajouter_article from './profile_component/Ajouter_article'
import Liste_des_reçus_deposer from './profile_component/Liste_des_reçus_deposer'
import Liste_des_reçus_payer from './profile_component/Liste_des_reçus_payer'
import Liste_des_article_non_verser from './profile_component/Liste_des_article_non_verser'

export default function Profile() {

  const { id } = useParams()
  const dispatch = useDispatch()
  const socket = useContext(SocketContext);

  const [deposant, setDeposant] = useState({})
  const [reçus, setReçus] = useState([])
  const [articles, setArticles] = useState([])

  const [reçus_payer, setReçus_payer] = useState([])
  const [article_non_verser, setArticles_non_verser] = useState([])

  const [nombre_article_deposer, setNombre_article_deposer] = useState(0)
  const [nombre_article_vendu, setNombre_article_vendu] = useState(0)

  const [total_non_verser, setTotal_non_verser] = useState(0)
  const [total, setTotal] = useState(0)


  useEffect(() => {
    dispatch(liste_des_reçus_payer(deposant._id)).then((action) => { setReçus_payer(action.payload.reçu) })
  }, [dispatch, article_non_verser,deposant._id])

  useEffect(() => {
    dispatch(rechercher_reçu_deposant(deposant._id)).then((action) => { setReçus(action.payload.reçu) })
  }, [dispatch, articles, article_non_verser,deposant._id])


  useEffect(() => {
    if (deposant._id !== id) {
      dispatch(rechercher_deposant_par_id(id)).then((action) => setDeposant(action.payload.deposant))

    }
  }, [dispatch,id,deposant])

  useEffect(() => {
    socket.on("mettre_a_jour_photo_de_profile", () => {
      dispatch(rechercher_deposant_par_id(id)).then((action) => setDeposant(action.payload.deposant))

    })
  }, [dispatch,socket,id])

  useEffect(() => {
    dispatch(liste_des_article_de_deposant(deposant._id)).then((action) => setArticles(action.payload.article))
  }, [dispatch,deposant._id])

  useEffect(() => {
    dispatch(liste_des_article_non_verser(deposant._id)).then((action) => {
      setTotal_non_verser(action.payload.article?.map(article => article.montant_reverser).reduce((prev, curr) => prev + curr, 0))
      setArticles_non_verser(action.payload.article)

    })
  }, [dispatch, articles, deposant])

  useEffect(() => {
    dispatch(liste_des_article_non_verser(deposant._id)).then((action) => {
      setTotal_non_verser(action.payload.article?.map(article => article.montant_reverser).reduce((prev, curr) => prev + curr, 0))
    })
  }, [id, dispatch, articles, article_non_verser, deposant])

  useEffect(() => {
    dispatch(nombre_total_article_deposant(deposant._id)).then((action) => setNombre_article_deposer(action.payload.article.length))
  }, [dispatch, articles, deposant])

  useEffect(() => {
    dispatch(nombre_total_article_vendu(deposant._id)).then((action) => { setNombre_article_vendu(action.payload.article.length) })
  }, [dispatch, articles, deposant])

  useEffect(() => {
    dispatch(nombre_total_article_deposant(deposant._id)).then((action) => {
      setTotal(action.payload.article?.map(article => article.montant_reverser).reduce((prev, curr) => prev + curr, 0))
    })
  }, [dispatch, articles, deposant])

  return (

    <div>
      <Information
        deposant={deposant}
        setDeposant={setDeposant}
        nombre_article_deposer={nombre_article_deposer}
        nombre_article_vendu={nombre_article_vendu}
        total_non_verser={total_non_verser}
        total={total}
      />

      <Ajouter_article deposant={deposant} id={id} setArticles={setArticles} />

      <Liste_des_article_non_verser
        deposant={deposant}
        article_non_verser={article_non_verser}
        setArticles_non_verser={setArticles_non_verser}
      />

      <Liste_des_reçus_deposer
        deposant={deposant}
        reçus={reçus}
        setReçus={setReçus}
      />

      <Liste_des_reçus_payer
        deposant={deposant}
        reçus={reçus_payer}
        setReçus_payer={setReçus_payer}
      />

    </div>

  )
}

