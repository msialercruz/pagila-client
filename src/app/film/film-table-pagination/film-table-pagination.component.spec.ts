import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmTablePaginationComponent } from './film-table-pagination.component';

describe('FilmTablePaginationComponent', () => {
  let component: FilmTablePaginationComponent;
  let fixture: ComponentFixture<FilmTablePaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmTablePaginationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilmTablePaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
