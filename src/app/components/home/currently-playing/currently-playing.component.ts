import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap, tap, timer } from 'rxjs';

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
      <app-item [item]="track$()" [isLoading]="isLoading()" />
    </section>
  `,
})
export class CurrentlyPlayingComponent {
  private api = inject(ApiService);
  isLoading = signal(true);

  fetchTrack$ = timer(0, 30 * 1000).pipe(
    switchMap(() => this.api.get<TrackSimple>(Endpoints.track.current)),
    tap(() => this.isLoading.set(false)),
  );
  track$ = toSignal(this.fetchTrack$, {
    initialValue: {
      id: '',
      name: 'No track is currently playing',
      artists: [],
    },
  });
}
