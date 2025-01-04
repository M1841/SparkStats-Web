import { Component, input, model } from '@angular/core';

import { ItemComponent } from '@components/shared/item/item.component';

@Component({
  selector: 'app-items-list',
  imports: [ItemComponent],
  template: `
    <ul class="flex flex-col gap-2">
      @for (item of items(); track $index) {
        <app-item
          [item]="item"
          [index]="isIndexed() ? $index : null"
          [isLoading]="isLoading()"
        >
          @if (innerComponent !== null) {
            {{ innerComponent() }}
          }
        </app-item>
      }
    </ul>
  `,
})
export class ItemsListComponent {
  items = input.required<ItemSimple[]>();

  isIndexed = input<boolean>(false);
  isLoading = input<boolean>(false);
  innerComponent = input<any>(null);
}
