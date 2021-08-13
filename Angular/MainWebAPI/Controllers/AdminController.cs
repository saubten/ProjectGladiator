using MainWebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MainWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly AirlineReservationContext db;

        public AdminController(AirlineReservationContext context)
        {
            db = context;
        }

        [HttpGet]
        public IActionResult GetFlights()
        {
            var allFlights = db.Flights.OrderByDescending(f => f.DepartureDate).ThenByDescending(f => f.DepartureTime).ToList();

            return Ok(allFlights);
        }

        [HttpPut]
        [Route("softFDeleteFlight")]
        public IActionResult DeleteFlight([FromQuery(Name ="flightNumber")] string flightNumber)
        {
            var flight = (from f in db.Flights
                          where f.FlightNumber == flightNumber
                          select f).First();
            flight.IsCancelled = true;

            db.SaveChanges();

            return Ok(flight);
        }

        [HttpPost]
        public IActionResult  PostFlight([FromBody] Flight flight)
        {
            db.Flights.Add(flight);
           
            return Ok("Flight Added");
        }
    }
}
