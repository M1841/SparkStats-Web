import { Component } from '@angular/core';
import { environment } from '@environments/environment';

import { Endpoints } from '@utils/constants';

@Component({
  selector: 'app-login-button',
  imports: [],
  template: ` <a [href]="loginUrl">Log in with Spotify</a> `,
})
export class LoginButtonComponent {
  loginUrl = `${environment.backendUrl}/${Endpoints.auth.login}`;
}
