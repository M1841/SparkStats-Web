import { Component } from '@angular/core';

@Component({
  selector: 'app-item-loading',
  imports: [],
  template: `
    <span
      class="h-12 w-12 aspect-square rounded-sm bg-dark-dim animate-pulse"
    ></span>
    <main class="flex flex-col justify-center w-full">
      <span class="h-4 w-24 rounded-sm bg-dark-dim animate-pulse mb-2"></span>
      <span class="h-3 w-36 rounded-sm bg-dark-dim animate-pulse"></span>
    </main>
  `,
})
export class ItemLoadingComponent {}
