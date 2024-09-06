import * as Highcharts from 'highcharts';

// TODO: prendre vrai palette, utilise couleurs de bootstrap temporairement
const paletteColors = [
    "var(--bs-primary)",
    "var(--bs-success)",
    "var(--bs-warning)",
    "var(--bs-danger)",
    "var(--bs-info)",
    "var(--bs-secondary)",
]

const SalesByStoreOptions : Highcharts.Options =  {
    credits: {
        enabled: false,
    },
    title: {
        text: "Nombre de ventes par magasin",
        widthAdjust: 50,
    },
    tooltip: {
        pointFormat: '<b>{point.y} $</b> ({point.percentage:.1f}%)',
        style: {
            fontSize: "1.0em"
        }
    },
    colors: paletteColors,
    plotOptions: {
        pie: {
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                color: "white",
            },
            showInLegend: true,
        },
    },
    legend: {
        enabled: true,
    },
    series: [
        {
            type: 'pie',
            size: '80%',
            dataLabels: [
                {
                    format: '{point.percentage:.0f}%',
                    distance: -60,
                    style: {
                        fontSize: '1.0em',
                        textOutline: 'none',
                        fontColor: "white",
                    }
                }
            ],
            data : [
                ['Magasin 1', 66],
                ['Magasin 2', 34],
            ]
        }
    ]
}

const SalesByFilmCategoryOptions : Highcharts.Options = {
    title: {
        text: 'Nombre de ventes par catégorie de films',
        align: 'center'
    },
    credits : {
        enabled: false,
    },
    xAxis: {
        categories: [ // utiliser fonction update pour les changer
            'Foreign',
            'Children',
            'Animation',
        ],
        crosshair: true,
    },
    yAxis: {
        min: 0,
        title: {
            text: "Ventes $",
        },
        gridLineWidth: 0,
    },
    legend: {
        symbolRadius: 3
    },
    tooltip: {
        shared: true,
        headerFormat: '<table>',
        pointFormat: `
        <tr>
            <th>{point.category}</th>
            <td>{point.y}</td>
        </tr>
        `,
        footerFormat: '</table>',
        valueSuffix: ' $',
        useHTML: true
    },
    colors: paletteColors.slice(0),
    plotOptions: {
        bar: {
            pointPadding: 0.1,
            borderWidth: 0
        },

    },
    series: [
        {
            showInLegend: false,
            type: 'bar',
            data: [
                182, 181, 178, // valeurs fictives
            ]
        },
    ]
}

export interface SimpleChart {
    Highcharts: typeof Highcharts,
    chartConstructor: string,
    chartOptions: Highcharts.Options,
    chartCallback: Highcharts.ChartCallbackFunction,
    updateFlag: boolean,
    oneToOneFlag: boolean,
    runOutsideAngular: boolean,
};


function createChart(
    chartOptions: Highcharts.Options,
    chartCallback: Highcharts.ChartCallbackFunction = function (chart) {},
): SimpleChart {
    return {
        Highcharts: Highcharts,
        chartConstructor: 'chart',
        chartOptions,
        chartCallback,
        updateFlag: false,
        oneToOneFlag: false,
        runOutsideAngular: false,
    };
}
export const SalesByStore: SimpleChart = createChart(SalesByStoreOptions)
export const SalesByFilmCategory: SimpleChart = createChart(SalesByFilmCategoryOptions)
