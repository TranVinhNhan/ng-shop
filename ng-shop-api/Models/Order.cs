using System;

namespace ng_shop_api.Models
{
    public class Order
    {
        public int Id { get; set; }
        public DateTime PlacedTime { get; set; }
        public string ShippingAddress { get; set; }
        public string ShippingCity { get; set; }
        public string ShippingDistrict { get; set; }
        public bool OrderShipped { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }
    }
}