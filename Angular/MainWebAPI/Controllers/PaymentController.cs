﻿using MainWebAPI.Models;
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
    public class PaymentController : ControllerBase
    {
        private readonly AirlineReservationContext db;

        public PaymentController(AirlineReservationContext context)
        {
            db = context;
        }

        [HttpPost]
        public IActionResult AddTransaction([FromBody] TransactionTb transactionTb)
        {
            try
            {

                db.TransactionTbs.Add(transactionTb);
                db.SaveChanges();
            }

            catch (Exception e)
            {
                return BadRequest("Invalid data");
            }

            return Ok(db.TransactionTbs);
        }

        [HttpGet]
        public IActionResult GetTransactionId([FromQuery] int UserID)
        {

            var tid = (from t in db.TransactionTbs
                       where t.UserId == UserID
                       select new { t.TransactionId }).ToList().OrderByDescending(c => c.TransactionId).First();

            return Ok(tid);

        }
    }
}
