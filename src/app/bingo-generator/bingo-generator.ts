import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { BingoDrawService } from '../bingo-draw-service';
import { MatDialog } from '@angular/material/dialog';
import { BingoPoolDialogComponent } from '../bingo-pool-dialog-component/bingo-pool-dialog-component';

@Component({
  selector: 'app-bingo-generator',
  imports: [CommonModule],
  templateUrl: './bingo-generator.html',
  styleUrl: './bingo-generator.css',
})
export class BingoGenerator implements AfterViewInit{
 @ViewChild('bingoCanvas', { static: false })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  generatedImage?: string;
  constructor(
    private readonly bingoDrawService: BingoDrawService,
    private readonly dialog: MatDialog
  ) {}
  ngAfterViewInit(): void {
    console.log('Canvas initialized');
  }

  
  async generateCard() {
    if (!this.canvasRef) return;

    this.generatedImage =
      await this.bingoDrawService.generateCard(this.canvasRef);

  }

  downloadImage() {
  if (!this.generatedImage) return;

  const link = document.createElement('a');
  link.href = this.generatedImage;
  link.download = 'nintendo-direct-bingo.png';
  link.click();
}

openPoolEditor(): void {

  const dialogRef =
    this.dialog.open(
      BingoPoolDialogComponent,
      {
        width: '900px'
      }
    );

  dialogRef.afterClosed()
    .subscribe(result => {

      if (result) {

        console.log(
          'Pool updated',
          result
        );

      }

    });

}
}