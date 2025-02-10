import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  imports: [],
  template: `
    <span class="text-light-dim text-[0.8rem] flex gap-1 items-center">
      <img [src]="iconSrc()" width="14" height="14" />
      {{ text() }}
    </span>
  `,
})
export class SectionHeaderComponent {
  readonly iconSrc = input.required<string>();
  readonly text = input.required<string>();
}
