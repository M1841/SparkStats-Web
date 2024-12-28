import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { environment } from '@environments/environment';
import { ItemComponent } from '@components/shared/item/item.component';

@Component({
  selector: 'app-currently-playing',
  imports: [ItemComponent],
  template: `<div>
    Currently Playing: @if(track !== null) {
    <app-item [item]="track" />} @else { No track is currently playing }
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
        if (res.status === 200 || res.status === 204) {
          this.track = res.body;
        } else {
          this.cookies.deleteAll();
          window.location.href = '/';
        }
      });
  }
}
