import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  http = inject(HttpClient);

  totalVehicles: number = 0;
  totalBookings: number = 0;
  todayBookings: number = 0;
  availableVehicles: number = 0;

  recentBookings: any[] = [];

  ngOnInit(): void {
    this.loadVehicles();
    this.loadBookings();
  }

  loadVehicles() {
    this.http.get<any[]>(`${BASE_URL}/cars`)
      .subscribe(res => {
        this.totalVehicles = res.length;
        this.availableVehicles = res.length;
      });
  }

  loadBookings() {
    this.http.get<any[]>(`${BASE_URL}/bookings`)
      .subscribe(res => {

        const today = new Date().toISOString().split('T')[0];

        this.totalBookings = res.length;

        this.todayBookings = res.filter(b => b.bookingDate === today).length;

        this.recentBookings = res.slice(-5).reverse();
      });
  }
}
