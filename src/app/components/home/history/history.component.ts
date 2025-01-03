import { Component, OnInit, signal } from '@angular/core';

import { ItemsListComponent } from '@components/shared/items-list/items-list.component';
import { SectionHeaderComponent } from '@components/shared/section-header/section-header.component';
import { ApiService } from '@services/api.service';
import { Endpoints } from '@utils/constants';

@Component({
  selector: 'app-history',
  imports: [ItemsListComponent, SectionHeaderComponent],
  template: `<section class="flex flex-col gap-2">
    <app-section-header iconSrc="svg/history.svg" text="History" />
    <app-items-list [items]="history" [(isLoading)]="isLoading" />
  </section>`,
})
export class HistoryComponent implements OnInit {
  constructor(private api: ApiService) {}

  history: TrackSimple[] = Array(50);
  isLoading = signal(true);

  ngOnInit() {
    this.api
      .get<TrackSimple[]>(Endpoints.track.history)
      ?.subscribe((response) => {
        this.history = response ?? [];
        this.isLoading.set(false);
      });
  }
}
