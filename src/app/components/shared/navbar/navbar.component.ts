import {
  afterNextRender,
  Component,
  computed,
  input,
  OnInit,
  signal,
} from '@angular/core';

import { LogoutButtonComponent } from '@components/shared/logout-button/logout-button.component';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-navbar',
  imports: [LogoutButtonComponent],
  template: `
    <nav class="sticky top-0">
      <header
        class="py-2 px-8 border-b-medium border-b-[1px] flex justify-between sticky top-0 bg-dark"
      >
        <a href="/" class="font-bold text-lg flex-center gap-1">
          <img src="svg/spark.svg" width="20" height="20" />
          SparkStats
        </a>
        @if (isAuthenticated) {
          <button
            (click)="toggleMenu()"
            class="relative p-2 rounded-full hover:bg-darkDim"
          >
            <img
              src="svg/menu.svg"
              width="20"
              height="20"
              [class]="
                'transition-all duration-200 ' + (isShowingMenu() && 'scale-0')
              "
            />
            <img
              src="svg/close.svg"
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
      @if (isAuthenticated) {
        <aside
          [class]="
            'absolute w-52 border-l-medium border-l-[1px] transition-all duration-200 bg-dark flex flex-col justify-between ' +
            horizontalPosition()
          "
          style="height: calc(100vh - 20px - 2 * 0.5rem - 2 * 0.5rem)"
        >
          <section class="p-2 flex flex-col gap-1">
            @for (item of navItems; track $index) {
              <a
                [href]="item.url"
                class="flex p-2 items-center gap-2 text-[0.9rem] hover:bg-darkDim rounded-md"
              >
                <img [src]="item.iconSrc" width="18" height="18" />
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
    });
  }
  isAuthenticated = false;

  isShowingMenu = signal(false);
  horizontalPosition = computed(() =>
    this.isShowingMenu() ? 'right-0' : '-right-52',
  );

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

  toggleMenu = () => this.isShowingMenu.update((state) => !state);

  handleKeydown = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === 'b') {
      event.preventDefault();
      this.toggleMenu();
    }
  };

  ngOnInit() {
    this.isAuthenticated = this.api.isAuthenticated();
  }
}
