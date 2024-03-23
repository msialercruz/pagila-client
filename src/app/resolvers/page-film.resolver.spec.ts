import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { filmListResolver } from './film.resolver';

describe('filmResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => filmListResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
