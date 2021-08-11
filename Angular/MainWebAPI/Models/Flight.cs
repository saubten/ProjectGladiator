using System;
using System.Collections.Generic;

#nullable disable

namespace MainWebAPI.Models
{
    public partial class Flight
    {
        public Flight()
        {
            Bookings = new HashSet<Booking>();
            FlightSeats = new HashSet<FlightSeat>();
            RoundTrips = new HashSet<RoundTrip>();
        }

        public string RegistrationNumber { get; set; }
        public string FlightNumber { get; set; }
        public string FromLocation { get; set; }
        public string ToLocation { get; set; }
        public DateTime DepartureDate { get; set; }
        public TimeSpan DepartureTime { get; set; }
        public DateTime ArrivalDate { get; set; }
        public TimeSpan ArrivalTime { get; set; }
        public decimal EconomyPrice { get; set; }
        public decimal BusinessPrice { get; set; }
        public int AvailableEconomySeats { get; set; }
        public int AvailableBusinessSeats { get; set; }
        public bool IsCancelled { get; set; }

        public virtual Airplane RegistrationNumberNavigation { get; set; }
        public virtual ICollection<Booking> Bookings { get; set; }
        public virtual ICollection<FlightSeat> FlightSeats { get; set; }
        public virtual ICollection<RoundTrip> RoundTrips { get; set; }
    }
}
