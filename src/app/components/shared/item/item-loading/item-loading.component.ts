import { Component, input } from '@angular/core';

@Component({
  selector: 'app-item-loading',
  imports: [],
  template: `
    @if (layout().picture) {
      <span
        class="h-12 w-12 aspect-square rounded-sm bg-dark-dim animate-pulse"
      ></span>
    }
    <main class="flex flex-col justify-center w-full gap-2 pr-2">
      @if (layout().name) {
        <span class="text-sm flex justify-between items-center w-full">
          <span class="h-4 w-24 rounded-sm bg-dark-dim animate-pulse"></span>
          @if (layout().amount) {
            <span class="h-4 w-16 rounded-sm bg-dark-dim animate-pulse"></span>
          }
        </span>
      }
      @if (layout().subitems) {
        <span class="h-3 w-36 rounded-sm bg-dark-dim animate-pulse"></span>
      }
      @if (layout().bar) {
        <span
          class="h-[0.4rem] mt-[0.15rem] rounded-sm w-full bg-dark-dim animate-pulse"
        ></span>
      }
      @if (layout().action) {}
    </main>
  `,
})
export class ItemLoadingComponent {
  readonly layout = input.required<LoadingLayout>();
}
