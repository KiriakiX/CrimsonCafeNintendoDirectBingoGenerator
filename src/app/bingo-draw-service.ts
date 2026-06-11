import { ElementRef, Injectable, Service } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { BingoData } from './bingo-data';
import { HttpClient } from '@angular/common/http';

interface CellPosition {
  x: number;
  y: number;
}

@Injectable({
  providedIn: 'root'
})
export class BingoDrawService {
    private readonly CELL_SIZE = 238;
  private readonly CELL_PADDING = 20;

  private readonly cellCenters = this.generateCellCenters();
    constructor(
    private readonly http: HttpClient
    ) {}

    async generateCard(canvasRef: ElementRef<HTMLCanvasElement>): Promise<string> {
        
    const canvas = canvasRef.nativeElement;
    canvas.width = 1190;
    canvas.height = 1342;
    const ctx = canvas.getContext('2d');
    const bingoData =
    await this.getEntries();

    if (!ctx) {
       throw new Error();
    }

    const url = new URL('BingoCard.jpg', document.baseURI).toString();
    const template = await this.loadImage(url);
    
    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    ctx.drawImage(
      template,
      0,
      0,
      canvas.width,
      canvas.height
    );

    const entries = this.getRandomEntries(bingoData.entries);

    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
entries.forEach((entry, index) => {

      const cell =
        this.cellCenters[index];

      const fittedText =
        this.fitText(
          ctx,
          entry,
          this.CELL_SIZE - this.CELL_PADDING * 2,
          this.CELL_SIZE - this.CELL_PADDING * 2
        );


      ctx.font =
        `bold ${fittedText.fontSize}px Arial`;

      const lineHeight =
        fittedText.fontSize * 1.2;

      const totalHeight =
        fittedText.lines.length *
        lineHeight;

      let y =
        cell.y -
        totalHeight / 2 +
        lineHeight / 2;

      for (const line of fittedText.lines) {

        ctx.fillText(
          line,
          cell.x,
          y
        );

        y += lineHeight;
      }
    });

    return canvas.toDataURL(
      'image/png'
    );
  }

  private getRandomEntries(entries: string[]): string[] {


    const shuffled =
      [...entries]
        .sort(() => Math.random() - 0.5)
        .slice(0, 25);

    // Center square
    shuffled[12] = 'FREE SPACE';

    return shuffled;
  }

  private loadImage(src: string): Promise<HTMLImageElement> {

    return new Promise((resolve, reject) => {

      const image = new Image();

      image.onload = () => resolve(image);

      image.onerror = reject;

      image.src = src;

    });
  }

  private fitText(
    ctx: CanvasRenderingContext2D,
    text: string,
    maxWidth: number,
    maxHeight: number
  ): {
    fontSize: number;
    lines: string[];
  } {

    let fontSize = 28;

    while (fontSize >= 10) {

      ctx.font =
        `bold ${fontSize}px Arial`;

      const lines =
        this.getWrappedLines(
          ctx,
          text,
          maxWidth
        );

      const lineHeight =
        fontSize * 1.2;

      const totalHeight =
        lines.length *
        lineHeight;

      if (
        totalHeight <= maxHeight
      ) {

        return {
          fontSize,
          lines
        };
      }

      fontSize--;
    }

    return {
      fontSize: 10,
      lines: [text]
    };
  }

  private getWrappedLines(
    ctx: CanvasRenderingContext2D,
    text: string,
    maxWidth: number
  ): string[] {

    const words =
      text.split(' ');

    const lines: string[] = [];

    let currentLine = '';

    for (const word of words) {

      const testLine =
        currentLine +
        word +
        ' ';

      const width =
        ctx.measureText(
          testLine
        ).width;

      if (
        width > maxWidth &&
        currentLine
      ) {

        lines.push(
          currentLine.trim()
        );

        currentLine =
          word + ' ';

      } else {

        currentLine =
          testLine;
      }
    }

    if (currentLine) {

      lines.push(
        currentLine.trim()
      );
    }

    return lines;
  }

    private generateCellCenters() {

    const positions = [];

    const leftBorder = 50;
    const topBorder = 285;

    const cellWidth = 217;
    const cellHeight = 203;

    for (let row = 0; row < 5; row++) {

        for (let col = 0; col < 5; col++) {

        positions.push({
            x: leftBorder + cellWidth / 2 + col * cellWidth,
            y: topBorder + cellHeight / 2 + row * cellHeight
        });

        }
    }

    return positions;
    }


  getEntries() {
    const url = new URL('BingoEntries.json', document.baseURI).toString();

    return firstValueFrom(
      this.http.get<BingoData>(url)
    );
  }
}
