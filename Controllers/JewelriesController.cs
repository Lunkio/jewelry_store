using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Policy;
using System.Threading.Tasks;
using JewelryStore.Models;
using Microsoft.AspNetCore.Mvc;
using JewelryStore.DataAccess;
using System.IO;

namespace JewelryStore.Controllers
{
    [ApiController]
    public class JewelriesController : ControllerBase
    {
        private readonly IJewelryHandler _jewelryHandler;

        public JewelriesController(IJewelryHandler jewelryHandler)
        {
            _jewelryHandler = jewelryHandler;
        }

        [HttpGet("api/jewelries")]
        public async Task<IActionResult> GetJewelries()
        {
            return Ok(await _jewelryHandler.GetAllJewelries());
        }

        [HttpGet("api/jewelries/{id}")]
        public async Task<IActionResult> GetOneJewelry(int id)
        {
            var jewelry = await _jewelryHandler.GetJewelryById(id);

            if (jewelry != null)
            {
                return Ok(jewelry);
            }

            return NotFound(new { Message = $"Jewelry with id {id} is not available" });
        }

        [HttpPost("api/jewelries")]
        public async Task<IActionResult> CreateImage([FromForm] FormData form)
        {
            CreateJewelryModel jewelry = new CreateJewelryModel();

            byte[] imageData = null;
            using (var binaryReader = new BinaryReader(form.Image.OpenReadStream()))
            {
                imageData = binaryReader.ReadBytes((int)form.Image.Length);
            }

            jewelry.Img = imageData;
            jewelry.Type = form.Type;
            jewelry.Price = form.Price;
            jewelry.Availability = form.Availability;
            jewelry.Description = form.Description;

            var result = await _jewelryHandler.AddJewelry(jewelry);

            if (result > 0)
            {
                return Ok(new { Message = "Jewelry added successfully" });
            }

            return StatusCode(500, new { Message = "Jewelry was not added, please try again later" });
        }

        [HttpPut("api/jewelries")]
        public async Task<IActionResult> UpdateJewelry(JewelryModel jewelry)
        {
            var result = await _jewelryHandler.UpdateJewelry(jewelry);

            if (result > 0)
            {
                return Ok(new { Message = "Jewelry updated successfully" });
            }

            return StatusCode(500, new { Message = "Jewelry was not updated, please try again later" });
        }

        [HttpDelete("api/jewelries/{id}")]
        public async Task<IActionResult> DeleteJewelry(int id)
        {
            var result = await _jewelryHandler.DeleteJewelry(id);

            if (result > 0)
            {
                return Ok(new { Message = "Jewelry removed successfully" });
            }

            return StatusCode(500, new { Message = $"Jewelry with id {id} does not exist" });
        }
    }
}
