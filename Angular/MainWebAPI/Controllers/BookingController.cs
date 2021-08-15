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
        [HttpPost("{id}")]
        public IActionResult OneWayBooking(int id,[FromBody] Booking booking)
        {
            try
            {
                db.Bookings.Add(booking);
                db.SaveChanges();

                var b = db.Bookings.Where(x => x.TransactionId == id).FirstOrDefault();
                return Ok (b);
            }
            catch (Exception e)
            {
                return BadRequest("Invalid data");
            }
            

        }

        [HttpPost]
        [Route("RoundTripBooking")]
        public IActionResult ReturnBooking([FromBody] RoundTrip roundTrip)
        {
            try
            {
                db.RoundTrips.Add(roundTrip);
                db.SaveChanges();
                return Ok("Proceed to Passenger Addition");
            }
            catch (Exception e)
            {
                return BadRequest("Invalid data");
            }


        }

        [HttpGet]
        public IActionResult GetBookingID([FromQuery(Name ="userId")] int UserID)
        {

            var tid = (from t in db.TransactionTbs
                       where t.UserId == UserID
                       select new { t.TransactionId }).ToList().OrderByDescending(c => c.TransactionId).First();

            return Ok(tid);

        }
    }
}
