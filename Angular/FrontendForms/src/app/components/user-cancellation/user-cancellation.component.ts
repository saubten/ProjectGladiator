import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OWbookings } from 'src/app/models/owbookings';
import { RTbookings } from 'src/app/models/rtbookings';
import { CancellationService } from 'src/app/services/cancellation.service';
import { UserServices } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-cancellation',
  templateUrl: './user-cancellation.component.html',
  styleUrls: ['./user-cancellation.component.css']
})
export class UserCancellationComponent implements OnInit {

  constructor(private userService : UserServices,private cancellationService : CancellationService,private router : Router) { }

  userEmail : string;
  temp : any;
  owBookings : OWbookings[];
  rtBookings : RTbookings[];

  returnButton : any;
  bookingButton : any; 

  RTID : number;
  BID : number;

  ngOnInit(): void {
    this.userEmail = sessionStorage.getItem('EmailId')!;
    this.getBookings(this.userEmail);
  }

  form = new FormGroup({
    BookingID : new FormControl('',[Validators.required]),
  });
 

  get f(){
    return this.form.controls;
  }

  getBookings(email: string){
    this.userService.getBookingsForAUser(email).subscribe(data =>{
      this.temp = data;
      this.owBookings = this.temp.oWbookings as OWbookings[]
      this.rtBookings = this.temp.rTbookings as  RTbookings[]
      console.log(data)
      console.log(this.temp)
    })
  }

  enter(f : FormGroup){
    console.log(f.value['BookingID'])
  }

  BookingCancel(event : any){
    this.BID = Number(event.target.id);
    this.cancellationService.cancelBookings(this.BID).subscribe(res => {
      console.log(res);
      this.router.navigate(['/userDashboard/bookings']);
    },
    err =>{
      console.log(err)
    });
  }

  ReturnCancel(event : any){
    this.RTID =Number(event.target.id);
    this.cancellationService.cancelRoundTrips(this.RTID).subscribe(res => {
      console.log(res);
      this.router.navigate(['/userDashboard/bookings']);
    },
    err =>{
      console.log(err)
    });
  }
}
