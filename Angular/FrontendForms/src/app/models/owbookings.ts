import { Time } from "@angular/common";

export class OWbookings{
    bookingID : number;
    oFlight : string;
    oTicketFare : number;
    oClass : boolean;
    oSource : string;
    oDestination : string;
    oDepartureDate: Date;
    oDepartureTime: Time;
    bCancelled : boolean;
    rTripBool :boolean
}