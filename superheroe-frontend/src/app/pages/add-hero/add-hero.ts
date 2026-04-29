import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HeroesService } from '../../services/heroes.service';
import { NotifyService } from '../../services/notify.service';

@Component({
  selector: 'app-add-hero',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './add-hero.html',
  styleUrl: './add-hero.scss'
})
export class AddHeroPage {
  private fb = inject(FormBuilder);
  private heroesService = inject(HeroesService);
  private notify = inject(NotifyService);
  auth = inject(AuthService);

  saving = signal(false);

  form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    poder: ['', [Validators.required, Validators.minLength(3)]],
    fortaleza: [''],
    resistencia: [''],
    debilidad: [''],
    imagen_url: ['Placeholder.png', Validators.required]
  });

  submit() {
    if (!this.auth.estaAutenticado()) {
      this.notify.show('Debes iniciar sesion para agregar superheroes.', 'info');
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.notify.show('Completa los campos obligatorios.', 'error');
      return;
    }

    this.saving.set(true);
    this.heroesService.createHero(this.form.getRawValue()).subscribe({
      next: (response) => {
        this.notify.show(response.message || 'Superheroe creado con exito.', 'success');
        this.form.reset({ imagen_url: 'Placeholder.png' });
        this.saving.set(false);
      },
      error: (error) => {
        this.notify.show(error.error?.error || 'No se pudo crear el superheroe.', 'error');
        this.saving.set(false);
      }
    });
  }
}
