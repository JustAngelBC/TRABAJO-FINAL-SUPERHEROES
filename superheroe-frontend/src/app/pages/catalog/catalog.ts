import { Component, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { Superheroe } from '../../models/superheroe';
import { AuthService } from '../../services/auth.service';
import { FavoritesService } from '../../services/favorites.service';
import { HeroesService } from '../../services/heroes.service';
import { NotifyService } from '../../services/notify.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss'
})
export class CatalogPage {
  private heroesService = inject(HeroesService);
  private favoritesService = inject(FavoritesService);
  private notify = inject(NotifyService);
  auth = inject(AuthService);

  heroes = signal<Superheroe[]>([]);
  loading = signal(false);
  message = signal('Cargando catalogo...');

  ngOnInit() {
    this.loadCatalog();
  }

  loadCatalog() {
    this.loading.set(true);
    this.message.set('Cargando catalogo...');

    this.heroesService.getCatalog()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (heroes) => {
          this.heroes.set(heroes);
          this.message.set(heroes.length ? `Catalogo cargado. Mostrando ${heroes.length} heroes.` : 'No hay superheroes en el catalogo.');
        },
        error: () => {
          this.heroes.set([]);
          this.message.set('Hubo un error al conectar con el servidor.');
          this.notify.show('No se pudo cargar el catalogo.', 'error');
        }
      });
  }

  addToFavorites(hero: Superheroe) {
    if (!this.auth.estaAutenticado()) {
      this.notify.show('Debes iniciar sesion para agregar favoritos.', 'info');
      return;
    }

    this.favoritesService.addFavorite(hero.id).subscribe({
      next: (response) => this.notify.show(response.message || `${hero.nombre} agregado a favoritos.`, 'success'),
      error: (error) => this.notify.show(error.error?.error || 'No se pudo agregar el heroe a favoritos.', 'error')
    });
  }

  imageUrl(hero: Superheroe): string {
    return this.heroesService.getImageUrl(hero.imagen_url);
  }

  usePlaceholder(event: Event) {
    (event.target as HTMLImageElement).src = '/assets/images/Placeholder.png';
  }
}
