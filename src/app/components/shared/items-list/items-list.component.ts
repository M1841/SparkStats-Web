import { Component, contentChild, input, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-items-list',
  imports: [NgTemplateOutlet],
  template: `
    <ul class="flex flex-col gap-[0.35rem]">
      @for (item of items(); track $index) {
        <ng-container
          *ngTemplateOutlet="
            itemTemplate();
            context: { $implicit: item, index: $index }
          "
        />
      }
    </ul>
  `,
})
export class ItemsListComponent {
  readonly itemTemplate =
    contentChild.required<TemplateRef<any>>('itemTemplate');
  readonly items = input.required<ItemSimple[]>();
}
