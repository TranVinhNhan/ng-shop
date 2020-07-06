using System.Collections.Generic;

namespace ng_shop_api.Dtos
{
    public class OrderForCreateDto
    {
        public string FullName { get; set; }
        public bool IsMale { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Option { get; set; }
        public string ShippingAddress { get; set; }
        public string ShippingCity { get; set; }
        public string ShippingDistrict { get; set; }
        public bool IsReceivedAtStore { get; set; }
        public ICollection<OrderDetailForCreateDto> ListOfOrderDetailDto { get; set; }
    }
}