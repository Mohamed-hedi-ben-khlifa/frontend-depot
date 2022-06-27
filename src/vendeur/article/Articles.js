import React, { useEffect, useState, useContext } from 'react'
import { SocketContext } from '../../context/socket';
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { liste_des_articles, rechercher_liste_des_article_par_etat, rechercher_liste_des_article_par_status_acceptation, rechercher_liste_des_article_par_status_vente, rechercher_liste_des_article_par_status_vervsement, recherche_article_par_id, recherche_article_par_reference, retour_produit_depuis_client, retour_produit_vers_deposant } from '../../store/articleSlice'
import Barcode from 'react-barcode';
import Scan from './Scan';
import { rechercher_deposant_par_id } from '../../store/deposantSlice';

export default function Articles() {

  const dispatch = useDispatch()
  const socket = useContext(SocketContext);
  const [articles, setArticles] = useState([])
  const [message, setMessage] = useState()
  const [deposant, setDeposant] = useState()
  const [id, setId] = useState(null)
  const [article, setArticle] = useState({
    user_id: null,
    description: null,
    lib: null,
    etat: null,
    prix_vente_ttc: null,
    prix_achat: null,
    montant_reverser: null,
    date_vente: null,
    date_reversement: null,
    date_depot: null,
    status_reversement: null,
    status_acceptation: null,
    status_vendu: null,
    image: []
  })



  useEffect(() => {

    if (id !== null) {
      dispatch(recherche_article_par_id(id)).then((action) => {
        if (action.payload.success) {
          const art = action.payload.article
          setArticles([art]);
        }
      })
    }

  }, [,dispatch,id])

  useEffect(() => { dispatch(liste_des_articles()).then(action => setArticles(action.payload.article)) },[,dispatch])

  useEffect(() => {
    socket.on("mettre_a_jour_liste_des_articles", () => {
      dispatch(liste_des_articles()).then(action => setArticles(action.payload.article))
    })
  }, [,dispatch,socket])

  const retour = () => {
    dispatch(retour_produit_depuis_client(article._id)).then(() => {
      dispatch(liste_des_articles()).then(action => setArticles(action.payload.article))
    })
  }

  const tirer = () => {
    dispatch(retour_produit_vers_deposant(article._id)).then(() => {
      dispatch(liste_des_articles()).then(action => setArticles(action.payload.article))
    })
  }

  const [vendu, setVendu] = useState(0)
  const filtre_vendu = () => {

    setVendu(vendu + 1)
    if (vendu === 0) {
      dispatch(liste_des_articles()).then(action => setArticles(action.payload.article))
    }
    if (vendu === 1) {
      dispatch(rechercher_liste_des_article_par_status_vente("Oui")).then(action => {
        setArticles(action.payload.article)
      })
    }
    if (vendu === 2) {
      dispatch(rechercher_liste_des_article_par_status_vente("Non")).then(action => setArticles(action.payload.article))
    }
    if (vendu === 3) {
      dispatch(rechercher_liste_des_article_par_status_vente("Retour")).then(action => setArticles(action.payload.article))
      setVendu(0)
    }
  }

  const [verser, setVerser] = useState(0)
  const filtre_verser = () => {

    setVerser(verser + 1)
    if (verser === 0) {
      dispatch(liste_des_articles()).then(action => setArticles(action.payload.article))
    }
    if (verser === 1) {
      dispatch(rechercher_liste_des_article_par_status_vervsement("Oui")).then(action => {
        setArticles(action.payload.article)
      })
    }
    if (verser === 2) {
      dispatch(rechercher_liste_des_article_par_status_vervsement("null")).then(action => {
        setArticles(action.payload.article)
      })
    }
    if (verser === 3) {
      dispatch(rechercher_liste_des_article_par_status_vervsement("Retour")).then(action => setArticles(action.payload.article))
      setVerser(0)
    }
  }

  const [acceptation, setAcceptation] = useState(0)
  const filtre_acceptation = () => {

    setAcceptation(acceptation + 1)
    if (acceptation === 0) {
      dispatch(liste_des_articles()).then(action => setArticles(action.payload.article))
    }
    if (acceptation === 1) {
      dispatch(rechercher_liste_des_article_par_status_acceptation("boutique")).then(action => {
        setArticles(action.payload.article)
      })
    }
    if (acceptation === 2) {
      dispatch(rechercher_liste_des_article_par_status_acceptation("Deposer")).then(action => {
        setArticles(action.payload.article)
      })
    }
    if (acceptation === 3) {
      dispatch(rechercher_liste_des_article_par_status_acceptation("Accepter")).then(action => setArticles(action.payload.article))
    }
    if (acceptation === 4) {
      dispatch(rechercher_liste_des_article_par_status_acceptation("Refuser")).then(action => {
        setArticles(action.payload.article)
      })
    }
    if (acceptation === 5) {
      dispatch(rechercher_liste_des_article_par_status_acceptation("En attente")).then(action => {
        setAcceptation(0)
      })
    }
  }

  const [etat, setEtat] = useState(0)
  const filtre_etat = () => {

    setEtat(etat + 1)
    if (etat === 0) {
      dispatch(liste_des_articles()).then(action => setArticles(action.payload.article))
    }
    if (etat === 1) {
      dispatch(rechercher_liste_des_article_par_etat("Neuf")).then(action => {
        setArticles(action.payload.article)
      })
    }
    if (etat === 2) {
      dispatch(rechercher_liste_des_article_par_etat("Bon etat")).then(action => {
        setArticles(action.payload.article)
      })
    }
    if (etat === 3) {
      dispatch(rechercher_liste_des_article_par_etat("Passable")).then(action => setArticles(action.payload.article))
      setEtat(0)
    }
  }

  const handleChange = e => { if (e.code === "Enter") { onKeyDown(e) } }

  const onKeyDown = async (e) => {

    function myGreeting() { setMessage("") }

    dispatch(recherche_article_par_reference(e.target.value)).then(async (action) => {
      if (action.payload.article.length > 0) {
        setArticles(action.payload.article)
        setMessage("")
      }
      else {
        dispatch(liste_des_articles()).then(async (action) => { setArticles(action.payload.article) })
        setTimeout(setMessage("Article n'est pas trouver !"), 1000)
        setTimeout(myGreeting, 5000);
      }
    })
  }

  const modal = (article) => {
    setArticle(article);
    dispatch(rechercher_deposant_par_id(article.user_id)).then(action => {
      setDeposant(action.payload.deposant)
    })
  }

  const fileChange = e => {

    console.log(e.target.files)
    const photos = new FormData()
    const files = e.target.files
    for (let i = 0; i < files.length; i++) {
      photos.append("photos", files[i]);
    }
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    axios.patch('http://localhost:4040/Article/upload/' + article._id, photos, config).then((data) => {
      dispatch(liste_des_articles()).then(action => setArticles(action.payload.article))
    })
  }

  async function print() {

    var pri = window.open('', 'PRINT', 'height=400,width=1000');
    pri.document.open();
    pri.document.write('<html><head><title>' + document.title + '</title>');
    pri.document.write(' <link id="pagestyle" href="/assets/css/material-dashboard.min.css?v=3.0.2" rel="stylesheet" ');
    pri.document.write('</head><body >');
    pri.document.write(document.getElementById("code_a_barre").innerHTML);
    pri.document.write('</body></html>');
    pri.print()
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



  return (
    <div>
      <div className="container-fluid  ">
        <Scan id={id} setId={setId} />
        <div className="card   ">
          <div className="card-header pb-0">
            <div className="row  mb-4">
              <div className="col-lg-3 text-start">
                <h4>List Des Articles</h4>
              </div>
              <div className="col-2">
                <div className="input-group input-group-dynamic ">
                  <input className="form-control" type="text" placeholder="Rechercher article par réference ..." name="ref" onKeyDown={handleChange} />
                </div>
              </div>
              <div className="col-5">
                <p className="text-start text-primary mt-3">{message}</p>
              </div>
              <div className="col-2">
                <Link className="btn bg-gradient-dark btn-icon col-10 text-center" to="/vendeur/article/ajouter" >
                  <div className="d-flex align-items-center" style={{ marginLeft: '22%' }}>
                    Ajouter
                    <i className="material-icons ms-2" aria-hidden="true">add</i>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
  
        <div className="card p-4 mt-4 ">
          <div className="table">
            <table className="table responsive align-items-end " >
              <thead>
                <tr>
                  <th className=" text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" >Ref</th>
                  <th className=" text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" >Lib.article</th>
                  <th className=" text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" ><a type="button"  onClick={() => filtre_etat()} >etat</a></th>
                  <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" >Prix d'achat'</th>
                  <th className=" text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"><a type="button" onClick={() => filtre_acceptation()} >Statut</a> </th>
                  <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Date dépot article</th>
                  <th className=" text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"  > <a type="button"  onClick={() => filtre_vendu()}>vendu ?</a></th>
                  <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"  >Prix de vente  </th>
                  <th className=" text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Date vente</th>
                  <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> <a type="button" onClick={() => filtre_verser()}>versé ?</a> </th>
                  <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Aregant versé</th>
                  <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Date reversement</th>
                  <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">E_ticket</th>
                </tr>
              </thead>
              <tbody>
                {articles?.map((article, index) =>
                  <tr key={index}>
                    <td className="align-middle text-center  " >
                      <span className="text-sm text-primary  text-sm  font-weight-bold "> {article.ref}</span>
                    </td>
                    <td className="align-middle text-center"  >
                      <a onClick={() => modal(article)}  data-bs-toggle="modal" data-bs-target="#article" type="button">
                        <div className="text-sm  font-weight-bold ">
                          {!article.lib ? <span >Article</span> : <span >{article.lib}</span>}
                        </div>
                      </a>
                    </td>
                    <td className="align-middle text-center text-xs  font-weight-bold" >
                      {article.etat === "Neuf" ? <span className="text-primary ">{article.etat}</span> : <span></span>}
                      {article.etat === "Bon etat" ? <span className="text-success ">{article.etat}</span> : <span></span>}
                      {article.etat === "Passable" ? <span className="text-dark ">{article.etat}</span> : <span></span>}
                      {article.etat === "" ? <span className="text-primary ">--------</span> : <span></span>}
                    </td>
                    <td className="align-middle text-center text-sm  font-weight-bold ">
                      <span className=" text-dark   "> $ {article.prix_achat ? (article.prix_achat).toFixed(3) : "0,000"}</span>
                    </td>
                    <td className="align-middle text-center text-sm  font-weight-bold">
                      {article.status_acceptation === "Accepter" ? <span className="badge badge-sm bg-gradient-success">{article.status_acceptation}</span> : <span></span>}
                      {article.status_acceptation === "Refuser" ? <span className="badge badge-sm bg-gradient-danger">{article.status_acceptation}</span> : <span></span>}
                      {article.status_acceptation === "En attente" ? <span className="badge badge-sm bg-gradient-dark">{article.status_acceptation}</span> : <span></span>}
                      {article.status_acceptation === "Deposer" ? <span className="badge badge-sm bg-gradient-secondary"> {article.status_acceptation}</span> : <span></span>}
                      {article.status_acceptation === "boutique" ? <span className=" text-danger"> -------</span> : <span></span>}
                      {article.status_acceptation == null ? <span className=" text-danger"> -------</span> : <span></span>}
                    </td>
                    <td className="align-middle text-center text-sm  font-weight-bold">
                      {article.date_depot === null ? <span className="text-primary ">----/--/--</span> : <span></span>}
                      {article.date_depot !== null ? <span className=" ">{formatDate(article.date_depot)}</span> : <span></span>}
                    </td>
                    <td className="align-middle text-center text-xs  font-weight-bold">
                      <a data-bs-toggle="modal"  href=""data-bs-target="#retour" type="button" onClick={() => modal(article)} >
                        {article.status_vendu === "Retour" ? <span className="text-dark ">Retour</span> : <span></span>}
                        {article.status_vendu === "Oui" ? <span className="text-success ">Vendu</span> : <span></span>}
                        {article.status_vendu === "Non" ? <span className="text-primary ">stock</span> : <span></span>}
                      </a>
                    </td>
                    <td className="align-middle text-center text-sm  font-weight-bold">
                      <span className="  text-dark "> $ {article.prix_vente_ttc ? (article.prix_vente_ttc).toFixed(3) : "0,000"}</span>
                    </td>
                    <td className="align-middle text-center text-sm  font-weight-bold">
                      {article.date_vendu === null ? <span className="text-primary ">----/--/--</span> : <span></span>}
                      {article.date_vendu !== null ? <span className=" ">{formatDate(article.date_vendu)}</span> : <span></span>}
                    </td>
                    <td className="align-middle text-center text-xs  font-weight-bold">
                      <a data-bs-toggle="modal"  data-bs-target="#tirer" type="button" onClick={() => modal(article)} >
                        {article.status_reversement === "Retour" ? <span className="text-dark ">Retour</span> : <span></span>}
                        {article.status_reversement === "Oui" ? <span className="text-success ">{article.status_vendu}</span> : <span></span>}
                        {article.status_reversement === null ? <span className="text-primary ">Non</span> : <span></span>}
                      </a>
                    </td>
                    <td className="align-middle text-center text-dark text-sm  font-weight-bold">
                      <span className=" ">$ {article.montant_reverser ? (article.montant_reverser).toFixed(3) : "0,000"}  </span>
                    </td>
                    <td className="align-middle text-center text-sm  font-weight-bold">
                      {article.date_reversement === null ? <span className="text-primary ">----/--/--</span> : <span></span>}
                      {article.date_reversement !== null ? <span className=" ">{formatDate(article.date_reversement)}</span> : <span></span>}
                    </td>
                    <td>
                      <a className="material-symbols-outlined" type="button" onClick={() => {
                        modal(article)
                        print()
                      }}>
                        <i className="material-icons opacity-10"> qr_code_2 </i>
                      </a>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="modal fade" id="code_a_barre" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog  modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <Barcode value={article._id} width={0.6} displayValue={false} height={30} marginLeft={20} background={'none'} />
            </div>
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
                    <a  data-bs-toggle="modal" data-bs-target="#profile" >
                      <img
                        className="w-60 min-height-250 max-height-250   border-radius-lg ms-2"
                        data-size="500x600"
                        src={article.image.length > 0 ? "http://localhost:4040/" + article.image[0].filename : "../../assets/img/image.png"}
                        style={{ padding: article.image.length > 0 ? ' 0%  ' : ' 12%', background: article.image.length > 0 ? '#transparent' : '#F5F5F5', marginTop: '-10%' }}
                      />
                    </a>
                    <div className="my-gallery d-flex mt-4 " itemScope itemType="http://schema.org/ImageGallery" data-pswp-uid={1} style={{ marginLeft: '8%' }}>
                      <figure style={{ marginLeft: '5%' }}>
                        <a >
                          <img
                            className="w-100 min-height-100 max-height-100 border-radius-lg "
                            src={article.image.length > 1 ? "http://localhost:4040/" + article.image[1].filename : "../../assets/img/image.png"}
                            alt="Image description"
                            loading="lazy"
                            style={{ padding: article.image.length > 1 ? ' 0%  ' : ' 20%', background: article.image.length > 1 ? '#transparent' : '#F5F5F5' }}
                          />
                        </a>
                      </figure>
                      <figure className="ms-3  " itemProp="associatedMedia" itemScope itemType="http://schema.org/ImageObject">
                        <a  itemProp="contentUrl" data-size="500x600">
                          <img
                            className="w-100 min-height-100 max-height-100 border-radius-lg "
                            src={article.image.length > 2 ? "http://localhost:4040/" + article.image[2].filename : "../../assets/img/image.png"}
                            alt="Image description"
                            loading="lazy"
                            style={{ padding: article.image.length > 2 ? ' 0%  ' : ' 20%', background: article.image.length > 2 ? '#transparent' : '#F5F5F5' }}
                          />
                        </a>
                      </figure>
                      <figure className="ms-3  " itemProp="associatedMedia" itemScope itemType="http://schema.org/ImageObject">
                        <a  itemProp="contentUrl" data-size="500x600">
                          <img
                            className="w-100 min-height-100 max-height-100 border-radius-lg "
                            src={article.image.length > 3 ? "http://localhost:4040/" + article.image[3].filename : "../../assets/img/image.png"}
                            alt="Image description"
                            loading="lazy"
                            style={{ padding: article.image.length > 3 ? ' 0%  ' : ' 20%', background: article.image.length > 3 ? '#transparent' : '#F5F5F5' }}
                          />
                        </a>
                      </figure>
                    </div>
                  </div>
                  <div className="col-lg-7">
                    <div className="about-text go-to">
                      <div className="row">
                        <div className="col-9">
                          {article.lib !== null ? <h3 className="dark-color text-start " style={{ marginTop: '6%' }}>{article.lib} </h3> : <h3></h3>}
                          {article.lib === "" ? <h3 className="dark-color text-start " style={{ marginTop: '6%' }}> article</h3> : <h3 ></h3>}
                          {article.lib === null ? <h3 className="dark-color text-start " style={{ marginTop: '6%' }}> article</h3> : <h3 ></h3>}
                        </div>
                      </div>
                      <div className="row about-list text-start" style={{ marginTop: '-2%' }}>
                        <div className="text-start " >
                          {article.etat === "Neuf" ? <span className="badge bg-gradient-primary ">{article.etat}</span> : <span></span>}
                          {article.etat === "Bon etat" ? <span className="badge bg-gradient-success ">{article.etat}</span> : <span></span>}
                          {article.etat === "Passable" ? <span className="badge bg-gradient-dark " >{article.etat}</span> : <span></span>}
                          {article.etat === "" ? <span className="badge  " style={{ backgroundColor: '#A1A1A1' }}>-------</span> : <span></span>}
                        </div>
                        <div className="col-md-3">
                          <div className="" style={{ width: '100%', fontSize: '1.2rem', fontWeight: '500', color: '#20247b' }}>
                            <span>
                              Réfeerence:
                            </span>
                            <span className="" style={{ fontWeight: '500', marginLeft: '10%', opacity: '70%' }}>
                              {article.ref}
                            </span>
                          </div>
                        </div>
                        <div className="col-md-1"></div>
                        <div className="col-md-3 ">
                          <div style={{ width: '100%', fontSize: '1.2rem', fontWeight: '500', color: '#20247b' }}>
                            <span style={{ width: '100%', fontSize: '1.2rem', fontWeight: '500', color: '#20247b' }}>Prix:   </span>
                            <span style={{ fontWeight: '500', marginLeft: '10%', opacity: '70%' }}>
                              $  {article.montant_reverser !== null ? (article.montant_reverser)?.toFixed(3) : "0.000"}
                            </span>
                          </div>
                        </div>
                        <div className="col-md-1"></div>
                        <div className="col-md-4 ">
                          <div style={{ width: '100%', fontSize: '1.2rem', fontWeight: '500', color: '#20247b' }}>
                            <span style={{ width: '100%', fontSize: '1.2rem', fontWeight: '500', color: '#20247b' }}>Date: </span>
                            <span style={{ fontWeight: '500', marginLeft: '10%', opacity: '70%' }}>
                              {article.date_depot !== null ? formatDate(article.date_depot) : "--/--/--"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div  >
                      <Barcode value={article._id} width={1.5} displayValue={false} height={60} marginTop={10} background={'none'} />
                    </div>
                    {
                      article.user_id !== null ?
                        <div className="" style={{ width: '100%', fontSize: '1.2rem', fontWeight: '500', color: '#20247b' }} aria-bs-label="Close" data-bs-dismiss="modal">
                          <Link to={`/deposant/profile/${deposant?._id}`}>
                            <span>
                              Déposant :
                            </span>
                            <span className="" style={{ fontWeight: '500', marginLeft: '2%', opacity: '70%' }}>
                              {deposant?.nom ? deposant?.nom : "flen"} {deposant?.prenom ? deposant?.prenom : "ben foulen"}
                            </span>
                          </Link>
                        </div>
                        : <div></div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="profile" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="exampleFormControlFile1">
                  <a aria-label="Close">
                    <h6 >Telecharger un photo depuis ce pc  </h6>
                  </a>
                  <input type="file" className="form-control-file" id="exampleFormControlFile1" style={{ display: 'none' }} data-bs-dismiss="modal" onChange={fileChange} multiple />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="retour" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="row">
                <div className="col-9">
                  <h6 >Êtes-vous sûr de retourner ce produit ? </h6>
                </div>
                <div className="col-3">
                  <span className="text-xs font-weight-bold">
                    <a className="avatar avatar-xs rounded-circle me-3" type="button" onClick={() => retour()} data-bs-dismiss="modal" aria-bs-label="Close" >
                      <img src="../../assets/img/accept.jpg" alt="team5" />
                    </a>
                  </span>
                  <span className="text-xs font-weight-bold">
                    <a className="avatar avatar-xs rounded-circle me-3" type="button" data-bs-dismiss="modal" aria-bs-label="Close">
                      <img src="../../assets/img/refuser.jpg" alt="team5" />
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="tirer" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="row">
                <div className="col-9">
                  <h6 >Êtes-vous sûr de retourner ce produit ? </h6>
                </div>
                <div className="col-3">
                  <span className="text-xs font-weight-bold">
                    <a className="avatar avatar-xs rounded-circle me-3" type="button" onClick={() => tirer()} data-bs-dismiss="modal" aria-bs-label="Close" >
                      <img src="../../assets/img/accept.jpg" alt="team5" />
                    </a>
                  </span>
                  <span className="text-xs font-weight-bold">
                    <a className="avatar avatar-xs rounded-circle me-3" type="button" data-bs-dismiss="modal" >
                      <img src="../../assets/img/refuser.jpg" alt="team5" />
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
