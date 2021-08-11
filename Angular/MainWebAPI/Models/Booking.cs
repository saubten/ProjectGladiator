using System;
using System.Collections.Generic;

#nullable disable

namespace MainWebAPI.Models
{
    public partial class Booking
    {
        public Booking()
        {
            Passegers = new HashSet<Passeger>();
            RoundTrips = new HashSet<RoundTrip>();
        }

        public int BookingId { get; set; }
        public string FlightNumber { get; set; }
        public int TransactionId { get; set; }
        public int Passengers { get; set; }
        public decimal TicketFare { get; set; }
        public bool IsBusiness { get; set; }
        public bool IsCancelled { get; set; }
        public bool IsReturn { get; set; }

        public virtual Flight FlightNumberNavigation { get; set; }
        public virtual TransactionTb Transaction { get; set; }
        public virtual ICollection<Passeger> Passegers { get; set; }
        public virtual ICollection<RoundTrip> RoundTrips { get; set; }
    }
}
