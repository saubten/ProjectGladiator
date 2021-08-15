import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Bookings } from 'src/app/models/bookings';
import { Flights } from 'src/app/models/flights';
import { Passenger } from 'src/app/models/passengers';
import { RoundTrip } from 'src/app/models/roundTrip';
import { TransactionTb } from 'src/app/models/transactionTb';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-user-payment',
  templateUrl: './user-payment.component.html',
  styleUrls: ['./user-payment.component.css']
})
export class UserPaymentComponent implements OnInit {

  passengerCount : number;
  passengerList : any[];
  onewayDetails : any;
  roundtripDetails : any;
  tripType : boolean;
  OWflightType : boolean;
  RTflightType : boolean;
  OWdepartureDate? : string;
  OWseatsSelected : any;
  RTseatsSelected : any;
  OWseatsSelectedId : any;
  RTseatsSelectedId : any;
  OWclassBool : boolean = false;
  RTclassBool : boolean = false;
  OWprice : number;
  RTprice : number;

  constructor(private http:HttpClient,private paymentservice: PaymentService) { }


  transactiondetails: TransactionTb={}
  bookingsdetails: Bookings={}
  roundtripbookingdetails: RoundTrip={}
  


  addTransaction(){

   this.paymentservice.updateTransactionDetails(this.transactiondetails).subscribe((res)=>
   {
     console.log(res)

   },(err)=>{
     console.log(err)
   })

  }

  addBooking()
  {
    this.paymentservice.updateBookingsDetails(this.bookingsdetails).subscribe((res)=>
    {
      console.log(res)
 
    },(err)=>{
      console.log(err)
    })
 
  }

  addRoundTripBooking()
  {

    this.paymentservice.updateRoundTripBooking(this.roundtripDetails).subscribe((res)=>{

      console.log(res)
 
    },(err)=>{
      console.log(err)

    })   
  }
  ngOnInit(): void {
    debugger;
    this.passengerCount = Number(localStorage.getItem('passengervalue')!);
    this.passengerList = JSON.parse(localStorage.getItem('passengerList')!);
    this.onewayDetails = JSON.parse(localStorage.getItem('onewayDetails')!);
    this.tripType = JSON.parse(localStorage.getItem('flagTripType')!)
    this.OWflightType = JSON.parse(localStorage.getItem('OWflighttype')!)
    this.OWseatsSelected = JSON.parse(localStorage.getItem('OWseatsSelected')!)
    this.OWseatsSelectedId = JSON.parse(localStorage.getItem('OWseatsSelectedId')!)
    this.OWclassBool = JSON.parse(localStorage.getItem('OWclassBool')!)
    this.OWprice = JSON.parse(localStorage.getItem('OWprice')!)
    if(this.tripType){
      this.roundtripDetails = JSON.parse(localStorage.getItem('roundtripDetails')!);
      this.RTflightType = JSON.parse(localStorage.getItem('RTflightType')!)
      this.RTseatsSelected = JSON.parse(localStorage.getItem('RTseatsSelected')!)
      this.RTseatsSelectedId = JSON.parse(localStorage.getItem('OWseatsSelectedId')!)
      this.RTclassBool = JSON.parse(localStorage.getItem('OWclassBool')!)
      this.RTprice = JSON.parse(localStorage.getItem('RTprice')!)
    }

    console.log(this.tripType);
  }

}
