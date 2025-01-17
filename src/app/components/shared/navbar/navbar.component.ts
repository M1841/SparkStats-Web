import {
  afterNextRender,
  Component,
  computed,
  ElementRef,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';

import { LogoutButtonComponent } from '@components/shared/logout-button/logout-button.component';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-navbar',
  imports: [LogoutButtonComponent],
  template: `
    <nav class="sticky top-0 z-50">
      <header
        class="
          py-2 px-8 border-b-medium border-b-[1px] flex bg-dark {{
          isAuthenticated() ? 'justify-between' : 'justify-center'
        }}
        "
      >
        <a
          href="/"
          class="
            font-bold text-lg flex-center gap-1 outline-none focus:underline {{
            !isAuthenticated() && 'py-1'
          }}
          "
        >
          <img src="svg/spark.svg" width="20" height="20" />
          SparkStats
        </a>
        @if (isAuthenticated()) {
          <button
            #toggleButton
            (click)="toggleMenu()"
            class="relative p-2 rounded-full hover:bg-dark-dim focus:bg-dark-dim outline-none"
          >
            <img
              src="svg/menu-dim.svg"
              width="20"
              height="20"
              [class]="
                'transition-all duration-200 ' + (isShowingMenu() && 'scale-0')
              "
            />
            <img
              src="svg/close-dim.svg"
              width="20"
              height="20"
              [class]="
                'transition-all duration-200 absolute top-2 ' +
                (!isShowingMenu() && 'scale-0')
              "
            />
          </button>
        }
      </header>
      @if (isAuthenticated()) {
        <aside
          #menu
          [class]="
            'absolute w-48 border-l-medium border-l-[1px] transition-[right] duration-200 bg-dark flex flex-col justify-between ' +
            menuPosition() +
            menuScale()
          "
          [style.height]="'calc(100vh - 20px - 2 * 0.5rem - 2 * 0.5rem)'"
        >
          <section class="p-2 flex flex-col gap-1">
            @for (item of navItems; track $index) {
              <a
                [href]="item.url"
                class="flex p-2 items-center gap-[0.33rem] text-[0.8rem] hover:bg-dark-dim rounded-md focus:bg-dark-dim outline-none"
              >
                <img [src]="item.iconSrc" width="16" height="16" />
                {{ item.name }}
              </a>
            }
          </section>
          <section class="p-2 flex flex-col gap-1">
            <app-logout-button />
          </section>
        </aside>
      }
    </nav>
  `,
})
export class NavbarComponent implements OnInit {
  constructor(private api: ApiService) {
    afterNextRender(() => {
      window.addEventListener('keydown', this.handleKeydown);
      window.addEventListener('click', this.handleClickOutside);
    });
  }
  isAuthenticated = signal(false);

  isShowingMenu = signal(false);
  menuPosition = computed(() =>
    this.isShowingMenu() ? 'right-0 ' : '-right-48 ',
  );
  menuScale = signal('scale-x-0');

  navItems = [
    {
      iconSrc: 'svg/music.svg',
      name: 'Top Tracks',
      url: '/top-tracks',
    },
    {
      iconSrc: 'svg/microphone.svg',
      name: 'Top Artists',
      url: '/top-artists',
    },
    {
      iconSrc: 'svg/music-list.svg',
      name: 'Playlist Shuffler',
      url: '/shuffle',
    },
  ];

  menu = viewChild.required<ElementRef>('menu');
  toggleButton = viewChild.required<ElementRef>('toggleButton');

  toggleMenu = () => {
    this.isShowingMenu.update((state) => !state);
    setTimeout(
      () => {
        this.menuScale.update((state) => (state === '' ? 'scale-x-0' : ''));
      },
      this.isShowingMenu() ? 0 : 200,
    );
  };

  handleKeydown = (event: KeyboardEvent) => {
    if (event.key === '`') {
      event.preventDefault();
      this.toggleMenu();

      if (this.isShowingMenu()) {
        this.menu().nativeElement.firstChild.firstChild.focus();
      }
    }
    if (event.key === 'Tab') {
      setTimeout(() => {
        if (
          !this.isShowingMenu() &&
          this.menu().nativeElement.contains(document.activeElement)
        ) {
          this.toggleMenu();
        }
        if (
          this.isShowingMenu() &&
          !this.menu().nativeElement.contains(document.activeElement)
        ) {
          this.toggleMenu();
        }
      }, 10);
    }
  };

  handleClickOutside = (event: MouseEvent) => {
    if (
      this.isShowingMenu() &&
      !this.menu().nativeElement.contains(event.target as Node) &&
      !this.toggleButton().nativeElement.contains(event.target as Node)
    ) {
      this.toggleMenu();
    }
  };

  ngOnInit() {
    this.isAuthenticated.set(this.api.isAuthenticated());
  }
}
