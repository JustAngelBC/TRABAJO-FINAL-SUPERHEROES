import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-registration',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './user-registration.html',
  styleUrl: './user-registration.scss'
})
export class UserRegistrationPage {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);

  message = signal('');
  isError = signal(false);
  loading = signal(false);

  registerForm = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.message.set('Completa los campos requeridos.');
      this.isError.set(true);
      return;
    }

    const { nombre, email, password } = this.registerForm.getRawValue();
    this.loading.set(true);

    this.auth.register(nombre, email, password).subscribe({
      next: () => {
        this.message.set('Usuario registrado con exito. Ahora puedes iniciar sesion.');
        this.isError.set(false);
        this.loading.set(false);
        this.registerForm.reset();
      },
      error: (error) => {
        this.message.set(error.error?.error || 'Error al registrar usuario.');
        this.isError.set(true);
        this.loading.set(false);
      }
    });
  }
}
