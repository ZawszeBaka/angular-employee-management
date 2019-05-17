import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../core/services/user.service';
import { User } from '../../models/user.model';

import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss']
})
export class LayoutHeaderComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router
  ){ }

  private isShow = false;
  private currentUser = new User();

  ngOnInit() {
    this.userService.currentUser.subscribe(
      (user) => {
        this.currentUser = user;
        this.isShow = true;
        console.log('[INFO] Current use (layout):',this.currentUser);
      }
    );
  }

  logOut(){
    this.userService.purgeAuth();
    window.location.reload();
  }

}


