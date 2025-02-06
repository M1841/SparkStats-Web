import { NgTemplateOutlet } from '@angular/common';
import { Component, contentChild, input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-items-list',
  imports: [NgTemplateOutlet],
  template: `
    <ul class="flex flex-col gap-1">
      @for (item of items(); track $index) {
        <ng-container
          *ngTemplateOutlet="itemTemplate(); context: { $implicit: item }"
        />
      }
    </ul>
  `,
})
export class ItemsListComponent {
  itemTemplate = contentChild.required<TemplateRef<any>>('itemTemplate');
  items = input.required<ItemSimple[]>();
}
