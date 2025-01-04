import { Component, model } from '@angular/core';
import { SectionHeaderComponent } from '@components/shared/section-header/section-header.component';

@Component({
  selector: 'app-range-select',
  imports: [SectionHeaderComponent],
  template: `<section class="flex flex-col gap-2">
    <app-section-header iconSrc="svg/calendar-dim.svg" text="Time Range" />
    <div class="flex gap-2 -mx-2">
      @for (range of ranges; track range.value) {
        <label
          [class]="
            'border-[1px] rounded-lg p-2 w-1/3 text-sm flex-center cursor-pointer ' +
            (selectedRange() === range.value
              ? 'border-primaryDark text-primaryLight bg-primaryDark hover:border-primaryMedium hover:bg-primaryMedium'
              : 'border-medium text-lightDim hover:bg-darkDim')
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
}
