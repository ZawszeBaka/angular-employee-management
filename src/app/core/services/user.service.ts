import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { JwtService } from './jwt.service';
import { ApiService } from './api.service';

import { User } from '../models/user.model';

import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserService {  

  private currentUserSubject = new Subject<User>();
  public currentUser = this.currentUserSubject.asObservable();
  
  private isAuthenticatedSubject = new Subject<boolean>();
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor (
    private http: HttpClient,
    private jwtService: JwtService,
    private apiService: ApiService
  ) {}



  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      this.apiService.get('/users/me')
        .subscribe(
          data => {
            this.setAuth({
              token: data.sessionToken,
              username: data.username
            } as User);
            console.log('[INFO] (Run once when reload page) You\'ve already logged in');
          },
          err => {
            this.purgeAuth();
            console.log('[ERROR] (Run once when reload page)');
          }
        );
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  getCurrentUser(){
    return this.currentUserSubject;
  }

  isLoggedIn(): Observable<boolean>{
    var subject = new Subject<boolean>();
    if(this.jwtService.getToken()){
      return this.apiService.get('/users/me')
      .pipe(map(
        data => {
          console.log('[INFO] Check log in! OK !');
          return true;
        },
        err => {
          console.log('[INFO] Check log in! Failed !');
          this.purgeAuth();
          return false;
        }
      ));
    }else{
      subject.next(false);
      return subject.asObservable();
    }
    
  }

  setAuth(user: User) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user.token);
    // Set current user
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object 
    this.currentUserSubject.next({} as User);
    // Set auth status to false 
    this.isAuthenticatedSubject.next(false);
  }

  attemptAuth(credential): Observable<User>{
    return this.apiService.post('/login', {username: credential.username, password: credential.password})
      .pipe(map(
        data => {
          this.setAuth({
            username: data.username,
            token: data.sessionToken
          } as User);
          return data;
        }
      ));
  }

}
