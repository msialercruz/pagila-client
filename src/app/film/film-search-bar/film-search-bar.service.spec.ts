import { TestBed } from '@angular/core/testing';

import { FilmSearchBarService } from './film-search-bar.service';

describe('FilmSearchBarService', () => {
  let service: FilmSearchBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilmSearchBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
