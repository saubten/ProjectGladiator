import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn : "root"
})
export class CancellationService{
    constructor(private http : HttpClient){

    }

    url : string = "http://localhost:13972/api/Cancellation"

    cancelRoundTrips(rtid : number){
        return this.http.put(`${this.url}/roundTripCancellation?rtid=${rtid}`,null);
    }

    cancelBookings(bid : number){
        return this.http.put(`${this.url}/bookingCancellation?bid=${bid}`,null);
    }
}