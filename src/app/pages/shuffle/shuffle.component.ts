import { Component, inject, signal, WritableSignal } from '@angular/core';

import { ItemsListComponent } from '@components/shared/items-list/items-list.component';
import { ApiService } from '@services/api.service';
import { Endpoints } from '@utils/constants';
import { SectionHeaderComponent } from '../../components/shared/section-header/section-header.component';
import { ItemComponent } from '@components/shared/item/item.component';
import { ShuffleButtonComponent } from '@components/shuffle/shuffle-button/shuffle-button.component';
import { map, startWith, Subject, switchMap, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

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
      <app-items-list [items]="playlists$() ?? []">
        <ng-template #itemTemplate let-playlist>
          <app-item [item]="playlist" [isLoading]="isLoading()">
            @if (!isLoading()) {
              <app-shuffle-button
                actions
                [playlist]="playlist"
                [shuffle]="shuffle"
              />
            }
          </app-item>
        </ng-template>
      </app-items-list>
    </main>
  `,
})
export class ShuffleComponent {
  private api = inject(ApiService);
  isLoading = signal(true);

  refreshSubject = new Subject<{
    id: string;
    isButtonLoading: WritableSignal<boolean>;
  }>();
  shufflePlaylist$ = this.refreshSubject.pipe(
    switchMap(({ id, isButtonLoading }) => {
      return this.api
        .post<
          PlaylistSimple,
          { id: string }
        >(Endpoints.playlist.shuffle, { id: id })
        .pipe(tap(() => isButtonLoading.set(false)));
    }),
  );

  fetchPlaylists$ = this.api
    .get<PlaylistSimple[]>(Endpoints.playlist.root)
    .pipe(
      tap(() => this.isLoading.set(false)),
      switchMap((initialPlaylists) =>
        this.shufflePlaylist$.pipe(
          startWith([]),
          map((newPlaylist) => {
            if (Array.isArray(newPlaylist)) {
              return initialPlaylists;
            }
            return [newPlaylist, ...(initialPlaylists ?? [])];
          }),
        ),
      ),
    );
  playlists$ = toSignal(this.fetchPlaylists$, { initialValue: Array(50) });

  shuffle = (id: string, isButtonLoading: WritableSignal<boolean>) => {
    this.refreshSubject.next({ id, isButtonLoading });
  };
}
