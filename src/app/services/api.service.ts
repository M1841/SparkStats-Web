import { computed, inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { map, of } from 'rxjs';

import { environment } from '@environments/environment';
import { Endpoints } from '@utils/constants';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly cookies = inject(CookieService);
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  readonly isAuthenticated = computed(() => !!this.cookies.get('access_token'));

  private readonly refresh = () => {
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

  logout() {
    this.cookies.deleteAll();
    this.router.navigate(['/']);
  }

  get<Res>(endpoint: Endpoint, params: string = '') {
    return this.request<Res, null>('GET', endpoint, null, params);
  }

  post<Res, Req>(endpoint: Endpoint, body: Req) {
    return this.request<Res, Req>('POST', endpoint, body);
  }

  private request<Res, Req>(
    method: 'GET' | 'POST',
    endpoint: Endpoint,
    body?: Req,
    params: string = '',
  ) {
    if (!this.isAuthenticated()) {
      this.router.navigate(['/']);
      return of(null);
    }
    this.refresh();

    const url = `${environment.backendUrl}/${endpoint}${params}`;
    const options = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.cookies.get('access_token')}`,
      }),
      observe: 'response' as const,
    };
    const call =
      method === 'GET'
        ? this.http.get<Res>(url, options)
        : this.http.post<Res>(url, body, options);

    return call.pipe(
      map((response) => {
        if (response.ok) {
          return response.body;
        } else {
          console.error(`${response.status} Error: ${response.body}`);
          this.logout();
          return null;
        }
      }),
    );
  }
}
