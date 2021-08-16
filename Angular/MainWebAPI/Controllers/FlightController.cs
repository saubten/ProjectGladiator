using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MainWebAPI.Models;

namespace MainWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightController : ControllerBase
    {
        private readonly AirlineReservationContext db;
        
        public FlightController(AirlineReservationContext context)
        {
            db = context;
        }

        [HttpGet]
        public IActionResult GetFlights([FromQuery] string FromLocation, [FromQuery] string ToLocation, [FromQuery] DateTime DepartureDate)
        {
            dynamic flights;

            try
            {
                flights = (from f in db.Flights
                           where f.FromLocation == FromLocation &&
                           f.ToLocation == ToLocation && f.DepartureDate == DepartureDate && f.IsCancelled != true
                           select f).ToList();
            }
            catch (Exception e)
            {
                return NotFound("No available flight");
            }

            return Ok(flights);
        }

    }
}
