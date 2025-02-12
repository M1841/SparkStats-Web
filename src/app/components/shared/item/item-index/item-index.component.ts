import { Component, input } from '@angular/core';

@Component({
  selector: 'app-item-index',
  imports: [],
  template: `
    <span class="text-[0.8rem] text-light-dim w-8 text-center block">
      #{{ index() + 1 }}
    </span>
  `,
})
export class ItemIndexComponent {
  index = input.required<number>();
}
