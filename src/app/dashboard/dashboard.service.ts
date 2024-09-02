import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'
import { environment } from '../../environments/environment'

interface SalesByStoreDTO {
    store: string,
    totalSalesPercentage: number,
}

interface SalesByFilmCategoryDTO {
    category: string,
    totalSales: number,
}

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    private readonly salesApiUrl = `${environment.apiUrl}/sales`

    constructor(private http: HttpClient) {}

    getSalesByStore() {
        return this.http.get<any[]>(`${this.salesApiUrl}/by-store`).pipe(
            map((data: SalesByStoreDTO[]) => {
                return data.map((e) => [e.store, e.totalSalesPercentage]) as any[]
            })
        );
    }

    getSalesByFilmCategory() {
        return this.http.get<any[]>(`${this.salesApiUrl}/by-film-category`).pipe(
            map((data: SalesByFilmCategoryDTO[]) => {
                return data.reduce((acc, e) => {
                    acc.categories.push(e.category);
                    acc.data.push(e.totalSales);
                    return acc;
                }, {categories: [] as string[], data: [] as number[]});
            })
        );
    }
}
