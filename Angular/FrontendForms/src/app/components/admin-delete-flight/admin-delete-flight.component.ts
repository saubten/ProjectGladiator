import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Flights } from 'src/app/models/flights';
import { AdminService } from 'src/app/services/admin.service';


@Component({
  selector: 'app-admin-delete-flight',
  templateUrl: './admin-delete-flight.component.html',
  styleUrls: ['./admin-delete-flight.component.css']
})
export class AdminDeleteFlightComponent implements OnInit {

  adminDeleteFlightForm:FormGroup;

  constructor(private http:HttpClient,private adminService : AdminService,private router : Router) { 
    if(sessionStorage.getItem('LoginCheckCode') != "Admin"){
      this.router.navigate(['/loginPage/flightSearch'])
    }

    this.adminDeleteFlightForm = new FormGroup({
      FlightNumber: new FormControl(null,Validators.required)
    });  


  }

  flightdetails: Flights={}
   flight:Flights[] = []
   fli:any;

   getFlightdetails()
   {
     
     this.adminService.getFlights().subscribe((res : any)=>{

      console.log(res);
      this.fli=res;
      this.flight=this.fli;
      console.log(this.flight)
     },(err : any)=>{
      console.log(err)

     })   
   }

  flightnumber?:any
   msg:any;
   updateFlightDetails()
   {
     debugger;
      this.flightnumber = this.adminDeleteFlightForm.value["FlightNumber"]
      this.adminService.deleteFlightDetails(this.flightnumber).subscribe((res : any)=>{
        console.log(res);
       this.msg = "Flight deleted successfully!!!" 
       alert(this.msg);
        this.getFlightdetails();
        this.router.navigate(["/adminDashboard"])
      },(err : any)=>{
        console.log(err)     
      })
   }



  ngOnInit(): void {
  }

}
