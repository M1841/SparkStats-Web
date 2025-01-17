import { afterNextRender, Component, OnInit, signal } from '@angular/core';

import { ItemsListComponent } from '@components/shared/items-list/items-list.component';
import { SectionHeaderComponent } from '@components/shared/section-header/section-header.component';
import { ApiService } from '@services/api.service';
import { Endpoints } from '@utils/constants';

@Component({
  selector: 'app-history',
  imports: [ItemsListComponent, SectionHeaderComponent],
  template: `<section class="flex flex-col gap-1">
    <app-section-header iconSrc="svg/history-dim.svg" text="History" />
    <app-items-list [items]="history()" [isLoading]="isLoading()" />
  </section>`,
})
export class HistoryComponent implements OnInit {
  constructor(private api: ApiService) {
    afterNextRender(() => {
      setInterval(() => {
        this.fetchHistory();
      }, 60 * 1000);
    });
  }

  history = signal<TrackSimple[]>(Array(50));
  isLoading = signal(true);

  fetchHistory = () => {
    this.api
      .get<TrackSimple[]>(Endpoints.track.history)
      ?.subscribe((response) => {
        this.history.set(response ?? []);
        this.isLoading.set(false);
      });
  };

  ngOnInit() {
    this.fetchHistory();
  }
}
