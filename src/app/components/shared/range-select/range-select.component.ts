import { Component, HostListener, model } from '@angular/core';

import { SectionHeaderComponent } from '@components/shared/section-header/section-header.component';

@Component({
  selector: 'app-range-select',
  imports: [SectionHeaderComponent],
  template: `<section class="flex flex-col gap-1">
    <app-section-header iconSrc="svg/calendar-dim.svg" text="Time Range" />
    <div class="flex gap-1 -mx-2">
      @for (range of ranges; track range.value) {
        <label
          [class]="
            'border-[1px] rounded-md p-2 w-1/3 text-[0.8rem] flex-center cursor-pointer ' +
            (selectedRange() === range.value
              ? 'border-primary-dark text-primary-light bg-primary-dark hover:border-primary-medium hover:bg-primary-medium'
              : 'border-medium text-light-dim hover:bg-dark-dim')
          "
        >
          {{ range.name }}
          <input
            class="hidden scale-0 opacity-0"
            type="radio"
            name="range"
            [value]="range.value"
            (change)="toggleRange(range.value)"
            [checked]="selectedRange() === range.value"
        /></label>
      }
    </div>
  </section> `,
})
export class RangeSelectComponent {
  selectedRange = model(0);

  ranges = [
    {
      value: 0,
      name: '4 Weeks',
    },
    {
      value: 1,
      name: '6 Months',
    },
    {
      value: 2,
      name: '1 Year',
    },
  ];

  toggleRange = (range: number) => {
    this.selectedRange.set(range);
  };

  @HostListener('window:keydown', ['$event'])
  handleKeydown = (event: KeyboardEvent) => {
    if ([1, 2, 3].includes(parseInt(event.key))) {
      event.preventDefault();
      this.selectedRange.set(parseInt(event.key) - 1);
    }
  };
}
