using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JewelryStore.Models;

namespace JewelryStore.DataAccess
{
    public interface IBuyerHandler
    {
        Task<IEnumerable<BuyerModel>> GetAllBuyers();

        Task<BuyerModel> GetBuyerById(int id);

        Task<int> AddBuyer(CreateBuyerModel buyer);

        Task<int> DeleteBuyer(int id);
    }
}
