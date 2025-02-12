import { ApplicationRef, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { first, map, switchMap, tap, timer } from 'rxjs';

import { ItemComponent } from '@components/shared/item/item.component';
import { SectionHeaderComponent } from '@components/shared/section-header/section-header.component';
import { ApiService } from '@services/api.service';
import { Endpoints } from '@utils/constants';

@Component({
  selector: 'app-currently-playing',
  imports: [ItemComponent, SectionHeaderComponent],
  template: `
    <section class="flex flex-col gap-1">
      <app-section-header iconSrc="svg/bars-dim.svg" text="Now Playing" />
      <app-item
        [item]="track()"
        [isLoading]="isLoading()"
        altIconSrc="svg/music-dim.svg"
      />
    </section>
  `,
})
export class CurrentlyPlayingComponent {
  private readonly noTrack: TrackSimple = {
    id: '',
    url: '',
    name: 'No track is currently playing',
    artists: [],
  };
  private readonly api = inject(ApiService);
  private readonly appRef = inject(ApplicationRef);

  private readonly fetchTrack$ = this.appRef.isStable.pipe(
    first((isStable) => isStable),
    switchMap(() => timer(0, 30 * 1000)),
    switchMap(() => this.api.get<TrackSimple>(Endpoints.track.current)),
    map((track) => track ?? this.noTrack),
    tap(() => this.isLoading.set(false)),
  );
  readonly track = toSignal(this.fetchTrack$, {
    initialValue: this.noTrack,
  });
  readonly isLoading = signal(true);
}
