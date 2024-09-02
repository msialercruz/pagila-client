import * as Highcharts from 'highcharts';

export type SimpleChart = {
    Highcharts: typeof Highcharts;
    chartConstructor: string;
    chartOptions: Highcharts.Options;
    chartCallback: Highcharts.ChartCallbackFunction;
    updateFlag: boolean;
    oneToOneFlag: boolean;
    runOutsideAngular: boolean;
};

export function createChart(
    chartOptions: Highcharts.Options,
    chartCallback: Highcharts.ChartCallbackFunction = function (chart) {},
): SimpleChart {
    return {
        Highcharts: Highcharts,
        chartConstructor: 'chart',
        chartOptions: chartOptions,
        chartCallback: chartCallback,
        updateFlag: false,
        oneToOneFlag: false,
        runOutsideAngular: false,
    };
}

export function createPieChartOptions(
    text: string,
    data: any[],
): Highcharts.Options {
    return {
        credits : {
            enabled: false,
        },
        title: {
            text,
        },
        tooltip: {
            valueSuffix: '%'
        },
        series: [
            {
                type: 'pie',
                size:'50%',
                dataLabels: [
                    {
                        format: '{point.name}',
                        connectorColor: 'var(--highcharts-neutral-color-80, #333)'
                    },
                    {
                        format: '{point.percentage:.0f}%',
                        distance: -30,
                        style: {
                            fontSize: '1.0em',
                            textOutline: 'none'
                        }
                    }
                ],
                data,
            }
        ]
    }
}

export function createColumnChartOptions(
    text: string,
    categories: string[],
    yAxisTitle: string,
    data: number[],
): Highcharts.Options {

    return {
        title: {
            text,
            align: 'center'
        },
        credits : {
            enabled: false,
        },
        xAxis: {
            categories,
            crosshair: true,
        },
        yAxis: {
            min: 0, // hardcodé
            title: {
                text: yAxisTitle,
            }
        },
        legend: {
            symbolRadius: 3
        },
        tooltip: {
            shared: true,
            headerFormat: '<table><caption>{point.key}</caption>',
            pointFormat: `
            <tr>
            <th>
            <svg width="20" height="10">
            <rect x="5" y="0" width="10" height="10" rx="3" ry="3"
            fill="{series.color}" />
            </svg>
            {series.name}
            </th>
            <td>{point.y}</td>
            </tr>
            `,
            footerFormat: '</table>',
            valueSuffix: ' GT',
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.1,
                borderWidth: 0
            }
        },
        series: [
            {
                showInLegend: false,
                type: 'column',
                data,
            },
        ]
    }
}
