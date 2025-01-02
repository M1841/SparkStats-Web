import { Component, OnInit } from '@angular/core';

import { ItemsListComponent } from '@components/shared/items-list/items-list.component';
import { ApiService } from '@services/api.service';
import { Endpoints } from '@utils/constants';

@Component({
  selector: 'app-history',
  imports: [ItemsListComponent],
  template: `<div>
    History:
    <app-items-list [items]="history" />
  </div>`,
})
export class HistoryComponent implements OnInit {
  constructor(private api: ApiService) {}

  history: TrackSimple[] = [];

  ngOnInit() {
    this.api
      .get<TrackSimple[]>(Endpoints.track.history)
      .subscribe(({ result, error }) => {
        if (error !== null) {
          window.location.href = '/';
        }
        this.history = result ?? [];
      });
  }
}
