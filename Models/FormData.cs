using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace JewelryStore.Models
{
    public class FormData
    {
        public string Type { get; set; }

        public decimal Price { get; set; }

        public string Description { get; set; }

        public bool Availability { get; set; }

        public IFormFile Image { get; set; }
    }
}
