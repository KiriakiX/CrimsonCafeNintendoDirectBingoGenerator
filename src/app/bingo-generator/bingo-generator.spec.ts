import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BingoGenerator } from './bingo-generator';

describe('BingoGenerator', () => {
  let component: BingoGenerator;
  let fixture: ComponentFixture<BingoGenerator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BingoGenerator],
    }).compileComponents();

    fixture = TestBed.createComponent(BingoGenerator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
