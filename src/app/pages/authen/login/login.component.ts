import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ValidationService } from '../../../core/validators/validation.service';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  authType: String = '';
  title: String = '';
  isSubmit = false; 

  message = {
    type: '',
    content: '',
    isFailed: false,
    isSuccess: false             
  };

  loginForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
  ){
    
  }

  ngOnInit() {

    this.title = "Sign in";

    this.loginForm = this.formBuilder.group({
      'username': ['', [Validators.required, ValidationService.usernameValidator]],
      'password': ['', [Validators.required, ValidationService.passwordValidator]]
    });

    this.userService.isLoggedIn()
      .subscribe(
        data => {
          this.router.navigate(['/']);
        },
        err => {

        }
      );      
  }

  submitForm(){
    this.isSubmit = true;

    const credentials = this.loginForm.value;
    this.userService
      .attemptAuth(credentials)
      .subscribe(
        data => {
          console.log('[DEBUG] Log in successfully! Data = ', data)
          this.message = {
            isSuccess: true,
            isFailed: false,
            type: 'Success!',
            content: 'Log in successfully!'
          };
          this.router.navigate(['/']);
        },
        err => {
          console.log('[ERROR]',err);
          this.isSubmit = false;
          this.message = {
            isSuccess: false, 
            isFailed: true,
            type: 'Error!',
            content: 'Your username or password is wrong!'
          }
        }
      )

  }

}
