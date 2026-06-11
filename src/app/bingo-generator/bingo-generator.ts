import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { BingoDrawService } from '../bingo-draw-service';

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
    private readonly bingoDrawService: BingoDrawService
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
}