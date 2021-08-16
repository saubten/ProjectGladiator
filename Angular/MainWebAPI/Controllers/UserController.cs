using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MainWebAPI.Models;
using System.Net.Mail;
using System.Net;
using Microsoft.EntityFrameworkCore;

namespace MainWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AirlineReservationContext db;

        public UserController(AirlineReservationContext context)
        {
            db = context;
        }

        #region SendingEmailOtp
        private int SendEmailOtp(string to)
        {
            using SmtpClient smtp = new SmtpClient
            {
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                EnableSsl = true,
                Host = "smtp.gmail.com",
                Port = 587,
                Credentials = new NetworkCredential("SAKKairlines@gmail.com","SAKK@123"),
            };

            string subject = "SAKK Airlines OTP (Forgot Password)";
            Random rand = new Random();
            int otp = rand.Next(100000, 999999);
            string body = "OTP : " + otp;
            try
            {
                smtp.Send("SAKKairlines@gmail.com", to, subject, body);
                return otp;
            }
            catch (Exception e)
            {
                return -1;
            }   
        }

        #endregion

        #region ForgotPassword
        [HttpGet]
        [Route("forgotpassword")]
        public IActionResult SendOTPtoEmail([FromQuery(Name = "regId")] int regId, [FromQuery(Name = "email")] string email)
        {
            try
            {
                string Email = db.Users.Where(u => u.UserId == regId && u.EmailId == email).Select(u => u.EmailId).FirstOrDefault();
                using SmtpClient smtp = new SmtpClient
                {
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    UseDefaultCredentials = false,
                    EnableSsl = true,
                    Host = "smtp.gmail.com",
                    Port = 587,
                    Credentials = new NetworkCredential("SAKKairlines@gmail.com", "SAKK@123"),
                };

                string subject = "SAKK Airlines OTP (Forgot Password)";
                Random rand = new Random();
                int otp = rand.Next(100000, 999999);
                string body = "OTP : " + otp;
                try
                {
                    smtp.Send("SAKKairlines@gmail.com", email, subject, body);
                    return Ok(otp);
                    
                }
                catch (Exception e)
                {
                    return BadRequest("Connection issue");
                }
            }
            catch(Exception e)
            {
                return BadRequest("Invalid");
            }
        }

        #endregion

        #region UpdatePassword
        [HttpPut]
        [Route("updatepassword")]
        public IActionResult updatePassword([FromQuery(Name ="newpassword")] string newpassword, [FromQuery(Name = "email")] string email)
        {
            try
            {
                User usr = (from u in db.Users
                            where u.EmailId == email
                            select u).FirstOrDefault();

                usr.Password = newpassword;
                db.Users.Update(usr);
                db.SaveChanges();
                return Ok("Password Updated Re-login");
            }
            catch(Exception eeyy)
            {
                return BadRequest("Invalid");
            }
        }

        #endregion

        #region GetAllUsers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await db.Users.ToListAsync();
        }

        #endregion

        #region GetUserbyID
        // GET: api/Users/5
        [HttpGet("(e)")]
        public async Task<ActionResult<User>> GetUser(string e)
        {
            var user = await db.Users.FindAsync(e);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        #endregion

        #region Add User
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {

            db.Users.Add(user);
            await db.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.UserId }, user);
        }

        #endregion

        #region sendingRegistrationId
        [HttpGet]
        [Route("sendRegId")]
        public IActionResult ForTheUser([FromQuery(Name ="email")] string email)
        {
            var id = db.Users.Where(u => u.EmailId == email).Select(u => u.UserId).First();

            using SmtpClient smtp = new SmtpClient
            {
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                EnableSsl = true,
                Host = "smtp.gmail.com",
                Port = 587,
                Credentials = new NetworkCredential("SAKKairlines@gmail.com", "SAKK@123"),
            };

            string body = "Your User ID is " + id;
            smtp.Send("SAKKairlines@gmail.com", email, "User Registration Number", body);

            return Ok("Check Your Email");
        }

        #endregion

        #region GetUser
        [HttpGet]
        [Route("getUserId")]
        public IActionResult GetUserId([FromQuery(Name = "email")] string email)
        {
            var id = db.Users.Where(u => u.EmailId == email).Select(u => u.UserId).FirstOrDefault();
            return Ok(id);
        }
        #endregion

        #region CheckUserPassword
        [HttpGet]
        [Route("checkPassword")]
        public IActionResult CheckPassword([FromQuery(Name = "email")] string email)
        {
            var id = db.Users.Where(u => u.EmailId == email).Select(u => u.UserId).First();
            return Ok(id);
        }
        #endregion

        #region GetBookingsByEmail(OW/RT) 
        [HttpGet]
        [Route("getBookings")]
        public IActionResult GetBookings([FromQuery(Name = "email")] string email)
        {
            var id = db.Users.Where(u => u.EmailId == email).Select(u => u.UserId).First();
            var transactionIds = db.TransactionTbs.Where(u => u.UserId == id).Select(t => t.TransactionId).ToList();

            var bookings = ( from b in db.Bookings
                                where transactionIds.Contains(b.TransactionId)
                                select b.BookingId ).ToList();

            var OWbookings = (from b in db.Bookings
                              join f in db.Flights on b.FlightNumber equals f.FlightNumber
                              where transactionIds.Contains(b.TransactionId)
                              select new
                              {
                                  BookingID = b.BookingId,
                                  OFlight = b.FlightNumber,
                                  OTicketFare = b.TicketFare,
                                  OClass = b.IsBusiness,
                                  OSource = f.FromLocation,
                                  ODestination = f.ToLocation,
                                  ODepartureDate = f.DepartureDate,
                                  ODepartureTime = f.DepartureTime,
                                  BCancelled = b.IsCancelled,
                                  RTripBool = b.IsReturn,
                              }).OrderByDescending(c => c.BookingID).ToList();
            var RTbookings = (from r in db.RoundTrips
                              join f in db.Flights on r.FlightNumber equals f.FlightNumber
                              where bookings.Contains( r.BookingId)
                              select new
                              {
                                  RBookingId = r.BookingId,
                                  RRoundTripId = r.RoundTripId,
                                  RFlight = r.FlightNumber,
                                  RTicketFare = r.TicketFare,
                                  RClass = r.IsBusiness,
                                  RSource = f.FromLocation,
                                  RDestination = f.ToLocation,
                                  RDepartureDate = f.DepartureDate,
                                  RDepartureTime = f.DepartureTime,
                                  RCancelled = r.IsCancelled,
                              }).ToList();

            return Ok(new {OWbookings,RTbookings});
        }
        #endregion

        #region Login
        [HttpGet]
        [Route("login")]
        public IActionResult checkLogin([FromQuery(Name ="email")] string email, [FromQuery(Name = "password")] string password)
        {
            try
            {
                var result = db.Users.Where(x => x.EmailId == email && x.Password == password).FirstOrDefault();
                if (result != null)
                {
                    return Ok(result);
                }
                else
                {
                    return NotFound("Invalid");
                }
            }
            catch (Exception e)
            {
                return Ok(e.Message);
            }
        }
        #endregion
    }
}
