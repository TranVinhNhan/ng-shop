using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace ng_shop_api.Models
{
    public class Order
    {
        public int Id { get; set; }
        public DateTime PlacedTime { get; set; }
        public string FullName { get; set; }
        public bool IsMale { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Option { get; set; }
        public string ShippingAddress { get; set; }
        public string ShippingCity { get; set; }
        public string ShippingDistrict { get; set; }
        public string OrderStatus { get; set; }
        public bool IsReceivedAtStore { get; set; }
        public string StoreAddress { get; set; }

        public int? UserId { get; set; }
        public User User { get; set; }
        public ICollection<OrderDetail> OrderDetails { get; set; }
        public Order()
        {
            PlacedTime = DateTime.Now;
            OrderDetails = new Collection<OrderDetail>();
            OrderStatus = "Đã tiếp nhận";
        }
    }

    // public enum Status
    // {
    //     Received, Processing, AwaitingPickup, BeingDelivered, Completed, Cancelled
    // }
}