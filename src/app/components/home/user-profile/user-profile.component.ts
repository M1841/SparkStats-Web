import { Component, OnInit } from '@angular/core';

import { ApiService } from '@services/api.service';
import { Endpoints } from '@utils/constants';

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
  constructor(private api: ApiService) {}

  profile: Profile | null = null;

  ngOnInit() {
    this.api.get<Profile>(Endpoints.user.profile)?.subscribe((response) => {
      this.profile = response;
    });
  }
}
