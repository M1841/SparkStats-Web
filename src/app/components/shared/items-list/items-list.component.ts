import { Component, input, model } from '@angular/core';

import { ItemComponent } from '@components/shared/item/item.component';

@Component({
  selector: 'app-items-list',
  imports: [ItemComponent],
  template: `
    @for (item of items(); track $index) {
      <app-item
        [item]="item"
        [index]="isIndexed() ? $index : null"
        [(isLoading)]="isLoading"
      >
        @if (innerComponent !== null) {
          {{ innerComponent() }}
        }
      </app-item>
    }
  `,
})
export class ItemsListComponent {
  items = input<ItemSimple[]>();

  isIndexed = input<boolean>(false);
  isLoading = model<boolean>(false);
  innerComponent = input<any>(null);
}
