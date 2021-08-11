using System;
using System.Collections.Generic;

#nullable disable

namespace MainWebAPI.Models
{
    public partial class FlightSeat
    {
        public FlightSeat()
        {
            PassegerOneWaySeats = new HashSet<Passeger>();
            PassegerRoundTripSeats = new HashSet<Passeger>();
        }

        public int SeatId { get; set; }
        public string FlightNumber { get; set; }
        public string SeatNo { get; set; }
        public bool IsAvailable { get; set; }

        public virtual Flight FlightNumberNavigation { get; set; }
        public virtual ICollection<Passeger> PassegerOneWaySeats { get; set; }
        public virtual ICollection<Passeger> PassegerRoundTripSeats { get; set; }
    }
}
