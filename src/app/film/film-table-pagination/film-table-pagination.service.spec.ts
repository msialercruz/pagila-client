import { TestBed } from '@angular/core/testing';

import { FilmTablePaginationService } from './film-table-pagination.service';

describe('FilmTablePaginationService', () => {
  let service: FilmTablePaginationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilmTablePaginationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
