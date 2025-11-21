import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as environement from '../environment'

@Injectable({
  providedIn: 'root',
})
export class BookingService {

BASE_URL=environement.BASE_URL
apiUrl = `${this.BASE_URL}/bookings`;
  private http = inject(HttpClient);

  constructor() {}

  // GET ALL BOOKINGS
  getBookings(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // ADD NEW BOOKING
  addBooking(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  // UPDATE EXISTING BOOKING
  updateBooking(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${data.id}`, data);
  }

  // DELETE BOOKING
  deleteBooking(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
