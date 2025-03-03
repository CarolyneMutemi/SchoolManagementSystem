import { Component } from '@angular/core';

import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    identifier: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    // Here you would call your authentication service
    console.log('Login data submitted', this.loginData);
    // e.g., this.authService.login(this.loginData).subscribe(...)
    this.authService.login(this.loginData.identifier, this.loginData.password).subscribe(
      () => {
        console.log('User authenticated - in login component');
        this.router.navigate(['/']);
      },
      error => {
        console.error('Error authenticating user', error);
      }
    );
  }
}
