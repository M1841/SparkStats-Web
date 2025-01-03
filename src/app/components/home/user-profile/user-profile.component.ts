import { Component, OnInit, signal } from '@angular/core';

import { ApiService } from '@services/api.service';
import { SectionHeaderComponent } from '@components/shared/section-header/section-header.component';
import { Endpoints } from '@utils/constants';
import { ItemComponent } from '../../shared/item/item.component';

@Component({
  selector: 'app-user-profile',
  imports: [ItemComponent, SectionHeaderComponent],
  template: ` <section class="flex flex-col gap-2">
    <app-section-header iconSrc="svg/user.svg" text="Your Profile" />
    <app-item [item]="profile" [(isLoading)]="isLoading" />
  </section>`,
})
export class UserProfileComponent implements OnInit {
  constructor(private api: ApiService) {}

  profile: UserProfileSimple | null = null;
  isLoading = signal(true);

  ngOnInit() {
    this.api
      .get<UserProfileSimple>(Endpoints.user.profile)
      ?.subscribe((response) => {
        this.profile = response;
        this.isLoading.set(false);
      });
  }
}
