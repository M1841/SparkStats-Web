import { Component } from '@angular/core';

import { PlaylistsComponent } from '@components/shuffle/playlists/playlists.component';

@Component({
  selector: 'app-shuffle',
  imports: [PlaylistsComponent],
  template: `
    <main>
      <app-playlists />
    </main>
  `,
})
export class ShuffleComponent {}
