import { Component, input } from '@angular/core';

@Component({
  selector: 'app-shuffle-button',
  imports: [],
  template: `
    <button
      (click)="handleClick()"
      class="
        relative p-[0.58rem] rounded-full bg-primary-dark outline-none {{
        !isLoading() && 'hover:bg-primary-medium focus:bg-primary-medium'
      }}"
      [disabled]="isLoading()"
    >
      <img
        src="svg/shuffle-primary.svg"
        width="17"
        height="17"
        class="transition-all duration-200 {{ isLoading() && 'scale-0' }}"
      />
      <img
        src="svg/loader-primary.svg"
        width="19"
        height="19"
        class="
          transition-all duration-200 absolute top-[0.5rem] left-[0.51rem] {{
          !isLoading() ? 'scale-0' : 'animate-spin'
        }}"
      />
    </button>
  `,
})
export class ShuffleButtonComponent {
  readonly playlist = input.required<PlaylistSimple>();
  readonly shuffle = input.required<(id: string) => void>();
  readonly isLoading = input.required<boolean>();

  handleClick() {
    this.shuffle()(this.playlist().id);
  }
}
