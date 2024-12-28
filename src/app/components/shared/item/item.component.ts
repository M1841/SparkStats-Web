import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-item',
  imports: [],
  template: `
    <img [src]="item().pictureUrl" alt="cover picture" />
    <a [href]="item().url">
      {{ isTrack() ? itemAsTrack().title : itemAsArtist().name }}
    </a>
    <br />
    @switch (true) {
      @case (isTrack()) {
        @for (artist of itemAsTrack().artists; track $index) {
          @if (artist.url) {
            <a [href]="artist.url">{{ artist.name }}</a
            >{{ separator($index, $count) }}
          } @else {
            {{ artist.name }}{{ separator($index, $count) }}
          }
        }
      }
      @case (isArtist()) {
        @for (genre of itemAsArtist().genres; track $index) {
          {{ genre }}{{ separator($index, $count) }}
        }
      }
      @default {
        {{ itemAsPlaylist().trackCount }} track{{
          itemAsPlaylist().trackCount === 1 ? '' : 's'
        }}
      }
    }
  `,
})
export class ItemComponent {
  item = input.required<ItemSimple>();

  isTrack = computed(() => this.itemAsTrack().title !== undefined);
  isArtist = computed(() => this.itemAsArtist().genres !== undefined);

  itemAsTrack = computed(() => this.item() as TrackSimple);
  itemAsArtist = computed(() => this.item() as ArtistSimple);
  itemAsPlaylist = computed(() => this.item() as PlaylistSimple);

  separator = (index: number, count: number) =>
    index < count - 2 ? ',' : index === count - 2 ? ' and' : '';
}
