﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JewelryStore.Models
{
    public class JewelryModel
    {
        public int Id { get; set; }

        public string Type { get; set; }

        public decimal Price { get; set; }

        public string Description { get; set; }

        public bool Availability { get; set; }

        public byte[] Img { get; set; }
    }
}
