import { Component } from '@angular/core';

import { TopItemsComponent } from '@components/shared/top-items/top-items.component';
import { Endpoints } from '@utils/constants';

@Component({
  selector: 'app-top-artists',
  imports: [TopItemsComponent],
  template: `<app-top-items [endpoint]="endpoint" />`,
})
export class TopArtistsComponent {
  endpoint = Endpoints.artist.top;
}
