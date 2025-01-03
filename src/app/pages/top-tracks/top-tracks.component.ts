import { Component } from '@angular/core';

import { TopItemsComponent } from '@components/shared/top-items/top-items.component';
import { Endpoints } from '@utils/constants';

@Component({
  selector: 'app-top-tracks',
  imports: [TopItemsComponent],
  template: `
    <app-top-items
      [endpoint]="endpoint"
      [sectionHeader]="{
        iconSrc: 'svg/music-dim.svg',
        text: 'Your Top Tracks',
      }"
    />
  `,
})
export class TopTracksComponent {
  endpoint = Endpoints.track.top;
}
