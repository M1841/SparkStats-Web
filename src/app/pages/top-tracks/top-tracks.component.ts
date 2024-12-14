import { Component } from '@angular/core';

import { RangeSelectComponent } from '@components/ui/range-select/range-select.component';
import { TracksComponent } from '@components/top-tracks/tracks/tracks.component';

@Component({
  selector: 'app-top-tracks',
  imports: [RangeSelectComponent, TracksComponent],
  template: `
    <main>
      <app-range-select />
      <app-tracks />
    </main>
  `,
})
export class TopTracksComponent {}
