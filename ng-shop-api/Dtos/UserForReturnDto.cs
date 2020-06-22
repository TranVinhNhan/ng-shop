using System.Collections.Generic;
using ng_shop_api.Models;

namespace ng_shop_api.Dtos
{
    public class UserForReturnDto
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public string FullName { get; set; }
        public bool IsMale { get; set; }
        public string PhoneNumber { get; set; }
        public ICollection<Order> Orders { get; set; }
    }
}