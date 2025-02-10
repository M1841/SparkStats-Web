import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { mergeMap, scan, startWith, Subject, tap } from 'rxjs';

import { ItemComponent } from '@components/shared/item/item.component';
import { ItemsListComponent } from '@components/shared/items-list/items-list.component';
import { SectionHeaderComponent } from '@components/shared/section-header/section-header.component';
import { ShuffleButtonComponent } from '@components/shuffle/shuffle-button/shuffle-button.component';
import { ApiService } from '@services/api.service';
import { Endpoints } from '@utils/constants';
import { __values } from 'tslib';

@Component({
  selector: 'app-shuffle',
  imports: [
    ItemsListComponent,
    SectionHeaderComponent,
    ItemComponent,
    ShuffleButtonComponent,
  ],
  template: `
    <main class="px-8 py-4 flex flex-col gap-2">
      <app-section-header
        iconSrc="svg/music-list-dim.svg"
        text="Playlist Shuffler"
      />
      <app-items-list [items]="playlists()">
        <ng-template #itemTemplate let-playlist>
          <app-item [item]="playlist" [isLoading]="isLoading()">
            @if (!isLoading()) {
              <app-shuffle-button
                actions
                [playlist]="playlist"
                [shuffle]="shuffle"
                [isLoading]="isButtonLoading()[playlist.id]"
              />
            }
          </app-item>
        </ng-template>
      </app-items-list>
    </main>
  `,
})
export class ShuffleComponent {
  private readonly api = inject(ApiService);
  private readonly refreshSubject = new Subject<string>();

  private readonly shufflePlaylist$ = this.refreshSubject.pipe(
    tap((id) =>
      this.isButtonLoading.update((value) => ({ ...value, [id]: true })),
    ),
    mergeMap((id) =>
      this.api
        .post<
          PlaylistSimple,
          { id: string }
        >(Endpoints.playlist.shuffle, { id })
        .pipe(
          tap(() =>
            this.isButtonLoading.update((value) => ({ ...value, [id]: false })),
          ),
        ),
    ),
  );
  private readonly fetchPlaylists$ = this.api
    .get<PlaylistSimple[]>(Endpoints.playlist.root)
    .pipe(
      tap(() => this.isLoading.set(false)),
      mergeMap((initialPlaylists) =>
        this.shufflePlaylist$.pipe(
          startWith(null),
          scan((acc, newPlaylist) => {
            if (newPlaylist === null) {
              return initialPlaylists ?? [];
            }
            return [newPlaylist, ...acc];
          }, initialPlaylists ?? []),
        ),
      ),
    );

  shuffle = (id: string) => {
    this.refreshSubject.next(id);
  };

  readonly playlists = toSignal(this.fetchPlaylists$, {
    initialValue: Array(50),
  });
  readonly isLoading = signal(true);
  readonly isButtonLoading = signal<{ [id: string]: boolean }>({});
}
