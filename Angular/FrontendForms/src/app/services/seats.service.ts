import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";


@Injectable({'providedIn' : 'root'})
export class SeatService{

    url="http://localhost:13972/api/Seat"

    constructor(private http : HttpClient){}

    getAllSeats(flightNumber : string){
        return this.http.get(`${this.url}?flightNumber=${flightNumber}`);
    }
    //this.url?flightnumber=CXDNF5

    updateSeats(body : number[]){
        console.log("Inside Service Update");
        console.log(body);
        return this.http.put(this.url,body);
    }

    availbleSeatsUpdate(flightNumber : string,classBool : boolean,seatsToUpdate : number){
        return this.http.put(`${this.url}/updAvailableSeat?flightNumber=${flightNumber}&classBool=${classBool}&seatsToUpdate=${seatsToUpdate}`,null,{responseType : "text"})
    }
}
