using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JewelryStore.Models
{
    public class BuyerModel
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Address { get; set; }

        public string Zip { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        public string PayerID { get; set; }

        public string Email { get; set; }

        public DateTime TimeOfPurchase { get; set; }
    }
}
