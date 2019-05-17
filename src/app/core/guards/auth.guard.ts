import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserService } from '../services/user.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private router: Router,
    private userService: UserService
  ){}

  canActivate(): Observable<boolean>{
    return this.userService.isLoggedIn()
      .pipe(map(
        data=>{
          console.log('[DEBUG] OK (Authen Guard)?');
          return true;
        },
        err=>{
          console.log('[DEBUG] NO (Authen Guard)?');
          this.router.navigate(['/login']);
          return false;
        }
      ));
  }

}
