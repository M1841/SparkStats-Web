import { Component, computed, input, model } from '@angular/core';

@Component({
  selector: 'app-item',
  imports: [],
  template: `
    <li
      class="flex items-center justify-between border-medium border-[1px] rounded-lg p-2 -mx-2"
    >
      <section class="flex gap-2 items-center">
        @if (index() !== null) {
          {{ index()! + 1 }}
        }

        @if (isLoading()) {
          <span class="h-12 w-12 rounded-md bg-darkDim animate-pulse"></span>
        } @else {
          <img
            class="h-12 w-12 rounded-md"
            [src]="item()?.pictureUrl ?? ''"
            alt="cover picture"
          />
        }
        <main class="flex flex-col justify-center">
          @if (isLoading()) {
            <span
              class="h-4 w-48 rounded-md bg-darkDim animate-pulse mb-2"
            ></span>
          } @else {
            <a
              [href]="item()?.url ?? ''"
              class="hover:underline text-sm"
              target="_blank"
            >
              {{ item()?.name }}
            </a>
          }

          @if (isLoading()) {
            <span class="h-3 w-36 rounded-md bg-darkDim animate-pulse"></span>
          } @else {
            @switch (true) {
              @case (isTrack()) {
                <p class="text-[0.8rem] text-lightDim">
                  @for (artist of itemAsTrack().artists; track $index) {
                    @if (artist.url) {
                      <a
                        [href]="artist.url"
                        class="hover:underline"
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
                <p class="text-[0.8rem] text-lightDim">
                  @for (genre of itemAsArtist().genres; track $index) {
                    {{ genre }}{{ separator($index, $count) }}
                  }
                </p>
              }
              @case (isPlaylist()) {
                <p class="text-[0.8rem] text-lightDim">
                  {{ itemAsPlaylist().trackCount }} track{{
                    itemAsPlaylist().trackCount === 1 ? '' : 's'
                  }}
                </p>
              }
            }
          }
        </main>
      </section>
      <ng-content />
    </li>
  `,
})
export class ItemComponent {
  item = input<ItemSimple | null>(null);
  index = input<number | null>(null);
  isLoading = model<boolean>(false);

  isTrack = computed(() => this.itemAsTrack().artists !== undefined);
  isArtist = computed(() => this.itemAsArtist().genres !== undefined);
  isPlaylist = computed(() => this.itemAsPlaylist().trackCount !== undefined);
  isUserProfile = computed(
    () => !this.isTrack() && !this.isArtist() && !this.isPlaylist(),
  );

  itemAsUserProfile = computed(() => this.item() as UserProfileSimple);
  itemAsTrack = computed(() => this.item() as TrackSimple);
  itemAsArtist = computed(() => this.item() as ArtistSimple);
  itemAsPlaylist = computed(() => this.item() as PlaylistSimple);

  separator = (index: number, count: number) =>
    index < count - 2 ? ',' : index === count - 2 ? ' &' : '';
}
