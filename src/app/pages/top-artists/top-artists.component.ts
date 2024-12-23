import { Component } from '@angular/core';

import { RangeSelectComponent } from '@components/shared/range-select/range-select.component';
import { ArtistsComponent } from '@components/top-artists/artists/artists.component';

@Component({
  selector: 'app-top-artists',
  imports: [RangeSelectComponent, ArtistsComponent],
  template: `
    <main>
      <app-range-select />
      <app-artists />
    </main>
  `,
})
export class TopArtistsComponent {}
