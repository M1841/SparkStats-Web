import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-auth-callback',
  imports: [],
  template: '',
})
export class AuthCallbackComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private cookies = inject(CookieService);

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const accessToken = params['access_token'];
      const refreshToken = params['refresh_token'];
      const expiresAt = params['expires_at'];

      if (accessToken && refreshToken) {
        [
          ['access_token', accessToken],
          ['refresh_token', refreshToken],
          ['expires_at', expiresAt],
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
