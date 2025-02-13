import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';

import { ItemComponent } from '@components/shared/item/item.component';
import { SectionHeaderComponent } from '@components/shared/section-header/section-header.component';
import { ApiService } from '@services/api.service';
import { Endpoints } from '@utils/constants';

@Component({
  selector: 'app-user-profile',
  imports: [ItemComponent, SectionHeaderComponent],
  template: `
    <section class="flex flex-col gap-1">
      <app-section-header iconSrc="svg/user-dim.svg" text="Your Profile" />
      <app-item
        [item]="profile()"
        [isLoading]="isLoading()"
        [layout]="layout"
        altIconSrc="svg/user-dim.svg"
      />
    </section>
  `,
})
export class UserProfileComponent {
  private readonly noProfile: UserProfileSimple = {
    id: '',
    url: '',
    name: '',
  };
  private readonly api = inject(ApiService);
  private readonly fetchProfile$ = this.api
    .get<UserProfileSimple>(Endpoints.user.profile)
    .pipe(
      map((profile) => profile ?? this.noProfile),
      tap(() => this.isLoading.set(false)),
    );

  readonly profile = toSignal(this.fetchProfile$, {
    initialValue: this.noProfile,
  });
  readonly isLoading = signal(true);
  readonly layout: LoadingLayout = {
    picture: true,
    name: true,
  };
}
