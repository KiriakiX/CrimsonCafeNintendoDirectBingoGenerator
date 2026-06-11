import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { BingoData } from './bingo-data';

@Injectable({
  providedIn: 'root'
})
export class BingoPoolService{
    private readonly STORAGE_KEY =
    'nintendo-direct-bingo-pool';

    defaultEntries!: string[];

        constructor(
        private readonly http: HttpClient
        ) {}
            
        
         private async getDefaultEntries() {
            const url = new URL('BingoEntries.json', document.baseURI).toString();
        
            return firstValueFrom(
              this.http.get<BingoData>(url)
            );
          }

    async getEntries(): Promise<string[]> {
  const stored = localStorage.getItem(this.STORAGE_KEY);
  if (stored && stored !== 'undefined') {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.warn('Corrupt localStorage data, resetting...', e);
      localStorage.removeItem(this.STORAGE_KEY);
    }
  }
  const defaults = await this.getDefaultEntries();
  this.saveEntries(defaults.entries);

  return defaults.entries;
}

    saveEntries(
    entries: string[]
    ): void {

    localStorage.setItem(
        this.STORAGE_KEY,
        JSON.stringify(entries)
    );
    }
}
