import { Component, computed, input } from '@angular/core';

import { describeQuantity } from '@utils/string.extensions';

@Component({
  selector: 'app-item-playlist-details',
  imports: [],
  template: `
    <p class="text-[0.8rem] text-light-dim">
      <a
        [href]="playlist().owner.url"
        class="hover:underline focus:underline outline-none"
        target="_blank"
      >
        {{ playlist().owner.name }}</a
      >
      · {{ trackCount() }}
    </p>
  `,
})
export class ItemPlaylistDetailsComponent {
  readonly playlist = input.required<PlaylistSimple>();
  readonly trackCount = computed(() =>
    describeQuantity(this.playlist().trackCount, 'track'),
  );
}
