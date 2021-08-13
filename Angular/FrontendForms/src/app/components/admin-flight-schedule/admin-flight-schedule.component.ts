import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Flights } from 'src/app/models/flights';
import { AdminService } from 'src/app/services/admin.service';



@Component({
  selector: 'app-admin-flight-schedule',
  templateUrl: './admin-flight-schedule.component.html',
  styleUrls: ['./admin-flight-schedule.component.css']
})
export class AdminFlightScheduleComponent implements OnInit {

  constructor(private http:HttpClient,private adminService : AdminService) { }


searchTerm:any

  flight:Flights[] = []
   flightDetails:any;

   getFlightdetails()
   {
     
     this.adminService.getFlights().subscribe((res)=>{

      console.log(res);
      this.flightDetails=res;
      this.flight=this.flightDetails;
      console.log(this.flight)
     },(err)=>{
      console.log(err)

     })   
   }

  ngOnInit(): void {
    this.getFlightdetails();
  }

}
