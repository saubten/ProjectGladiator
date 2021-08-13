import { Injectable } from "@angular/core";
import{HttpClient, HttpParams} from '@angular/common/http';

@Injectable({providedIn:"root"})
export class FlightService
{
    constructor(private http:HttpClient){}

    url="http://localhost:13972/api/Flight"

    getFlightDetails(from:any,to:any,departure:any) 
    {
        //debugger;
        let params:any = new HttpParams()
        .set('FromLocation',from)
        .set('ToLocation',to)
        .set('DepartureDate',departure);

        console.log(params.toString());
        return this.http.get(this.url,{params : params});
    }

    getFlights() 
    {
        //debugger;
        return this.http.get(this.url);
    }
  }
