import { Component } from '@angular/core'
import { RouterModule, RouterOutlet } from '@angular/router'
import { FilmModule } from './film/film.module'
import { HeaderComponent } from './shared/components/header/header.component'

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [FilmModule, HeaderComponent, RouterModule, RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent {
    title = 'Pagila'
}
