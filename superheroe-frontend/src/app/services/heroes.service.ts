import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { NuevoSuperheroe, Superheroe } from '../models/superheroe';

@Injectable({ providedIn: 'root' })
export class HeroesService {
  private http = inject(HttpClient);
  private apiUrl = '/api/heroes';

  getCatalog(): Observable<Superheroe[]> {
    return this.http.get<Superheroe[]>(`${this.apiUrl}/catalog`);
  }

  createHero(hero: NuevoSuperheroe): Observable<{ message: string; hero: Superheroe }> {
    return this.http.post<{ message: string; hero: Superheroe }>(this.apiUrl, hero);
  }

  getImageUrl(imageUrl: string | null | undefined): string {
    if (!imageUrl) {
      return '/images/Placeholder.png';
    }

    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://') || imageUrl.startsWith('/images/')) {
      return imageUrl;
    }

    return `/images/${imageUrl}`;
  }
}
