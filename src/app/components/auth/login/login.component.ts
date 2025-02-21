import { Component } from '@angular/core';

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

  onSubmit() {
    // Here you would call your authentication service
    console.log('Login data submitted', this.loginData);
    // e.g., this.authService.login(this.loginData).subscribe(...)
  }
}
