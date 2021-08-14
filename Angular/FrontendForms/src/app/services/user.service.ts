import { Injectable } from "@angular/core";
import { HttpClient} from '@angular/common/http';
import { Users } from "../models/users";

@Injectable({providedIn:"root"})
export class UserServices{

    constructor(private http:HttpClient){}
    readonly url="http://localhost:13972/api/User";

    getUser()
    {
        return this.http.get(this.url);
    }

    insertUser(User1:Users)
    {
        return this.http.post(this.url,User1);   
    }

    sendRegistrationNumber(email : string){
        return this.http.get(`${this.url}/sendRegId?email=${email}`,{responseType : "text"})
    }

    getBookingsForAUser(email : string){
        return this.http.get(`${this.url}/getBookings?email=${email}`)
    }
}