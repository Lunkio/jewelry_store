using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JewelryStore.DataAccess;
using JewelryStore.Models;
using Microsoft.AspNetCore.Mvc;

namespace JewelryStore.Controllers
{
    [ApiController]
    public class BuyersController : ControllerBase
    {
        private readonly IBuyerHandler _buyerHandler;

        public BuyersController(IBuyerHandler buyerHandler)
        {
            _buyerHandler = buyerHandler;
        }

        [HttpGet("api/buyers")]
        public async Task<IActionResult> GetBuyers()
        {
            return Ok(await _buyerHandler.GetAllBuyers());
        }

        [HttpGet("api/buyers/{id}")]
        public async Task<IActionResult> GetOneBuyer(int id)
        {
            var buyer = await _buyerHandler.GetBuyerById(id);

            if (buyer != null)
            {
                return Ok(buyer);
            }

            return NotFound(new { Message = $"Buyer with id {id} is not available" });
        }

        [HttpPost("api/buyers")]
        public async Task<IActionResult> CreateBuyers(CreateBuyerModel buyer)
        {
            var result = await _buyerHandler.AddBuyer(buyer);

            if (result > 0)
            {
                return Ok(new { Message = "Buyer added successfully" });
            }

            return StatusCode(500, new { Message = "Buyer was not added, please try again later" });
        }

        [HttpDelete("api/buyers/{id}")]
        public async Task<IActionResult> DeleteBuyer(int id)
        {
            var result = await _buyerHandler.DeleteBuyer(id);

            if (result > 0)
            {
                return Ok(new { Message = "Buyer removed successfully" });
            }

            return StatusCode(500, new { Message = $"Buyer with id {id} does not exist" });
        }
    }
}
