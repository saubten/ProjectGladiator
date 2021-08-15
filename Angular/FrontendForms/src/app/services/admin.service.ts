import { Injectable } from "@angular/core";
import{HttpClient, HttpParams} from '@angular/common/http';

import { Flights } from "../models/flights";

@Injectable({providedIn:"root"})

export class AdminService
{

    constructor(private http:HttpClient)
    {

    }

    url="http://localhost:13972/api/Admin"

    getFlights()
    {
        return this.http.get(this.url);
    }

    addFlights(flight:Flights)
    {
        return this.http.post(this.url,flight);
    }

    deleteFlightDetails(flightnumber:string)
    {
        return this.http.put(`${this.url}/softFDeleteFlight?flightNumber=${flightnumber}`,null,{responseType : "text"});
    }
    
    adminVerification(useremail : string , userpassword : string){
        return this.http.get(`${this.url}/login?email=${useremail}&password=${userpassword}`);
    }
}