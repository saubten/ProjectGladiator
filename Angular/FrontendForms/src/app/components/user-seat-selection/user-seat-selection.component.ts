import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Seats } from 'src/app/models/seats';
import { SeatService } from 'src/app/services/seats.service';

@Component({
  selector: 'app-user-seat-selection',
  templateUrl: './user-seat-selection.component.html',
  styleUrls: ['./user-seat-selection.component.css']
})
export class UserSeatSelectionComponent implements OnInit {

    seats : Seats [];
    seatIndex : number;
    seatTogglers = new Array<boolean>(158).fill(false);
  
    element? : HTMLDivElement;
    temp : any;
  
  
    seatNoPush : string;
    seatIdPush : number;
    selectedSeats : string[] =[];
    selectedSeatsId : number[] =[];
  
    seatCount : number = 0;
    classBool : boolean;
    availableBool : boolean = false;
    freezeCheck : number = 0;
  
    OWflightNumber : string;
    isReturn : boolean;
    RTflightNumber : string;
    tripName : string;

    OWselectedSeats : string[] =[];
    OWselectedSeatsId : number[] =[];
    OWclassBool : boolean;
    skip : boolean = false;
  
    constructor(private service : SeatService,private route : ActivatedRoute, private router : Router) {
      
    }
  
    // SEAT SELECTION METHOD 
    // Business Seats Allocation Method
    SeatB(event : any){  
      this.seatIndex = Number(event.target.id);  
      if(this.seatCount != 0 || this.seatTogglers[this.seatIndex] == true){
        if(this.seats[this.seatIndex].isAvailable){
          this.seatTogglers[this.seatIndex] = !this.seatTogglers[this.seatIndex];
          this.temp = document.getElementById(event.target.id);
          this.element = this.temp;
          if(this.seatTogglers[this.seatIndex]){    
            this.element?.setAttribute("class",'seat selected');
            this.seatNoPush = event.target.attributes.name.nodeValue;
            this.seatIdPush = this.seats[this.seatIndex].seatId
            this.selectedSeatsId.push(this.seatIdPush); 
            this.selectedSeats.push(this.seatNoPush);
            this.seatCount -= 1; 
          }
          else{
            this.element?.setAttribute("class",'seat');
            this.seatNoPush = event.target.attributes.name.nodeValue;
            this.seatIdPush = this.seats[this.seatIndex].seatId
            this.selectedSeatsId.splice(this.selectedSeatsId.indexOf(this.seatIdPush),1) 
            this.selectedSeats.splice(this.selectedSeats.indexOf(this.seatNoPush),1) 
            this.seatCount += 1; 
          }   
        }
      }
      console.log(this.selectedSeats)
      console.log(this.selectedSeatsId)
    }
  
    // Economy Seats Allocation Method
    SeatE(event : any){  
      this.seatIndex = Number(event.target.id);  
      if(this.seatCount != 0 || this.seatTogglers[this.seatIndex] == true){
        if(this.seats[this.seatIndex].isAvailable){
          this.seatTogglers[this.seatIndex] = !this.seatTogglers[this.seatIndex];
          this.temp = document.getElementById(event.target.id);
          this.element = this.temp;
          if(this.seatTogglers[this.seatIndex]){    
            this.element?.setAttribute("class",'seat selected');
            this.seatNoPush = event.target.attributes.name.nodeValue;
            this.seatIdPush = this.seats[this.seatIndex].seatId
            this.selectedSeatsId.push(this.seatIdPush);
            this.selectedSeats.push(this.seatNoPush); 
            this.seatCount -= 1; 
          }
          else{
            this.element?.setAttribute("class",'seat');
            this.seatNoPush = event.target.attributes.name.nodeValue;
            this.seatIdPush = this.seats[this.seatIndex].seatId
            this.selectedSeatsId.splice(this.selectedSeatsId.indexOf(this.seatIdPush),1)
            this.selectedSeats.splice(this.selectedSeats.indexOf(this.seatNoPush),1)  
            this.seatCount += 1; 
          }   
        }
      }
      console.log(this.selectedSeats)
      console.log(this.selectedSeatsId)
    }
  

    Submit(){

      if(!this.skip){
        if(this.isReturn){
          this.OWselectedSeats = this.selectedSeats;
          this.OWselectedSeatsId = this.selectedSeatsId;
          this.OWclassBool =this.classBool;
          this.availableBool = true;
          this.skip = true;
          this.tripName = "Round Trip";
          this.classBool = Boolean(JSON.parse(localStorage.getItem('RTflightType')!));
          this.RTflightNumber = JSON.parse(localStorage.getItem('roundtripDetails')!)['flightNumber'];
          this.seatCount = Number(JSON.parse(localStorage.getItem('passengerList')!).length);
          this.seatTogglers.forEach((seat,index) =>{
            this.seatTogglers[index] = false;
            this.temp = document.getElementById(index.toString());
            this.element = this.temp;
            this.element?.setAttribute("class",'seat');
          })
          console.log(this.seatTogglers)
          this.selectedSeatsId = [];
          this.selectedSeats = [];
          this.getSeats(this.RTflightNumber!);
        }
      }
      else{
        //this.updateSelectedSeats(this.OWselectedSeatsId);
        //this.updateSelectedSeats(this.selectedSeatsId);
        //this.updateAvailableSeatsInDb(this.RTflightNumber!);
        //this.updateAvailableSeatsInDb(this.OWflightNumber);
        localStorage.setItem('OWseatsSelected',JSON.stringify(this.OWselectedSeats));
        localStorage.setItem('OWseatsSelectedId',JSON.stringify(this.OWselectedSeatsId));
        localStorage.setItem('OWclassBool',JSON.stringify(this.OWclassBool));
        localStorage.setItem('RTseatsSelected',JSON.stringify(this.selectedSeats));
        localStorage.setItem('RTseatsSelectedId',JSON.stringify(this.selectedSeatsId));
        localStorage.setItem('RTclassBool',JSON.stringify(this.classBool));
        this.navigate();
      }

      if(!this.availableBool){
        //this.updateSelectedSeats(this.selectedSeatsId);
        //this.updateAvailableSeatsInDb(this.OWflightNumber);
        localStorage.setItem('OWseatsSelected',JSON.stringify(this.selectedSeats));
        localStorage.setItem('OWseatsSelectedId',JSON.stringify(this.selectedSeatsId));
        localStorage.setItem('OWclassBool',JSON.stringify(this.classBool));
        this.navigate();
      }
    }

    
    navigate(){
      if(this.route.parent?.routeConfig?.path?.localeCompare("home") == 0){
        this.router.navigate(["/loginPage","1"])
      }
      else {
        this.router.navigate(["/payment"]);
      }
    }
    
    ngOnInit(): void {
      if(this.route.parent?.routeConfig?.path == "userDashboard"){
        if(sessionStorage.getItem('LoginCheckCode') != "User"){
          this.router.navigate(['/loginPage/flightSearch'])
        }
      }
      this.seatCount = Number(JSON.parse(localStorage.getItem('passengerList')!).length)
      this.classBool = Boolean(JSON.parse(localStorage.getItem('OWflightType')!))
      this.freezeCheck = this.seatCount;

      this.OWflightNumber = JSON.parse(localStorage.getItem('onewayDetails')!)['flightNumber']
      
      this.isReturn = JSON.parse(localStorage.getItem('flagTripType')!);
      this.tripName = "One Way"
      this.getSeats(this.OWflightNumber);
    }
  
  
    // API METHODS 
    getSeats(flightNumber : string){
      this.service.getAllSeats(flightNumber).subscribe( data =>
        {
          this.seats = data as Seats[];
          console.log(data);
        },
        err => { 
        console.log(err);
        });
    }
  
    // updateSelectedSeats(selectedSeatsId : number[]){

    //   this.service.updateSeats(selectedSeatsId).subscribe(data => 
    //     {
    //       console.log(data);
    //     },(err) =>{
    //       console.log(err)
    //     }
    //   );
    // }

    // updateAvailableSeatsInDb(flightNumber : string){

    //   this.service.availbleSeatsUpdate(flightNumber,this.classBool,this.freezeCheck).subscribe(data => 
    //     {
    //       console.log(data);
    //     },(err) =>{
    //       console.log(err)
    //     }
    //   );
    // }
  }


