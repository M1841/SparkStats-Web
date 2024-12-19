import { Component } from '@angular/core';

import { environment } from '@environments/environment';

@Component({
  selector: 'app-login-button',
  imports: [],
  template: ` <button (click)="handleLogin()">Log in with Spotify</button> `,
})
export class LoginButtonComponent {
  handleLogin = () => {
    window.location.href = `${environment.backendUrl}/auth/login`;
  };
}
