import { Component } from '@angular/core';

import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-logout-button',
  imports: [],
  template: ` <button
    (click)="logout()"
    class="flex p-2 items-center gap-[0.33rem] text-[0.8rem] hover:bg-dark-dim rounded-md w-full focus:bg-dark-dim outline-none"
  >
    <img src="svg/logout.svg" width="16" height="16" />
    Log out
  </button>`,
})
export class LogoutButtonComponent {
  constructor(private api: ApiService) {}

  logout = () => {
    this.api.logout();
    window.location.reload();
  };
}
