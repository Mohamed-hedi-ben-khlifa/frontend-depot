import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { useDispatch } from 'react-redux';
import { liste_des_articles_vendu_par_jours, liste_des_articles_vendu_par_mois } from '../../store/articleSlice';

export default function Statistique() {


    const d = new Date()
    const [revenu, setRevenu] = useState([])
    const [revenu_par_mois, setRevenu_par_mois] = useState([])
    const [jours, setJours] = useState([])
    const [mois, setMois] = useState([])
    const dispatch = useDispatch()

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        LineElement,
        PointElement,
        Title,
        Tooltip,
        Legend
    );


    useEffect(() => {

        for (let i = 0; i < 7; i++) {
            const date = new Date(d.getFullYear(), d.getMonth(), (d.getUTCDate() - (i + 1)))
            dispatch(liste_des_articles_vendu_par_jours(date)).then(action => {
                const r = action.payload.article?.map(article => article.prix_vente_ttc).reduce((prev, curr) => prev + curr, 0)
                setRevenu(revenu => [r, ...revenu])
               
            })
        }
    }, [])

    useEffect(() => {
        const date = new Date()
        for (let i = 0; i < 12; i++) {
            let x = date.getMonth() - (i - 1)
            if (x < 0) { x += 12 }
            dispatch(liste_des_articles_vendu_par_mois(x)).then(action => {
                const r = action.payload.article?.map(article => article.prix_vente_ttc).reduce((prev, curr) => prev + curr, 0)
                setRevenu_par_mois(revenu_par_mois => [r, ...revenu_par_mois])
                
            })
        }
    }, [])

    useEffect(() => {
        const date = new Date()
        const weekday = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]
        for (let i = 0; i < 7; i++) {
            let x = date.getDay() - (i + 1)
            if (x < 0) { x += 7 }
            setJours(jours => [weekday[x], ...jours])
        }
    }, [])


    useEffect(() => {
        const date = new Date()
        const weekday = ["Fev", "Mar", "Avr", "May", "Jun", "Jul", "Out", "Sep", "Oct", "Nov", "Des", "Jan"]
        for (let i = 0; i < 12; i++) {
            let x = date.getMonth() - (i + 1)
            if (x < 0) { x += 12 }
            setMois(mois => [weekday[x], ...mois])
        }
    }, [])


    const options = {

        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            }
        },
        interaction: {
            intersect: false,
            mode: 'index',
        },
        scales: {
            y: {
                grid: {
                    drawBorder: false,
                    display: true,
                    drawOnChartArea: true,
                    drawTicks: false,
                    borderDash: [5, 5],
                    color: 'rgba(255, 255, 255, .2)'
                },
                ticks: {
                    display: true,
                    color: '#f8f9fa',
                    padding: 10,
                    font: {
                        size: 14,
                        weight: 300,
                        family: "Roboto",
                        style: 'normal',
                        lineHeight: 2
                    },
                }
            },
            x: {
                grid: {
                    drawBorder: false,
                    display: false,
                    drawOnChartArea: false,
                    drawTicks: false,
                    borderDash: [5, 5]
                },
                ticks: {
                    display: true,
                    color: '#f8f9fa',
                    padding: 10,
                    font: {
                        size: 14,
                        weight: 300,
                        family: "Roboto",
                        style: 'normal',
                        lineHeight: 2
                    },
                }
            },
        },
    }


    const data = {
        labels: jours,
        datasets: [{
            label: "Sales",
            tension: 0.4,
            borderWidth: 0,
            borderRadius: 4,
            borderSkipped: false,
            backgroundColor: "rgba(255, 255, 255, .8)",
            data: revenu,
            maxBarThickness: 6
        },],
    };

    const data_revenu_par_mois = {
        labels: mois,
        datasets: [{
            label: "Sales",
            tension: 0.4,
            borderWidth: 0,
            borderRadius: 4,
            borderSkipped: false,
            backgroundColor: "rgba(255, 255, 255, .8)",
            data: revenu_par_mois,
            maxBarThickness: 6
        },],
    }


    return (

        <div>
            <div className="row">
                <div className="col-lg-6 col-md-6 mt-4 mb-4">
                    <div className="card z-index-2 ">
                        <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
                            <div className="bg-gradient-dark shadow-dark border-radius-lg py-3 pe-1">
                                <div className="chart" >
                                    <Bar options={options} data={data} />
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <h6 className="mb-0 ">Revenu par jour</h6>
                            <p className="text-sm ">Chiffre d'affaires par jour</p>
                            <hr className="dark horizontal" />
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 mt-4 mb-4">
                    <div className="card z-index-2  ">
                        <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
                            <div className=" shadow-secondary border-radius-lg py-3 pe-1" style={{ backgroundColor: '#6d6d6d' }}>
                                <div className="chart">
                                    <Bar options={options} data={data_revenu_par_mois} />
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <h6 className="mb-0 "> Revenu par mois </h6>
                            <p className="text-sm ">Chiffre d'affaires par mois </p>
                            <hr className="dark horizontal" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
