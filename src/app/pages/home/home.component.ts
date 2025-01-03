import { Component, OnInit } from '@angular/core';

import { UserProfileComponent } from '@components/home/user-profile/user-profile.component';
import { FeaturesComponent } from '@components/home/features/features.component';
import { CurrentlyPlayingComponent } from '@components/home/currently-playing/currently-playing.component';
import { HistoryComponent } from '@components/home/history/history.component';
import { LoginButtonComponent } from '@components/home/login-button/login-button.component';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-home',
  imports: [
    UserProfileComponent,
    FeaturesComponent,
    CurrentlyPlayingComponent,
    HistoryComponent,
    LoginButtonComponent,
  ],
  template: `
    <main>
      @if (isAuthenticated) {
        <app-user-profile />
        <app-features />
        <app-currently-playing />
        <app-history />
      } @else {
        <app-login-button />
      }
    </main>
  `,
})
export class HomeComponent implements OnInit {
  constructor(private api: ApiService) {}

  isAuthenticated = false;

  ngOnInit() {
    this.isAuthenticated = this.api.isAuthenticated();
  }
}
