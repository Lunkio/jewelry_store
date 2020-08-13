using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JewelryStore.Models;

namespace JewelryStore.DataAccess
{
    public interface IJewelryHandler
    {
        Task<IEnumerable<JewelryModel>> GetAllJewelries();

        Task<JewelryModel> GetJewelryById(int id);

        Task<int> AddJewelry(CreateJewelryModel jewelry);

        Task<int> UpdateJewelry(JewelryModel jewelry);

        Task<int> DeleteJewelry(int id);
    }
}