import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addNotifications } from '../../store/notificationSlice'

import Barcode from 'react-barcode';
import { liste_des_articles_en_attente, liste_des_article_en_attente } from '../../store/articleSlice'

export default function Liste_des_articles_en_attente() {


  const dispatch = useDispatch()

  const [articles, setArticles] = useState([])
  const [article, setArticle] = useState([])
  const [nombre_article_en_attente, setNombre_article_en_attente] = useState(0)

  useEffect(() => {

    dispatch(liste_des_articles_en_attente()).then(action => {
      setNombre_article_en_attente(action.payload.article.length)
      setArticles(action.payload.article)
    })

  }, [, dispatch])



  const accepter = async (id) => {
    await axios.patch('http://localhost:4040/Article/accepter/' + id)

    dispatch(liste_des_articles_en_attente()).then(action => {
      setNombre_article_en_attente(action.payload.article.length)
      setArticles(action.payload.article)
      new_notification(id)
    })


  }

  async function refuser(id) {
    await axios.patch('http://localhost:4040/Article/refuser/' + id)
    dispatch(liste_des_articles_en_attente()).then(action => {
      setNombre_article_en_attente(action.payload.article.length)
      setArticles(action.payload.article)
      new_notification(id)
    })
  }

  async function new_notification(id) {

    const resp = await axios.get('http://localhost:4040/Article/ref/' + id)
    const article = await resp.data.article[0]
    console.log(resp)


    axios.get('http://localhost:4040/User/' + article.user_id).then(
      async (resp) => {

        let notification = {
          article: article,
          user: resp.data.deposant,
          body: "Vous avez un Rendez_vous"
        }
        await dispatch(addNotifications(notification))

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
    console.log(article)
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


        <div className="card mt-4">
          <div className="card-body px-0 pb-2 m-4">
            <div className="table" style={{ marginLeft: '10%', width: '80%' }}>
              <table className="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">déposantnt</th>
                    <th className=" text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Lib.article</th>
                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Réf.article</th>
                    <th className=" text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Etat</th>
                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Prix </th>
                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Date dépot article</th>
                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {articles?.map((article, index) =>
                    <tr key={index}>

                      <td>

                        <div className="d-flex px-2 py-1">
                          <div>
                            <a href="" className="avatar avatar-xs rounded-circle me-3" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Romina Hadid">
                              <img src="../../assets/img/team-2.jpg" alt="team5" />
                            </a>
                          </div>
                          <a href="#" onClick={() => afficher(article)} data-bs-toggle="modal" data-bs-target="#article">
                            <div className="d-flex flex-column justify-content-center">
                              <h6 className="mb-0 text-sm ">Mohamed Ben khlifa</h6>
                            </div>
                          </a>
                        </div>

                      </td>

                      <td className="align-middle text-center text-sm " style={{ marginLeft: '-10%' }}>
                        <h6 className="mb-0 text-sm ">{article.lib === "" ? <span className="text-xs text-dark font-weight-bold">Article</span> : <span className="text-xs text-dark font-weight-bold">{article.lib}</span>}</h6>
                      </td>
                      <td className="align-middle text-center text-sm " >
                        <span className="text-xm text-center text-primary font-weight-bold" > {article.ref}</span>
                      </td>
                      <td className="align-middle text-center text-sm " style={{ marginLeft: '-10%' }}>
                        {article.etat === "Neuf" ? <span className="text-xs text-primary font-weight-bold">{article.etat}</span> : <span></span>}
                        {article.etat === "Bon etat" ? <span className="text-xs text-success font-weight-bold">{article.etat}</span> : <span></span>}
                        {article.etat === "Passable" ? <span className="text-xs text-dark font-weight-bold">{article.etat}</span> : <span></span>}
                        {article.etat === "" ? <span className="text-xs text-dark font-weight-bold">--------</span> : <span></span>}
                      </td>
                      <td className="align-middle text-center text-sm">
                        <span className="text-xm  text-primary  font-weight-bold"> $ {article.montant_reversement} </span>
                      </td>
                      <td className="align-middle text-center text-sm " style={{ marginLeft: '-10%' }}>
                        <span className="text-xs text-dark font-weight-bold"> {formatDate(article.date_depot)}</span>
                      </td>
                      <td className="align-middle text-center text-sm">
                        <span className="text-xs font-weight-bold">
                          <a className="avatar avatar-xs rounded-circle me-3" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Romina Hadid" onClick={() => accepter(article._id)}>
                            <img src="../../assets/img/accept.jpg" alt="team5" />
                          </a>
                        </span>
                        <span className="text-xs font-weight-bold">
                          <a className="avatar avatar-xs rounded-circle me-3" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Romina Hadid" onClick={() => refuser(article._id)}>
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
      <div className="modal fade" id="article" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ marginLeft: "7%" }} >
        <div className="modal-dialog modal-dialog-centered modal-xl" >
          <div className="modal-content" style={{ height:"280px" }}>
            <div className="modal-body" >
              <div className="container" style={{ marginBottom: '-9%', marginTop: '-3%', }}>
                <div className="row flex-row">
                  <div className="col-lg-5">
                    <a href="#" data-bs-toggle="modal" data-bs-target="#profile" >

                      <img
                        className="w-60 min-height-250 max-height-250   border-radius-lg ms-2"
                        data-size="500x600"
                        src={article.image?.length> 0 ? "http://localhost:4040/" + article.image[0].filename : "../../assets/img/image.png" }
                        style={{ padding: article.image?.length> 0 ?   ' 0%  '  :' 12%', background: article.image?.length> 0 ?   '#transparent'  :'#F5F5F5' , marginTop:'-10%'  }}
                      />

                    </a>
                    <div className="my-gallery d-flex mt-4 " itemScope itemType="http://schema.org/ImageGallery" data-pswp-uid={1} style={{ marginLeft: '8%' }}>

                      <figure style={{ marginLeft: '5%' }}>
                        <a href="../assets/img/examples/product3.png" >

                          <img
                            className="w-100 min-height-100 max-height-100 border-radius-lg "
                            src={article.image?.length> 1 ?  "http://localhost:4040/" + article.image[1].filename: "../../assets/img/image.png" }
                            alt="Image description"
                            loading="lazy"
                            style={{ padding: article.image?.length> 1 ?   ' 0%  '  :' 20%', background: article.image?.length> 1 ?   '#transparent'  :'#F5F5F5'   }}
                          />


                        </a>
                      </figure>


                      <figure className="ms-3  " itemProp="associatedMedia" itemScope itemType="http://schema.org/ImageObject">
                        <a href="../assets/img/examples/product4.jpg" itemProp="contentUrl" data-size="500x600">

                          <img
                            className="w-100 min-height-100 max-height-100 border-radius-lg "
                            src={article.image?.length> 2 ? "http://localhost:4040/" + article.image[2].filename: "../../assets/img/image.png" }
                            alt="Image description"
                            loading="lazy"
                            style={{ padding: article.image?.length> 2 ?   ' 0%  '  :' 20%', background: article.image?.length> 2 ?   '#transparent'  :'#F5F5F5'   }}
                          />
                        </a>
                      </figure>
                      <figure className="ms-3  " itemProp="associatedMedia" itemScope itemType="http://schema.org/ImageObject">
                        <a href="../assets/img/examples/product4.jpg" itemProp="contentUrl" data-size="500x600">

                          <img
                            className="w-100 min-height-100 max-height-100 border-radius-lg "
                            src={article.image?.length> 3? "http://localhost:4040/" + article.image[3].filename : "../../assets/img/image.png" }
                            alt="Image description"
                            loading="lazy"
                            style={{ padding: article.image?.length> 3 ?   ' 0%  '  :' 20%', background: article.image?.length> 3 ?   '#transparent'  :'#F5F5F5'   }}
                          />
                        </a>
                      </figure>


                    </div>

                  </div>
                  <div className="col-lg-7">
                    <div className="about-text go-to">

                      <div className="row">
                        <div className="col-9">

                          {article.lib === null ? <h3 className="dark-color text-start " style={{ marginTop: '10%' }}>{article.lib} </h3> : <h3 className="dark-color text-start " style={{ marginTop: '10%' }}>article</h3>}
                        </div>

                      </div>





                      <div className="row about-list text-start">
                        <div className="text-start mt-2" >
                          {article.etat === "Neuf" ? <span className="badge bg-gradient-primary font-weight-bold">{article.etat}</span> : <span></span>}
                          {article.etat === "Bon etat" ? <span className="badge bg-gradient-success font-weight-bold">{article.etat}</span> : <span></span>}
                          {article.etat === "Passable" ? <span className="badge bg-gradient-dark font-weight-bold" >{article.etat}</span> : <span></span>}
                          {article.etat === "" ? <span className="badge  font-weight-bold" style={{ backgroundColor:'#A1A1A1'}}>-------</span> : <span></span>}
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
                              $  {article.montant_reverser !== null ? (article.montant_reverser) : (0)},000
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
                      <Barcode value={article._id} width={1.5} displayValue={false} height={60} marginTop={30} background={'none'} />
                    </div>

                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>


    </div>
  )
}

