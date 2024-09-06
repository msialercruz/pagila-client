import { Component, OnInit } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import { DashboardService } from './dashboard.service';
import { SimpleChart, SalesByStore, SalesByFilmCategory } from './charts';
import { Options, SeriesLineOptions, XAxisOptions } from 'highcharts';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [HighchartsChartModule],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
    public salesByStore: SimpleChart;
    public salesByStoreOptions: Options;
    public salesByFilmCategory: SimpleChart;
    public salesByFilmCategoryOptions: Options;

    constructor(private dashboardService: DashboardService) {
        this.salesByStore = SalesByStore;
        this.salesByStoreOptions = this.salesByStore.chartOptions;
        this.salesByFilmCategory = SalesByFilmCategory;
        this.salesByFilmCategoryOptions = this.salesByFilmCategory.chartOptions;
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
                const series = this.salesByFilmCategoryOptions.series as SeriesLineOptions[];
                series[0].data = data.data;
                const xAxis = this.salesByFilmCategoryOptions.xAxis as XAxisOptions;
                xAxis.categories = data.categories;
                this.salesByFilmCategory.updateFlag = true
            });
    }
}
