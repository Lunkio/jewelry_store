using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace JewelryStore.Models
{
    public class CreateUserModel
    {
        public string Username { get; set; }

        [JsonIgnore]
        public string Password { get; set; }
    }
}
