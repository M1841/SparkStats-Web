import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

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
      <app-item [item]="profile()" [isLoading]="isLoading()" />
    </section>
  `,
})
export class UserProfileComponent {
  private readonly api = inject(ApiService);
  private readonly fetchProfile$ = this.api
    .get<UserProfileSimple>(Endpoints.user.profile)
    .pipe(tap(() => this.isLoading.set(false)));

  readonly profile = toSignal(this.fetchProfile$, {
    initialValue: null,
  });
  readonly isLoading = signal(true);
}
