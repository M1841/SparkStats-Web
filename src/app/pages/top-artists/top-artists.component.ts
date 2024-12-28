import { Component } from '@angular/core';

import { RangeSelectComponent } from '@components/shared/range-select/range-select.component';

@Component({
  selector: 'app-top-artists',
  imports: [RangeSelectComponent],
  template: `
    <main>
      <app-range-select />
    </main>
  `,
})
export class TopArtistsComponent {}
