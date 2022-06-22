import React, { useContext, useEffect, useState } from 'react'
import { isSameDay } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { Calendar } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'
import parseISO from 'date-fns/parseISO'
import { useDispatch } from 'react-redux'
import { liste_des_rendez_vous, rechercher_liste_des_rendez_vous_par_date } from '../../store/rendez_vousSlice'
import { SocketContext } from '../../context/socket';
import { rechercher_deposant_par_id } from '../../store/deposantSlice'
import { recherche_article_par_id } from '../../store/articleSlice'
import { Link } from 'react-router-dom'


export default function Calendrier() {

    const dispatch = useDispatch()
    const [dates, setDates] = useState([])
    const [selectedDates, setSelectedDates] = useState([])
    const [liste_des_rendez_vouss, setliste_des_rendez_vous] = useState([])
    const [liste_des_rendez_vous_par_date, setliste_des_rendez_vous_par_date] = useState([])
    const [rendez_vous, setRendez_vous] = useState([])


    const modifiers = { selected: date => selectedDates.some(selectedDate => isSameDay(selectedDate, date)) }

    const handleDayClick = date => {

        setRendez_vous([])
        const selectedDate = new Date(date)
        dispatch(rechercher_liste_des_rendez_vous_par_date(selectedDate)).then(action => { setliste_des_rendez_vous_par_date(action.payload.rendez_vous) })
    }

    useEffect(() => { liste_des_rendez_vous_par_date?.map(rendez_vous => { selectedDay(rendez_vous) }) }, [liste_des_rendez_vous_par_date])

    const selectedDay = rendezVous => {

        dispatch(rechercher_deposant_par_id(rendezVous.user_id)).then(actions => {
            dispatch(recherche_article_par_id(rendezVous.article_id)).then(action => {
                setRendez_vous(rendez_vous => [...rendez_vous, {
                    date: rendezVous.date,
                    deposant: actions.payload.deposant,
                    article: action.payload.article[0]
                }])
            })
        })
    }

    const socket = useContext(SocketContext);
    useEffect(() => {
        socket.on("liste_des_rendez_vous", () => {
            dispatch(liste_des_rendez_vous()).then(action => {
                setliste_des_rendez_vous(action.payload.rendez_vous)
            })
        })
    }, [socket])

    useEffect(() => {
        dispatch(liste_des_rendez_vous()).then(action => {
            setliste_des_rendez_vous(action.payload.rendez_vous)
        })
    }, [])


    useEffect(() => {

        for (let i = 0; i < liste_des_rendez_vouss?.length; i++) {
            const date = parseISO(liste_des_rendez_vouss[i].date)
            const d = new Date(date.getFullYear(), date.getMonth(), date.getUTCDate())
            setDates(dates => [...dates, d])
            setSelectedDates(dates)
        }


    }, [liste_des_rendez_vouss])

    useEffect(() => { setSelectedDates(dates) }, [dates])

    function formatTime(date) {
        var d = new Date(date),
            h = d.getHours(),
            m = d.getMinutes()
        return [h > 9 ? "" + h : "0" + h, m > 9 ? "" + m : "0" + m].join(':');

    }

    return (
        <div>
            {rendez_vous.length > 0 ?
                <div className="card mt-2">
                    {rendez_vous?.map((rendez_vous) =>
                        <Link to={`/deposant/profile/${rendez_vous.deposant._id}`}>
                            <div className="d-flex px-2 py-1">
                                <h6 className="text-primary text-sm" style={{ marginLeft: '8%', marginRight: '4%' }}>
                                    {formatTime(rendez_vous.date)} :
                                </h6>
                                <div className="avatar avatar-xs rounded-circle me-3" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Romina Hadid">
                                    {
                                        rendez_vous.deposant?.image ?
                                            <img src={rendez_vous.deposant?.image} alt="team5" />
                                            : <img src="../assets/img/marie.jpg" alt="team5" />
                                    }
                                </div>
                                <h6 className="mb-0 text-sm ">
                                    {!rendez_vous.deposant?.nom && !rendez_vous.deposant?.prenom ? "Flen Ben Foulen " : rendez_vous.deposant?.prenom + " " + rendez_vous.deposant?.nom},
                                </h6>
                                <h6 className="mb-0 text-sm text-dark" style={{ marginLeft: '2%' }}>
                                    Tel :
                                </h6>
                                <h6 className="mb-0 text-sm opacity-9" style={{ marginLeft: '2%' }}>
                                    + 216 {!rendez_vous.deposant?.telephone ? " ** *** ***" : rendez_vous.deposant?.telephone}
                                </h6>
                            </div>
                        </Link>
                    )}
                </div>
                : <div></div>
            }
            <div className="card mt-2">
                <Calendar onDayClick={handleDayClick} modifiers={modifiers} locale={enGB} />
            </div>
        </div >
    )
}
