import { Component, input, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, map } from 'rxjs';

import { ItemsListComponent } from '@components/shared/items-list/items-list.component';
import { RangeSelectComponent } from '@components/shared/range-select/range-select.component';
import { ApiService } from '@services/api.service';
import { Endpoints } from '@utils/constants';

@Component({
  selector: 'app-top-items',
  imports: [ItemsListComponent, RangeSelectComponent],
  template: `
    <main>
      <app-range-select [(range)]="selectedRange" />
      @for (range of ranges; track $index) {
        @if (range === selectedRange()) {
          <app-items-list [items]="topItems[range]" />
        }
      }
    </main>
  `,
})
export class TopItemsComponent implements OnInit {
  constructor(
    private api: ApiService,
    private router: Router,
  ) {}
  endpoint = input<'track/top' | 'artist/top'>(Endpoints.track.top);

  ranges = [0, 1, 2];
  selectedRange = signal(0);

  topItems: ItemSimple[][] = [];

  ngOnInit() {
    if (!this.api.isAuthenticated()) {
      this.router.navigate(['/']);
    }

    const requests = this.ranges.map((range) =>
      this.api.get<ItemSimple[]>(this.endpoint(), `?range=${range}`).pipe(
        map(({ result, error }) => {
          if (error !== null) {
            this.router.navigate(['/']);
          }
          return result ?? [];
        }),
      ),
    );

    forkJoin(requests).subscribe((responses) => {
      this.topItems = responses;
    });
  }
}
