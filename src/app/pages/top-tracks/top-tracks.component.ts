import { Component } from '@angular/core';

import { RangeSelectComponent } from '@components/shared/range-select/range-select.component';

@Component({
  selector: 'app-top-tracks',
  imports: [RangeSelectComponent],
  template: `
    <main>
      <app-range-select />
    </main>
  `,
})
export class TopTracksComponent {}
