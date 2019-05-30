import { TestBed } from '@angular/core/testing';

import { ClimaService } from './clima.service';

describe('ClimaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClimaService = TestBed.get(ClimaService);
    expect(service).toBeTruthy();
  });
});
