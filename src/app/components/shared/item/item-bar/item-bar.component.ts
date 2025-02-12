import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-item-bar',
  imports: [],
  template: `
    <span class="mt-2 w-full flex h-1 rounded-sm bg-primary-dark">
      <span
        class="h-full rounded-sm bg-primary-light"
        [style.width]="width() + '%'"
      ></span>
      <span
        class="h-[0.45rem] w-[0.45rem] rounded-full bg-primary-light -ml-1 -mt-[0.1rem]"
      ></span>
    </span>
  `,
})
export class ItemBarComponent {
  readonly maxAmount = input.required<number>();
  readonly amount = input.required<number>();
  readonly width = computed(() => {
    if (this.maxAmount() === 0) {
      return 100;
    }
    return Math.round((this.amount() / this.maxAmount()) * 100);
  });
}
