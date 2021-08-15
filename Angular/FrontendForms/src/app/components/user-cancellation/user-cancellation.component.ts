import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OWbookings } from 'src/app/models/owbookings';
import { RTbookings } from 'src/app/models/rtbookings';
import { UserServices } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-cancellation',
  templateUrl: './user-cancellation.component.html',
  styleUrls: ['./user-cancellation.component.css']
})
export class UserCancellationComponent implements OnInit {

  constructor(private userService : UserServices) { }

  userEmail : string;
  temp : any;
  owBookings : OWbookings[];
  rtBookings : RTbookings[];

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
}
