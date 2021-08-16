import { Injectable } from "@angular/core";
import{HttpClient, HttpParams} from '@angular/common/http';

import { Bookings } from "src/app/models/bookings";
import { TransactionTb } from "src/app/models/transactionTb";
import { RoundTrip } from "src/app/models/roundTrip";
import { BookingPassenger } from "../models/bookingPassenger";

@Injectable({providedIn:"root"})

export class PaymentService
{

    constructor(private http:HttpClient)
    {

    }

    urip="http://localhost:13972/api/Payment"

    updateTransactionDetails(transaction : TransactionTb)
    {
        return this.http.post(this.urip,transaction);
    }

    getTransactionID(userID:number)
    {
        let params:any = new HttpParams().set('UserID',userID);

        console.log(params);
        return this.http.get(this.urip,{params:params});
    }

    urib="http://localhost:13972/api/Booking"

    updateBookingsDetails(booking: Bookings,transId : number)
    {
        return this.http.post(`${this.urib}/${transId}`,booking);
    }

    updateRoundTripBooking(roundtrip: RoundTrip)
    {
        return this.http.post(this.urib+"/RoundTripBooking",roundtrip,{responseType : "text"});
    }

    getBookingId(userId : number){
        return this.http.get(`${this.urib}?userId=${userId}`)
    }

    urix="http://localhost:13972/api/Passenger"

    updatePassengerDetails(passenger : BookingPassenger[])
    {
        return this.http.post(this.urix,passenger);
    }

    checkUserWallet(email : string,amount : number){
        return this.http.get(`${this.urip}/checkUserWallet?email=${email}&amount=${amount}`)
    }

}