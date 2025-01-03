import { Component } from '@angular/core';

import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-logout-button',
  imports: [],
  template: `<button (click)="logout()">Log out</button>`,
})
export class LogoutButtonComponent {
  constructor(private api: ApiService) {}

  logout = () => {
    this.api.logout();
    window.location.reload();
  };
}
