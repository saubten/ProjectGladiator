import { Component, OnInit } from '@angular/core';
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
    seatTogglers = new Array<boolean>().fill(false);
  
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
  
    constructor(private service : SeatService) {
      
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
      // For Debug
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
      //For debug
      console.log(this.selectedSeats)
      console.log(this.selectedSeatsId)
    }
  
    Submit(){
      debugger;
      this.updateSelectedSeats();
      if(!this.availableBool){
        this.updateAvailableSeatsInDb(this.OWflightNumber);
      }
      else{
        this.updateAvailableSeatsInDb(this.RTflightNumber!);
      }
      if(this.isReturn){
        this.availableBool = true;
        this.isReturn = false;
        this.tripName = "Round Trip";
        this.classBool = Boolean(JSON.parse(localStorage.getItem('RTflightType')!));
        this.RTflightNumber = JSON.parse(localStorage.getItem('roundtripDetails')!)['flightNumber'];
        this.seatCount = Number(JSON.parse(localStorage.getItem('passengerList')!).length);
        this.seatTogglers.forEach((value,index) =>{
          if(value == true)
          value = false;
          this.temp = document.getElementById(index.toString());
          this.element = this.temp;
          this.element?.setAttribute("class",'seat');
        })
        this.getSeats(this.RTflightNumber!);
      }
      this.selectedSeats =[];
      this.selectedSeatsId =[];
    }
  
    
    ngOnInit(): void {
      
      console.log(Number(JSON.parse(localStorage.getItem('passengerList')!).length));
      this.seatCount = Number(JSON.parse(localStorage.getItem('passengerList')!).length)
      this.classBool = Boolean(JSON.parse(localStorage.getItem('OWflightType')!))
      this.freezeCheck = this.seatCount;

      this.OWflightNumber = JSON.parse(localStorage.getItem('onewayDetails')!)['flightNumber']//Value will be taken from either localStorage or sessionStorage
      
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
  
    updateSelectedSeats(){
      debugger;
      this.service.updateSeats(this.selectedSeatsId).subscribe(data => 
        {
          console.log(data);
        },(err) =>{
          console.log(err)
        }
      );
    }

    updateAvailableSeatsInDb(flightNumber : string){
      debugger;
      this.service.availbleSeatsUpdate(flightNumber,this.classBool,this.freezeCheck).subscribe(data => 
        {
          console.log(data);
        },(err) =>{
          console.log(err)
        }
      );
    }
  }


