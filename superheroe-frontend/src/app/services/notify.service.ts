import { Injectable, signal } from '@angular/core';

export type TipoNotificacion = 'success' | 'error' | 'info';

@Injectable({ providedIn: 'root' })
export class NotifyService {
  message = signal<string | null>(null);
  type = signal<TipoNotificacion>('info');

  show(msg: string, type: TipoNotificacion = 'info') {
    this.message.set(msg);
    this.type.set(type);

    setTimeout(() => {
      this.message.set(null);
    }, 3500);
  }
}
