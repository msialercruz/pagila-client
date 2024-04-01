import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmSearchBarComponent } from './film-search-bar.component';

describe('FilmSearchBarComponent', () => {
  let component: FilmSearchBarComponent;
  let fixture: ComponentFixture<FilmSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmSearchBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilmSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
