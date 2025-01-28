import { Component, input } from '@angular/core';

import { ItemComponent } from '@components/shared/item/item.component';

@Component({
  selector: 'app-items-list',
  imports: [ItemComponent],
  template: `
    <ul class="flex flex-col gap-1">
      @for (item of items(); track $index) {
        <app-item
          [item]="item"
          [index]="isIndexed() ? $index : null"
          [isLoading]="isLoading()"
          [innerComponentKey]="innerComponentKey()"
          [innerMethod]="innerMethod()"
        />
      }
    </ul>
  `,
})
export class ItemsListComponent {
  items = input.required<ItemSimple[]>();

  isIndexed = input<boolean>(false);
  isLoading = input<boolean>(false);
  innerComponentKey = input<string>('');
  innerMethod = input<(arg0: any, arg1: any) => any>();
}
