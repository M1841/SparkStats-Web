import { Routes } from '@angular/router';

import { HomeComponent } from '@pages/home/home.component';
import { TopTracksComponent } from '@pages/top-tracks/top-tracks.component';
import { TopArtistsComponent } from '@pages/top-artists/top-artists.component';
import { ShuffleComponent } from '@pages/shuffle/shuffle.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'top-tracks', component: TopTracksComponent },
  { path: 'top-artists', component: TopArtistsComponent },
  { path: 'shuffle', component: ShuffleComponent },
];
