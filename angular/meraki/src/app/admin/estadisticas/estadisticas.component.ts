import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { AdminService } from 'src/services/admin/admin.service';

@Component({
    selector: 'app-estadisticas',
    templateUrl: './estadisticas.component.html',
    styleUrls: ['../sb-admin-2.css', './estadisticas.component.css'],
})
export class EstadisticasComponent implements OnInit {
    myLineChart: any;
    myBarChart: any;
    myPieChart: any;

    dias = [
        'Lunes',
        'Martes',
        'Miercoles',
        'Jueves',
        'Viernes',
        'Sabado',
        'Domingo',
    ];
    constructor(private _adminService: AdminService, private _router: Router) {
        this.cargarJSONBar();
        this.cargarJsonPie();
    }

    ngOnInit(): void {
        this.cargarJSONLine(this.getFirstDayOfWeek(new Date()));
    }

    cargarJSONLine = (dia: string) => {
        this._adminService.getVentasSemanales({ fecha: dia }).subscribe(
            (semana) => {
                let ventas = [];
                for (let d of this.dias) {
                    ventas.push(parseInt(semana[d]));
                }
                this.myLineChart = new Chart('myAreaChart', {
                    type: 'line',
                    data: {
                        labels: this.dias,
                        datasets: [
                            {
                                label: 'Earnings',
                                lineTension: 0.1,
                                backgroundColor: 'rgba(78, 115, 223, 0.05)',
                                borderColor: '#192D36',
                                pointRadius: 3,
                                pointBackgroundColor: '#192D36',
                                pointBorderColor: '#192D36',
                                pointHoverRadius: 3,
                                pointHoverBackgroundColor: 'darkorange',
                                pointHoverBorderColor: 'darkorange',
                                pointHitRadius: 10,
                                pointBorderWidth: 2,
                                data: ventas,
                            },
                        ],
                    },
                    options: {
                        maintainAspectRatio: false,
                        layout: {
                            padding: {
                                left: 10,
                                right: 25,
                                top: 25,
                                bottom: 0,
                            },
                        },
                        scales: {
                            xAxes: [
                                {
                                    gridLines: {
                                        display: false,
                                        drawBorder: false,
                                    },
                                    ticks: {
                                        maxTicksLimit: 7,
                                    },
                                },
                            ],
                            yAxes: [
                                {
                                    ticks: {
                                        maxTicksLimit: 5,
                                        padding: 10,
                                        // Include a dollar sign in the ticks
                                        callback: function (
                                            value: any,
                                            index: any,
                                            values: any
                                        ) {
                                            return '$' + value;
                                        },
                                    },
                                    gridLines: {
                                        color: 'rgb(234, 236, 244)',
                                        zeroLineColor: 'rgb(234, 236, 244)',
                                        drawBorder: false,
                                        borderDash: [2],
                                        zeroLineBorderDash: [2],
                                    },
                                },
                            ],
                        },
                        legend: {
                            display: false,
                        },
                        tooltips: {
                            backgroundColor: 'rgb(255,255,255)',
                            bodyFontColor: '#858796',
                            titleMarginBottom: 10,
                            titleFontColor: '#6e707e',
                            titleFontSize: 14,
                            borderColor: '#dddfeb',
                            borderWidth: 1,
                            xPadding: 15,
                            yPadding: 15,
                            displayColors: false,
                            intersect: false,
                            mode: 'index',
                            caretPadding: 10,
                            callbacks: {
                                label: function (tooltipItem, chart) {
                                    var datasetLabel =
                                        chart.datasets![
                                            tooltipItem.datasetIndex!
                                        ].label || '';
                                    return (
                                        datasetLabel +
                                        ': $' +
                                        tooltipItem.yLabel
                                    );
                                },
                            },
                        },
                    },
                });
            },
            (err) => {
                this._router.navigate(['/login']);
            }
        );
    };

    cargarJSONBar = () => {
        fetch('assets/json/ventasMens.json')
            .then((response) => response.json())
            .then((datos) => {
                let meses = [];
                let ventas = [];
                for (let d of datos) {
                    meses.push(d['mes']);
                    ventas.push(parseInt(d['venta']));
                }
                this.myBarChart = new Chart('myBarChart', {
                    type: 'bar',
                    data: {
                        labels: meses,
                        datasets: [
                            {
                                label: 'Revenue',
                                backgroundColor: '#418791',
                                hoverBackgroundColor: '#418791',
                                borderColor: '#418791',
                                data: ventas,
                                maxBarThickness: 25,
                            },
                        ],
                    },
                    options: {
                        maintainAspectRatio: false,
                        layout: {
                            padding: {
                                left: 0,
                                right: 10,
                                top: 25,
                                bottom: 0,
                            },
                        },
                        scales: {
                            xAxes: [
                                {
                                    time: {
                                        unit: 'month',
                                    },
                                    gridLines: {
                                        display: false,
                                        drawBorder: false,
                                    },
                                    ticks: {
                                        maxTicksLimit: 12,
                                    },
                                },
                            ],
                            yAxes: [
                                {
                                    ticks: {
                                        min: 0,
                                        max: 1500,
                                        maxTicksLimit: 5,
                                        padding: 10,
                                        // Include a dollar sign in the ticks
                                        callback: function (
                                            value,
                                            index,
                                            values
                                        ) {
                                            return '$' + value;
                                        },
                                    },
                                    gridLines: {
                                        color: 'rgb(234, 236, 244)',
                                        zeroLineColor: 'rgb(234, 236, 244)',
                                        drawBorder: false,
                                        borderDash: [2],
                                        zeroLineBorderDash: [2],
                                    },
                                },
                            ],
                        },
                        legend: {
                            display: false,
                        },
                        tooltips: {
                            titleMarginBottom: 10,
                            titleFontColor: '#6e707e',
                            titleFontSize: 14,
                            backgroundColor: 'rgb(255,255,255)',
                            bodyFontColor: '#858796',
                            borderColor: '#dddfeb',
                            borderWidth: 1,
                            xPadding: 15,
                            yPadding: 15,
                            displayColors: false,
                            caretPadding: 10,
                            callbacks: {
                                label: function (tooltipItem, chart) {
                                    var datasetLabel =
                                        chart.datasets![
                                            tooltipItem.datasetIndex!
                                        ].label || '';
                                    return (
                                        datasetLabel +
                                        ': $' +
                                        tooltipItem.yLabel
                                    );
                                },
                            },
                        },
                    },
                });
            });
    };

    cargarJsonPie = () => {
        fetch('assets/json/ventaCat.json')
            .then((response) => response.json())
            .then((json) => {
                let porcentajes = [];
                let categorias = [
                    'Navidad',
                    'Camisetas',
                    'Regalos',
                    'Jarros',
                    'Sueters',
                    'Otros',
                ];
                for (let cat of categorias) {
                    let valor = json['categorias'][cat];
                    porcentajes.push(parseInt(valor));
                }
                this.myPieChart = new Chart('myPieChart', {
                    type: 'pie',
                    data: {
                        labels: categorias,
                        datasets: [
                            {
                                data: porcentajes,
                                backgroundColor: [
                                    '#9D1515',
                                    '#D40A18',
                                    '#F1441C',
                                    '#FE761E',
                                    '#3A778A',
                                    '#192D36',
                                ],
                                hoverBackgroundColor: [
                                    '#890d0d',
                                    '#bf0713',
                                    '#e53a14',
                                    '#e86819',
                                    '#2b6272',
                                    '#132730',
                                ],
                                hoverBorderColor: 'rgba(234, 236, 244, 1)',
                            },
                        ],
                    },
                    options: {
                        maintainAspectRatio: false,
                        tooltips: {
                            backgroundColor: 'rgb(255,255,255)',
                            bodyFontColor: '#858796',
                            borderColor: '#dddfeb',
                            borderWidth: 1,
                            xPadding: 15,
                            yPadding: 15,
                            displayColors: false,
                            caretPadding: 10,
                        },
                        legend: {
                            display: false,
                        },
                        cutoutPercentage: 0,
                    },
                });
            });
    };

    getFirstDayOfWeek(curr: Date): string {
        if (curr.getDay() == 0) {
            curr.setDate(curr.getDate() - 6);
        } else {
            curr.setDate(curr.getDate() - curr.getDay() + 1);
        }
        let month =
            curr.getMonth() < 9
                ? '0' + (curr.getMonth() + 1)
                : curr.getMonth() + 1;
        let day = curr.getDate() < 10 ? '0' + curr.getDate() : curr.getDate();
        let stringCurr = curr.getFullYear() + '-' + month + '-' + day;
        return stringCurr;
    }

    cambiarSemana() {
        let week: any = document.getElementById('date');
        let date = new Date(week.value);
        date.setHours(date.getHours() + 5);
        let strDate = this.getFirstDayOfWeek(date);
        this.cargarJSONLine(strDate);
    }
}
