import { Component, OnInit, signal } from '@angular/core';

import { ItemComponent } from '@components/shared/item/item.component';
import { ApiService } from '@services/api.service';
import { Endpoints } from '@utils/constants';

@Component({
  selector: 'app-currently-playing',
  imports: [ItemComponent],
  template: `<div>
    Currently Playing:
    <app-item [item]="track" [(isLoading)]="isLoading" />
  </div>`,
})
export class CurrentlyPlayingComponent implements OnInit {
  constructor(private api: ApiService) {}

  track: TrackSimple | null = {
    id: '',
    name: 'No track is currently playing',
    artists: [],
  };
  isLoading = signal(true);

  ngOnInit() {
    this.api
      .get<TrackSimple>(Endpoints.track.current)
      ?.subscribe((response) => {
        if (response !== null) {
          this.track = response;
        }
        this.isLoading.set(false);
      });
  }
}
