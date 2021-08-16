import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Flights } from 'src/app/models/flights';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-add-flight',
  templateUrl: './admin-add-flight.component.html',
  styleUrls: ['./admin-add-flight.component.css']
})
export class AdminAddFlightComponent implements OnInit {

  adminAddFlightForm:FormGroup;
  pattern="^[ a-zA-Z][a-zA-Z ]*$"
  maxdate:any;
  err : string;
   pastdatedisable(){
     var date = new Date();
     var todayDate:any = date.getDate();
     var month:any = date.getMonth()+1;
     var year = date.getFullYear();
 
     if(todayDate < 10){
       todayDate = '0' + todayDate;
     }
 
     if(month<10){
       month = '0' + month;
     }
     console.log(month);
     console.log(year);
 
     this.maxdate = year + "-" + month + "-" +todayDate;  
     console.log(this.maxdate)  
 
   }


  constructor(private http:HttpClient,private adminService : AdminService,private router : Router) {

    this.adminAddFlightForm = new FormGroup({
      RegistrationNumber: new FormControl(null,Validators.required),
      FlightNumber: new FormControl(null,Validators.required),
      FromLocation: new FormControl(null,[Validators.required,Validators.pattern(this.pattern)]),
      ToLocation: new FormControl(null,[Validators.required,Validators.pattern(this.pattern)]),
      DepartureDate: new FormControl(null,Validators.required),
      DepartureTime: new FormControl(null,Validators.required),
      ArrivalTime: new FormControl(null,Validators.required),
      ArrivalDate: new FormControl(null,Validators.required),
      EconomyPrice: new FormControl(null,Validators.required),
      BusinessPrice: new FormControl(null,Validators.required),
      AvailableEconomySeats: new FormControl(null,Validators.required),
      AvailableBusinessSeats: new FormControl(null,Validators.required),
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



    msgAdd:any;
    addFlight(){

    console.log(this.flightdetails);
    this.adminService.addFlights(this.flightdetails).subscribe((res : any)=>
    {
      console.log(res);
      this.msgAdd = "Flight added successfully!!!"
      alert(this.msgAdd);
      this.getFlightdetails();

    },err => {
      if(err.error == "Already Exists"){
        this.err = "Flight already exists";
        console.log(this.err)
      }
    })
    }

    ngOnInit(): void {
      if(sessionStorage.getItem('LoginCheckCode') != "Admin"){
        this.router.navigate(['/loginPage/flightSearch'])
      }
      this.getFlightdetails();
      this.pastdatedisable();
    }

}
