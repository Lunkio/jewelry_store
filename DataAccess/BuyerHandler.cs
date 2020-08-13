using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using JewelryStore.Models;

namespace JewelryStore.DataAccess
{
    public class BuyerHandler : IBuyerHandler
    {
        private readonly ConnectionString _connectionString;

        public BuyerHandler(ConnectionString connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<IEnumerable<BuyerModel>> GetAllBuyers()
        {
            const string query = @"SELECT b.id, b.FirstName, b.LastName, b.Address, b.Zip, b.City, b.Country, b.PayerID, b.Email, b.TimeOfPurchase FROM dbo.Buyers b";

            using (SqlConnection conn = new SqlConnection(_connectionString.Value))
            {
                var result = await conn.QueryAsync<BuyerModel>(query);
                return result;
            }
        }

        public async Task<BuyerModel> GetBuyerById(int id)
        {
            const string query = @"SELECT b.id, b.FirstName, b.LastName, b.Address, b.Zip, b.City, b.Country, b.PayerID, b.Email, b.TimeOfPurchase FROM dbo.Buyers b WHERE b.id = @Id";

            using (SqlConnection conn = new SqlConnection(_connectionString.Value))
            {
                var result = await conn.QueryFirstOrDefaultAsync<BuyerModel>(query, new { Id = id });
                return result;
            }
        }

        public async Task<int> AddBuyer(CreateBuyerModel buyer)
        {
            //const string query = @"INSERT INTO dbo.Buyers ([FirstName], [LastName], [Address], [Zip], [City], [Country], [PayerID], [Email], [TimeOfPurchase]) VALUES(@FirstName, @LastName, @Address, @Zip, @City, @Country, @PayerID, @Email, @TimeOfPurchase)";

            using (SqlConnection conn = new SqlConnection(_connectionString.Value))
            {
                // Dapper's ExecuteAsync method for executing the insert query. This method returns an integer value representing the number of rows modified in that SQL query. Check JewelriesController.cs
                //var result = await conn.ExecuteAsync(query, new { FirstName = buyer.FirstName, LastName = buyer.LastName, Address = buyer.Address, Zip = buyer.Zip, City = buyer.City, Country = buyer.Country, PayerID = buyer.PayerID, Email = buyer.Email, TimeOfPurchase = buyer.TimeOfPurchase });
                //return result;
                var p = new DynamicParameters();
                p.Add("@FirstName", buyer.FirstName);
                p.Add("@LastName", buyer.LastName);
                p.Add("@Address", buyer.Address);
                p.Add("@Zip", buyer.Zip);
                p.Add("@City", buyer.City);
                p.Add("@Country", buyer.Country);
                p.Add("@PayerID", buyer.PayerID);
                p.Add("@Email", buyer.Email);
                p.Add("@TimeOfPurchase", buyer.TimeOfPurchase);
                p.Add("@id", 0, dbType: DbType.Int32, direction: ParameterDirection.Output);

                conn.Execute("dbo.spCreateBuyer", p, commandType: CommandType.StoredProcedure);

                buyer.Id = p.Get<int>("@id");

                var result = await AddBuyerIdAndJewelryId(buyer, conn);

                if (result <= 0)
                {
                    const string query = @"DELETE FROM dbo.Buyers WHERE id = @Id";
                    await conn.ExecuteAsync(query, new { Id = buyer.Id });
                    result = 0;
                }

                return result;
            }
        }

        public async Task<int> AddBuyerIdAndJewelryId(CreateBuyerModel buyer, SqlConnection conn)
        {
            const string query = @"INSERT INTO dbo.BuyersJewelries ([BuyerId], [JewelryId]) VALUES(@BuyerId, @JewelryId)";

            var result = 0;
            foreach (JewelryModel jewelry in buyer.Items)
            {
                // Dapper's ExecuteAsync method for executing the insert query. This method returns an integer value representing the number of rows modified in that SQL query
                result = await conn.ExecuteAsync(query, new { BuyerId = buyer.Id, JewelryId = jewelry.Id });
                if (result > 0)
                {
                    continue;
                } else
                {
                    const string queryDelete = @"DELETE FROM dbo.BuyersJewelries bj WHERE bj.BuyerId = @Id";
                    await conn.ExecuteAsync(queryDelete, new { Id = buyer.Id });
                    result = 0;
                    break;
                }
            }
            return result;
        }

        public async Task<int> DeleteBuyer(int id)
        {
            const string queryBuyerOnly = @"DELETE FROM dbo.Buyers WHERE id = @Id";
            const string queryBuyerIdJewelryId = @"DELETE FROM dbo.BuyersJewelries bj WHERE bj.BuyerId = @Id";

            using (SqlConnection conn = new SqlConnection(_connectionString.Value))
            {
                // Dapper's ExecuteAsync method for executing the insert query. This method returns an integer value representing the number of rows modified in that SQL query. Check JewelriesController.cs
                var result = await conn.ExecuteAsync(queryBuyerIdJewelryId, new { Id = id });
                if (result > 0)
                {
                    result = await conn.ExecuteAsync(queryBuyerOnly, new { Id = id });
                }
                return result;
            }
        }

        
    }
}
