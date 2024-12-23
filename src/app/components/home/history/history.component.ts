import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { environment } from '@environments/environment';
import { TrackComponent } from '@components/shared/track/track.component';

@Component({
  selector: 'app-history',
  imports: [TrackComponent],
  template: `<div>
    History: @for (historyTrack of history; track $index) {
    <app-track [track]="historyTrack" />
    }
  </div>`,
})
export class HistoryComponent implements OnInit {
  constructor(private cookies: CookieService, private http: HttpClient) {}

  history: TrackSimple[] = [];

  ngOnInit() {
    this.http
      .get<TrackSimple[]>(`${environment.backendUrl}/track/history`, {
        headers: {
          Authorization: `Bearer ${this.cookies.get('access_token')}`,
        },
        observe: 'response',
      })
      .subscribe((res) => {
        if (res.status === 200 || res.body === null) {
          this.history = res.body!;
        } else {
          this.cookies.deleteAll();
          window.location.href = '/';
        }
      });
  }
}
