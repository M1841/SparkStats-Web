import { computed, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs';

import { environment } from '@environments/environment';
import { Router } from '@angular/router';
import { Endpoints } from '@utils/constants';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private cookies: CookieService,
    private http: HttpClient,
    private router: Router,
  ) {}

  isAuthenticated = computed(() => !!this.cookies.get('access_token'));

  refresh = () => {
    const expiresAt = parseInt(this.cookies.get('expires_at'));

    if (expiresAt <= Date.now()) {
      this.http
        .post<{
          accessToken: string;
          expiresAt: string;
        }>(`${environment.backendUrl}/${Endpoints.auth.refresh}`, {
          refreshToken: this.cookies.get('refresh_token'),
        })
        .subscribe(({ accessToken, expiresAt }) => {
          [
            ['access_token', accessToken],
            ['expires_at', expiresAt],
          ].forEach(([key, value]) => {
            this.cookies.set(key, value, {
              secure: true,
              sameSite: 'Strict',
            });
          });
        });
    }
  };

  logout = () => {
    this.cookies.deleteAll();
    this.router.navigate(['/']);
  };

  get = <Res>(endpoint: Endpoint, params: string = '') => {
    if (!this.isAuthenticated()) {
      this.router.navigate(['/']);
      return null;
    }
    this.refresh();

    return this.http
      .get<Res>(`${environment.backendUrl}/${endpoint}${params}`, {
        headers: {
          Authorization: `Bearer ${this.cookies.get('access_token')}`,
        },
        observe: 'response',
      })
      .pipe(
        map((response) => {
          if ([200, 204].includes(response.status)) {
            return response.body;
          } else {
            this.logout();
            return null;
          }
        }),
      );
  };

  post = <Res, Req>(endpoint: Endpoint, body: Req) => {
    if (!this.isAuthenticated()) {
      this.router.navigate(['/']);
      return null;
    }
    this.refresh();

    return this.http
      .post<Res>(`${environment.backendUrl}/${endpoint}`, body, {
        headers: {
          Authorization: `Bearer ${this.cookies.get('access_token')}`,
        },
        observe: 'response',
      })
      .pipe(
        map((response) => {
          if ([200, 204].includes(response.status)) {
            return response.body;
          } else {
            this.logout();
            return null;
          }
        }),
      );
  };
}
