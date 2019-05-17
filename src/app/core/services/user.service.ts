import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { JwtService } from './jwt.service';

import { User } from '../models/user.model';


@Injectable({
    providedIn: 'root'
})
export class UserService {  

  constructor (
    private http: HttpClient,
    private jwtService: JwtService
  ) {}

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  setAuth(user: User) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user.token);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
  }

}
