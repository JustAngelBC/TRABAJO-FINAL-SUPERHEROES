import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { NotifyService } from './services/notify.service';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private fb = inject(FormBuilder);
  auth = inject(AuthService);
  notify = inject(NotifyService);

  title = signal('Catalogo de Superheroes');
  modoRegistro = signal(false);
  procesandoSesion = signal(false);

  sessionForm = this.fb.nonNullable.group({
    nombre: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  submitSesion() {
    if (this.sessionForm.invalid) {
      this.sessionForm.markAllAsTouched();
      this.notify.show('Completa el correo y la contrasena.', 'error');
      return;
    }

    const { nombre, email, password } = this.sessionForm.getRawValue();
    this.procesandoSesion.set(true);

    if (this.modoRegistro()) {
      this.auth.register(nombre || 'Usuario', email, password).subscribe({
        next: () => {
          this.notify.show('Usuario registrado. Ahora inicia sesion.', 'success');
          this.modoRegistro.set(false);
          this.procesandoSesion.set(false);
        },
        error: (error) => {
          this.notify.show(error.error?.error || 'No se pudo registrar el usuario.', 'error');
          this.procesandoSesion.set(false);
        }
      });
      return;
    }

    this.auth.login(email, password).subscribe({
      next: () => {
        this.notify.show('Sesion iniciada correctamente.', 'success');
        this.sessionForm.reset();
        this.procesandoSesion.set(false);
      },
      error: (error) => {
        this.notify.show(error.error?.error || 'Credenciales invalidas.', 'error');
        this.procesandoSesion.set(false);
      }
    });
  }

  cambiarModoSesion() {
    this.modoRegistro.update((value) => !value);
  }

  cerrarSesion() {
    this.auth.logout();
    this.notify.show('Sesion cerrada.', 'info');
  }
}
