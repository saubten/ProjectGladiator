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

        /// <summary>
        /// To add the booking details for one way
        /// </summary>
        /// <param name="id"></param>
        /// <param name="booking"></param>
        /// <returns> returns the booking based on the transaction id</returns>

        #region OnewayBooking
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
        #endregion

        /// <summary>
        /// To add booking details for round trip
        /// </summary>
        /// <param name="roundTrip"></param>
        /// <returns></returns>
        #region RoundTripBooking
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
        #endregion

        /// <summary>
        /// To fetch the most recent transaction id
        /// </summary>
        /// <param name="UserID"></param>
        /// <returns>Transaction Id</returns>
        #region BookingID
        [HttpGet]
        public IActionResult GetBookingID([FromQuery(Name ="userId")] int UserID)
        {

            var tid = (from t in db.TransactionTbs
                       where t.UserId == UserID
                       select new { t.TransactionId }).ToList().OrderByDescending(c => c.TransactionId).First();

            return Ok(tid);
        }
        #endregion
    }
}
