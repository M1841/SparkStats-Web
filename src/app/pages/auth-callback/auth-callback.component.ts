import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-auth-callback',
  imports: [],
  template: '',
})
export class AuthCallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const accessToken = params['access_token'];
      const refreshToken = params['refresh_token'];

      if (accessToken && refreshToken) {
        this.cookieService.set('access_token', accessToken, {
          secure: true,
          sameSite: 'Strict',
        });
        this.cookieService.set('refresh_token', refreshToken, {
          secure: true,
          sameSite: 'Strict',
        });
      }
      window.history.replaceState({}, '', '/');
    });
  }
}
