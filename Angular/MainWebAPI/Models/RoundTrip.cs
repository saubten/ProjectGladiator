using System;
using System.Collections.Generic;

#nullable disable

namespace MainWebAPI.Models
{
    public partial class RoundTrip
    {
        public int RoundTripId { get; set; }
        public int BookingId { get; set; }
        public string FlightNumber { get; set; }
        public decimal TicketFare { get; set; }
        public bool IsCancelled { get; set; }
        public bool IsBusiness { get; set; }

        public virtual Booking Booking { get; set; }
        public virtual Flight FlightNumberNavigation { get; set; }
    }
}
