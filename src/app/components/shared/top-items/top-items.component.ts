import { Component, input, OnInit, signal } from '@angular/core';
import { forkJoin, map, of } from 'rxjs';

import { ItemsListComponent } from '@components/shared/items-list/items-list.component';
import { RangeSelectComponent } from '@components/shared/range-select/range-select.component';
import { ApiService } from '@services/api.service';
import { Endpoints } from '@utils/constants';
import { SectionHeaderComponent } from '../section-header/section-header.component';

@Component({
  selector: 'app-top-items',
  imports: [ItemsListComponent, RangeSelectComponent, SectionHeaderComponent],
  template: `
    <main class="px-8 py-3 flex flex-col gap-3">
      <app-range-select [(selectedRange)]="selectedRange" />
      <section class="flex flex-col gap-1">
        <app-section-header
          [iconSrc]="sectionHeader().iconSrc"
          [text]="sectionHeader().text"
        />
        @for (range of ranges; track $index) {
          @if (range === selectedRange()) {
            <app-items-list
              [items]="topItems[range]"
              [isLoading]="isLoading()"
              [isIndexed]="true"
            />
          }
        }
      </section>
    </main>
  `,
})
export class TopItemsComponent implements OnInit {
  constructor(private api: ApiService) {}

  topItems: ItemSimple[][] = [Array(50), Array(50), Array(50)];
  ranges = [0, 1, 2];
  selectedRange = signal(0);
  isLoading = signal(true);

  sectionHeader = input.required<{ iconSrc: string; text: string }>();

  endpoint = input<'track/top' | 'artist/top'>(Endpoints.track.top);

  ngOnInit() {
    const requests = this.ranges.map((range) => {
      const result = this.api.get<ItemSimple[]>(
        this.endpoint(),
        `?range=${range}`,
      );
      return (
        result?.pipe(
          map((response) => {
            return response ?? [];
          }),
        ) ?? of([])
      );
    });

    forkJoin(requests).subscribe((responses) => {
      this.topItems = responses;
      this.isLoading.set(false);
    });
  }
}
