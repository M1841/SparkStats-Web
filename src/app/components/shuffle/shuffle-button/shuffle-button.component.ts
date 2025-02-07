import { Component, input, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-shuffle-button',
  imports: [],
  template: `
    <button
      (click)="handleClick()"
      [class]="
        'relative p-[0.58rem] rounded-full bg-primary-dark outline-none ' +
        (!isLoading() && 'hover:bg-primary-medium focus:bg-primary-medium')
      "
      [disabled]="isLoading()"
    >
      <img
        src="svg/shuffle-primary.svg"
        width="17"
        height="17"
        [class]="'transition-all duration-200 ' + (isLoading() && 'scale-0')"
      />
      <img
        src="svg/loader-primary.svg"
        width="19"
        height="19"
        [class]="
          'transition-all duration-200 absolute top-[0.5rem] left-[0.51rem] ' +
          (!isLoading() ? 'scale-0' : 'animate-spin')
        "
      />
    </button>
  `,
})
export class ShuffleButtonComponent {
  playlist = input.required<PlaylistSimple>();
  shuffle =
    input.required<
      (id: string, isButtonLoading: WritableSignal<boolean>) => void
    >();
  isLoading = signal<boolean>(false);

  handleClick = () => {
    this.isLoading.set(true);
    this.shuffle()(this.playlist().id, this.isLoading);
  };
}
