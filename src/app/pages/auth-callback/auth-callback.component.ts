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
    private cookies: CookieService,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const accessToken = params['access_token'];
      const refreshToken = params['refresh_token'];

      if (accessToken && refreshToken) {
        [
          ['access_token', accessToken],
          ['refresh_token', refreshToken],
        ].forEach(([key, value]) => {
          this.cookies.set(key, value, {
            secure: true,
            sameSite: 'Strict',
          });
        });
      }
      window.location.replace('/');
    });
  }
}
