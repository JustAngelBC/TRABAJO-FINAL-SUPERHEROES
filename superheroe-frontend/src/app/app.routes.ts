import { Routes } from '@angular/router';
import { AddHeroPage } from './pages/add-hero/add-hero';
import { AboutPage } from './pages/about/about';
import { CatalogPage } from './pages/catalog/catalog';
import { FavoritesPage } from './pages/favorites/favorites';
import { LoginPage } from './pages/login/login';
import { UserRegistrationPage } from './pages/user-registration/user-registration';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'catalog' },
  { path: 'catalog', component: CatalogPage, title: 'Catalogo de Superheroes' },
  { path: 'catalogo', redirectTo: 'catalog' },
  { path: 'user-registration', component: UserRegistrationPage, title: 'Alta de usuarios' },
  { path: 'login', component: LoginPage, title: 'Iniciar sesion' },
  { path: 'about', component: AboutPage, title: 'Sobre el proyecto' },
  { path: 'favoritos', component: FavoritesPage, title: 'Mis heroes favoritos', canActivate: [authGuard] },
  { path: 'add-hero', component: AddHeroPage, title: 'Agregar superheroe', canActivate: [authGuard] },
  { path: 'agregar-heroe', redirectTo: 'add-hero' },
  { path: '**', redirectTo: 'catalog' }
];
