import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-range-select',
  imports: [],
  template: `<div>[range-select]</div>`,
})
export class RangeSelectComponent {
  range = signal<TimeRange>('short-term');
}
