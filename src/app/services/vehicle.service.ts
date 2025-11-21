import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CarModel } from '../models/car';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  // JSON Server API URL
  private apiUrl = "http://localhost:3000/cars";

  // Inject HttpClient
  private http = inject(HttpClient);

  constructor() {}

  // READ ALL CARS
  getAllCars(): Observable<CarModel[]> {
    console.log(this.http.get<CarModel[]>(this.apiUrl));
    
    return this.http.get<CarModel[]>(this.apiUrl);
  }

  // CREATE CAR
  addCar(car: CarModel): Observable<CarModel> {
    return this.http.post<CarModel>(this.apiUrl, car);
  }

  // UPDATE CAR
  updateCar(car: CarModel): Observable<CarModel> {
    return this.http.put<CarModel>(`${this.apiUrl}/${car.id}`, car);
  }

  // DELETE CAR
  deleteCar(id: number | string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
