using System;
using System.Collections.Generic;

#nullable disable

namespace MainWebAPI.Models
{
    public partial class Airplane
    {
        public Airplane()
        {
            Flights = new HashSet<Flight>();
        }

        public string RegistrationNumber { get; set; }
        public int EconomySeats { get; set; }
        public int BusinessSeats { get; set; }

        public virtual ICollection<Flight> Flights { get; set; }
    }
}
