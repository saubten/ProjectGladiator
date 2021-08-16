import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingPassenger } from 'src/app/models/bookingPassenger';
import { Bookings } from 'src/app/models/bookings';
import { Flights } from 'src/app/models/flights';
import { Passenger } from 'src/app/models/passengers';
import { RoundTrip } from 'src/app/models/roundTrip';
import { TransactionTb } from 'src/app/models/transactionTb';
import { PaymentService } from 'src/app/services/payment.service';
import { UserServices } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-payment',
  templateUrl: './user-payment.component.html',
  styleUrls: ['./user-payment.component.css']
})
export class UserPaymentComponent implements OnInit {

  passengerCount: number;
  passengerList: any[];
  onewayDetails: any;
  roundtripDetails: any;
  tripType: boolean;
  OWflightType: boolean;
  RTflightType: boolean;
  OWdepartureDate?: string;
  OWseatsSelected: any;
  RTseatsSelected: any;
  OWseatsSelectedId: any;
  RTseatsSelectedId: any;
  OWclassBool: boolean = false;
  RTclassBool: boolean = false;
  OWprice: number;
  RTprice: number;

  emailID : string;
  userid: number;
  tempuserid : any;
  temptrans : any;
  tempbooking : any;

  constructor(private http: HttpClient, private paymentservice: PaymentService ,private userService : UserServices ,private router : Router) { }

  transactionID: any;
  transactiondetails: TransactionTb = {}
  bookingsdetails: Bookings = {}
  roundtripbookingdetails: RoundTrip = {}

  passenger : BookingPassenger = new BookingPassenger();
  passengers: BookingPassenger[] = [];

  addTransaction(trip : TransactionTb) 
  {
      this.paymentservice.updateTransactionDetails(trip).subscribe((res) => {
        console.log(res)
        this.temptrans = res;
        this.bookingOneWay.TransactionID = this.temptrans.transactionId;
        this.addOneWayBooking(this.bookingOneWay);

      }, (err) => {
        console.log(err)
      })
  }

  addOneWayBooking(owTrip : Bookings) 
  {
      this.paymentservice.updateBookingsDetails(owTrip,this.temptrans.transactionId).subscribe((res) => {

        console.log(res)
        this.tempbooking = res;
        if(this.tripType){
          this.RoundTripBooking.BookingId =  Number(this.tempbooking.bookingId)
          this.addRoundTripBooking(this.RoundTripBooking , this.tempbooking.bookingId)

        }
        else{

          this.passengerList.forEach((p,index) => {
            this.passenger.firstName = p.passFirstName;
            this.passenger.lastName = p.passLastName;
            this.passenger.age = p.passAge;
            this.passenger.phoneNumber = p.passPhone;
            this.passenger.bookingId = this.tempbooking.bookingId;
            this.passenger.oneWaySeatId = this.OWseatsSelectedId[index];
            this.passenger.roundTripSeatId = undefined;
            this.passengers.push(this.passenger);
            this.passenger = new BookingPassenger();
          })

          this.addPassenger(this.passengers)
        }
      }, (err) => {
        console.log(err)
      })
  }
  
  addRoundTripBooking(rtTrip : RoundTrip ,bookingId : number) 
  {
    debugger
        this.passengerList.forEach((p,index) => {
          this.passenger.firstName = p.passFirstName!;
          this.passenger.lastName = p.passLastName!;
          this.passenger.age = p.passAge!;
          this.passenger.phoneNumber = p.passPhone!;
          this.passenger.bookingId = bookingId;
          this.passenger.oneWaySeatId = this.OWseatsSelectedId[index];
          this.passenger.roundTripSeatId = this.RTseatsSelectedId[index];

          this.passengers.push(this.passenger);
          this.passenger = new BookingPassenger();
        })
        debugger;
        this.paymentservice.updateRoundTripBooking(rtTrip).subscribe((res) => {
          console.log(res)
          debugger;
          this.addPassenger(this.passengers)
          debugger;
        }, (err) => {
          console.log(err)
        })
  }

  addPassenger(passengersL : BookingPassenger[])
  {
    this.paymentservice.updatePassengerDetails(passengersL).subscribe((res) => {
      console.log(res)
    }, (err) => {
      console.log(err)
    })
  }

  getUserID(email : string){

    this.userService.getUserID(email).subscribe(data => {
      this.tempuserid = data;
      this.userid = this.tempuserid;

      if(!this.tripType){
        this.transactionOneWay = {
          UserId : this.userid,
          TransactionAmount: this.OWprice
        }
        this.addTransaction(this.transactionOneWay)
      }
      else{
        this.transactionRoundTip = {
          UserId : this.userid,
          TransactionAmount: this.OWprice + this.RTprice
        }
        this.addTransaction(this.transactionRoundTip)
      }
    })
  }

  transactionOneWay: TransactionTb
  transactionRoundTip: TransactionTb
  bookingOneWay: Bookings
  RoundTripBooking : RoundTrip
  
  Approve(){
    this.getUserID(this.emailID);
    this.router.navigate(['/userDashboard']);
  }

  ngOnInit(): void {
    if(sessionStorage.getItem('LoginCheckCode') != "User"){
      this.router.navigate(['/loginPage/flightSearch'])
    }

    this.emailID = sessionStorage.getItem('EmailId')!
    this.passengerCount = Number(localStorage.getItem('passengervalue')!);
    this.passengerList = JSON.parse(localStorage.getItem('passengerList')!);
    this.onewayDetails = JSON.parse(localStorage.getItem('onewayDetails')!);
    this.tripType = JSON.parse(localStorage.getItem('flagTripType')!)
    this.OWflightType = JSON.parse(localStorage.getItem('OWflightType')!)
    this.OWseatsSelected = JSON.parse(localStorage.getItem('OWseatsSelected')!)
    this.OWseatsSelectedId = JSON.parse(localStorage.getItem('OWseatsSelectedId')!)
    this.OWclassBool = JSON.parse(localStorage.getItem('OWclassBool')!)
    this.OWprice = JSON.parse(localStorage.getItem('OWprice')!)
    this.bookingOneWay = {
      FlightNumber: this.onewayDetails.flightNumber,
      TransactionID: this.transactionID,
      Passenger: this.passengerCount,
      TicketFare: this.OWprice * this.passengerCount,
      isBusiness: this.OWflightType,
      isCancelled: this.onewayDetails.isCancelled,
      isReturn: this.tripType
    }
    if (this.tripType) {
      this.roundtripDetails = JSON.parse(localStorage.getItem('roundtripDetails')!);
      this.RTflightType = JSON.parse(localStorage.getItem('RTflightType')!)
      this.RTseatsSelected = JSON.parse(localStorage.getItem('RTseatsSelected')!)
      this.RTseatsSelectedId = JSON.parse(localStorage.getItem('RTseatsSelectedId')!)
      this.RTclassBool = JSON.parse(localStorage.getItem('RTclassBool')!)
      this.RTprice = JSON.parse(localStorage.getItem('RTprice')!)
      this.RoundTripBooking = {
        FlightNumber: this.roundtripDetails.flightNumber,
        BookingId: this.bookingOneWay.BookingID,
        TicketFare: this.RTprice * this.passengerCount,
        isCancelled: this.roundtripDetails.isCancelled,
        isBusiness: this.RTflightType
      }
    }
  }
}