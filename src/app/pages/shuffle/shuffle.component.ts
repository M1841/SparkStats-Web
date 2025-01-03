import { Component, OnInit, signal } from '@angular/core';

import { ItemsListComponent } from '@components/shared/items-list/items-list.component';
import { ApiService } from '@services/api.service';
import { Endpoints } from '@utils/constants';

@Component({
  selector: 'app-shuffle',
  imports: [ItemsListComponent],
  template: `
    <main>
      <app-items-list [items]="playlists" [(isLoading)]="isLoading" />
    </main>
  `,
})
export class ShuffleComponent implements OnInit {
  constructor(private api: ApiService) {}

  playlists: ItemSimple[] = Array(50);
  isLoading = signal(true);

  ngOnInit() {
    this.api
      .get<PlaylistSimple[]>(Endpoints.playlist.root)
      ?.subscribe((response) => {
        this.playlists = response ?? [];
        this.isLoading.set(false);
      });
  }
}
