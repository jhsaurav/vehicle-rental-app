import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  authService = inject(AuthService);
  router = inject(Router);

  registerObj = {
    id: 0,
    username: '',
    password: ''
  };

 onRegister() {
  if (!this.registerObj.username || !this.registerObj.password) {
    alert("Please fill all fields!");
    return;
  }

  this.registerObj.id = Date.now();

  this.authService.register(this.registerObj)
    .subscribe(() => {
      alert("Registration Successful! You can now login.");
      this.router.navigateByUrl("/login");
    });
}


}
