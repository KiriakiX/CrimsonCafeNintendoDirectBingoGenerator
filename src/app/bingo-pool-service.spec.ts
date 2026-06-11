import { TestBed } from '@angular/core/testing';

import { BingoPoolService } from './bingo-pool-service';

describe('BingoPoolService', () => {
  let service: BingoPoolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BingoPoolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
