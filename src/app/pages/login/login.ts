import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  http = inject(HttpClient);
  router = inject(Router);

  // LOGIN MODEL
  loginObj = {
    username: '',
    password: ''
  };

  onLogin() {
    if (!this.loginObj.username || !this.loginObj.password) {
      alert("Please enter username & password");
      return;
    }

    // CHECK USER FROM JSON SERVER API
    this.http.get<any[]>(
      `http://localhost:3000/users?username=${this.loginObj.username}&password=${this.loginObj.password}`
    ).subscribe(res => {

      if (res.length > 0) {
        // USER FOUND
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("loggedUser", JSON.stringify(res[0]));

        alert("Login Successful!");

        this.router.navigateByUrl('/dashboard');
      }
      else {
        alert("Invalid Username or Password!");
      }

    });
  }
}
