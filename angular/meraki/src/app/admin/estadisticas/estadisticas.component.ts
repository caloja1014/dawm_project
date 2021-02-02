import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { AdminService } from 'src/services/admin/admin.service';
import { CategService } from 'src/services/categories/categ.service';

@Component({
    selector: 'app-estadisticas',
    templateUrl: './estadisticas.component.html',
    styleUrls: ['../sb-admin-2.css', './estadisticas.component.css'],
})
export class EstadisticasComponent implements OnInit {
    myLineChart!: Chart;
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

    categorias: any = [];

    constructor(
        private _adminService: AdminService,
        private _router: Router,
        private catServ: CategService
    ) {
        this.cargarCategorias();
    }

    ngOnInit(): void {
        let firstDay = this.getFirstDayOfWeek(new Date());
        let inputDate: any = document.getElementById('date');
        inputDate.value = firstDay;

        this.cargarJSONLine(firstDay);
        this.cargarJSONBar(this.categorias[0]);
        this.cargarJsonPie();
    }
    cargarCategorias() {
        this.catServ.obtenerCategorias().subscribe(
            (res) => {
                console.log(res);
                this.categorias = res;
            },
            (err) => {
                console.log(err);
            }
        );
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

    cargarJSONBar = (categoria: string) => {
        this._adminService.getVentasAnuales(categoria).subscribe((datos) => {
            let meses = [];
            let ventas = [];
            let keys = Object.keys(datos);
            for (let d of keys) {
                meses.push(d);
                ventas.push(parseInt(datos[d]));
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
                                    callback: function (value, index, values) {
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
                                    chart.datasets![tooltipItem.datasetIndex!]
                                        .label || '';
                                return (
                                    datasetLabel + ': $' + tooltipItem.yLabel
                                );
                            },
                        },
                    },
                },
            });
        });
    };

    cargarJsonPie = () => {
        this._adminService.getVentasCategorias().subscribe(
            (data) => {
                console.log(data);
                let porcentajes = [];
                let categorias = Object.keys(data);
                console.log(categorias);

                for (let cat of categorias) {
                    let valor = data[cat];
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
                                    '#9D3515',
                                ],
                                hoverBackgroundColor: [
                                    '#890d0d',
                                    '#bf0713',
                                    '#e53a14',
                                    '#e86819',
                                    '#2b6272',
                                    '#132730',
                                    '#9D3415',
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
            },
            (err) => {
                this._router.navigate(['/login']);
            }
        );
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

    formatDate(date: Date) {}
    cambiarSemana() {
        let week: any = document.getElementById('date');
        let date = new Date(week.value);
        date.setHours(date.getHours() + 5);
        let strDate = this.getFirstDayOfWeek(date);
        this.myLineChart.destroy();
        this.cargarJSONLine(strDate);
    }

    cambiarCategoria(event: any) {
        let categoria: any = document.getElementById('categoria');
        categoria = categoria.value;
        this.cargarJSONBar(categoria);
    }
}
