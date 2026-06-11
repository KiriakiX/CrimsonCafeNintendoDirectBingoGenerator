import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { BingoDrawService } from '../bingo-draw-service';

@Component({
  selector: 'app-bingo-generator',
  imports: [CommonModule],
  templateUrl: './bingo-generator.html',
  styleUrl: './bingo-generator.css',
})
export class BingoGenerator {
 @ViewChild('bingoCanvas')
  canvasRef!: ElementRef<HTMLCanvasElement>;

  generatedImage?: string;
  constructor(
    private readonly bingoDrawService: BingoDrawService
  ) {}

  
  async generateCard() {

    this.generatedImage =
      await this.bingoDrawService.generateCard(this.canvasRef);

  }
}