import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { forkJoin, map, of, switchMap, tap } from 'rxjs';

import { ItemComponent } from '@components/shared/item/item.component';
import { ItemsListComponent } from '@components/shared/items-list/items-list.component';
import { RangeSelectComponent } from '@components/shared/range-select/range-select.component';
import { SectionHeaderComponent } from '@components/shared/section-header/section-header.component';
import { ApiService } from '@services/api.service';

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
            <app-items-list [items]="topItems()[range]">
              <ng-template #itemTemplate let-item let-index="index">
                <app-item
                  [index]="index"
                  [item]="item"
                  [isLoading]="isLoading()"
                  [altIconSrc]="sectionHeader().iconSrc"
                  [maxCount]="maxCounts()[range]"
                />
              </ng-template>
            </app-items-list>
          }
        }
      </section>
    </main>
  `,
})
export class TopItemsComponent implements OnInit {
  readonly ranges = [0, 1, 2];
  readonly selectedRange = signal(0);

  readonly sectionHeader = input.required<{ iconSrc: string; text: string }>();
  readonly endpoint = input.required<
    'track/top' | 'artist/top' | 'genre/top'
  >();

  private readonly api = inject(ApiService);
  private readonly fetchItems$ = of(this.ranges).pipe(
    switchMap((ranges) => {
      const requests = ranges.map((range) =>
        this.api
          .get<ItemSimple[]>(this.endpoint(), `?range=${range}`)
          .pipe(map((response) => response ?? [])),
      );
      return forkJoin(requests).pipe(tap(() => this.isLoading.set(false)));
    }),
  );

  readonly topItems = signal<ItemSimple[][]>([
    Array(100),
    Array(100),
    Array(100),
  ]);
  readonly isLoading = signal(true);

  readonly maxCounts = computed(() =>
    this.topItems().map((items) => {
      if (items[0] !== undefined) {
        const itemAsGenre = items[0] as GenreSimple;
        return itemAsGenre.artistCount;
      }
      return 0;
    }),
  );

  ngOnInit() {
    this.fetchItems$.subscribe((response) => this.topItems.set(response));
  }
}
