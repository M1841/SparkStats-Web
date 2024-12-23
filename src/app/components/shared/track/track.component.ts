import { Component, input } from '@angular/core';

@Component({
  selector: 'app-track',
  imports: [],
  template: `
    <img [src]="track().pictureUrl" alt="cover picture" />
    {{ track().title }}
    @for (artist of track().artists; track $index) {
    {{ artist?.name }}
    }
  `,
})
export class TrackComponent {
  track = input.required<TrackSimple>();
}
