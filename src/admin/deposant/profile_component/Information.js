import React, { useContext } from 'react'
import { SocketContext } from '../../../context/socket';
import { upload_image_deposant } from '../../../store/deposantSlice';
import { useDispatch } from 'react-redux'

export default function Information(props) {

  const socket = useContext(SocketContext);
  const dispatch = useDispatch()
  const fileChange = e => {

    const image = new FormData() 
    image.append('image', e.target.files[0])
    const params={
      id:props.deposant._id,
      image:image
    }
    
    dispatch(upload_image_deposant(params)).then((action) => {
      socket.emit("mettre_a_jour_photo_de_profile")
      props.setDeposant(prevState => ({
        ...prevState,
        image:  action.payload.file.filename
      }))
    })
  }


  return (
    <div>
      <div className="container-fluid text-start" >
        <div className='card  gray-bg mb-4'>
          <div className="section about-section gray-bg" id="about">
            <div className="container">
              <div className="row align-items-start flex-row-reverse">
                <div className="col-lg-8">
                  <div className="about-text go-to">
                    <h3 className="dark-color text-start " style={{ marginLeft: '8%' }}>Profile déposant </h3>
                    <div className="row about-list text-start">
                      <div className="col-md-1"></div>
                      <div className="col-md-5">
                        <div className="media">
                          <label className="h5 w-40">Nom</label>
                          <p className='h6'>{props.deposant.nom ? props.deposant.nom : "Foulaine"}</p>
                        </div>
                        <div className="media">
                          <label className="h5 w-40">Prénom </label>
                          <p className='h6'>{props.deposant.prenom ? props.deposant.prenom : "Ben Foulaine"}</p>
                        </div>
                        <div className="media">
                          <label className="h5 w-40">Address</label>
                          <p className='h6'>{props.deposant.adress ? props.deposant.adress : "Rue ******, ***** "}</p>
                        </div>
                        <div className="media">
                          <label className="h5 w-40">Code postal</label>
                          <p className='h6'>{props.deposant.codepostal ? props.deposant.codepostal : "***"}</p>
                        </div>
                      </div>
                      <div className="col-5">
                        <div className="media">
                          <label className="h5 w-40">C.I.N</label>
                          <p className='h6'>{props.deposant.cin ? props.deposant.cin : "123*****"}</p>
                        </div>
                        <div className="media">
                          <label className="h5 w-40">Email</label>
                          <p className='h6'>{props.deposant.email ? props.deposant.email : "exemple@mail.com"}</p>
                        </div>
                        <div className="media">
                          <label className="h5 w-40">Telephone</label>
                          <p className='h6'>{props.deposant.telephone ? props.deposant.telephone : "+216 ** *** ***"}</p>
                        </div>
                        <div className="media">
                          <label className="h5 w-40">Date N</label>
                          <p className='h6'>{props.deposant.dateN ? props.deposant.dateN : "**/**/****"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="about-avatar"  >
                    <a href="#" data-bs-toggle="modal" data-bs-target="#profile" >
                      {
                        props.deposant.image ?
                          <img className="w-100 min-height-400 max-height-400 " src={process.env.REACT_APP_BASE_URL+"/"+props.deposant.image} />
                          :
                          <img className="w-100 min-height-400 max-height-400 " src="../../assets/img/s.jpg" />
                      }
                    </a>
                  </div>
                </div>
              </div>
              <div className="counter">
                <div className="row">
                  <div className="col-6 col-lg-3">
                    <div className="count-data text-center">
                      <h6 className="count h2" data-to={500} data-speed={500}>{props.nombre_article_deposer}</h6>
                      <p className="m-0px font-w-600">Article déposer </p>
                    </div>
                  </div>
                  <div className="col-6 col-lg-3">
                    <div className="count-data text-center">
                      <h6 className="count h2" data-to={150} data-speed={150}>{props.nombre_article_vendu}</h6>
                      <p className="m-0px font-w-600">Article vendu</p>
                    </div>
                  </div>
                  <div className="col-6 col-lg-3">
                    <div className="count-data text-center">
                      <h6 className="count h2" data-to={850} data-speed={850}>{(props.total_non_verser)?.toFixed(3)}  $ </h6>
                      <p className="m-0px font-w-600">Total non versé </p>
                    </div>
                  </div>
                  <div className="col-6 col-lg-3">
                    <div className="count-data text-center">
                      <h6 className="count h2" data-to={190} data-speed={190}> {(props.total)?.toFixed(3)}  $</h6>
                      <p className="m-0px font-w-600">Total </p>
                    </div>
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
                  <input type="file" className="form-control-file" id="exampleFormControlFile1" style={{ display: 'none' }} data-bs-dismiss="modal" onChange={fileChange} />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
