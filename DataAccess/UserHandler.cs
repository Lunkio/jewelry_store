using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using JewelryStore.Models;

namespace JewelryStore.DataAccess
{
    public class UserHandler : IUserHandler
    {
        private readonly ConnectionString _connectionString;

        public UserHandler(ConnectionString connectionString)
        {
            _connectionString = connectionString;
        }
        public async Task<IEnumerable<UserModel>> GetAllUsers()
        {
            const string query = @"SELECT u.id, u.Username, u.Password FROM dbo.Users u";

            using (SqlConnection conn = new SqlConnection(_connectionString.Value))
            {
                var result = await conn.QueryAsync<UserModel>(query);
                return result;
            }
        }
        public async Task<UserModel> GetUserById(int id)
        {
            const string query = @"SELECT u.id, u.Username, u.Password FROM dbo.Users u WHERE u.id = @Id";

            using (SqlConnection conn = new SqlConnection(_connectionString.Value))
            {
                var result = await conn.QueryFirstOrDefaultAsync<UserModel>(query, new { Id = id });
                return result;
            }
        }


        public async Task<int> AddUser(CreateUserModel user)
        {
            const string query = @"INSERT INTO dbo.Jewelries ([Username], [Password]) VALUES(@Username, @Password)";

            using (SqlConnection conn = new SqlConnection(_connectionString.Value))
            {
                // Dapper's ExecuteAsync method for executing the insert query. This method returns an integer value representing the number of rows modified in that SQL query. Check UsersController.cs
                var result = await conn.ExecuteAsync(query, new { Username = user.Username, Password = user.Password });
                return result;
            }
        }

        public async Task<int> DeleteUser(int id)
        {
            const string query = @"DELETE FROM dbo.Users WHERE id = @Id";

            using (SqlConnection conn = new SqlConnection(_connectionString.Value))
            {
                // Dapper's ExecuteAsync method for executing the insert query. This method returns an integer value representing the number of rows modified in that SQL query. Check JewelriesController.cs
                var result = await conn.ExecuteAsync(query, new { Id = id });
                return result;
            }
        }
    }
}
