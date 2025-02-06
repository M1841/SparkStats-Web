import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { ItemComponent } from '@components/shared/item/item.component';
import { SectionHeaderComponent } from '@components/shared/section-header/section-header.component';
import { ApiService } from '@services/api.service';
import { Endpoints } from '@utils/constants';
import { tap } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  imports: [ItemComponent, SectionHeaderComponent],
  template: `
    <section class="flex flex-col gap-1">
      <app-section-header iconSrc="svg/user-dim.svg" text="Your Profile" />
      <app-item [item]="profile$()" [isLoading]="isLoading()" />
    </section>
  `,
})
export class UserProfileComponent {
  private api = inject(ApiService);
  isLoading = signal(true);

  fetchProfile$ = this.api
    .get<UserProfileSimple>(Endpoints.user.profile)
    .pipe(tap(() => this.isLoading.set(false)));
  profile$ = toSignal(this.fetchProfile$, {
    initialValue: null,
  });
}
