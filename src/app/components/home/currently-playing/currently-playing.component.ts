import { afterNextRender, Component, OnInit, signal } from '@angular/core';

import { ItemComponent } from '@components/shared/item/item.component';
import { SectionHeaderComponent } from '@components/shared/section-header/section-header.component';
import { ApiService } from '@services/api.service';
import { Endpoints } from '@utils/constants';

@Component({
  selector: 'app-currently-playing',
  imports: [ItemComponent, SectionHeaderComponent],
  template: `<section class="flex flex-col gap-1">
    <app-section-header iconSrc="svg/bars-dim.svg" text="Now Playing" />
    <app-item [item]="track()" [isLoading]="isLoading()" />
  </section>`,
})
export class CurrentlyPlayingComponent implements OnInit {
  constructor(private api: ApiService) {
    afterNextRender(() => {
      setInterval(() => {
        this.fetchTrack();
      }, 60 * 1000);
    });
  }

  track = signal<TrackSimple>({
    id: '',
    name: 'No track is currently playing',
    artists: [],
  });
  isLoading = signal(true);

  fetchTrack = () => {
    this.api
      .get<TrackSimple>(Endpoints.track.current)
      ?.subscribe((response) => {
        if (response !== null) {
          this.track.set(response);
        }
        this.isLoading.set(false);
      });
  };

  ngOnInit() {
    this.fetchTrack();
  }
}
