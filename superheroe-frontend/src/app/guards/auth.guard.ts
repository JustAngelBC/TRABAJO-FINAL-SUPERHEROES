import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotifyService } from '../services/notify.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const notify = inject(NotifyService);

  if (auth.isLoggedIn()) {
    return true;
  }

  notify.show('Inicia sesion para acceder a esta seccion.', 'info');
  return router.createUrlTree(['/login']);
};
