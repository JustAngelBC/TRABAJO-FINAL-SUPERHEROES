import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Superheroe } from '../models/superheroe';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private http = inject(HttpClient);
  private apiUrl = '/api/heroes/favorites';

  getFavorites(): Observable<Superheroe[]> {
    return this.http.get<Superheroe[]>(this.apiUrl);
  }

  addFavorite(heroId: number): Observable<{ message?: string; error?: string }> {
    return this.http.post<{ message?: string; error?: string }>(this.apiUrl, { heroId });
  }

  removeFavorite(heroId: number): Observable<{ message?: string; error?: string }> {
    return this.http.delete<{ message?: string; error?: string }>(`${this.apiUrl}/${heroId}`);
  }
}
