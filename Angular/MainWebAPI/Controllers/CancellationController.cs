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
    public class CancellationController : ControllerBase
    {
        private readonly AirlineReservationContext db;

        public CancellationController(AirlineReservationContext context)
        {
            db = context;
        }
        #region RoundTripCancellation
        [HttpPut]
        [Route("roundTripCancellation")]
        public IActionResult roundTripCancellation([FromQuery(Name = "rtid")] int rtid)
        {
            try
            {
                var roundtrip = db.RoundTrips.Where(r => r.RoundTripId == rtid).FirstOrDefault();
                roundtrip.IsCancelled = true;
                db.RoundTrips.Update(roundtrip);

                var rticketfare = roundtrip.TicketFare;
                var bookingId = roundtrip.BookingId;

                var seatsToMadeAvailable = db.Passegers.Where(p => p.BookingId == bookingId).Select(s => s.RoundTripSeatId).ToList();

                var seats = db.FlightSeats.Where(f => seatsToMadeAvailable.Contains(f.SeatId)).ToList();
                foreach (var s in seats)
                {
                    s.IsAvailable = true;
                    db.FlightSeats.Update(s);
                }

                //WALLET UPDATION
                var tid = db.Bookings.Where(b => b.BookingId == bookingId).Select(s => s.TransactionId).FirstOrDefault();
                var uid = db.TransactionTbs.Where(t => t.TransactionId == tid).Select(s => s.UserId).FirstOrDefault();
                var user = db.Users.Where(u => u.UserId == uid).FirstOrDefault();
                user.WalletAmount += (rticketfare * (decimal)0.9);
                db.Users.Update(user);

                db.SaveChanges();
                return Ok("Cancellation Done");
            }
            catch (Exception e)
            {
                return BadRequest("Cancellation Failed");
            }
            
        }
        #endregion

        #region Booking Cancellation
        [HttpPut]
        [Route("bookingCancellation")]
        public IActionResult bookingCancellation([FromQuery(Name = "bid")] int bid)
        {
            try
            {
                var booking = db.Bookings.Where(b => b.BookingId == bid).FirstOrDefault();
                booking.IsCancelled = true;
                db.Bookings.Update(booking);

                var oticketfare = booking.TicketFare;
                var rticketfare = (decimal)0.00;
                var oSeatsToMadeAvailable = db.Passegers.Where(p => p.BookingId == bid).Select(s => s.OneWaySeatId).ToList();


                var oSeats = db.FlightSeats.Where(f => oSeatsToMadeAvailable.Contains(f.SeatId)).ToList();

                foreach (var o in oSeats)
                {
                    o.IsAvailable = true;
                    db.FlightSeats.Update(o);
                }
                if (booking.IsReturn)
                {
                    var roundtrip = db.RoundTrips.Where(r => r.BookingId == bid).FirstOrDefault();
                    roundtrip.IsCancelled = true;
                    db.RoundTrips.Update(roundtrip);
                    rticketfare = roundtrip.TicketFare;
                    var rSeatsToMadeAvailable = db.Passegers.Where(p => p.BookingId == bid).Select(s => s.RoundTripSeatId).ToList();
                    var rSeats = db.FlightSeats.Where(f => rSeatsToMadeAvailable.Contains(f.SeatId)).ToList();
                    foreach (var r in rSeats)
                    {
                        r.IsAvailable = true;
                        db.FlightSeats.Update(r);
                    }
                }

                var totalfare = oticketfare + rticketfare;




                //WALLET UPDATION
                var tid = db.Bookings.Where(b => b.BookingId == bid).Select(s => s.TransactionId).FirstOrDefault();
                var uid = db.TransactionTbs.Where(t => t.TransactionId == tid).Select(s => s.UserId).FirstOrDefault();
                var user = db.Users.Where(u => u.UserId == uid).FirstOrDefault();
                double deductionRate = 0.9;
                double amountToDeduct = (double)totalfare * deductionRate;

                user.WalletAmount += (decimal)amountToDeduct;
                db.Users.Update(user);

                db.SaveChanges();
                return Ok("Cancellation Done");
            }
            catch (Exception e)
            {
                return BadRequest("Cancellation Failed");
            }

        }
        #endregion
    }
}
