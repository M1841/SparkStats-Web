import { Component, model } from '@angular/core';

@Component({
  selector: 'app-context-menu',
  imports: [],
  template: ` @if (isOpen()) {
    <div
      class="fixed text-sm text-lightDim bg-dark border-[1px] border-medium rounded-md p-2
      top-[{{ position().y }}px] left-[{{ position().x }}px]"
    >
      aaa
    </div>
  }`,
})
export class ContextMenuComponent {
  isOpen = model(false);
  position = model({ x: 0, y: 0 });
}
