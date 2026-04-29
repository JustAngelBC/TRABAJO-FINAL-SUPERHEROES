import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { Superheroe } from '../../models/superheroe';
import { AuthService } from '../../services/auth.service';
import { FavoritesService } from '../../services/favorites.service';
import { HeroesService } from '../../services/heroes.service';
import { NotifyService } from '../../services/notify.service';

@Component({
  selector: 'app-favorites',
  imports: [RouterLink],
  templateUrl: './favorites.html',
  styleUrl: './favorites.scss'
})
export class FavoritesPage {
  private favoritesService = inject(FavoritesService);
  private heroesService = inject(HeroesService);
  private notify = inject(NotifyService);
  auth = inject(AuthService);

  heroes = signal<Superheroe[]>([]);
  loading = signal(false);
  message = signal('Inicia sesion para ver tus favoritos.');

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    if (!this.auth.estaAutenticado()) {
      this.heroes.set([]);
      this.message.set('Debes iniciar sesion para ver tus heroes favoritos.');
      return;
    }

    this.loading.set(true);
    this.message.set('Cargando tus favoritos...');

    this.favoritesService.getFavorites()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (heroes) => {
          this.heroes.set(heroes);
          this.message.set(heroes.length ? `Mostrando ${heroes.length} heroes favoritos.` : 'Aun no tienes heroes favoritos. Explora el catalogo.');
        },
        error: (error) => {
          this.heroes.set([]);
          this.message.set(error.error?.message || 'No se pudieron obtener tus favoritos.');
          this.notify.show('No se pudieron cargar tus favoritos.', 'error');
        }
      });
  }

  removeFavorite(hero: Superheroe) {
    this.favoritesService.removeFavorite(hero.id).subscribe({
      next: (response) => {
        this.notify.show(response.message || `${hero.nombre} eliminado de favoritos.`, 'success');
        this.loadFavorites();
      },
      error: (error) => this.notify.show(error.error?.error || 'No se pudo eliminar el favorito.', 'error')
    });
  }

  imageUrl(hero: Superheroe): string {
    return this.heroesService.getImageUrl(hero.imagen_url);
  }

  usePlaceholder(event: Event) {
    (event.target as HTMLImageElement).src = '/images/Placeholder.png';
  }
}
