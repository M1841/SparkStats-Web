import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <!-- <nav>[navbar]</nav> -->
    <router-outlet />
  `,
})
export class AppComponent {}
