import { TestBed } from '@angular/core/testing';

import { CityListService } from './city-list.service';

describe('CityListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CityListService = TestBed.get(CityListService);
    expect(service).toBeTruthy();
  });
});
