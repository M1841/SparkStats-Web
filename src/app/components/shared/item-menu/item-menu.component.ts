import {
  afterNextRender,
  Component,
  ElementRef,
  input,
  signal,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-item-menu',
  imports: [],
  template: `
    <button
      #buttonRef
      (click)="toggle()"
      class="p-2 rounded-full hover:bg-dark-dim focus:bg-dark-dim outline-none"
    >
      <img src="svg/dots-dim.svg" width="20" height="20" />
    </button>
    @if (isOpen()) {
      <div
        #menuRef
        class="p-2 rounded-md text-sm text-light-dim bg-dark border-[1px] border-medium fixed z-40"
        [style.top.px]="position().y"
        [style.left.px]="position().x"
      >
        [insert menu]
      </div>
    }
  `,
})
export class ItemMenuComponent {
  constructor() {
    afterNextRender(() => {
      window.addEventListener('click', this.handleClick);
      window.addEventListener('scroll', this.handleScroll);

      this.menuRef().nativeElement.style.opacity = 0;
      setTimeout(() => {
        this.position.set(this.computeMenuPosition());
        this.isOpen.set(false);
        this.menuRef().nativeElement.style.opacity = 100;
      }, 10);
    });
  }

  item = input.required<ItemSimple>();
  isOpen = signal(true);
  position = signal({ x: 0, y: 0 });

  buttonRef = viewChild.required<ElementRef>('buttonRef');
  menuRef = viewChild.required<ElementRef>('menuRef');

  toggle = () => {
    this.isOpen.update((state) => !state);
  };

  handleClick = (event: MouseEvent) => {
    if (
      this.isOpen() &&
      !this.buttonRef().nativeElement.contains(event.target as Node) &&
      !this.menuRef().nativeElement.contains(event.target as Node)
    ) {
      this.isOpen.set(false);
    }
  };

  handleScroll = (_: Event) => {
    if (this.isOpen()) {
      this.isOpen.set(false);
    }
  };

  computeMenuPosition = () => {
    const buttonBounds: DOMRect =
      this.buttonRef().nativeElement.getBoundingClientRect();

    const buttonCenterX = (buttonBounds.left + buttonBounds.right) / 2;
    const buttonCenterY = (buttonBounds.top + buttonBounds.bottom) / 2;

    const body = document.getElementsByTagName('body')[0];
    const windowCenterX = Math.min(body.clientWidth, window.screen.width) / 2;
    const windowCenterY = Math.min(body.clientHeight, window.screen.height) / 2;

    let menuX = buttonCenterX;
    let menuY = buttonCenterY;

    if (buttonCenterX > windowCenterX) {
      menuX -= this.menuRef().nativeElement.offsetWidth;
    }
    if (buttonCenterY > windowCenterY) {
      menuY -= this.menuRef().nativeElement.offsetHeight;
    }

    return { x: menuX, y: menuY };
  };
}
