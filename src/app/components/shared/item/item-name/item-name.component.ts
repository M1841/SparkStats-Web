import { Component, computed, input } from '@angular/core';

import { describeQuantity } from '@utils/string.extensions';

@Component({
  selector: 'app-item-name',
  imports: [],
  template: `
    @if (url() !== undefined) {
      <a
        [href]="url()"
        class="text-sm outline-none hover:underline focus:underline w-fit"
        target="_blank"
      >
        {{ name() }}
      </a>
    } @else {
      <span class="text-sm flex justify-between w-full">
        {{ name() }}
        @if (details() !== undefined) {
          <span class="text-[0.8rem] text-light-dim pr-2">
            {{ detailsString() }}
          </span>
        }
      </span>
    }
  `,
})
export class ItemNameComponent {
  readonly url = input<string>();
  readonly name = input.required<string>();
  readonly details = input<{
    amount: number;
    measure: string;
  }>();

  readonly detailsString = computed(() => {
    if (this.details() !== undefined) {
      const { amount, measure } = this.details()!;
      return describeQuantity(amount, measure);
    }
    return '';
  });
}
