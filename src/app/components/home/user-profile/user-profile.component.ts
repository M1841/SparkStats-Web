import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { environment } from '@environments/environment';

@Component({
  selector: 'app-user-profile',
  imports: [],
  template: ` <div>
    Your Profile:
    <a [href]="profile?.url">
      <img [src]="profile?.pictureUrl" alt="profile picture" />
      {{ profile?.name }}
    </a>
  </div>`,
})
export class UserProfileComponent implements OnInit {
  constructor(private cookies: CookieService, private http: HttpClient) {}

  profile: Profile | null = null;

  ngOnInit() {
    this.http
      .get<Profile>(`${environment.backendUrl}/user/profile`, {
        headers: {
          Authorization: `Bearer ${this.cookies.get('access_token')}`,
        },
        observe: 'response',
      })
      .subscribe((res) => {
        if (res.status === 200) {
          this.profile = res.body;
        } else {
          this.cookies.deleteAll();
          window.location.href = '/';
        }
      });
  }
}
