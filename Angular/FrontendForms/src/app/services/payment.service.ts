import { Injectable } from "@angular/core";
import{HttpClient, HttpParams} from '@angular/common/http';

import { Bookings } from "src/app/models/bookings";
import { TransactionTb } from "src/app/models/transactionTb";
import { RoundTrip } from "src/app/models/roundTrip";

@Injectable({providedIn:"root"})

export class PaymentService
{

    constructor(private http:HttpClient)
    {

    }

    urip="https://localhost:44358/api/Payment"

    updateTransactionDetails(transaction : TransactionTb)
    {
        return this.http.post(this.urip,transaction);
    }

    urib="https://localhost:44358/api/Bookings"

    updateBookingsDetails(booking: Bookings)
    {
        return this.http.post(this.urib,booking);
    }

    updateRoundTripBooking(roundtrip: RoundTrip)
    {
        return this.http.post(this.urib+"/api/Bookings/RoundTableBooking",roundtrip);
    }


}