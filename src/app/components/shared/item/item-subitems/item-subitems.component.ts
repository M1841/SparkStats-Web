import { Component, input } from '@angular/core';

@Component({
  selector: 'app-item-subitems',
  imports: [],
  template: `
    <p class="text-[0.8rem] text-light-dim">
      @for (subitem of subitems(); track $index) {
        @if (url(subitem) !== undefined) {
          <a
            [href]="url(subitem)"
            class="hover:underline focus:underline outline-none"
            target="_blank"
          >
            {{ text(subitem, $index, $count) }}
          </a>
        } @else {
          {{ text(subitem, $index, $count) }}
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
  text(subitem: Subitem, index: number, total: number) {
    return this.name(subitem) + this.separator(index, total);
  }
  private name(subitem: Subitem) {
    return (subitem as ArtistBase).name ?? (subitem as string);
  }
  private separator(index: number, total: number) {
    return index < total - 2 ? ',' : index === total - 2 ? ' &' : '';
  }
}

type Subitem = ArtistBase | string;
