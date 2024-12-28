import { Component, computed, input } from '@angular/core';

import { ItemComponent } from '@components/shared/item/item.component';

@Component({
  selector: 'app-items-list',
  imports: [ItemComponent],
  template: `
    @for (item of items(); track $index) {<app-item [item]="item" />}
  `,
})
export class ItemsListComponent {
  items = input.required<ItemSimple[]>();

  isTrackList = computed(() =>
    this.itemsAsTracks().every((item) => item.title !== undefined)
  );
  isArtistList = computed(() =>
    this.itemsAsArtists().every((item) => item.name !== undefined)
  );

  itemsAsTracks = computed(() =>
    this.items().map((item) => item as TrackSimple)
  );
  itemsAsArtists = computed(() =>
    this.items().map((item) => item as ArtistSimple)
  );
  itemsAsPlaylists = computed(() =>
    this.items().map((item) => item as PlaylistSimple)
  );
}
