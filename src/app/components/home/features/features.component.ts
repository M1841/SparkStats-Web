import { Component } from '@angular/core';

@Component({
  selector: 'app-features',
  imports: [],
  template: `<div>
    @for (feature of features; track $index) {
    <a [href]="feature.url">{{ feature.name }}</a>
    }
  </div>`,
})
export class FeaturesComponent {
  features = [
    {
      name: 'Your Top Tracks',
      url: '/top-tracks',
    },
    {
      name: 'Your Top Artists',
      url: '/top-artists',
    },
    {
      name: 'Playlist Shuffler',
      url: '/shuffle',
    },
  ];
}
