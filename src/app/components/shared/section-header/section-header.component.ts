import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  imports: [],
  template: `
    <span class="text-lightDim text-sm flex gap-1 items-center">
      <img [src]="iconSrc()" width="16" height="16" />
      {{ text() }}
    </span>
  `,
})
export class SectionHeaderComponent {
  iconSrc = input.required<string>();
  text = input.required<string>();
}
