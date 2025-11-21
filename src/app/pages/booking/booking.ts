import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-booking',
  imports: [FormsModule],
  templateUrl: './booking.html',
  styleUrl: './booking.css',
})
export class Booking implements OnInit {

  bookingService = inject(BookingService);

  bookingList: any[] = [];

  newBooking: any = {
    id: 0,
    customerName: '',
    customerCity: '',
    mobileNo: '',
    email: '',
    carId: '',
    bookingDate: '',
    discount: '',
    totalBillAmount: 0
  };

  ngOnInit(): void {
    this.loadBookings();
  }
  getNextId() {
    return this.bookingList.length + 1;
  }

  loadBookings() {
    this.bookingService.getBookings().subscribe(res => {
      this.bookingList = res;
    });
  }

  onSaveBooking() {
  this.bookingService.getBookings().subscribe(all => {

    // find max ID
    let maxId = 0;
    if (all.length > 0) {
      maxId = Math.max(...all.map(b => Number(b.id)));
    }

    // assign next ID
    // this.newBooking.id = maxId + 1;
    this.newBooking.id = (maxId + 1).toString();


    this.bookingService.addBooking(this.newBooking).subscribe(() => {
      alert("Booking Added!");
      this.loadBookings();
      this.clearForm();
    });

  });
}


  onEditBooking(item: any) {
    this.newBooking = { ...item };
  }

  onUpdateBooking() {
    this.bookingService.updateBooking(this.newBooking).subscribe(() => {
      alert("Booking Updated!");
      this.loadBookings();
      this.clearForm();
    });
  }

  onDeleteBooking(id: any) {
    this.bookingService.deleteBooking(id).subscribe(() => {
      alert("Booking Deleted!");
      this.loadBookings();
    });
  }

  clearForm() {
    this.newBooking = {
      id: 0,
      customerName: '',
      customerCity: '',
      mobileNo: '',
      email: '',
      carId: '',
      bookingDate: '',
      discount: '',
      totalBillAmount: 0
    };
  }

}
