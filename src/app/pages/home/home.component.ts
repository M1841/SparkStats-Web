import { Component } from '@angular/core';

import { UserProfileComponent } from '@components/home/user-profile/user-profile.component';
import { FeaturesComponent } from '@components/home/features/features.component';
import { CurrentlyPlayingComponent } from '@components/home/currently-playing/currently-playing.component';
import { HistoryComponent } from '@components/home/history/history.component';

@Component({
  selector: 'app-home',
  imports: [
    UserProfileComponent,
    FeaturesComponent,
    CurrentlyPlayingComponent,
    HistoryComponent,
  ],
  template: `
    <main>
      <app-user-profile />
      <app-features />
      <app-currently-playing />
      <app-history />
    </main>
  `,
})
export class HomeComponent {}
