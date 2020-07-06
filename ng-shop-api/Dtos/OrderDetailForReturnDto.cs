namespace ng_shop_api.Dtos
{
    public class OrderDetailForReturnDto
    {
        public int ProductId { get; set; }
        public int OrderId { get; set; }
        public int Quantity { get; set; }
        public decimal PricePerUnit { get; set; }
    }
}