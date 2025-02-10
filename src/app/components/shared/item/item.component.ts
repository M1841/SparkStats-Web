import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-item',
  imports: [],
  template: `
    <li
      #itemRef
      class="flex items-center justify-between border-medium border-[1px] rounded-md p-2 -mx-2"
    >
      <section class="flex gap-2 items-center">
        @if (index() !== null) {
          <span class="text-[0.8rem] text-light-dim w-5 text-center">{{
            index()! + 1
          }}</span>
        }

        @if (isLoading()) {
          <span class="h-12 w-12 rounded-sm bg-dark-dim animate-pulse"></span>
        } @else {
          <img
            class="
              'h-12 w-12 rounded-sm bg-dark-dim object-cover aspect-square {{
              item()?.pictureUrl ? '' : 'p-3'
            }}"
            [src]="item()?.pictureUrl ?? altIconSrc()"
            alt=""
          />
        }
        <main class="flex flex-col justify-center">
          @if (isLoading()) {
            <span
              class="h-4 w-48 rounded-sm bg-dark-dim animate-pulse mb-2"
            ></span>
          } @else {
            <a
              [href]="item()?.url ?? ''"
              class="text-sm {{
                item()?.url
                  ? 'hover:underline focus:underline outline-none'
                  : 'text-light-dim pointer-events-none'
              }}"
              target="_blank"
            >
              {{ item()?.name }}
            </a>
          }

          @if (isLoading()) {
            <span class="h-3 w-36 rounded-sm bg-dark-dim animate-pulse"></span>
          } @else {
            @switch (true) {
              @case (isTrack()) {
                <p class="text-[0.8rem] text-light-dim">
                  @for (artist of itemAsTrack().artists; track $index) {
                    @if (artist.url) {
                      <a
                        [href]="artist.url"
                        class="hover:underline focus:underline outline-none"
                        target="_blank"
                        >{{ artist.name }}</a
                      >{{ separator($index, $count) }}
                    } @else {
                      {{ artist.name }}{{ separator($index, $count) }}
                    }
                  }
                </p>
              }
              @case (isArtist()) {
                <p class="text-[0.8rem] text-light-dim">
                  @for (genre of itemAsArtist().genres; track $index) {
                    {{ genre }}{{ separator($index, $count) }}
                  }
                </p>
              }
              @case (isPlaylist()) {
                <p class="text-[0.8rem] text-light-dim">
                  <a
                    [href]="itemAsPlaylist().owner.url"
                    class="hover:underline focus:underline outline-none"
                    target="_blank"
                    >{{ itemAsPlaylist().owner.name }}</a
                  >
                  ·
                  {{ itemAsPlaylist().trackCount }} track{{
                    itemAsPlaylist().trackCount === 1 ? '' : 's'
                  }}
                </p>
              }
            }
          }
        </main>
      </section>

      <ng-content select="[actions]" />
    </li>
  `,
})
export class ItemComponent {
  readonly item = input<ItemSimple | null>(null);
  readonly index = input<number | null>(null);
  readonly isLoading = input<boolean>(false);

  readonly itemAsUserProfile = computed(() => this.item() as UserProfileSimple);
  readonly itemAsTrack = computed(() => this.item() as TrackSimple);
  readonly itemAsArtist = computed(() => this.item() as ArtistSimple);
  readonly itemAsPlaylist = computed(() => this.item() as PlaylistSimple);

  readonly isTrack = computed(() => this.itemAsTrack().artists !== undefined);
  readonly isArtist = computed(() => this.itemAsArtist().genres !== undefined);
  readonly isPlaylist = computed(
    () => this.itemAsPlaylist().trackCount !== undefined,
  );
  readonly isUserProfile = computed(
    () => !this.isTrack() && !this.isArtist() && !this.isPlaylist(),
  );

  readonly altIconSrc = computed(() => {
    switch (true) {
      case this.isTrack():
        return 'svg/music-dim.svg';
      case this.isArtist():
        return 'svg/microphone-dim.svg';
      case this.isPlaylist():
        return 'svg/music-list-dim.svg';
      case this.isUserProfile():
        return 'svg/user-dim.svg';
      default:
        return '';
    }
  });

  separator(index: number, count: number) {
    return index < count - 2 ? ',' : index === count - 2 ? ' &' : '';
  }
}
