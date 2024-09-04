import { Component, OnInit } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import { DashboardService } from './dashboard.service';
import * as constants from './constants';
import {
    SimpleChart,
    createChart,
    createColumnChartOptions,
} from './charts';
import { SeriesLineOptions, Axis } from 'highcharts';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [HighchartsChartModule],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
    public salesByStore: SimpleChart;
    public salesByStoreOptions = constants.SALES_BY_STORE_OPTIONS

    public salesByFilmCategory: SimpleChart;
    public salesByFilmCategoryOptions = createColumnChartOptions(
        'Nombre de ventes par catégorie de films',
        [
            'Foreign',
            'Children',
            'Animation',
            'Documentary',
            'Action',
            'Music',
            'Sci-Fi',
            'New',
            'Sports',
            'Games',
            'Horror',
            'Travel',
            'Classics',
            'Family',
            'Drama',
            'Comedy', // TODO: eviter hardcode
        ],
        "Ventes $",
        [
            182, 181, 178, 163, 158, 151, 143, 127, 124, 121, 120, 114, 108,
            106, 106, 103, // valeurs fictives
        ]
    )
    constructor(private dashboardService: DashboardService) {
        this.salesByStore = createChart(this.salesByStoreOptions)
        this.salesByFilmCategory = createChart(this.salesByFilmCategoryOptions)
    }

    ngOnInit() {
        this.dashboardService.getSalesByStore().subscribe((data: any) => {
            // TODO: eviter cast explicite
            const series = this.salesByStoreOptions
                .series as SeriesLineOptions[]
            series[0].data = data;
            this.salesByStore.updateFlag = true
        })
        this.dashboardService
            .getSalesByFilmCategory()
            .subscribe((data: { categories: string[]; data: number[] }) => {
            // TODO: eviter cast explicite
                const series = this.salesByFilmCategoryOptions
                    .series as SeriesLineOptions[];
                series[0].data = data.data;
                this.salesByFilmCategory.updateFlag = true
            })
    }
}
