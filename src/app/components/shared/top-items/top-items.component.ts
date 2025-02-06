import { Component, inject, input, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { forkJoin, map, of, switchMap, tap } from 'rxjs';

import { ItemComponent } from '@components/shared/item/item.component';
import { ItemsListComponent } from '@components/shared/items-list/items-list.component';
import { RangeSelectComponent } from '@components/shared/range-select/range-select.component';
import { SectionHeaderComponent } from '@components/shared/section-header/section-header.component';
import { ApiService } from '@services/api.service';
import { Endpoints } from '@utils/constants';

@Component({
  selector: 'app-top-items',
  imports: [
    ItemsListComponent,
    RangeSelectComponent,
    SectionHeaderComponent,
    ItemComponent,
  ],
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
            <app-items-list [items]="topItems$()[range]">
              <ng-template #itemTemplate let-item>
                <app-item [item]="item" [isLoading]="isLoading()" />
              </ng-template>
            </app-items-list>
          }
        }
      </section>
    </main>
  `,
})
export class TopItemsComponent {
  private api = inject(ApiService);
  isLoading = signal(true);

  topItems: ItemSimple[][] = [Array(50), Array(50), Array(50)];
  ranges = [0, 1, 2];
  selectedRange = signal(0);

  sectionHeader = input.required<{ iconSrc: string; text: string }>();
  endpoint = input<'track/top' | 'artist/top'>(Endpoints.track.top);

  fetchItems$ = of(this.ranges).pipe(
    switchMap((ranges) => {
      const requests = ranges.map((range) =>
        this.api
          .get<ItemSimple[]>(this.endpoint(), `?range=${range}`)
          .pipe(map((response) => response ?? [])),
      );
      return forkJoin(requests).pipe(tap(() => this.isLoading.set(false)));
    }),
  );
  topItems$ = toSignal(this.fetchItems$, {
    initialValue: [Array(100), Array(10), Array(10)],
  });
}
