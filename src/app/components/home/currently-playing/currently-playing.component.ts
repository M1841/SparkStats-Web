import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { environment } from '@environments/environment';
import { TrackComponent } from '@components/shared/track/track.component';

@Component({
  selector: 'app-currently-playing',
  imports: [TrackComponent],
  template: `<div>
    Currently Playing:
    <app-track [track]="track!" />
  </div>`,
})
export class CurrentlyPlayingComponent implements OnInit {
  constructor(private cookies: CookieService, private http: HttpClient) {}

  track: TrackSimple | null = null;

  ngOnInit() {
    this.http
      .get<TrackSimple>(`${environment.backendUrl}/track/current`, {
        headers: {
          Authorization: `Bearer ${this.cookies.get('access_token')}`,
        },
        observe: 'response',
      })
      .subscribe((res) => {
        if (res.status === 200) {
          this.track = res.body;
        } else {
          this.cookies.deleteAll();
          window.location.href = '/';
        }
      });
  }
}
