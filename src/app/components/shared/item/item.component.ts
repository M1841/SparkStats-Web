import { Component, computed, input, model } from '@angular/core';

@Component({
  selector: 'app-item',
  imports: [],
  template: `
    @if (index() !== null) {
      {{ index()! + 1 }}
    }

    @if (isLoading()) {
      <div>...</div>
    } @else {
      <img [src]="item()?.pictureUrl ?? ''" alt="cover picture" />
    }

    @if (isLoading()) {
      <div>...</div>
    } @else {
      <a [href]="item()?.url ?? ''">
        {{ item()?.name }}
      </a>
    }

    <br />

    @if (isLoading()) {
      <div>...</div>
    } @else {
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
        @case (isPlaylist()) {
          {{ itemAsPlaylist().trackCount }} track{{
            itemAsPlaylist().trackCount === 1 ? '' : 's'
          }}
        }
      }
    }
    <ng-content />
  `,
})
export class ItemComponent {
  item = input<ItemSimple | null>(null);
  index = input<number | null>(null);
  isLoading = model<boolean>(false);

  isTrack = computed(() => this.itemAsTrack().artists !== undefined);
  isArtist = computed(() => this.itemAsArtist().genres !== undefined);
  isPlaylist = computed(() => this.itemAsPlaylist().trackCount !== undefined);

  itemAsUserProfile = computed(() => this.item() as UserProfileSimple);
  itemAsTrack = computed(() => this.item() as TrackSimple);
  itemAsArtist = computed(() => this.item() as ArtistSimple);
  itemAsPlaylist = computed(() => this.item() as PlaylistSimple);

  separator = (index: number, count: number) =>
    index < count - 2 ? ',' : index === count - 2 ? ' and' : '';
}
