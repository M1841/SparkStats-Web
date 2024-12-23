import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { environment } from '@environments/environment';

@Component({
  selector: 'app-range-select',
  imports: [],
  template: `<div>[range-select]</div>`,
})
export class RangeSelectComponent implements OnInit {
  constructor(private cookies: CookieService, private http: HttpClient) {}

  tracks: TrackSimple[] = [];

  reqs = Array(3).map((_, idx) => console.log(idx));

  ngOnInit() {
    forkJoin(
      [...Array(3)].map((_, idx) => {
        return this.http.get<TrackSimple[]>(
          `${environment.backendUrl}/track/top?range=${idx}`,
          {
            headers: {
              Authorization: `Bearer ${this.cookies.get('access_token')}`,
            },
            observe: 'response',
          }
        );
      })
    ).subscribe((responses) => {
      if (!responses.every((res) => res.status === 200)) {
      }
    });
  }
}
