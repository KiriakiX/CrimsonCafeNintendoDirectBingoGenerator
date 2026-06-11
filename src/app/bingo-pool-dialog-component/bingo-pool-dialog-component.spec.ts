import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BingoPoolDialogComponent } from './bingo-pool-dialog-component';

describe('BingoPoolDialogComponent', () => {
  let component: BingoPoolDialogComponent;
  let fixture: ComponentFixture<BingoPoolDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BingoPoolDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BingoPoolDialogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
