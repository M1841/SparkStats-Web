import { Component, computed, input } from '@angular/core';

import { describeQuantity } from '@utils/string.extensions';

@Component({
  selector: 'app-item-name',
  imports: [],
  template: `
    @if (url()) {
      <a
        [href]="url()"
        class="text-sm outline-none hover:underline focus:underline w-fit"
        target="_blank"
      >
        {{ name() }}
      </a>
    } @else {
      <span class="text-sm flex justify-between w-full items-center">
        {{ name() }}
        @if (amount() !== undefined) {
          <span class="text-[0.8rem] text-light-dim pr-2">
            {{ amountString() }}
          </span>
        }
      </span>
    }
  `,
})
export class ItemNameComponent {
  readonly url = input<string>();
  readonly name = input.required<string>();
  readonly amount = input<{
    number: number;
    measure: string;
  }>();

  readonly amountString = computed(() => {
    if (this.amount() !== undefined) {
      const { number, measure } = this.amount()!;
      return describeQuantity(number, measure);
    }
    return '';
  });
}
