using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JewelryStore.Models;
using JewelryStore.Services;
using Microsoft.AspNetCore.Mvc;
using JewelryStore.DataAccess;

namespace JewelryStore.Controllers
{
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserHandler _userHandler;
        private IUserService _userService;

        public UsersController(IUserHandler userHandler, IUserService userService)
        {
            _userHandler = userHandler;
            _userService = userService;
        }

        [Authorize]
        [HttpGet("/api/users")]
        public async Task<IActionResult> GetUsers()
        {
            return Ok(await _userHandler.GetAllUsers());
        }

        [Authorize]
        [HttpGet("api/users/{id}")]
        public async Task<IActionResult> GetOneUser(int id)
        {
            var user = await _userHandler.GetUserById(id);

            if (user != null)
            {
                return Ok(user);
            }

            return NotFound(new { Message = $"User with id {id} is not available" });
        }

        [Authorize]
        [HttpPost("api/users")]
        public async Task<IActionResult> CreateUser(CreateUserModel user)
        {
            var result = await _userHandler.AddUser(user);

            if (result > 0)
            {
                return Ok(new { Message = "User added successfully" });
            }

            return StatusCode(500, new { Message = "User was not added, please try again later" });
        }

        [Authorize]
        [HttpDelete("api/users/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var result = await _userHandler.DeleteUser(id);

            if (result > 0)
            {
                return Ok(new { Message = "User removed successfully" });
            }

            return StatusCode(500, new { Message = $"User with id {id} does not exist" });
        }

        [HttpPost("api/authenticate")]
        public async Task<IActionResult> Authenticatation(AuthenticateRequest model)
        {
            var users = await _userHandler.GetAllUsers();
            var response = _userService.Authenticate(model, users);

            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(response);
        }
    }
}
