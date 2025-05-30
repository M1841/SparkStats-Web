import { Component, inject } from '@angular/core';

import { UserProfileComponent } from '@components/home/user-profile/user-profile.component';
import { CurrentlyPlayingComponent } from '@components/home/currently-playing/currently-playing.component';
import { HistoryComponent } from '@components/home/history/history.component';
import { LoginButtonComponent } from '@components/home/login-button/login-button.component';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-home',
  imports: [
    UserProfileComponent,
    CurrentlyPlayingComponent,
    HistoryComponent,
    LoginButtonComponent,
  ],
  template: `
    @if (isAuthenticated) {
      <main
        class="px-8 py-3 flex flex-col gap-3"
        [style.min-height]="
          'calc(100vh - 20px - 2 * 0.5rem - 2 * 0.5rem - 1px)'
        "
      >
        <app-user-profile />
        <app-currently-playing />
        <app-history />
      </main>
    } @else {
      <main
        class="flex-center"
        [style.height]="'calc(100vh - 20px - 2 * 0.5rem - 2 * 0.5rem - 1px)'"
      >
        <app-login-button />
      </main>
    }
  `,
})
export class HomeComponent {
  private readonly api = inject(ApiService);
  readonly isAuthenticated = this.api.isAuthenticated();
}
