using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JewelryStore.Models;
using Dapper;
using System.Data.SqlClient;
using System.Data;

namespace JewelryStore.DataAccess
{
    public class JewelryHandler : IJewelryHandler
    {
        private readonly ConnectionString _connectionString;

        public JewelryHandler(ConnectionString connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<IEnumerable<JewelryModel>> GetAllJewelries()
        {
            const string query = @"SELECT j.id, j.Type, j.Price, j.Description, j.Availability, j.Img FROM dbo.Jewelries j";

            using (SqlConnection conn = new SqlConnection(_connectionString.Value))
            {
                var result = await conn.QueryAsync<JewelryModel>(query);
                return result;
            }
        }

        public async Task<JewelryModel> GetJewelryById(int id)
        {
            const string query = @"SELECT j.id, j.Type, j.Price, j.Description, j.Availability, j.Img FROM dbo.Jewelries j WHERE j.id = @Id";

            using(SqlConnection conn = new SqlConnection(_connectionString.Value))
            {
                var result = await conn.QueryFirstOrDefaultAsync<JewelryModel>(query, new { Id = id });
                return result;
            }
        }

        public async Task<int> AddJewelry(CreateJewelryModel jewelry)
        {
            const string query = @"INSERT INTO dbo.Jewelries ([Type], [Price], [Description], [Availability], [Img]) VALUES(@Type, @Price, @Description, @Availability, @Img)";

            using (SqlConnection conn = new SqlConnection(_connectionString.Value))
            {
                // Dapper's ExecuteAsync method for executing the insert query. This method returns an integer value representing the number of rows modified in that SQL query. Check JewelriesController.cs
                var result = await conn.ExecuteAsync(query, new { Type = jewelry.Type, Price = jewelry.Price, Description = jewelry.Description, Availability = jewelry.Availability, Img = jewelry.Img });
                return result;
            }
        }


        public async Task<int> UpdateJewelry(JewelryModel jewelry)
        {
            const string query = @"UPDATE dbo.Jewelries SET Type=@Type, Price=@Price, Description=@Description, Availability=@Availability, Img=@Img WHERE id = @Id";

            using (SqlConnection conn = new SqlConnection(_connectionString.Value))
            {
                // Dapper's ExecuteAsync method for executing the insert query. This method returns an integer value representing the number of rows modified in that SQL query. Check JewelriesController.cs
                var result = await conn.ExecuteAsync(query, new { Type = jewelry.Type, Price = jewelry.Price, Description = jewelry.Description, Availability = jewelry.Availability, Img = jewelry.Img, id = jewelry.Id });
                return result;
            }
        }   

        public async Task<int> DeleteJewelry(int id)
        {
            const string query = @"DELETE FROM dbo.Jewelries WHERE id = @Id";

            using (SqlConnection conn = new SqlConnection(_connectionString.Value))
            {
                // Dapper's ExecuteAsync method for executing the insert query. This method returns an integer value representing the number of rows modified in that SQL query. Check JewelriesController.cs
                var result = await conn.ExecuteAsync(query, new { Id = id });
                return result;
            }
        }
    }
}