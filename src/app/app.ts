import { Component, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
   constructor(private title: Title) {
    this.title.setTitle('Crimson Cafe Nintendo Direct Bingo Generator');
  }
}
