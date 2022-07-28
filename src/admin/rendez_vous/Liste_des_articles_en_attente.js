import React, { useEffect, useState, useContext } from 'react'
import { SocketContext } from '../../context/socket';
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addNotifications } from '../../store/notificationSlice'
import Barcode from 'react-barcode';
import { accepter_un_article_postuler_par_deposant, liste_des_articles_en_attente, refuser_un_article_postuler_par_deposant } from '../../store/articleSlice'
import { ajouter_un_rendez_vous } from '../../store/rendez_vousSlice';
import Calendrier from './Calendrier';
import { rechercher_deposant_par_id } from '../../store/deposantSlice';
import { Link } from 'react-router-dom'


export default function Liste_des_articles_en_attente() {



  const dispatch = useDispatch()
  const [articles, setArticles] = useState([])
  const [article, setArticle] = useState()
  const [deposant, setDeposant] = useState()
  const [nombre_article_en_attente, setNombre_article_en_attente] = useState(0)
  const [Rendez_vous, setRrendez_vous] = useState()


  const socket = useContext(SocketContext);
  useEffect(() => {
    socket.on("mettre_a_jour_liste_des_articles_en_attente", () => {
      dispatch(liste_des_articles_en_attente()).then(action => {
        setNombre_article_en_attente(action.payload.article.length)
        setArticles(action.payload.article)
      
      })
    })

  }, [socket])

  useEffect(() => {
    dispatch(liste_des_articles_en_attente()).then(action => {
      setNombre_article_en_attente(action.payload.article.length)
      setArticles(action.payload.article)
      console.log(action.payload.article);
    })

  }, [, dispatch])



  const accepter = async (article) => {
   
console.log(article);
    dispatch(accepter_un_article_postuler_par_deposant(article._id))
      dispatch(liste_des_articles_en_attente()).then(action => {
       
        setNombre_article_en_attente(action.payload.article.length)
        setArticles(action.payload.article)
  
        dispatch(rechercher_deposant_par_id(article.user_id)).then(action => {
          let notification = {
            article: article,
            user: action.payload.deposant,
            body: "Vous avez un Rendez_vous",
            date_creation: new Date(),
            date_rendez_vous: Rendez_vous.date
          }
          dispatch(addNotifications(notification))
        })
        socket.emit("accepter_un_article")
      })
   
    socket.emit("accepter_un_article")
    
  }

  async function refuser(article) {
console.log(article._id);
    dispatch(refuser_un_article_postuler_par_deposant(article._id)).then(actions => {
      console.log(actions.payload);
      
      dispatch(liste_des_articles_en_attente()).then(action => {
        setNombre_article_en_attente(action.payload.article.length)
        setArticles(action.payload.article)
      })
    socket.emit("refuser_un_article")
   
  })
}

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

  const afficher = (article) => {
    setArticle(article)
    dispatch(rechercher_deposant_par_id(article.user_id)).then((action) => {
      setDeposant(action.payload.deposant)
    })
  }


  const handeleDate = e => {

    const data = new Date(e.target.value)
    setRrendez_vous({
      date: data,
      user_id: article.user_id,
      article_id: article._id
    })

  }


  const rendez_vous = () => {
    dispatch(ajouter_un_rendez_vous(Rendez_vous)).then(() => { socket.emit("rendez_vous") })
  }


  return (
    <div>
      <div className="container-fluid py-4 text-start" style={{ marginTop: '-1.4%' }}>
        <div className="row">
          <div className="col-xl-12 col-sm-6 mb-xl-0 mb-4">
            <div className="card">
              <div className="card-header p-3 pt-2">
                <div className="icon icon-lg icon-shape bg-gradient-dark shadow-dark text-center border-radius-xl mt-n4 position-absolute">
                  <i className="material-icons opacity-10">shopping_cart</i>
                </div>
                <div className="text-end pt-1">
                  <p className="text-sm mb-0 text-capitalize">Nombre d'article en  atente</p>
                  <h4 className="mb-0">{nombre_article_en_attente}</h4>
                </div>
              </div>
              <hr className="dark horizontal my-0" />
              <div className="card-footer p-3">
              </div>
            </div>
          </div>
        </div>
        <div className="card mt-4">
          <div className="card-header pb-0">
            <div className="row  mb-4">
              <div className="col-lg-3 col-7">
                <h4>List Des Articles En Attente </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            <div className="card mt-4">
              <div className="card-body p-3">
                <div className="table" >
                  <table className="table align-items-center mb-0 p-4">
                    <thead>
                      <tr>
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Réf</th>
                        <th className=" text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Lib.article</th>                      
                        <th className=" text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Etat</th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Date dépot article</th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Prix </th>        
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {articles?.map((article, index) =>
                        <tr key={index} >
                            <td className="align-middle text-center text-sm " >
                            <span className="text-xm text-center text-primary font-weight-bold" > {article.ref}</span>
                          </td>
                          <td className="align-middle text-center text-sm " style={{ marginLeft: '-10%' }}>
                            <a href="#" onClick={() => afficher(article)} data-bs-toggle="modal" data-bs-target="#article">
                              <h6 className="mb-0 text-sm ">{article.lib === "" ? <span className="text-xs text-dark font-weight-bold">Article</span> : <span className="text-xs text-dark font-weight-bold">{article.lib}</span>}</h6>
                            </a>
                          </td>
                        
                          <td className="align-middle text-center text-sm " style={{ marginLeft: '-10%' }}>
                            {article.etat === "Neuf" ? <span className="text-xs text-primary font-weight-bold">{article.etat}</span> : <span></span>}
                            {article.etat === "Bon etat" ? <span className="text-xs text-success font-weight-bold">{article.etat}</span> : <span></span>}
                            {article.etat === "Passable" ? <span className="text-xs text-dark font-weight-bold">{article.etat}</span> : <span></span>}
                            {article.etat === "" ? <span className="text-xs text-dark font-weight-bold">--------</span> : <span></span>}
                          </td>
                          <td className="align-middle text-center text-sm " style={{ marginLeft: '-10%' }}>
                            <span className="text-xs text-dark font-weight-bold"> {formatDate(article.date_depot)}</span>
                          </td>
                          <td className="align-middle text-center text-sm">
                            {article.prix_vente_ttc === null ? <span className="text-xs text-primary font-weight-bold">$ 0.000</span> : <span className="text-xs text-primary font-weight-bold">$ {(article.prix_vente_ttc)?.toFixed(3)}</span>}

                          </td>
                         
                          <td className="align-middle text-center text-sm">
                            <span className="text-xs font-weight-bold">
                              <a className="avatar avatar-xs rounded-circle me-3" type="button" onClick={() => accepter(article)} data-bs-toggle="modal" data-bs-target="#Accepter">
                                <img src="../../assets/img/accept.jpg" alt="team5" />
                              </a>
                            </span>
                            <span className="text-xs font-weight-bold">
                              <a className="avatar avatar-xs rounded-circle me-3" type="button" onClick={() => {
   
                                refuser(article)

                              }}>
                                <img src="../../assets/img/refuser.jpg" alt="team5" />
                              </a>
                            </span>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="card mt-4">
              <div className="card-header pb-0">
                <div className="row  mb-3">
                  <div className="col-lg-12 text-primary ">
                    <h4 className="text-primary ">Rendez-vous </h4>
                  </div>
                </div>
              </div>
            </div>
            <Calendrier />
          </div>
        </div>
      </div>
      <div className="modal fade" id="article" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ marginLeft: "7%" }} >
        <div className="modal-dialog modal-dialog-centered modal-xl" >
          <div className="modal-content" style={{ height: "280px" }}>
            <div className="modal-body" >
              <div className="container" style={{ marginBottom: '-9%', marginTop: '-3%', }}>
                <div className="row flex-row">
                  <div className="col-lg-5">
                    <img
                      className="w-60 min-height-250 max-height-250   border-radius-lg ms-2"
                      data-size="500x600"
                      src={article?.image?.length > 0 ? "http://localhost:4040/" + article.image[0].filename : "../../assets/img/image.png"}
                      style={{ padding: article?.image?.length > 0 ? ' 0%  ' : ' 12%', background: article?.image?.length > 0 ? '#transparent' : '#F5F5F5', marginTop: '-10%' }}
                    />
                    <div className="my-gallery d-flex mt-4 " itemScope itemType="http://schema.org/ImageGallery" data-pswp-uid={1} style={{ marginLeft: '8%' }}>
                      <figure style={{ marginLeft: '5%' }}>
                        <img
                          className="w-100 min-height-100 max-height-100 border-radius-lg "
                          src={article?.image?.length > 1 ? "http://localhost:4040/" + article.image[1].filename : "../../assets/img/image.png"}
                          alt="Image description"
                          loading="lazy"
                          style={{ padding: article?.image?.length > 1 ? ' 0%  ' : ' 20%', background: article?.image?.length > 1 ? '#transparent' : '#F5F5F5' }}
                        />
                      </figure>
                      <figure className="ms-3  " itemProp="associatedMedia" itemScope itemType="http://schema.org/ImageObject">
                        <img
                          className="w-100 min-height-100 max-height-100 border-radius-lg "
                          src={article?.image?.length > 2 ? "http://localhost:4040/" + article?.image[2].filename : "../../assets/img/image.png"}
                          alt="Image description"
                          loading="lazy"
                          style={{ padding: article?.image?.length > 2 ? ' 0%  ' : ' 20%', background: article?.image?.length > 2 ? '#transparent' : '#F5F5F5' }}
                        />
                      </figure>
                      <figure className="ms-3  " itemProp="associatedMedia" itemScope itemType="http://schema.org/ImageObject">
                        <img
                          className="w-100 min-height-100 max-height-100 border-radius-lg "
                          src={article?.image?.length > 3 ? "http://localhost:4040/" + article?.image[3].filename : "../../assets/img/image.png"}
                          alt="Image description"
                          loading="lazy"
                          style={{ padding: article?.image?.length > 3 ? ' 0%  ' : ' 20%', background: article?.image?.length > 3 ? '#transparent' : '#F5F5F5' }}
                        />
                      </figure>
                    </div>
                  </div>
                  <div className="col-lg-7">
                    <div className="about-text go-to">
                      <div className="row">
                        <div className="col-9">
                          {article?.lib === null ? <h3 className="dark-color text-start " style={{ marginTop: '6%' }}>{article?.lib} </h3> : <h3 className="dark-color text-start " style={{ marginTop: '6%' }}>article</h3>}
                        </div>
                      </div>
                      <div className="row about-list text-start" style={{ marginTop: '-2%' }}>
                        <div className="text-start " >
                          {article?.etat === "Neuf" ? <span className="badge bg-gradient-primary font-weight-bold">{article?.etat}</span> : <span></span>}
                          {article?.etat === "Bon etat" ? <span className="badge bg-gradient-success font-weight-bold">{article?.etat}</span> : <span></span>}
                          {article?.etat === "Passable" ? <span className="badge bg-gradient-dark font-weight-bold" >{article?.etat}</span> : <span></span>}
                          {article?.etat === "" ? <span className="badge  font-weight-bold" style={{ backgroundColor: '#A1A1A1' }}>-------</span> : <span></span>}
                        </div>
                        <div className="col-md-3">
                          <div className="" style={{ width: '100%', fontSize: '1.2rem', fontWeight: '500', color: '#20247b' }}>
                            <span>
                              Réfeerence:
                            </span>
                            <span className="" style={{ fontWeight: '500', marginLeft: '10%', opacity: '70%' }}>
                              {article?.ref}
                            </span>
                          </div>
                        </div>
                        <div className="col-md-1"></div>
                        <div className="col-md-3 ">
                          <div style={{ width: '100%', fontSize: '1.2rem', fontWeight: '500', color: '#20247b' }}>
                            <span style={{ width: '100%', fontSize: '1.2rem', fontWeight: '500', color: '#20247b' }}>Prix:   </span>
                            <span style={{ fontWeight: '500', marginLeft: '10%', opacity: '70%' }}>
                              $  {article?.montant_reverser !== null ? (article?.montant_reverser) : (0)},000
                            </span>
                          </div>
                        </div>
                        <div className="col-md-1"></div>
                        <div className="col-md-4 ">
                          <div style={{ width: '100%', fontSize: '1.2rem', fontWeight: '500', color: '#20247b' }}>
                            <span style={{ width: '100%', fontSize: '1.2rem', fontWeight: '500', color: '#20247b' }}>Date: </span>
                            <span style={{ fontWeight: '500', marginLeft: '10%', opacity: '70%' }}>
                              {article?.date_depot !== null ? formatDate(article?.date_depot) : "--/--/--"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div  >
                      <Barcode value={article?._id} width={1.5} displayValue={false} height={60} marginTop={10} background={'none'} />
                    </div>
                    <div className="" style={{ width: '100%', fontSize: '1.2rem', fontWeight: '500', color: '#20247b' }} aria-label="Close" data-bs-dismiss="modal">
                      <Link to={`/deposant/profile/${deposant?._id}`}>
                        <span>
                          Déposant :
                        </span>
                        <span className="" style={{ fontWeight: '500', marginLeft: '2%', opacity: '70%' }}>
                          {deposant?.nom ? deposant?.nom : "flen"} {deposant?.prenom ? deposant?.prenom : "ben foulen"}
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="Accepter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body text-start text-dark">
              <h4 style={{ marginBottom: '8%' }}>Saisie Date Du Rendez-vous </h4>
              <div className="row">
                <div className="col-1" />
                <div className="col-md-10">
                  <div className="input-group input-group-static ">
                    <h6 style={{ marginBottom: '-3%' }}>Date</h6>
                    <input type="datetime-local" className="form-control" onChange={handeleDate} />
                  </div>
                </div>
                <button type="button" className="btn bg-gradient-dark btn-icon col-11 m-3 mt-0 mb-4 mt-4 " onClick={() => rendez_vous()} data-bs-dismiss="modal" aria-label="Close">sauvegarder</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

