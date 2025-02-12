import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-item',
  imports: [],
  template: `
    <li
      #itemRef
      class="flex items-center justify-between border-medium border-[1px] rounded-md p-2 -mx-2"
    >
      <section class="flex gap-2 items-center w-full min-h-12">
        @if (index() !== null) {
          <span class="text-[0.8rem] text-light-dim w-5 text-center">{{
            index()! + 1
          }}</span>
        }

        @if (isLoading()) {
          <span
            class="h-12 w-12 aspect-square rounded-sm bg-dark-dim animate-pulse"
          ></span>
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
        }
        <main class="flex flex-col justify-center w-full">
          @if (isLoading()) {
            <span
              class="h-4 w-48 rounded-sm bg-dark-dim animate-pulse mb-2"
            ></span>
            <span class="h-3 w-36 rounded-sm bg-dark-dim animate-pulse"></span>
          } @else {
            @if (itemAsTrack().url) {
              <a
                [href]="itemAsTrack().url"
                class="text-sm outline-none hover:underline focus:underline w-fit"
                target="_blank"
              >
                {{ item().name }}
              </a>
            } @else {
              <span
                class="text-sm {{
                  !isGenre() ? 'text-light-dim' : 'flex justify-between w-full'
                }}"
              >
                {{ item().name }}
                @if (isGenre()) {
                  <span class="text-[0.8rem] text-light-dim pr-2">
                    {{ itemAsGenre().artistCount }} artist{{
                      itemAsGenre().artistCount !== 1 ? 's' : ''
                    }}
                  </span>
                }
              </span>
            }

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
              @case (isGenre()) {
                <div class="mt-2 w-full h-1 rounded-sm bg-primary-dark">
                  <div
                    class="h-full rounded-sm bg-primary-light"
                    [style.width]="
                      computeWidth(itemAsGenre().artistCount) + '%'
                    "
                  ></div>
                </div>
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
  readonly item = input.required<ItemSimple>();
  readonly index = input<number | null>(null);
  readonly isLoading = input<boolean>(false);
  readonly altIconSrc = input.required<string>();
  readonly maxCount = input<number>(0);

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

  separator(index: number, count: number) {
    return index < count - 2 ? ',' : index === count - 2 ? ' &' : '';
  }

  computeWidth(count: number) {
    return Math.round((count / this.maxCount()) * 100);
  }
}
