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


export const SALES_BY_STORE_OPTIONS : Highcharts.Options =  {
    credits: {
        enabled: false,
    },
    title: {
        text: "Nombre de ventes par magasin",
        widthAdjust: 50,
    },
    tooltip: {
        pointFormat: 'value: {point.y} ({point.percentage:.1f}%)',
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
