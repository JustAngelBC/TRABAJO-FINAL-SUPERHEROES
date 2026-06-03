import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotifyService } from '../../services/notify.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginPage {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private notify = inject(NotifyService);
  private router = inject(Router);

  errorMessage = signal('');
  loading = signal(false);

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  onLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.errorMessage.set('Completa correo y contrasena.');
      return;
    }

    const { email, password } = this.loginForm.getRawValue();
    this.loading.set(true);

    this.auth.login(email, password).subscribe({
      next: () => {
        this.notify.show('Sesion iniciada correctamente.', 'success');
        this.router.navigate(['/catalog']);
      },
      error: (error) => {
        this.errorMessage.set(error.error?.error || 'Credenciales invalidas.');
        this.loading.set(false);
      }
    });
  }
}
