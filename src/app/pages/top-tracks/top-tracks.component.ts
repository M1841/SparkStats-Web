import { Component, OnInit, signal } from '@angular/core';
import { forkJoin, map, range } from 'rxjs';

import { ItemsListComponent } from '@components/shared/items-list/items-list.component';
import { RangeSelectComponent } from '@components/shared/range-select/range-select.component';
import { ApiService } from '@services/api.service';
import { Endpoints } from '@utils/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-tracks',
  imports: [ItemsListComponent, RangeSelectComponent],
  template: `
    <main>
      <app-range-select [(range)]="selectedRange" />
      @for (range of ranges; track $index) {
        @if (range === selectedRange()) {
          <app-items-list [items]="topTracks[range]" />
        }
      }
    </main>
  `,
})
export class TopTracksComponent implements OnInit {
  constructor(
    private api: ApiService,
    private router: Router,
  ) {}

  ranges = [0, 1, 2];
  selectedRange = signal(0);

  topTracks: TrackSimple[][] = [];

  ngOnInit() {
    if (!this.api.isAuthenticated()) {
      this.router.navigate(['/']);
    }

    const requests = this.ranges.map((range) =>
      this.api.get<TrackSimple[]>(Endpoints.track.top, `?range=${range}`).pipe(
        map(({ result, error }) => {
          if (error !== null) {
            this.router.navigate(['/']);
          }
          return result ?? [];
        }),
      ),
    );

    forkJoin(requests).subscribe((responses) => {
      this.topTracks = responses;
    });
  }
}
