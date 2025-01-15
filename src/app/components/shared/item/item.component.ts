import {
  afterNextRender,
  Component,
  computed,
  ElementRef,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { ContextMenuComponent } from '../context-menu/context-menu.component';

@Component({
  selector: 'app-item',
  imports: [ContextMenuComponent],
  template: `
    <li
      #itemRef
      class="flex items-center justify-between border-medium border-[1px] rounded-lg p-2 -mx-2"
    >
      <section class="flex gap-2 items-center">
        @if (index() !== null) {
          <span class="text-sm text-lightDim w-5 text-center">{{
            index()! + 1
          }}</span>
        }

        @if (isLoading()) {
          <span
            class="h-12 w-12 rounded-[0.2rem] bg-darkDim animate-pulse"
          ></span>
        } @else {
          <img
            class="
              'h-12 w-12 rounded-[0.2rem] bg-darkDim {{
              item()?.pictureUrl ? '' : 'p-3'
            }}"
            src="{{ item()?.pictureUrl ?? altIconSrc() }}"
            alt=""
          />
        }
        <main class="flex flex-col justify-center">
          @if (isLoading()) {
            <span
              class="h-4 w-48 rounded-sm bg-darkDim animate-pulse mb-2"
            ></span>
          } @else {
            <a
              href="{{ item()?.url ?? '' }}"
              class="text-sm
                {{
                item()?.url
                  ? 'hover:underline focus:underline outline-none'
                  : 'text-lightDim pointer-events-none'
              }}
              "
              target="_blank"
            >
              {{ item()?.name }}
            </a>
          }

          @if (isLoading()) {
            <span class="h-3 w-36 rounded-sm bg-darkDim animate-pulse"></span>
          } @else {
            @switch (true) {
              @case (isTrack()) {
                <p class="text-[0.8rem] text-lightDim">
                  @for (artist of itemAsTrack().artists; track $index) {
                    @if (artist.url) {
                      <a
                        href="{{ artist.url }}"
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
      @if (!this.isLoading()) {
        <div #contextMenuRef>
          <app-context-menu
            [isOpen]="isContextMenuOpen()"
            [position]="contextMenuPosition()"
          />
        </div>
      }
    </li>
  `,
})
export class ItemComponent {
  constructor() {
    afterNextRender(() => {
      window.addEventListener('click', this.handleClick);
      window.addEventListener('contextmenu', this.handleContextMenu);
    });
  }

  item = input<ItemSimple | null>(null);
  index = input<number | null>(null);
  isLoading = input<boolean>(false);

  itemAsUserProfile = computed(() => this.item() as UserProfileSimple);
  itemAsTrack = computed(() => this.item() as TrackSimple);
  itemAsArtist = computed(() => this.item() as ArtistSimple);
  itemAsPlaylist = computed(() => this.item() as PlaylistSimple);

  isTrack = computed(() => this.itemAsTrack().artists !== undefined);
  isArtist = computed(() => this.itemAsArtist().genres !== undefined);
  isPlaylist = computed(() => this.itemAsPlaylist().trackCount !== undefined);
  isUserProfile = computed(
    () => !this.isTrack() && !this.isArtist() && !this.isPlaylist(),
  );

  separator = (index: number, count: number) =>
    index < count - 2 ? ',' : index === count - 2 ? ' &' : '';

  altIconSrc = computed(() => {
    switch (true) {
      case this.isTrack():
        return 'svg/music-dim.svg';
      case this.isArtist():
        return 'svg/microphone-dim.svg';
      case this.isPlaylist():
        return 'svg/music-list-dim.svg';
      case this.isUserProfile():
        return 'svg/user.svg';
      default:
        return '';
    }
  });

  isContextMenuOpen = signal(false);
  contextMenuPosition = signal({ x: 0, y: 0 });

  itemRef = viewChild.required<ElementRef>('itemRef');
  contextMenuRef = viewChild.required<ElementRef>('contextMenuRef');

  handleClick = (event: MouseEvent) => {
    if (
      this.isContextMenuOpen() &&
      !this.contextMenuRef().nativeElement.contains(event.target as Node)
    ) {
      this.isContextMenuOpen.set(false);
    }
  };

  handleContextMenu = (event: MouseEvent) => {
    if (this.itemRef().nativeElement.contains(event.target as Node)) {
      if (!this.contextMenuRef().nativeElement.contains(event.target as Node)) {
        event.preventDefault();
      }

      this.isContextMenuOpen.set(true);
      this.contextMenuPosition.set({
        x: event.screenX,
        y: event.screenY,
      });
    } else {
      this.isContextMenuOpen.set(false);
    }
  };
}
