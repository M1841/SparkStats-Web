import { Routes } from '@angular/router';

import { HomeComponent } from '@pages/home/home.component';
import { TopTracksComponent } from '@pages/top-tracks/top-tracks.component';
import { TopArtistsComponent } from '@pages/top-artists/top-artists.component';
import { TopGenresComponent } from '@pages/top-genres/top-genres.component';
import { ShuffleComponent } from '@pages/shuffle/shuffle.component';
import { AuthCallbackComponent } from '@pages/auth-callback/auth-callback.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'top-tracks', component: TopTracksComponent },
  { path: 'top-artists', component: TopArtistsComponent },
  { path: 'top-genres', component: TopGenresComponent },
  { path: 'shuffle', component: ShuffleComponent },
  { path: 'auth-callback', component: AuthCallbackComponent },
];
