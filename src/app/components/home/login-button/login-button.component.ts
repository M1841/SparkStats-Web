import { Component } from '@angular/core';

import { environment } from '@environments/environment';

@Component({
  selector: 'app-login-button',
  imports: [],
  template: ` <a [href]="loginEndpoint">Log in with Spotify</a> `,
})
export class LoginButtonComponent {
  loginEndpoint = `${environment.backendUrl}/auth/login`;
}
