import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { BingoPoolService } from '../bingo-pool-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  standalone: true,
  selector: 'app-bingo-pool-dialog-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './bingo-pool-dialog-component.html',
  styleUrl: './bingo-pool-dialog-component.css',
})
export class BingoPoolDialogComponent implements OnInit {

  entries: string[] = [];
  loading = true;

  constructor(
    private readonly poolService: BingoPoolService,
    private readonly dialogRef: MatDialogRef<BingoPoolDialogComponent>,
    private readonly cdr: ChangeDetectorRef
  ) {}

   async ngOnInit(): Promise<void> {
    console.info("Trying to get entries from service");

    this.entries = [
      ...(await this.poolService.getEntries())
    ];

    console.info("After loading entries");
    console.info(this.entries);

    this.loading = false;
    this.cdr.detectChanges();
  }

    addEntry(): void {

    this.entries = [
      ...this.entries,
      ''
    ];
  }

  remove(index: number): void {

    this.entries = this.entries.filter(
      (_, i) => i !== index
    );
  }

  save(): void {

    const cleanedEntries = this.entries
      .map(e => e.trim())
      .filter(e => e.length > 0);

    this.poolService.saveEntries(
      cleanedEntries
    );

    this.dialogRef.close(cleanedEntries);
  }

  cancel(): void {

    this.dialogRef.close();
  }
}