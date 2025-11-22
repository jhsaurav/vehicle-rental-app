import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class AuthService {
  
  http = inject(HttpClient);
  apiUrl = "https://vehicle-renting-backend.onrender.com/users";

  // Check login
  login(username: string, password: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?username=${username}&password=${password}`);
  }

  // Register new user
  register(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }
}
