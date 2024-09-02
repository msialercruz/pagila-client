import { Component, OnInit } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import { DashboardService } from './dashboard.service';
import {
    SimpleChart,
    createChart,
    createPieChartOptions,
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
    public salesByStoreOptions = createPieChartOptions(
        'Nombre de ventes par magasin',
        [
            ['Magasin 1', 66],
            ['Magasin 2', 34],
        ],
    )

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
            'Comedy',
        ],
        'Ventes $',
        [
            182, 181, 178, 163, 158, 151, 143, 127, 124, 121, 120, 114, 108,
            106, 106, 103,
        ],
    )
    constructor(private dashboardService: DashboardService) {
        this.salesByStore = createChart(this.salesByStoreOptions)
        this.salesByFilmCategory = createChart(this.salesByFilmCategoryOptions)
    }

    ngOnInit() {
        this.dashboardService.getSalesByStore().subscribe((data: any) => {
            const series = this.salesByStoreOptions
                .series as SeriesLineOptions[]
            series[0].data = data;
            this.salesByStore.updateFlag = true
        })
        this.dashboardService
            .getSalesByFilmCategory()
            .subscribe((data: { categories: string[]; data: number[] }) => {
                const series = this.salesByFilmCategoryOptions
                    .series as SeriesLineOptions[];
                series[0].data = data.data;
                this.salesByFilmCategory.updateFlag = true
            })
    }
}
