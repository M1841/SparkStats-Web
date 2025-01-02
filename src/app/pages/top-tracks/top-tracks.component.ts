import { Component } from '@angular/core';

import { TopItemsComponent } from '@pages/shared/top-items/top-items.component';
import { Endpoints } from '@utils/constants';

@Component({
  selector: 'app-top-tracks',
  imports: [TopItemsComponent],
  template: ` <app-top-items [endpoint]="endpoint" /> `,
})
export class TopTracksComponent {
  endpoint = Endpoints.track.top;
}
