import { Component, input } from '@angular/core';

@Component({
  selector: 'app-item-subitems',
  imports: [],
  template: `
    <p class="text-[0.8rem] text-light-dim">
      @for (subitem of subitems(); track $index) {
        @if (url(subitem)) {
          <a
            [href]="url(subitem)"
            class="hover:underline focus:underline outline-none"
            target="_blank"
          >
            {{ name(subitem) }}</a
          >{{ separator($index, $count) }}
        } @else {
          {{ name(subitem) }}{{ separator($index, $count) }}
        }
      }
    </p>
  `,
})
export class ItemSubitemsComponent {
  readonly subitems = input.required<Subitem[]>();

  url(subitem: Subitem): string | undefined {
    return (subitem as ArtistBase).url;
  }
  name(subitem: Subitem) {
    return (subitem as ArtistBase).name ?? (subitem as string);
  }
  separator(index: number, total: number) {
    return index < total - 2 ? ',' : index === total - 2 ? ' &' : '';
  }
}

type Subitem = ArtistBase | string;
