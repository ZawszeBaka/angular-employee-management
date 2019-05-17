import { Injectable } from '@angular/core';

/* JSON WEB TOKEN */

@Injectable({
    providedIn: 'root'
})
export class JwtService {

  getToken(): String {
    return window.localStorage['jwtToken'];
  }

  saveToken(token: String) {
    window.localStorage['jwtToken'] = token;
  }

  destroyToken() {
    window.localStorage.removeItem('jwtToken');
  }

}
