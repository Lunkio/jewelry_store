using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JewelryStore.Models;

namespace JewelryStore.DataAccess
{
    public interface IUserHandler
    {
        Task<IEnumerable<UserModel>> GetAllUsers();

        Task<UserModel> GetUserById(int id);

        Task<int> AddUser(CreateUserModel user);

        Task<int> DeleteUser(int id);
    }
}
