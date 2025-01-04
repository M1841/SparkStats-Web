import { Component } from '@angular/core';

import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-logout-button',
  imports: [],
  template: ` <button
    (click)="logout()"
    class="flex p-2 items-center gap-2 text-[0.9rem] hover:bg-darkDim rounded-md w-full focus:bg-darkDim outline-none"
  >
    <img src="svg/logout.svg" width="18" height="18" />
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
