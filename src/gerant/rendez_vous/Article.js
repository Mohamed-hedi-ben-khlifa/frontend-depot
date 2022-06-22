import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch} from 'react-redux'
import { liste_des_article_en_attente, recherche_article_par_id } from '../../store/articleSlice'
import { addNotifications } from '../../store/notificationSlice'

export default function Article(props) {


    const [id] = useState(props.id)
    
    const dispatch = useDispatch()
    const [article, setArticle] = useState({date_depot: "",
                                            date_reversement: null,
                                            date_vendu: null,
                                            description: "",
                                            etat: "",
                                            image: "",
                                            lib: "",
                                            montant_reverser: null,
                                            prix_vente_ttc: null,
                                            ref: null,
                                            status_acceptation: "",
                                            status_reversement: null,
                                            status_vendu: "",
                                            user_id: ""
                                        })

    useEffect (() => {

        dispatch(recherche_article_par_id(id)).then(action => setArticle(action.payload.article))
       console.log(id)
  
  }, [dispatch])

  async function accepter(id) {
    await axios.patch('http://localhost:4040/Article/accepter/' + id)

    
   

  }

  async function refuser(id) {
    await axios.patch('http://localhost:4040/Article/refuser/' + id)
   
  }

 

 function  formatDate(date) {
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

                {article? 
                
                <div className="card  mt-4 ">
                <div className="section  ">
                    <div className="container" style={{ marginBottom: '-9%', marginTop: '-3%'}}>
                        <div className="row flex-row">
                            <div className="col-lg-5">
                                <img className="w-90   border-radius-lg ms-2" data-size="500x600" src="../../assets/img/nike2.jpg"  style={{ height: '70%' }} />
                                <div className="my-gallery d-flex mt-4 " itemScope itemType="http://schema.org/ImageGallery" data-pswp-uid={1} style={{ marginLeft: '8%' }}>

                                    <figure  style={{ marginLeft: '-8%' }}>
                                        <a href="../assets/img/examples/product3.png" >
                                            <img className="w-100 min-height-100 max-height-100 border-radius-lg " src="../../assets/img/nike.jpg" alt="Image description" loading="lazy"  />
                                        </a>
                                    </figure>
                                    <figure className="ms-3  ml-4 " itemProp="associatedMedia" itemScope itemType="http://schema.org/ImageObject">
                                        <a href="../assets/img/examples/product1.jpg" itemProp="contentUrl" data-size="500x600">
                                            <img className="w-120 min-height-100 max-height-100 border-radius-lg" src="../../assets/img/nike2.jpg" itemProp="thumbnail" alt="Image description" loading="lazy" />
                                        </a>
                                    </figure>
                                    <figure className="ms-3  " itemProp="associatedMedia" itemScope itemType="http://schema.org/ImageObject">
                                        <a href="../assets/img/examples/product4.jpg" itemProp="contentUrl" data-size="500x600">
                                            <img className="w-100 min-height-100 max-height-100 border-radius-lg" src="../../assets/img/nike.jpg" itemProp="thumbnail" alt="Image description" loading="lazy" />
                                        </a>
                                    </figure>
                                    <figure className="ms-3  " itemProp="associatedMedia" itemScope itemType="http://schema.org/ImageObject">
                                        <a href="../assets/img/examples/product4.jpg" itemProp="contentUrl" data-size="500x600">
                                            <img className="w-100 min-height-100 max-height-100 border-radius-lg" src="../../assets/img/nike2.jpg" itemProp="thumbnail" alt="Image description" loading="lazy" />
                                        </a>
                                    </figure>
                                    <figure className="ms-3  " itemProp="associatedMedia" itemScope itemType="http://schema.org/ImageObject">
                                        <a href="../assets/img/examples/product4.jpg" itemProp="contentUrl" data-size="500x600">
                                            <img className="w-100 min-height-100 max-height-100 border-radius-lg" src="../../assets/img/nike2.jpg" itemProp="thumbnail" alt="Image description" loading="lazy" />
                                        </a>
                                    </figure>


                                </div>

                            </div>
                            <div className="col-lg-7">
                                <div className="about-text go-to">

                                    <div className="row">
                                        <div className="col-9">
                                        <h3 className="dark-color text-start " style={{ marginLeft: '8%',marginTop: '10%'}}>Basket Nike{article.lib} </h3> <span> </span>
                                        </div>
                                        <div className="col-3">
                                        <span className="text-xs font-weight-bold">
                                                <a href="#s" onClick={() => accepter(article._id)}>
                                                <img className="w-40 min-height-10 max-height-10 border-radius-lg"  src="../../assets/img/accept.jpg" alt="team5" style={{ marginTop:'36%'}}/>
                                                </a>
                                            </span>
                                           
                                            <span className="text-xs font-weight-bold">
                                                <a href="#s" onClick={() => refuser(article._id)}>
                                                <img className="w-40 min-height-10 max-height-10 border-radius-lg"  src="../../assets/img/refuser.jpg" alt="team5" style={{ marginTop:'36%'}}/>
                                                </a>
                                            </span>
                                          
                                            </div>
                                    </div>





                                    <div className="row about-list text-start">
                                        <div className="text-start" >
                                            <span class="badge bg-gradient-success  mb-4 text-tiny" style={{ maxWidth: '120%', marginLeft: '8%' }}>Neuf{article.etat}</span>
                                        </div>

                                       
                                        <div className="col-md-1"></div>
                                        <div className="col-md-3 mt-4">

                                            <div className="">
                                                <p style={{ width: '100%', fontSize: '1.2rem', fontWeight: '500', marginTop: '5%', color: '#20247b' }}>Réfeerence </p>
                                                <p> {article.prix_achat}  $ 
                                                    <span className="" style={{  fontWeight: '500' , marginLeft: '10%' ,opacity:'70%'}}>
                                                        {article.ref}
                                                    </span>
                                                </p>
                                                
                                            </div>



                                        </div>
                                        <div className="col-md-1"></div>
                                        <div className="col-md-3 mt-4">


                                            <div className="">
                                                <p style={{ width: '100%', fontSize: '1.2rem', fontWeight: '500', marginTop: '5%', color: '#20247b' }}>Prix  </p>
                                                <p> {article.prix_vente_ttc} $
                                               
                                                </p>
                                            </div>

                                        </div>
                                        <div className="col-md-1"></div>
                                        <div className="col-md-3 mt-4">
                                            <div className="">
                                                <p style={{ width: '100%', fontSize: '1.2rem', fontWeight: '500', marginTop: '5%', color: '#20247b' }}>Date</p>
                                                <p>  

                                                <span className="text-primary"  style={{  fontWeight: '500', color: '#20247b' , marginLeft: '10%' ,opacity:'70%'}}>
                                                {article.date_reversement !== null ? formatDate(article.date_reversement) : "--/--/--" }
                                                      
                                                    </span>
                                                </p>
                                            </div>




                                        </div>
                                    </div>
                                </div>



                                <img className="w-40  " src="../../assets/img/Barcode-PNG-Image.png" alt="ladydady" loading="lazy" style={{marginLeft:'26%' ,marginTop:'"36%'}} />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            :<div></div>}
            </div>


    )
}

