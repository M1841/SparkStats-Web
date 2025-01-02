import { computed, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs';

import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private cookies: CookieService,
    private http: HttpClient,
  ) {}

  get = <T>(endpoint: Endpoint, params: string = '') => {
    return this.http
      .get<T>(`${environment.backendUrl}/${endpoint}${params}`, {
        headers: {
          Authorization: `Bearer ${this.cookies.get('access_token')}`,
        },
        observe: 'response',
      })
      .pipe(
        map((response) => {
          if (response.status === 200 || response.status === 204) {
            return { result: response.body, error: null };
          } else {
            this.cookies.deleteAll();
            return { result: null, error: "Can't fetch resource" };
          }
        }),
      );
  };

  isAuthenticated = computed(
    () =>
      this.cookies.get('access_token') !== null &&
      this.cookies.get('access_token') !== undefined &&
      this.cookies.get('access_token') !== '',
  );
}
