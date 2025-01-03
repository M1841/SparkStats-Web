import { Component, OnInit, signal } from '@angular/core';

import { ItemsListComponent } from '@components/shared/items-list/items-list.component';
import { ApiService } from '@services/api.service';
import { Endpoints } from '@utils/constants';
import { SectionHeaderComponent } from '../../components/shared/section-header/section-header.component';

@Component({
  selector: 'app-shuffle',
  imports: [ItemsListComponent, SectionHeaderComponent],
  template: `
    <main class="px-8 py-4 flex flex-col gap-2">
      <app-section-header
        iconSrc="svg/music-list-dim.svg"
        text="Playlist Shuffler"
      />
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
