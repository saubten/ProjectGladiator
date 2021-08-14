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
    public class BookingController : ControllerBase
    {
        private readonly AirlineReservationContext db;

        public BookingController(AirlineReservationContext context)
        {
            db = context;
        }
        [HttpPost]
        public IActionResult OneWayBooking([FromBody] Booking booking)
        {
            try
            {
                db.Bookings.Add(booking);
                db.SaveChanges();
            }
            catch (Exception e)
            {
                return BadRequest("Invalid data");
            }
            return Ok(db.Bookings);

        }

        [HttpPost]
        [Route("RoundTripBooking")]
        public IActionResult ReturnBooking([FromBody] RoundTrip roundTrip)
        {
            try
            {

                db.RoundTrips.Add(roundTrip);
                db.SaveChanges();
            }

            catch (Exception e)
            {
                return BadRequest("Invalid data");
            }

            return Ok(db.RoundTrips);
        }
    }
}
