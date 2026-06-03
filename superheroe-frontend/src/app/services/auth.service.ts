import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { tap } from 'rxjs';

interface LoginResponse {
  token: string;
  nombre: string;
}

interface RegisterResponse {
  message: string;
  userId: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = '/api/auth';

  token = signal<string | null>(localStorage.getItem('token_superheroes'));
  nombreUsuario = signal<string | null>(localStorage.getItem('nombre_superheroes'));
  estaAutenticado = computed(() => Boolean(this.token()));

  login(email: string, password: string) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response) => {
        this.guardarSesion(response.token, response.nombre);
      })
    );
  }

  register(nombre: string, email: string, password: string) {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/register`, { nombre, email, password });
  }

  logout() {
    localStorage.removeItem('token_superheroes');
    localStorage.removeItem('nombre_superheroes');
    this.token.set(null);
    this.nombreUsuario.set(null);
  }

  isLoggedIn(): boolean {
    return this.estaAutenticado();
  }

  private guardarSesion(token: string, nombre: string) {
    localStorage.setItem('token_superheroes', token);
    localStorage.setItem('nombre_superheroes', nombre);
    this.token.set(token);
    this.nombreUsuario.set(nombre);
  }
}
