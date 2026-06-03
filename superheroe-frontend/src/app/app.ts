import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { NotifyService } from './services/notify.service';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private router = inject(Router);
  auth = inject(AuthService);
  notify = inject(NotifyService);

  title = signal('Catalogo de Superheroes');

  cerrarSesion() {
    this.auth.logout();
    this.notify.show('Sesion cerrada.', 'info');
    this.router.navigate(['/catalog']);
  }
}
