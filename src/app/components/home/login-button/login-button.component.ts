import { Component } from '@angular/core';

import { environment } from '@environments/environment';
import { Endpoints } from '@utils/constants';

@Component({
  selector: 'app-login-button',
  imports: [],
  template: `
    <a
      [href]="loginUrl"
      class="border-medium border-[1px] rounded-lg px-24 py-3 text-sm flex items-center gap-2 hover:bg-dark-dim focus:bg-dark-dim outline-none"
    >
      <img src="svg/spotify.svg" width="22" height="22" />
      Log in with Spotify
    </a>
  `,
})
export class LoginButtonComponent {
  readonly loginUrl = `${environment.backendUrl}/${Endpoints.auth.login}`;
}
