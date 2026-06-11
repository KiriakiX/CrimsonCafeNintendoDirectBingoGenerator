import { TestBed } from '@angular/core/testing';

import { BingoDrawService } from './bingo-draw-service';

describe('BingoDrawService', () => {
  let service: BingoDrawService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BingoDrawService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
