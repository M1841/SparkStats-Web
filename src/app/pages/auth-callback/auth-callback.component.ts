import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-auth-callback',
  imports: [],
  template: '',
})
export class AuthCallbackComponent implements OnInit {
  constructor(private route: ActivatedRoute, private cookies: CookieService) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const accessToken = params['access_token'];
      const refreshToken = params['refresh_token'];

      if (accessToken && refreshToken) {
        this.cookies.set('access_token', accessToken, {
          secure: true,
          sameSite: 'Strict',
        });
        this.cookies.set('refresh_token', refreshToken, {
          secure: true,
          sameSite: 'Strict',
        });
      }
      window.location.replace('/');
    });
  }
}
