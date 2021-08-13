import { Component, OnInit } from '@angular/core';
import { Flights } from 'src/app/models/flights';
import { Passenger } from 'src/app/models/passengers';

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

  constructor() {}
  ngOnInit(): void {
    this.passengerCount = Number(localStorage.getItem('passengervalue')!);
    this.passengerList = JSON.parse(localStorage.getItem('passengerList')!);
    this.onewayDetails = JSON.parse(localStorage.getItem('onewayDetails')!);
    this.tripType = Boolean(localStorage.getItem('flagTripType')!)
    this.OWflightType = Boolean(localStorage.getItem('flagTripType')!)
    this.OWseatsSelected = JSON.parse(localStorage.getItem('OWseatsSelected')!)
    this.OWseatsSelectedId = JSON.parse(localStorage.getItem('OWseatsSelectedId')!)
    this.OWclassBool = JSON.parse(localStorage.getItem('OWclassBool')!)
    this.OWprice = JSON.parse(localStorage.getItem('OWprice')!)
    if(this.tripType){
      this.roundtripDetails = JSON.parse(localStorage.getItem('roundtripDetails')!);
      this.RTflightType = Boolean(localStorage.getItem('flagTripType')!)
      this.RTseatsSelected = JSON.parse(localStorage.getItem('RTseatsSelected')!)
      this.RTseatsSelectedId = JSON.parse(localStorage.getItem('OWseatsSelectedId')!)
      this.RTclassBool = JSON.parse(localStorage.getItem('OWclassBool')!)
      this.RTprice = JSON.parse(localStorage.getItem('RTprice')!)
    }
  }

}
