import { Component, computed, input } from '@angular/core';

import { ItemIndexComponent } from './item-index/item-index.component';
import { ItemLoadingComponent } from './item-loading/item-loading.component';
import { ItemNameComponent } from './item-name/item-name.component';
import { ItemBarComponent } from './item-bar/item-bar.component';
import { ItemSubitemsComponent } from './item-subitems/item-subitems.component';
import { ItemPlaylistDetailsComponent } from './item-playlist-details/item-playlist-details.component';

@Component({
  selector: 'app-item',
  imports: [
    ItemIndexComponent,
    ItemLoadingComponent,
    ItemNameComponent,
    ItemBarComponent,
    ItemSubitemsComponent,
    ItemPlaylistDetailsComponent,
  ],
  template: `
    <li
      #itemRef
      class="flex items-center justify-between border-medium border-[1px] rounded-md p-2 -mx-2"
    >
      <section class="flex gap-2 items-center w-full min-h-12">
        @if (index() !== undefined) {
          <app-item-index [index]="index()!" />
        }

        @if (isLoading()) {
          <app-item-loading class="flex gap-2 items-center" />
        } @else {
          @if (!isGenre()) {
            <img
              class="
              'h-12 w-12 rounded-sm bg-dark-dim object-cover aspect-square {{
                itemAsTrack().pictureUrl ? '' : 'p-3'
              }}"
              [src]="itemAsTrack().pictureUrl ?? altIconSrc()"
              alt=""
            />
          }
          <main class="flex flex-col justify-center w-full">
            <app-item-name
              [url]="itemAsTrack().url"
              [name]="item().name"
              [details]="
                isGenre()
                  ? {
                      amount: itemAsGenre().artistCount,
                      measure: 'artist',
                    }
                  : undefined
              "
            />
            @switch (true) {
              @case (isTrack()) {
                <app-item-subitems [subitems]="itemAsTrack().artists" />
              }
              @case (isArtist()) {
                <app-item-subitems [subitems]="itemAsArtist().genres" />
              }
              @case (isGenre()) {
                <app-item-bar
                  [maxAmount]="maxAmount()"
                  [amount]="itemAsGenre().artistCount"
                />
              }
              @case (isPlaylist()) {
                <app-item-playlist-details [playlist]="itemAsPlaylist()" />
              }
            }
          </main>
        }
      </section>

      <ng-content select="[actions]" />
    </li>
  `,
})
export class ItemComponent {
  readonly item = input.required<ItemSimple>();
  readonly index = input<number>();
  readonly isLoading = input<boolean>(false);
  readonly altIconSrc = input.required<string>();
  readonly maxAmount = input<number>(0);

  readonly itemAsUserProfile = computed(() => this.item() as UserProfileSimple);
  readonly itemAsTrack = computed(() => this.item() as TrackSimple);
  readonly itemAsArtist = computed(() => this.item() as ArtistSimple);
  readonly itemAsGenre = computed(() => this.item() as GenreSimple);
  readonly itemAsPlaylist = computed(() => this.item() as PlaylistSimple);

  readonly isTrack = computed(() => this.itemAsTrack().artists !== undefined);
  readonly isArtist = computed(() => this.itemAsArtist().genres !== undefined);
  readonly isGenre = computed(
    () => this.itemAsGenre().artistCount !== undefined,
  );
  readonly isPlaylist = computed(
    () => this.itemAsPlaylist().trackCount !== undefined,
  );
  readonly isUserProfile = computed(
    () =>
      !this.isTrack() &&
      !this.isArtist() &&
      !this.isGenre() &&
      !this.isPlaylist(),
  );
}
