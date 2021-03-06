import { Time } from "@angular/common";

export class RTbookings{
    rRoundTripId : number;
    rBookingId : number;
    rFlight : string;
    rTicketFare : number;
    rClass : boolean;
    rSource : string;
    rDestination : string;
    rDepartureDate: Date;
    rDepartureTime: Time;
    rCancelled : boolean;
}