import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../environment';   // ✅ Import backend URL

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  http = inject(HttpClient);
  router = inject(Router);

  loginObj = {
    username: '',
    password: ''
  };

  onLogin() {
    if (!this.loginObj.username || !this.loginObj.password) {
      alert("Please enter username & password");
      return;
    }

    // ⭐ Use Render backend instead of localhost
    const apiUrl = `${BASE_URL}/users?username=${this.loginObj.username}&password=${this.loginObj.password}`;

    this.http.get<any[]>(apiUrl).subscribe(res => {

      if (res.length > 0) {
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
