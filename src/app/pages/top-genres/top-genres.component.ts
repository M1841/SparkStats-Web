import { Component } from '@angular/core';

import { TopItemsComponent } from '@components/shared/top-items/top-items.component';
import { Endpoints } from '@utils/constants';

@Component({
  selector: 'app-top-genres',
  imports: [TopItemsComponent],
  template: `
    <app-top-items
      [endpoint]="endpoint"
      [sectionHeader]="{
        iconSrc: 'svg/waveform-dim.svg',
        text: 'Your Top Genres',
      }"
    />
  `,
})
export class TopGenresComponent {
  readonly endpoint = Endpoints.genre.top;
}
