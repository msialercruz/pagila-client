import { TestBed } from '@angular/core/testing';

import { FilmTableService } from './film-table.service';

describe('FilmTableService', () => {
  let service: FilmTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilmTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
