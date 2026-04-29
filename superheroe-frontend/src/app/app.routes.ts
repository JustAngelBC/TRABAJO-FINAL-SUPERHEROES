import { Routes } from '@angular/router';
import { AddHeroPage } from './pages/add-hero/add-hero';
import { CatalogPage } from './pages/catalog/catalog';
import { FavoritesPage } from './pages/favorites/favorites';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'catalogo' },
  { path: 'catalogo', component: CatalogPage, title: 'Catalogo de Superheroes' },
  { path: 'favoritos', component: FavoritesPage, title: 'Mis heroes favoritos' },
  { path: 'agregar-heroe', component: AddHeroPage, title: 'Agregar superheroe' },
  { path: '**', redirectTo: 'catalogo' }
];
