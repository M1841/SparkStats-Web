import { Component, OnInit, signal } from '@angular/core';

import { ItemsListComponent } from '@components/shared/items-list/items-list.component';
import { ApiService } from '@services/api.service';
import { Endpoints } from '@utils/constants';

@Component({
  selector: 'app-history',
  imports: [ItemsListComponent],
  template: `<div>
    History:
    <app-items-list [items]="history" [(isLoading)]="isLoading" />
  </div>`,
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
