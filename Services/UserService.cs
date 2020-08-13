using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JewelryStore.Helpers;
using JewelryStore.Models;
using Microsoft.Extensions.Options;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using JewelryStore.DataAccess;

namespace JewelryStore.Services
{
    public interface IUserService
    {
        AuthenticateResponse Authenticate(AuthenticateRequest model, IEnumerable<UserModel> users);
        Task<UserModel> GetById(int id);
    }

    public class UserService : IUserService
    {
        private readonly AppSettings _appSettings;
        private readonly IUserHandler _userHandler;

        public UserService(IOptions<AppSettings> appSettings, IUserHandler userHandler)
        {
            _appSettings = appSettings.Value;
            _userHandler = userHandler;
        }
        public AuthenticateResponse Authenticate(AuthenticateRequest model, IEnumerable<UserModel> users)
        {

            var user = users.SingleOrDefault(x => x.Username == model.Username && x.Password == model.Password);

            // return null if user not found
            if (user == null) return null;

            // authentication successful so generate jwt token
            var token = generateJwtToken(user);

            return new AuthenticateResponse(user, token);
        }

        public async Task<UserModel> GetById(int id)
        {
            var users = await _userHandler.GetAllUsers();
            return users.FirstOrDefault(x => x.Id == id);
        }

        // helper methods
        private string generateJwtToken(UserModel user)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
