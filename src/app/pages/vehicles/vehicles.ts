import { Component, inject, OnInit } from '@angular/core';
import { CarModel } from '../../models/car';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { VehicleService } from '../../services/vehicle.service';
@Component({
  selector: 'app-vehicles',
  imports: [FormsModule],
  templateUrl: './vehicles.html',
  styleUrl: './vehicles.css',
})
export class Vehicles implements OnInit {
  newCarObj: CarModel;
  carList: CarModel[] = [];

  constructor(private veh_svc: VehicleService) {
    this.newCarObj = new CarModel();
  }
  ngOnInit(): void {
    this.getAllCars()
  }
  getAllCars() {
    this.veh_svc.getAllCars().subscribe((res: CarModel[]) => {
      this.carList = res;
      console.log("Cars loaded:", res);
    });
  }


  onSaveCar() {
    // console.log(newc);

    this.newCarObj.carId = this.carList.length + 1;
    this.newCarObj.id = this.generateUniqueId();

    this.veh_svc.addCar(this.newCarObj).subscribe(() => {
      alert("Vehicle created successfully!");
      this.getAllCars();
      this.newCarObj = new CarModel();
    });
  }
  generateUniqueId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  onUpdateCar() {
    this.veh_svc.updateCar(this.newCarObj)
      .subscribe(() => {
        alert("Vehicle updated successfully!");
        this.getAllCars();
        this.newCarObj = new CarModel();
      });
  }
  onDeleteCarById(id: any) {
   
    this.veh_svc.deleteCar(id)
      .subscribe(() => {
        alert("Vehicle deleted successfully!");
        this.getAllCars();
      });
  }

  onEdit(data: any) {
    this.newCarObj = { ...data };   
  }

}