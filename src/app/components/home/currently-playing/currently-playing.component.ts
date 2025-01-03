import { Component, OnInit } from '@angular/core';

import { ItemComponent } from '@components/shared/item/item.component';
import { ApiService } from '@services/api.service';
import { Endpoints } from '@utils/constants';

@Component({
  selector: 'app-currently-playing',
  imports: [ItemComponent],
  template: `<div>
    Currently Playing:
    @if (track !== null) {
      <app-item [item]="track" />
    } @else {
      No track is currently playing
    }
  </div>`,
})
export class CurrentlyPlayingComponent implements OnInit {
  constructor(private api: ApiService) {}

  track: TrackSimple | null = null;

  ngOnInit() {
    this.api
      .get<TrackSimple>(Endpoints.track.current)
      ?.subscribe((response) => {
        this.track = response;
      });
  }
}
