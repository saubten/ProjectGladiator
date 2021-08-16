import { Time } from '@angular/common';
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

  BookingCancel(event : any,bTime : Time,tripDate : string){
    this.BID = Number(event.target.id);
    //check
    if(this.cancellationCheck(bTime,tripDate)){
      this.cancellationService.cancelBookings(this.BID).subscribe(res => {
        console.log(res);
        this.getBookings(this.userEmail);
      },
      err =>{
        console.log(err)
      });
    }
    else{
      alert("Cannot Cancel Flight within 3 hours of Departure")
    }
  }

  ReturnCancel(event : any, rTime : Time,tripDate : string){
    this.RTID =Number(event.target.id);
    //Check
    if(this.cancellationCheck(rTime,tripDate)){
      this.cancellationService.cancelRoundTrips(this.RTID).subscribe(res => {
        console.log(res);
        this.getBookings(this.userEmail);
      },
      err =>{
        console.log(err)
      });
    }
    else{
      alert("Cannot Cancel Flight within 3 hours of Departure")
    }
  }


  currentDate : string;
  checkCurrentDate : string;

  cancellationCheck(tripTime : Time, tripDate : string) : boolean {
    let datef = new Date;
    this.checkCurrentDate = this.getCurrentDate();
    if(tripDate.toString() > this.checkCurrentDate){
      return true
    }
    else{
      if(tripTime.hours - datef.getHours() > 3){
        return true
      }
      else false
    }
    return false;
  }


  currentdate : string;
  currentmonth : string

  getCurrentDate() : string{
    let datef = new Date;
    if(Number(datef.getDate()) < 10){
      this.currentdate = "0" + datef.getDate();
    }
    else{
      this.currentdate = datef.getDate().toString();
    }
    if(Number(datef.getMonth()) < 10){
      this.currentmonth = "0" + (datef.getMonth()+1);
    }
    else{
      this.currentmonth = (datef.getMonth()+1).toString();
    }
    this.currentDate = `${datef.getFullYear()}-${this.currentmonth}-${this.currentdate}`; 
    return this.currentDate;
  }

  lessThan(tripdate : string, currentDate : string) {
    return tripdate < currentDate;
  }
}
