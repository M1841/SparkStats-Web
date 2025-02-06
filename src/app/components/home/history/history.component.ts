import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap, tap, timer } from 'rxjs';

import { ItemComponent } from '@components/shared/item/item.component';
import { ItemsListComponent } from '@components/shared/items-list/items-list.component';
import { SectionHeaderComponent } from '@components/shared/section-header/section-header.component';
import { ApiService } from '@services/api.service';
import { Endpoints } from '@utils/constants';

@Component({
  selector: 'app-history',
  imports: [ItemsListComponent, SectionHeaderComponent, ItemComponent],
  template: `
    <section class="flex flex-col gap-1">
      <app-section-header iconSrc="svg/history-dim.svg" text="History" />
      <app-items-list [items]="history$() ?? []">
        <ng-template #itemTemplate let-item>
          <app-item [item]="item" [isLoading]="isLoading()" />
        </ng-template>
      </app-items-list>
    </section>
  `,
})
export class HistoryComponent {
  private api = inject(ApiService);
  isLoading = signal(true);

  fetchHistory$ = timer(0, 30 * 1000).pipe(
    switchMap(() => this.api.get<TrackSimple[]>(Endpoints.track.history)),
    tap(() => this.isLoading.set(false)),
  );
  history$ = toSignal(this.fetchHistory$, {
    initialValue: Array(50),
  });
}
