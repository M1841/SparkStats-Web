import { Component, model } from '@angular/core';

@Component({
  selector: 'app-range-select',
  imports: [],
  template: `
    <input
      type="radio"
      name="range"
      value="0"
      (change)="toggleRange(0)"
      checked
    />
    <input type="radio" name="range" value="1" (change)="toggleRange(1)" />
    <input type="radio" name="range" value="2" (change)="toggleRange(2)" />
  `,
})
export class RangeSelectComponent {
  range = model(0);

  toggleRange = (range: number) => {
    this.range.set(range);
  };
}
