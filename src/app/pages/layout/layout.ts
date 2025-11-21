import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  constructor(private router: Router) {}

  isDarkMode = false;

  ngOnInit() {
    const savedMode = localStorage.getItem("darkMode");
    this.isDarkMode = savedMode === "true";
    this.applyDarkMode();
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem("darkMode", this.isDarkMode.toString());
    this.applyDarkMode();
  }

  applyDarkMode() {
    if (this.isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }

  logout() {
    localStorage.removeItem("isLoggedIn");
    this.router.navigateByUrl("/login");
  }
}
